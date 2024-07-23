// (C) 2024, Himank Deka
'use client'
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import 'animate.css'


export default function Home() {
  const router = useRouter()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fetchD = async () => {

      let allow = await fetch('/api/data')
      allow = await allow.json()

      if (allow.value === true) {
        return
      } else {
        setShow(true)
      }
    }

    fetchD()

  }, [])


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

        res()
      }, 1000)
    });



  }

  return (
    <>
      <div className={'animate__animated animate__fadeIn inset-0 z-50 w-[100vw] h-[100vh] fixed bg-black/80 backdrop-blur-sm items-center justify-center ' + (show ? 'flex' : 'hidden')}>
        <div className='bg-slate-800 rounded-xl h-[40%] animate__animated animate__fadeIn animate__delay-1s'>
          <h1 className='text-3xl p-5 h-[40%] border-b flex items-center justify-center'><span className="font-semibold">Welcome to</span> <span className="alice mx-2">Confidante&trade;</span></h1>
          <div className='w-full h-[60%] p-10 flex items-center justify-center'>
            <p className="font-bold text-xl">Please view the license before proceding. <a href="/license" className="text-cyan-500 hover:underline">View</a></p>
          </div>
        </div>
      </div>
      <main className="h-[100vh] home-main bg-cover bg-center">
        <Navigation notHome={false} />
        <div id="content" className="h-[80vh] bg-black/50 items-center justify-center flex flex-col">
          <h1 className="md:text-9xl text-6xl animate-focus font-semibold alice">Confidante</h1>
          <h2 className="md:text-4xl text-2xl font-bold animate__animated animate__fadeIn animate__delay-2s text-cyan-400 orbitron">NEXTVerse&trade;</h2>
          <p className="md:text-xl text-sm font-bold arvo-regular animate__animated animate__fadeInDown animate__delay-3s  text-slate-300 py-4 border-y w-full text-center bg-black/90 mt-16">Best FOSS Diary web application. Capture your <span className="text-red-400 border-b-2 border-dashed border-red-400">memories</span>!</p>
          <div className="animate__animated animate__fadeInUp animate__delay-2s">
            <Button name={'Get Started'} action={handleClick} />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
