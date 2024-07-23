// (C) 2024, Himank Deka
'use client'
import React, { useRef, useState, useEffect } from 'react'
import './local.css';
import { useRouter } from "next/navigation";
import 'animate.css'

const page = () => {
    useEffect(() => {
        const fetchInfo = async () => {
            let read = await fetch('/api/data')
            read = read.json()

            if (read.value != true) {
                router.push('/')
                return
            }
            let allow = await fetch('/api/auth')
            allow = await allow.json()

            if (allow.value === true) {
                router.push('/app')
            } else if (allow.value === null) {
                router.push('/auth/create')
            }
        }

        fetchInfo()
    }, [])



    const router = useRouter()
    const [visible, setVisible] = useState(false)
    const [inp_type, setType] = useState('password')
    const [icon, setIcon] = useState('visibility')
    const [err, setErr] = useState('')
    const [process, setProcess] = useState(false)
    const passwd = useRef()

    const auth = async () => {
        let fetchedPassword = await fetch('/api/security')
        fetchedPassword = await fetchedPassword.json()
        let password = fetchedPassword.value

        const value = passwd.current.value
        if (value.length >= password.length) {
            if (value === password) {
                setProcess(true)

                let conn = await fetch('/api/security', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        value: true
                    })
                })
    
                let post = await conn.json()
    
                if (post.status == 'ok') {
                    setTimeout(() => {
                        router.push('/app')
                    }, 1000);
                }
            } else {
                setErr('Invalid credentials!')
            }
        } else {
            setErr('')
        }
    }

    const toggleVisibility = () => {
        if (visible) {
            setType('password')
            setIcon('visibility')
        } else {
            setType('text')
            setIcon('visibility_off')
        }

        setVisible(!visible)
    }

    return (
        <div className='h-[80vh] exo-2'>
            <div id='head' className='flex h-[15vh] animate__animated animate__fadeInDown items-center justify-center border-b border-b-red-500 gap-4 md:text-3xl text-xl'>
                <span className="text-cyan-400 orbitron font-bold">NEXTVerse&trade;</span> <span className='font-semibold'>Authentication</span>
            </div>
            <div id='form' className='animate__animated animate__fadeIn animate__delay-1s flex flex-col items-center'>
                <p className='mt-16 md:text-2xl text-lg'>This is a protected page.</p>
                <p className='md:text-2xl text-lg'>Please enter the password to proceed.</p>
                <form action="" className='flex w-full items-center justify-center h-[10vh] mt-20 gap-6'>
                    <input disabled={process} ref={passwd} onKeyUp={() => { auth() }} className='bg-slate-900 disabled:opacity-20 md:py-4 py-3 md:text-lg text-base md:px-6 px-4 rounded-xl focus:placeholder:text-cyan-600 focus:border-cyan-400 focus:text-cyan-400 md:w-[35vw] w-[80vw] border hover:bg-slate-800 transition-all duration-300' placeholder='Enter password' type={inp_type} />
                    <span className="material-symbols-outlined cursor-pointer hover:text-cyan-400 transition-all duration-300" onClick={() => { toggleVisibility() }}>
                        {icon}
                    </span>
                </form>
                <span className='text-red-500'>{err}</span>
            </div>
        </div>
    )
}

export default page
