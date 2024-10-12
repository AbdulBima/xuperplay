"use client";

import React, { useState } from "react";

const TelegramAuth: React.FC = () => {
  const [authUrl, setAuthUrl] = useState("");

  const handleTelegramLogin = () => {
    if (authUrl.trim()) {
      // Implement your Telegram login logic here with the provided authUrl
      console.log("Auth URL:", authUrl);
      // Example: Redirect user to the entered auth URL
      window.location.href = authUrl;
    } else {
      console.log("Please enter a valid authentication URL.");
      // Optionally, add some validation or feedback to the user
    }
  };

  return (
    <div className="w-full flex manrope  h-screen justify-center items-center">
      <div className=" p-10 m-auto w-[30vw] h-72 items-center justify-center bg-white rounded-lg shadow-md ">
        {/* Logo */}
        <div className="flex justify-center mx-auto mb-6 ">
          <h1 className="texl-4xl font-bold">XuperAuth</h1>
        </div>

        {/* Form */}
        <form className="mt-6">
          {/* Auth URL Input Field */}
          <div>
            <label
              htmlFor="authUrl"
              className="block text-lg font-bol  text-gray-800 "
            >
              Callback URL
            </label>
            <input
              id="authUrl"
              type="text"
              value={authUrl}
              onChange={(e) => setAuthUrl(e.target.value)}
              placeholder="Enter your call back url"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-black  focus:ring focus:ring-black focus:outline-none focus:ring-opacity-40"
            />
          </div>

          {/* Sign in with Telegram Button */}
          <div className="mt-6">
            <button
              onClick={handleTelegramLogin}
              type="button"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-black focus:outline-none focus:ring focus:ring-black focus:ring-opacity-50"
            >
              Sign in with Telegram
            </button>
          </div>

          {/* <div className="mt-6">
            <button
              onClick={handleTelegramLogin}
              type="button"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-black focus:outline-none focus:ring focus:ring-black focus:ring-opacity-50"
            >
              Sign in with Telegram
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default TelegramAuth;
