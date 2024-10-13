'use client'
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

// TelegramUser Type Definition
type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

// Extending the window object to add 'onTelegramAuth'
declare global {
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void;
  }
}

const sendMessageToTelegramUser = async (chatId: number, message: string) => {
    const botToken = "7569757240:AAGQGnfhqEXJoujh8xy527Yj9Eo64jmzxEQ";
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

  try {
    const response = await axios.get(url);  // Using axios for sending message
    if (response.status === 200) {
      console.log("Message sent successfully");
    } else {
      console.log("Failed to send message");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};



const LoginComp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const telegramContainerRef = useRef<HTMLDivElement>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://xuperplaybackend.onrender.com/api/xup/company/retrive/company",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("tempCompanyToken", token);
        localStorage.setItem("companyEmail", email);

        toast.success("Token sent to email successfully! Redirecting to OTP page...");
        router.push("/login/otp");
      }
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      console.error("Error sending email to backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Dynamically inject the Telegram widget
    const telegramScript = document.createElement("script");
    telegramScript.src = "https://telegram.org/js/telegram-widget.js?22";
    telegramScript.setAttribute("data-telegram-login", "xuper_chain_bot");
    telegramScript.setAttribute("data-size", "large");
    telegramScript.setAttribute("data-onauth", "onTelegramAuth(user)");
    telegramScript.setAttribute("data-request-access", "write");
    telegramScript.async = true;

    if (telegramContainerRef.current) {
      telegramContainerRef.current.appendChild(telegramScript);
    }

    // Define the Telegram auth function
    window.onTelegramAuth = (user: TelegramUser) => {
      toast.success(`Logged in as ${user.first_name} chat_ID: ${user.id}`);

      

      // Send the token to Telegram user's profile
      axios
        .post("https://xuperplaybackend.onrender.com/api/xup/company/authtel/new/register", {
          chat_id: user.id,
        })
        .then((response) => {
          if (response.status === 200) {
            // Token returned from backend
            const telToken = response.data.token; // Assuming token is part of response
            sendMessageToTelegramUser(user.id, `Your token: ${telToken}`);

            // Redirect to OTP page
            router.push("/login/tel/otp/");
          }
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
    };
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick rtl={false} />
      <div className="relative min-h-screen bg-black hidden md:flex items-center justify-center">
        <div className="w-full flex flex-row space-x-6 mx-auto pl-60 items-center justify-center shadow-lg rounded-lg">
          <div className="relative flex w-[25vw] py-20 h-auto flex-col rounded-lg justify-center p-10 bg-white">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-lg"
                  placeholder="heydev@xuperauth.com"
                />
              </div>
              <div className="flex items-center justify-center w-full mx-auto">
                {loading ? (
                  <div className="spinner w-full mxauto flex justify-center">
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex text-sm lg:text-lg justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-black hover:bg-black"
                  >
                    Submit
                  </button>
                )}
              </div>
              <div className="mt-6 w-full flex mx-auto justify-center items-center" ref={telegramContainerRef}></div>
            </form>
          </div>

             {/* Right Side (Text Section) */}
          <div className="w-[50vw] px-32 h-auto flex items-center bg-transparent justify-center p-10 text-white">
            <div>
              <h1 className="text-3xl px-6 font-bold mb-4 leading-loose">
                Unlock the full potential of Web3 development with Ease. Our
                complete suite of products helps developers and businesses build
                web3 applications and workflows that elevate user experience.
              </h1>
            </div>
          </div>
        </div>

        

        <div className="absolute bottom-0 right-0">
          <Image
            width={60}
            height={60}
            unoptimized
            src="/images/spiral.png"
            alt="Large Image"
            className="w-[650px] h-[430px] object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default LoginComp;
