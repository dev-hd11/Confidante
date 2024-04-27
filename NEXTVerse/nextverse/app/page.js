'use client'
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter()

  const handleClick = async () => {
    return new Promise((res, rej) => {
      setTimeout(async () => {
        let allow = await fetch('/api/auth')
        allow = await allow.json()

        if (allow.value === true) {
          router.push('/app')
        } else {
          router.push('/auth')
        }

        console.log('finished')
        res()
      }, 1000)
    });

  }

  return (
    <>
      <main className="h-[100vh] home-main bg-cover bg-center">
        <Navigation notHome={false} />
        <div id="content" className="h-[80vh] bg-black/50 items-center justify-center flex flex-col">
          <h1 className="md:text-9xl text-6xl font-semibold alice">Confidante</h1>
          <h2 className="md:text-4xl text-2xl font-bold text-cyan-400 orbitron">NEXTVerse&trade;</h2>
          <p className="md:text-xl text-sm font-bold arvo-regular text-slate-300 py-4 border-y w-full text-center bg-black/90 mt-16">Best FOSS Diary web application. Capture your <span className="text-red-400 border-b-2 border-dashed border-red-400">memories</span>!</p>
          <Button name={'Get Started'} action={handleClick} />
        </div>
        <Footer />
      </main>
    </>
  );
}
