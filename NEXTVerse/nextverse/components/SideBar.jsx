'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SideBar = () => {
    const router = useRouter()

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

    return (
        <div className='border-r h-[90vh] flex flex-col fixed left-0 bg-black z-[1] w-[15vw] text-white'>
            <div className='border-b h-[10vh] w-full flex items-center justify-center'>
                <Link href={'/'}><h2 className="transition-all duration-500 md:text-xl text-lg font-bold text-cyan-400 hover:text-red-500 orbitron">NEXTVerse&trade;</h2></Link>
            </div>
            <div id='links' className='exo-2 h-[67vh] flex flex-col gap-5 items-center py-10'>
                <Link href={'/app'} className='text-lg flex text-slate-400 transition-all duration-300 hover:text-white w-[90%] rounded-xl items-center px-3 py-2 hover:bg-slate-800 font-semibold'>
                    <span className="material-symbols-outlined">
                        dashboard
                    </span> <span className='mx-3'>Dashboard</span></Link>
                <Link href={'/app'} className='text-lg flex text-slate-400 transition-all duration-300 hover:text-white w-[90%] rounded-xl items-center px-3 py-2 hover:bg-slate-800 font-semibold'>
                    <span className="material-symbols-outlined">
                        menu_book
                    </span> <span className='mx-3'>Diary</span></Link>
                <Link href={'/app'} className='text-lg flex text-slate-400 transition-all duration-300 hover:text-white w-[90%] rounded-xl items-center px-3 py-2 hover:bg-slate-800 font-semibold'>
                    <span className="material-symbols-outlined">
                        add_circle
                    </span> <span className='mx-3'>Write</span></Link>
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
