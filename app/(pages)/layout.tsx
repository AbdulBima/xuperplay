import type { Metadata } from "next";
import "../globals.css";
import SideNav from "@/components/navigation/SideNav";
// import { AuthWrapper } from "@/components/AuthWrapper";

export const metadata: Metadata = {
  title: "XuperAuth",
  description: "Playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font">
        {/* <AuthWrapper> This will handle authentication and loading */}
        <div className="w-screen h-screen flex flex-row">
          <div className="w-28 h-full overflow-hidden">
            <SideNav />
          </div>

          {/* Main content area (children) */}
          <div className="flex-1 bg-white h-full overflow-y-auto">
            {children} {/* Render children once token is verified */}
          </div>
        </div>
        {/* </AuthWrapper> */}
      </body>
    </html>
  );
}
