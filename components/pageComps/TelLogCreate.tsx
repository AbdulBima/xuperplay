"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const LoginCreate: React.FC = () => {
  const router = useRouter();

  // State for form data
  const [projectName, setProjectName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [teamSize, setTeamSize] = useState<string>("");
  const [projectUrl, setProjectUrl] = useState<string>("");

  // Loading state for form submission
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when submitting

    try {
      // Retrieve buid and companyEmail from local storage
      const buid = localStorage.getItem("buid");
      const telegramChatId = localStorage.getItem("telegramChatId");

      if (!buid) {
        toast.error("BUID not found. Please log in again.");
        router.push("/");
        return;
      }

      // Make API call to send form data along with buid
      const response = await axios.post(
        "https://xuperplaybackend.onrender.com/api/xup/company/create-company",
        {
          buid,
          telegramChatId,
          projectName,
          email,
          firstName,
          lastName,
          teamSize,
          projectUrl,
        }
      );

      if (response.status === 201) {
        // If response is successful, save buid and email to local storage
        localStorage.setItem("buid", response.data.buid);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("projectName", response.data.projectName);


        // Show success toast
        toast.success("Project created successfully!");

        // Redirect to the dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state once form is submitted
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4">
      <ToastContainer />
      <div className="w-full lg:w-auto flex flex-col lg:flex-row mx-auto lg:pl-60 items-center justify-center shadow-lg rounded-lg">
        {/* Left Side (Form Section) */}
        <div className="relative flex w-full lg:w-[30vw]  h-[90vh] flex-col rounded-lg justify-center p-6 lg:p-10 bg-white">
          <div className="text-center mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
              Create Account
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Project Name */}
            <div>
              <label
                htmlFor="project-name"
                className="block text-sm lg:text-lg font-medium text-gray-700"
              >
                Project Name
              </label>
              <input
                id="project-name"
                name="project-name"
                type="text"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-sm lg:text-lg"
                placeholder="Your Project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

             {/* Email */}
             <div>
              <label
                htmlFor="email"
                className="block text-sm lg:text-lg font-medium text-gray-700"
              >
                Email (optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-sm lg:text-lg"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* First and Last Name */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm lg:text-lg font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-sm lg:text-lg"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm lg:text-lg font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-sm lg:text-lg"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Team Size */}
            <div>
              <label
                htmlFor="team-size"
                className="block text-sm lg:text-lg font-medium text-gray-700"
              >
                Team Size (optional) 
              </label>
              <input
                id="team-size"
                name="team-size"
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-sm lg:text-lg"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
              />
            </div>

            {/* Project URL */}
            <div>
              <label
                htmlFor="project-url"
                className="block text-sm lg:text-lg font-medium text-gray-700"
              >
                Project URL (optional)
              </label>
              <input
                id="project-url"
                name="project-url"
                type="url"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-sm lg:text-lg"
                placeholder="https://yourproject.com"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center w-full mx-auto mt-4">
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

        {/* Right Side (Text Section) */}
        <div className="w-full lg:w-[50vw] px-4 lg:px-32 h-auto flex items-center bg-transparent justify-center p-6 lg:p-10 text-white mt-10 lg:mt-0">
          <div>
            <h1 className="text-lg lg:text-3xl px-2 lg:px-6 font-bold mb-4">
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
          width={200}
          height={150}
          unoptimized
          src="/images/spiral.png"
          alt="Large Image"
          className="w-[200px] h-[150px] lg:w-[650px] lg:h-[430px] object-cover "
        />
      </div>
    </div>
  );
};

export default LoginCreate;
