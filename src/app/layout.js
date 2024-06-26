import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={(inter.className, "bg-[--bg] text-white")}>
        <div className="flex flex-col gap-12 items-center my-5">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
