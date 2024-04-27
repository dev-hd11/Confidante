'use client'
import React, { useState } from 'react'
import Link from 'next/link'


const Navigation = ({ notHome }) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <div className={'md:h-[10vh] h-fit flex md:flex-row flex-col gap-6 md:gap-0 md:p-0 py-4  justify-between backdrop-blur-sm items-center' + (!notHome ? ' bg-black/40' : ' bg-white/10')}>
                <div id="logo" className='mx-5'>
                    <Link href={'/'}>
                        { 
                            (!notHome) ? <span className='md:px-6 anta md:py-2 py-2 px-4 text-base bg-black/40 border rounded-xl md:text-lg hover:text-red-600 hover:border-red-600 transition-all duration-500'>Nitro 2024</span> : <h2 className="transition-all duration-500 md:text-lg text-base font-bold text-cyan-400 hover:text-red-500 orbitron">NEXTVerse</h2>
                        }
                    </Link>
                </div>
                <nav className='flex gap-14 list-none mx-5'>
                    <button onClick={() => { setShow(true) }}><li className='md:text-base text-xs px-4 py-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all duration-500'>About Us</li></button>
                    <Link href={'https://techworld856.godaddysites.com'}><li className='md:text-base text-xs px-4 py-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all duration-500'>TechWorld</li></Link>
                    <Link href={'https://www.github.com/dev-hd11/Confidante'}><li className='md:text-base text-xs px-4 py-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-all duration-500'>GitHub</li></Link>
                </nav>
            </div>
            <div className={'fixed inset-0 h-screen bg-black/70 backdrop-blur-md text-white flex items-center justify-center ' + (show ? 'block' : 'hidden')}>
                <div className="w-[75%] h-[75%] rounded-lg border">
                    <div className="flex p-5 border-b justify-between">
                        <h1 className="md:text-2xl text-lg font-bold md:mx-5 mx-2">About Us</h1>
                        <button onClick={() => { setShow(false) }} className="md:mx-5 mx-2"><span className="fa fa-close fa-lg hover:text-red-500 transition-all duration-500"></span></button>
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
