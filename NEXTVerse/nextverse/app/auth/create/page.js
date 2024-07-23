// (C) 2024, Himank Deka
'use client'
import React, { useState, useEffect } from 'react'
import '@/app/auth/local.css';
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import Button, { style2, removeAnimation } from '@/components/Button';

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

            if (allow.value == true) {
                router.push('/app')
            } else if (allow.value == false) {
                router.push('/auth')
            }
        }

        fetchInfo()

    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm();


    const router = useRouter()
    const [visible, setVisible] = useState(false)
    const [inp_type, setType] = useState('password')
    const [icon, setIcon] = useState('visibility')
    const [err, setErr] = useState('')

    const onSubmit = async (data) => {
        return new Promise(async (res, rej) => {


            setErr('')

            if (data.passwd.length < 8) {
                setErr('Password must be at least 8 characters long!')
                res()
            } else if (data.passwd != data.passwd_check) {
                setErr('Passwords do not match!')
                res()
            } else {
                let conn = await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                let post = await conn.json()

                if (post.status == 'ok') {
                    router.push('/auth')
                }
                res()
            }
        })
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
            <div id='head' className='flex h-[15vh]  animate__animated animate__fadeInDown items-center justify-center border-b border-b-red-500 gap-4 md:text-3xl text-xl'>
                <span className="text-cyan-400 orbitron font-bold">NEXTVerse&trade;</span> <span className='font-semibold'>Authentication</span>
            </div>
            <div id='form' className='flex flex-col items-center  animate__animated animate__fadeIn animate__delay-1s'>
                <p className='mt-16 md:text-2xl text-lg'>Welcome to Confidante!</p>
                <p className='md:text-2xl text-lg'>Please set a password for securing your account.</p>
                <form action="" className='flex flex-col w-full items-center my-14 h-[10vh] gap-6'>
                    <div className="flex gap-2 items-center">
                        <input className='bg-slate-900 disabled:opacity-20 md:py-4 py-3 md:text-lg text-base md:px-6 px-4 rounded-xl focus:placeholder:text-cyan-600 focus:border-cyan-400 focus:text-cyan-400 md:w-[35vw] w-[80vw] border hover:bg-slate-800 transition-all duration-300' placeholder='Set password' type={inp_type} {...register('passwd')} required />
                        <span className="material-symbols-outlined cursor-pointer hover:text-cyan-400 transition-all duration-300" onClick={() => { toggleVisibility() }}>
                            {icon}
                        </span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input className='bg-slate-900 disabled:opacity-20 md:py-4 py-3 md:text-lg text-base md:px-6 px-4 rounded-xl focus:placeholder:text-cyan-600 focus:border-cyan-400 focus:text-cyan-400 md:w-[35vw] w-[80vw] border hover:bg-slate-800 transition-all duration-300' placeholder='Confirm password' type={inp_type} {...register('passwd_check')} required />
                        <span className="material-symbols-outlined cursor-pointer hover:text-cyan-400 transition-all duration-300" onClick={() => { toggleVisibility() }}>
                            {icon}
                        </span>
                    </div>

                    <Button name='Submit' type='submit' btnStyle={style2} action={handleSubmit(onSubmit)} />
                </form>
                <span className="text-red-500 my-24">{err}</span>
            </div>
        </div>
    )
}

export default page
