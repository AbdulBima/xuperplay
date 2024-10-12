import type { Metadata } from "next";
import "../globals.css";


export const metadata: Metadata = {
  title: "Xuperauth",
  description: "Playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='manrope'
      >
        {children}
      </body>
    </html>
  );
}
