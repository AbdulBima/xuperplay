// components/OTPonent.tsx

import React from "react";

const OTP: React.FC = () => {
  return (
    <>
      <div className="relative min-h-screen bg-black hidden md:flex items-center justify-center">
        <div className="w-full flex flex-row space-x-6 mx-auto pl-60 items-center justify-center shadow-lg rounded-lg">
          {/* Left Side (Form Section) */}
          <div className="relative flex w-[25vw] py-20 h-auto flex-col rounded-lg justify-center p-10 bg-white">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 -mt-6">
                Login
              </h2>
            </div>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-bold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-lg"
                  placeholder="heydev@xuperauth.com"
                />

<label
                  htmlFor="email"
                  className="block mt-4 text-lg font-bold text-gray-700"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="otp"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-lg"
                  placeholder=""
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex text-lg justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  LOGIN
                </button>
              </div>
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
          <img
            src="/images/spiral.png"
            alt="Large Image"
            className="w-[650px] h-[430px] object-cover  "
          />
        </div>
      </div>
      <div className="relative min-h-screen bg-black flex md:hidden items-center justify-center px-4">
        <div className="w-full flex flex-col lg:flex-row space-x-0 lg:space-x-6 mx-auto lg:pl-60 items-center justify-center shadow-lg rounded-lg">
          {/* Left Side (Form Section) */}
          <div className="relative flex w-full lg:w-[25vw] py-6 lg:py-20 h-auto mt-14 flex-col rounded-lg justify-center p-6 lg:p-10 bg-white">
            {/* Welcome Text (Inside White Background Above the Form) */}
            <div className="text-center mb-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                Login
              </h2>
            </div>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-bold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-sm lg:text-lg"
                  placeholder="heydev@xuperauth.com"
                />

<label
                  htmlFor="email"
                  className="block mt-4 text-lg font-bold text-gray-700"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="otp"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-lg"
                  placeholder=""
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex text-sm lg:text-lg justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>

          {/* Right Side (Text Section) */}
          <div className="w-full lg:w-[50vw] px-4 lg:px-32 h-auto flex items-center bg-transparent justify-center p-6 lg:p-10 text-white mt-10 lg:mt-0">
            <div>
              <h1 className="text-lg lg:text-3xl px-2 lg:px-6 font-bold mb-4 leading-relaxed lg:leading-loose">
                Unlock the full potential of Web3 development with Ease. Our
                complete suite of products helps developers and businesses build
                web3 applications and workflows that elevate user experience.
              </h1>
            </div>
          </div>
        </div>

        {/* Large Image in the Bottom-Right Corner */}
        <div className="absolute bottom-0 right-0 hidden sm:block">
          <img
            src="/images/spiral.png"
            alt="Large Image"
            className="w-[300px] h-[200px] lg:w-[650px] lg:h-[430px] object-cover opacity-20"
          />
        </div>
      </div>
    </>
  );
};

export default OTP;
