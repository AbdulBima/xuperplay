"use client"

import axios from "axios";
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

const TelegramAuth: React.FC = () => {
  const [authUrl, setAuthUrl] = useState("");
  const telegramContainerRef = useRef<HTMLDivElement>(null);

  // Function to update Telegram authentication details
  const updateTelegramAuthDetails = async (authUrl: string, chatId: number) => {
    try {
      // Retrieve 'buid' from localStorage
      const buid = localStorage.getItem("buid");

      if (!authUrl) {
        toast.error("Please enter the Auth Redirect URL.");
        console.error("Auth URL is empty, cannot proceed.");
        return;  // Stop execution if authUrl is empty
      }

      if (!buid) {
        console.error("Buid value is missing from localStorage");
        return;
      }

      // Call backend API to update Telegram authentication
      const response = await axios.put(
        "https://xuperplaybackend.onrender.com/api/xup/company/telegram-auth",
        {
          telegramAuthCallbackUrl: authUrl, // The callback URL
          buid: buid, // Add the buid from localStorage here
        }
      );

      if (response.status === 200) {
        const { auth_url } = response.data; // Extract the returned auth_url
        console.log("Telegram authentication updated successfully:", response.data);

        // Send the auth_url as a message to the Telegram user
        sendMessageToTelegramUser(chatId, `Your Telegram-Auth URL: ${auth_url}`);
      } else {
        console.log("Failed to update Telegram authentication:", response.data);
      }
    } catch (error) {
      console.error("Error updating Telegram authentication:", error);
    }
  };

  // Function to send a message to the Telegram user
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


  // Function that handles Telegram authentication
  const onTelegramAuth = (user: TelegramUser) => {
    toast.success(`Logged in as ${user.first_name} ${user.last_name || ""} (@${user.username || "N/A"})`);
    console.log("User Data: ", user);

    if (!authUrl) {
        toast.error("Please enter the Auth Redirect URL.");
        console.error("Auth URL is empty, cannot proceed.");
        return;  // Stop execution if authUrl is empty
      }

    // Send Telegram Auth details to the backend API and then send the auth URL to the user
    updateTelegramAuthDetails(authUrl, user.id); // Ensure user.id is the correct chatId
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
              <label htmlFor="authUrl" className="block text-lg font-bold text-gray-800">
                Auth Redirect URL
              </label>
              <input
                id="authUrl"
                type="text"
                value={authUrl}
                onChange={(e) => {
                    setAuthUrl(e.target.value);
                    console.log("Updated authUrl:", e.target.value); // Check the value being set
                  }}                placeholder="Enter your auth redirect URL"
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
