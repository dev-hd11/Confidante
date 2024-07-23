// (C) 2024, Himank Deka
import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";

export const metadata = {
    title: "NEXTVerse - App",
    description: "Best FOSS web-diary app",
};

export default function MainLayout({ children }) {
    return (
        <>
            <div className={inter.className}>
                <div className="bg-slate-950">
                    <div className="fixed inset-0 z-[0] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
                        <SideBar />
                        {children}
                        <Footer app={true} />
                    </div>

                </div>
            </div>
        </>
    );
}

