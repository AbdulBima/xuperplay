"use client";
import React from "react";
import { usePathname } from "next/navigation";
import "@/app/globals.css";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
    { href: "/users", label: "Users", icon: "users" },
    { href: "/billing", label: "Billing", icon: "wallet" },
    { href: "/transactions", label: "Transactions", icon: "receipt" },
    { href: "/vault", label: "Vault", icon: "lock" },
    { href: "/settings", label: "Settings", icon: "settings" },
    { href: "/auth", label: "Auth", icon: "auth" },
  ];

  const getIcon = (icon: string) => {
    switch (icon) {
      case "dashboard":
        return (
          <Image
            width={10}
            height={10}
            unoptimized
            src="/images/home.png"
            alt="Large Image"
            className="w-8 h-8 object-cover "
          />
        );
      case "users":
        return (
          <Image
            width={10}
            height={10}
            unoptimized
            src="/images/profile.png"
            alt="Large Image"
            className="w-8 h-8 object-cover "
          />
        );
      case "wallet":
        return (
          <Image
            width={10}
            height={10}
            unoptimized
            src="/images/credit.png"
            alt="Large Image"
            className="w-8 h-8 object-cover "
          />
        );
      case "receipt":
        return (
          <Image
            width={10}
            height={10}
            unoptimized
            src="/images/trans.png"
            alt="Large Image"
            className="w-8 h-8 object-cover "
          />
        );
      case "lock":
        return (
          <Image
            width={10}
            height={10}
            unoptimized
            src="/images/vault.png"
            alt="Large Image"
            className="w-8 h-8 object-cover "
          />
        );
      case "settings":
        return (
          <Image
            width={10}
            height={10}
            unoptimized
            src="/images/set.png"
            alt="Large Image"
            className="w-8 h-8 object-cover "
          />
        );

      case "auth":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M10.624.191c-.324.023-.655.011-.97.073c-2.883.568-5.244 2.01-7.074 4.3C1.42 6.014.624 7.652.243 9.48c-.25 1.2-.294 2.402-.191 3.627c.237 2.832 1.377 5.233 3.345 7.26c.332.341.775.348 1.1.055c.39-.35.442-.735.124-1.149c-.271-.353-.588-.671-.85-1.03c-1.625-2.208-2.343-4.674-2.04-7.411c.305-2.773 1.6-5.022 3.723-6.795c1.517-1.267 3.288-1.983 5.248-2.24c.272-.037.552-.083.803-.186c.32-.132.478-.564.4-.923c-.085-.384-.355-.483-.702-.477c-.194.004-.387 0-.58 0v-.02zm4.639 3.41c-.312-.008-.582.197-.722.512c-.176.4-.027.854.367 1.096c.123.075.256.134.385.199c1.485.737 2.619 1.834 3.319 3.342c.257.554.423 1.15.636 1.726c.162.441.509.656.92.579c.425-.08.67-.392.668-.952c-.016-.081-.035-.261-.082-.435c-.535-1.97-1.579-3.616-3.21-4.847c-.598-.453-1.28-.812-1.958-1.14a.8.8 0 0 0-.323-.08m-6.939.23a.9.9 0 0 0-.492.144c-.648.388-1.325.764-1.88 1.266c-2.323 2.098-3.262 4.755-2.905 7.84c.55 4.74 4.6 8.021 8.9 7.904l.868-.001a1 1 0 0 0 .109-.007c2.491-.312 4.58-1.387 6.146-3.36c.488-.615.86-1.336 1.2-2.049c.248-.523-.032-.982-.56-1.12c-.38-.1-.72.112-.974.509c-.473.737-.89 1.54-1.491 2.16c-1.479 1.52-3.322 2.28-5.466 2.199c-2.405-.091-4.337-1.127-5.758-3.056c-1.088-1.475-1.49-3.168-1.32-4.984c.184-1.987 1.038-3.644 2.57-4.927c.423-.354.908-.633 1.365-.946c.458-.314.568-.715.314-1.15c-.153-.262-.371-.413-.626-.422m3.417 2.167C8.724 6.056 6.02 8.625 6 12c-.02 3.29 2.712 6.017 6 6.02c3.339.005 6.078-2.618 6.062-6.025c-.014-3.545-2.87-6.084-6.028-5.995a6 6 0 0 0-.293-.002m10.752 1.164a1 1 0 0 0-.137.002c-.404.033-.642.295-.74.646c-.053.187-.01.432.064.62a9.55 9.55 0 0 1 .648 3.753a10 10 0 0 1-1.32 4.76c-1.617 2.84-4.04 4.53-7.243 5.12c-.343.063-.694.095-1.033.174c-.434.103-.688.473-.641.882c.044.38.34.646.769.684c.132.012.265.002.398.002l-.001-.003c.145 0 .29.005.434-.002c.084-.004.167-.028.25-.04c1.847-.282 3.518-.99 5.037-2.068c1.708-1.213 3.001-2.78 3.897-4.665c1.1-2.317 1.375-4.752.906-7.264c-.13-.694-.354-1.376-.584-2.046c-.125-.362-.389-.537-.704-.555m-10.449.862q.195 0 .392.05c.708.18 1.16.787 1.158 1.553c.027.504-.211.888-.588 1.183c-.207.163-.236.32-.176.558q.397 1.578.763 3.164c.13.568-.019.872-.522 1.174c-.675.404-1.666.354-2.29-.13c-.315-.244-.427-.573-.331-.966c.252-1.031.494-2.064.762-3.09c.086-.33.041-.554-.225-.794c-.581-.523-.682-1.253-.317-1.903a1.57 1.57 0 0 1 1.374-.8z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center manrope py-80 justify-center w-full h-screen  overflow-y-hidden overflow-x-hidden px-10 bg-[#010220] border-r border-gray-700">
      <div className="flex flex-col flex-1 space-y-6 ">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`p-1 flex flex-col items-center space-y-1 transition-colors duration-200 rounded-lg ${
              pathname === item.href
                ? "underline underline-offset-4 decoration-4 de text-white"
                : "text-gray-200 hover:bg-gray-800"
            }`}
          >
            {getIcon(item.icon)}
            <span className="text-xs">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
