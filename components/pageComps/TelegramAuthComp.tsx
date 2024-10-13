"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

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

const TelegramAuth: React.FC = () => {
  // Function to handle the authentication callback
  const onTelegramAuth = (user: TelegramUser) => {
    alert(
      `Logged in as ${user.first_name} ${user.last_name || ""} userId: ${
        user.id || ""
      } Hash: ${user.hash || ""}  (@${user.username || "N/A"})`
    );
    console.log("User Data: ", user);

    sendMessageToTelegramUser(user.id, "Welcome to our service!");

    // You can now send this user data to your backend for further processing (e.g. JWT creation, session storage)
  };

  useEffect(() => {
    // Assign the callback to the global window object so the Telegram widget can call it
    window.onTelegramAuth = onTelegramAuth;
  }, []);

  const [authUrl, setAuthUrl] = useState("");



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
            {/* Telegram Widget Script */}
            <Script
              async
              src="https://telegram.org/js/telegram-widget.js?22"
              data-telegram-login="xuper_chain_bot" // replace 'samplebot' with your bot's username
              data-size="large"
              data-onauth="onTelegramAuth(user)"
              data-request-access="write"
            />
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
