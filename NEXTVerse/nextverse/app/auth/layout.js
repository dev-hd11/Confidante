// (C) 2024, Himank Deka
import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "NEXTVerse - Auth",
  description: "Best FOSS web-diary app",
};

export default function AuthLayout({ children }) {
  return (
    <>
      <div className={inter.className}>
        <Navigation notHome={true} />
        {children}
        <Footer />
      </div>
    </>
  );
}
