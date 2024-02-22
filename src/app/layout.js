import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/sidebar";
import PlaySection from "@/components/playSection/playSection";
import FriendSection from "@/components/friendSection/friendSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="main">
      <div className="mainContainer">
      <Sidebar/>
      {children}
      <FriendSection/>
      </div>
      <div className="playContainer">
        <PlaySection/>
      </div>
      </div>
      </body>
    </html>
  );
}
