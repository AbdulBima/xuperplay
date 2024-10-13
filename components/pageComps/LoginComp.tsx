"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
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
  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
    message
  )}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log("Message sent successfully");
    } else {
      console.log("Failed to send message");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Function to send the chat ID and user data to your backend API
const sendChatIdToBackend = async (user: TelegramUser) => {
  const apiEndpoint = "https://your-backend-api.com/api/save-chat-id"; // Replace with your actual backend URL
  const userData = {
    chat_id: user.id, // Telegram user's chat ID
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    auth_date: user.auth_date,
    hash: user.hash,
  };

  try {
    const response = await axios.post(apiEndpoint, userData);
    if (response.status === 200) {
      console.log("Chat ID and user data sent successfully");
    } else {
      console.error("Failed to send data to backend");
    }
  } catch (error) {
    console.error("Error sending chat ID to backend:", error);
  }
};

const LoginComp: React.FC = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [loading, setLoading] = useState(false); // State for loading status
  const router = useRouter();
  const telegramContainerRef = useRef<HTMLDivElement>(null); // Ref for Telegram widget container

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

        toast.success(
          "Token sent to email successfully! Redirecting to OTP page..."
        );
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
    telegramScript.setAttribute("data-telegram-login", "xuper_chain_bot"); // Replace with your bot username
    telegramScript.setAttribute("data-size", "large");
    telegramScript.setAttribute("data-onauth", "onTelegramAuth(user)");
    telegramScript.setAttribute("data-request-access", "write");
    telegramScript.async = true;

    // Append the script to the desired container
    if (telegramContainerRef.current) {
      telegramContainerRef.current.appendChild(telegramScript);
    }

    // Define the Telegram auth function
    window.onTelegramAuth = (user: TelegramUser) => {
      alert(
        `Logged in as ${user.first_name} ${user.last_name || ""} userId: ${
          user.id || ""
        } Hash: ${user.hash || ""}  (@${user.username || "N/A"})`
      );
      console.log("User Data: ", user);

      // Sending welcome message to the user
      sendMessageToTelegramUser(user.id, "Welcome to our service!");

      // Sending chat ID and user data to the backend
      sendChatIdToBackend(user);
    };
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="relative min-h-screen bg-black hidden md:flex items-center justify-center">
        <div className="w-full flex flex-row space-x-6 mx-auto pl-60 items-center justify-center shadow-lg rounded-lg">
          {/* Left Side (Form Section) */}
          <div className="relative flex w-[25vw] py-20 h-auto flex-col rounded-lg justify-center p-10 bg-white">
            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email Address
                </label>
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

              {/* Submit Button */}
              <div className="flex items-center justify-center w-full mx-auto">
                {loading ? (
                  <div className="spinner w-full mxauto flex justify-center">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex text-sm lg:text-lg justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Submit
                  </button>
                )}
              </div>

              {/* Telegram Widget Container */}
              <div className="mt-6" ref={telegramContainerRef}></div>
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

        {/* Large Image in the Bottom-Right Corner */}
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
