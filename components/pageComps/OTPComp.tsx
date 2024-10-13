"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTP: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // On mount, retrieve companyToken and companyEmail from local storage
  useEffect(() => {
    const storedEmail = localStorage.getItem("companyEmail");
    const storedToken = localStorage.getItem("tempCompanyToken");

    if (storedEmail) setEmail(storedEmail);
    if (storedToken) setOtp(storedToken);

 
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
  
    try {
      const token = localStorage.getItem("tempCompanyToken");
      if (!token) throw new Error("Token is missing");
  
      // Make the API call with email and token
      const response = await axios.post(
        "https://xuperplaybackend.onrender.com/api/xup/company/auth/verify-token",
        {
          token,
        }
      );
  
      const { buid, projectName } = response.data;
  
      // Save the response data to local storage
      localStorage.setItem("buid", buid);
      
      // Check if projectName exists in the response
      if (projectName) {
        localStorage.setItem("projectName", projectName);
        toast.success("Login successful, redirecting to dashboard...");
        router.push("/dashboard"); // Redirect to dashboard immediately
      } else {
        toast.success("Redirecting to registration...");
        router.push("/login/create"); // Redirect to registration immediately
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };
  

  return (
    <>
      {/* ToastContainer must be inside the component */}
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
          <div className="relative flex w-[25vw] py-20 h-auto flex-col rounded-lg justify-center p-10 bg-white">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 -mt-6">OTP</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <h1 className="text-gray-700  text-lg"> Enter OTP sent to: <span className="text-orange-900">{email}</span></h1>

                <label
                  htmlFor="otp"
                  className="block mt-4 text-lg font-bold text-gray-700"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-lg"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
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
                  disabled={loading} // Disable button while loading
                  className="w-full flex text-sm lg:text-lg justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                  "
                >
                  {" "}
                  Submit{" "}
                </button>
              )}{" "}
              {/* Change button text when loading */}
            </div>
            </form>
          </div>

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
      </div>
    </>
  );
};

export default OTP;
