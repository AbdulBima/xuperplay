"use client";

import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [authUrl, setAuthUrl] = useState("");
  const telegramContainerRef = useRef<HTMLDivElement>(null);

  const onTelegramAuth = (user: TelegramUser) => {
    toast.success(
      `Logged in as ${user.first_name} ${user.last_name || ""} userId: ${
        user.id || ""
      } Hash: ${user.hash || ""}  (@${user.username || "N/A"})`
    );

    console.log("User Data: ", user);

    sendMessageToTelegramUser(user.id, "Welcome to our service!");
  };

  useEffect(() => {
    window.onTelegramAuth = onTelegramAuth;

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
  }, []);

  return (
    <>
      <div className="w-full flex h-screen justify-center items-center">
        <div className="p-10 w-[30vw] h-72 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <h1 className="text-4xl font-bold">XuperAuth</h1>
          </div>

          <form className="mt-6">
            <div>
              <label
                htmlFor="authUrl"
                className="block text-lg font-bold text-gray-800"
              >
                Auth Redirect URL
              </label>
              <input
                id="authUrl"
                type="text"
                value={authUrl}
                onChange={(e) => setAuthUrl(e.target.value)}
                placeholder="Enter your auth redirect URL"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-black focus:ring-black focus:outline-none"
              />
            </div>

            {/* Container for the Telegram button */}
            <div className="mt-6" ref={telegramContainerRef}></div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default TelegramAuth;
