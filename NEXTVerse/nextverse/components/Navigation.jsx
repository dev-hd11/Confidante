// (C) 2024, Himank Deka
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import 'animate.css'


const Navigation = ({ notHome }) => {
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [out, setOut] = useState('')
    const [out2, setOut2] = useState('')

    return (
        <>
            <div className={out2 + ' animate__animated animate__fadeIn inset-0 z-50 w-[100vw] h-[100vh] fixed bg-black/80 backdrop-blur-sm items-center justify-center ' + (show2 ? 'flex' : 'hidden')}>
                <button className={"fixed top-10 right-10"} onClick={() => {
                    setOut2('animate__slideOutDown')
                    setTimeout(() => {
                        setOut2('')
                        setShow2(false)
                    }, 1000);

                }}><span className="material-symbols-outlined hover:text-red-600">close</span></button>
                <div className='bg-slate-800 rounded-xl animate__animated animate__fadeIn animate__delay-1s'>
                    <h1 className='text-3xl font-bold p-5 border-b flex items-center justify-center'>App Information</h1>
                    <div className='p-4'>
                        <p className='my-3 font-semibold font-mono'>Version Name: NEXTVerse&trade; Nitro (2024)</p>
                        <p className='my-3 font-semibold font-mono'>Version Code: 2024.1.1</p>
                        <p className='my-3 font-semibold font-mono'>UI Theme: Dark</p>
                        <p className='my-3 font-semibold font-mono'>Security Level: NEXTVerse&trade; Authentication Patch 0 (Base)</p>
                        <p className='my-3 font-semibold font-mono'>License: <a href="/license" className='text-cyan-500 hover:underline'>View</a></p>
                        <p className='my-3 font-semibold font-mono'>Release Date: 24 July, 2024</p>
                    </div>
                </div>
            </div>
            <div className={(notHome ? 'animate__animated animate__fadeInDown animate__delay-1s ' : '') + 'md:h-[10vh] h-fit flex md:flex-row flex-col gap-6 md:gap-0 md:p-0 py-4  justify-between backdrop-blur-sm items-center' + (!notHome ? ' bg-black/40' : ' bg-white/10')}>
                <div id="logo" className='mx-5'>
                    <Link href={'/'}>
                        {
                            (!notHome) ? <span className='md:px-6 text-white anta md:py-2 py-2 px-4 text-base bg-black/40 border rounded-xl md:text-lg hover:text-red-600 hover:border-red-600 transition-all duration-500' onClick={() => setShow2(true)}>Nitro 2024</span> : <h2 className="transition-all duration-500 md:text-lg text-base font-bold text-cyan-400 hover:text-red-500 orbitron">NEXTVerse</h2>
                        }
                    </Link>
                </div>
                <nav className='flex gap-14 list-none mx-5'>
                    <button onClick={() => {
                        setShow(true)
                        setOut('')
                    }}><li className='md:text-base text-xs px-4 py-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all duration-500'>About Us</li></button>
                    <Link href={'https://techworld856.godaddysites.com'} className='text-white'><li className='md:text-base text-xs px-4 py-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all duration-500'>TechWorld</li></Link>
                    <Link href={'https://www.github.com/dev-hd11/Confidante'} className='text-white'><li className='md:text-base text-xs px-4 py-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all duration-500'>GitHub</li></Link>
                </nav>
            </div>
            <div className={out + ' fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md text-white flex items-center justify-center ' + (show ? 'block' : 'hidden')}>
                <div className="w-[75%] h-[75%] rounded-lg border animate__animated animate__fadeIn">
                    <div className="flex p-5 border-b justify-between">
                        <h1 className="md:text-2xl text-lg font-bold md:mx-5 mx-2">About Us</h1>
                        <button onClick={() => {
                            setOut('animate__animated animate__slideOutDown')
                            setTimeout(() => {
                                setShow(false)
                            }, 1000);

                        }} className="md:mx-5 text-xl mx-2"><span className="material-symbols-outlined hover:text-red-500 transition-all duration-500"> close </span></button>
                    </div>
                    <div className="arvo-regular p-5 md:text-base text-xs">
                        <p>Confidante NEXTVerse is a NEXT.js app to maintain your diary entries. Secured with encryption and authentication system.</p><br />
                        <p className="font-bold">Features: </p>
                        <ul className="list-disc p-5">
                            <li>Secure</li>
                            <li>Encrypted</li>
                            <li>Single user support</li>
                            <li>Entry creation system</li>
                            <li>Account management system</li>
                            <li>User Friendly UI</li>
                            <li>Privacy</li>
                        </ul>
                        <br />
                        <br />
                        <a href="https://github.com/dev-hd11/Confidante" className="underline text-green-500 hover:text-green-800 active:text-red-500">Learn More</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation
