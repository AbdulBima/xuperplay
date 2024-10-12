"use client";

import React, { useState } from "react";

const SettingsComp: React.FC = () => {
  const [activeTab, setActiveTab] = useState("General");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTelegramLogin = () => {
    // Implement your Telegram login logic here
    console.log("Telegram login clicked.");
  };

  return (
    <div className="w-full h-screen p-40 flex flex-col bg-white border-2 shadow-lg">
      <div className="bg-white border-3 shadow-lg justify-start h-[80vh]">
        {/* Tabs Header */}
        <div className="bg-white border-b">
          <div className="flex justify-start space-x-8 py-4">
            <button
              className={`text-lg px-6 py-2 font-semibold transition ${
                activeTab === "General" ? " text-blue-600" : "text-gray-600"
              }`}
              onClick={() => handleTabChange("General")}
            >
              General
            </button>
            <button
              className={`text-lg px-6 py-2 font-semibold transition ${
                activeTab === "Security" ? " text-blue-600" : "text-gray-600"
              }`}
              onClick={() => handleTabChange("Security")}
            >
              Security
            </button>
            <button
              className={`text-lg px-6 py-2 font-semibold transition ${
                activeTab === "Notifications"
                  ? " text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("Notifications")}
            >
              Notifications
            </button>
            <button
              className={`text-lg px-6 py-2 font-semibold transition ${
                activeTab === "Login Options"
                  ? " text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("Login Options")}
            >
              Login Options
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="flex-grow p-6">
          {activeTab === "General" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">General Settings</h3>
              <p>Here you can manage your general settings.</p>
            </div>
          )}
          {activeTab === "Security" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
              <p>Here you can manage your security preferences.</p>
            </div>
          )}
          {activeTab === "Notifications" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Notification Settings
              </h3>
              <p>Here you can manage your notification settings.</p>
            </div>
          )}
          {activeTab === "Login Options" && (
            <div className="flex justify-center mx-auto items-center h-full">
              <div className="w-[500px] mt-20 text-center mx-auto flex flex-col space-y-10 ">
                <h2 className="text-xl text-center whitespace-nowrap font-semibold">
                  Sign in with your Telegram account to enable Telegram Login{" "}
                </h2>
                {/* Sign in with Telegram Button */}
                <button
                  onClick={handleTelegramLogin}
                  className="w-96 ml-20 px-6 py-2.5 text-sm font-medium tracking-wide text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none"
                >
                  Sign in with Telegram
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsComp;
