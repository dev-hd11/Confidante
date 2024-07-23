// (C) 2024, Himank Deka
import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });
import Footer from "@/components/Footer";

export const metadata = {
  title: "NEXTVerse - App",
  description: "Best FOSS web-diary app",
};

export default function AppLayout({ children }) {
  return (
    <>
      <div className={inter.className}>
        
        {children}
        <Footer />
      </div>
    </>
  );
}
