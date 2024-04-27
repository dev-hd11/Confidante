'use client'
import React, { useEffect } from 'react'
import '@/app/auth/local.css';
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import Navigation from '@/components/Navigation';
import Button, { style2 } from '@/components/Button';

const page = () => {

    useEffect(() => {
        const fetchInfo = async () => {
            let redirect = await fetch('/api/setup')
            redirect = await redirect.json()

            if (redirect.value != null) {
                router.push('/app/')
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

    const onSubmit = async (data) => {
        return new Promise(async (res, rej) => {

            let conn = await fetch('/api/setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            let post = await conn.json()

            if (post.status == 'ok') {
                router.push('/app')
            }

            res()
        })


    }


    return (
        <>
            <Navigation notHome={true} />
            <div className='h-[80vh] exo-2'>
                <div id='head' className='flex h-[15vh] items-center justify-center border-b border-b-red-500 gap-4 md:text-3xl text-xl'>
                    <span className='font-semibold'>Welcome to </span><span className="text-cyan-400 orbitron font-bold">NEXTVerse&trade;</span>
                </div>
                <div id='form' className='flex flex-col items-center'>
                    <p className='mt-16 md:text-2xl text-lg'>Thanks for choosing us!</p>
                    <p className='md:text-2xl text-lg'>Please enter your name so that we can customize your experience.</p>
                    <form onSubmit={handleSubmit(onSubmit)} action="" className='flex flex-col w-full items-center my-14 h-[10vh] gap-6'>
                        <div className="flex gap-2 items-center">
                            <input className='bg-slate-900 disabled:opacity-20 md:py-4 py-3 md:text-lg text-base md:px-6 px-4 rounded-xl focus:placeholder:text-cyan-600 focus:border-cyan-400 focus:text-cyan-400 md:w-[35vw] w-[80vw] border hover:bg-slate-800 transition-all duration-300' placeholder='Your name here' type='text' {...register('name')} required />
                        </div>
                        <Button name='Submit' type='submit' btnStyle={style2} action={handleSubmit(onSubmit)} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default page
