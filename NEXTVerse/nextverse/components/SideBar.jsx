// (C) 2024, Himank Deka
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SideBar = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = async () => {
        let conn = await fetch('/api/security', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: false
            })
        })

        let post = await conn.json()

        if (post.status == 'ok') {

            router.push('/')

        }
    }

    const clearData = async () => {
        let confirmation = confirm('Are you sure you want to clear all your data?')
        if (confirmation) {
            let conn = await fetch('/api/barActions/data')
            let res = await conn.json()
            if (res.status == 'ok') {
                let conn = await fetch('/api/ux/entries', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        value: 0
                    })
                })
                router.push('/app/diary')
                router.refresh()
                }
        }
        }
        const resetAll = async () => {
            let confirmation = confirm('This action will result in loss of your account. Are you sure you want to reset the app?')
            if (confirmation) {
                let conn = await fetch('/api/barActions/reset')
                let res = await conn.json()
                if (res.status == 'ok') {
                    router.push('/')
                    router.refresh()
                }
            }
        }

        return (
            <div onClick={() => {
                if (isOpen) {
                    setIsOpen(false)
                }
            }} className='animate__animated animate__fadeInLeft border-r h-[90vh] flex flex-col fixed left-0 bg-black z-[1] w-[15vw] text-white'>
                <div className='border-b h-[10vh] w-full flex items-center justify-center'>
                    <Link href={'/'}><h2 className="transition-all duration-500 md:text-xl text-lg font-bold text-cyan-400 hover:text-red-500 orbitron">NEXTVerse&trade;</h2></Link>
                </div>
                <div id='links' className='exo-2 h-[67vh] flex flex-col gap-5 items-center py-10'>
                    <Link href={'/app'} className='text-lg flex text-slate-400 transition-all duration-300 hover:text-white w-[90%] rounded-xl items-center px-3 py-2 hover:bg-slate-800 font-semibold'>
                        <span className="material-symbols-outlined">
                            dashboard
                        </span> <span className='mx-3'>Dashboard</span></Link>
                    <Link href={'/app/diary'} className='text-lg flex text-slate-400 transition-all duration-300 hover:text-white w-[90%] rounded-xl items-center px-3 py-2 hover:bg-slate-800 font-semibold'>
                        <span className="material-symbols-outlined">
                            menu_book
                        </span> <span className='mx-3'>Diary</span></Link>
                    <Link href={'/app/write'} className='text-lg flex text-slate-400 transition-all duration-300 hover:text-white w-[90%] rounded-xl items-center px-3 py-2 hover:bg-slate-800 font-semibold'>
                        <span className="material-symbols-outlined">
                            add_circle
                        </span> <span className='mx-3'>Write</span></Link>
                    <div className='relative inline-block w-full ml-5'>
                        <button onClick={toggleDropdown} className={'text-lg flex transition-all duration-300 hover:text-white w-[90%] items-center px-3 py-2 hover:bg-slate-800 font-semibold ' + (isOpen ? 'rounded-t-xl bg-slate-800 text-white' : 'rounded-xl text-slate-400')}>
                            <span className="material-symbols-outlined">
                                more_vert
                            </span> <span className='mx-3'>More</span>
                        </button>
                        {isOpen && (
                            <div className={"absolute transition-all duration-300 flex flex-col bg-slate-800 gap-0 w-[90%] rounded-b-xl"}>
                                <a href="/auth/password" className='p-2 text-white hover:bg-slate-600 cursor-pointer'>Change Password</a>
                                <a onClick={clearData} className='p-2 text-white hover:bg-slate-600 cursor-pointer'>Clear Data</a>
                                <a onClick={resetAll} className='p-2 text-white hover:bg-slate-600 rounded-b-xl cursor-pointer'>Reset</a>
                            </div>
                        )}
                    </div>
                </div>
                <div id='b-links' className='exo-2 h-[23vh] flex flex-col gap-2 items-center justify-center border-t border-t-slate-500'>
                    <button onClick={() => { handleClick() }} className='text-lg flex text-slate-400 transition-all duration-300 hover:text-white w-[90%] rounded-xl items-center px-3 py-2 hover:bg-slate-800 font-semibold'>
                        <span className="material-symbols-outlined">
                            logout
                        </span> <span className='mx-3'>Logout</span></button>
                    <Link href={'https://github.com/dev-hd11/Confidante'} className='text-lg flex text-slate-400 transition-all duration-300 hover:text-white w-[90%] rounded-xl items-center px-3 py-2 hover:bg-slate-800 font-semibold'>
                        <span>
                            <img src="/github.png" className='w-8 h-8' />
                        </span> <span className='mx-3'>GitHub</span></Link>
                </div>
            </div>
        )
    }

    export default SideBar
