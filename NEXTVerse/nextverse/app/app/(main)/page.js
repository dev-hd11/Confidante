// (C) 2024, Himank Deka
'use client'
import React, { useState, useEffect } from 'react'
import Card from '@/components/Card'
import { useRouter } from 'next/navigation'
import '@/app/auth/local.css'


const page = () => {

  useEffect(() => {
    const fetchInfo = async () => {
      let redirect = await fetch('/api/setup')
      redirect = await redirect.json()

      if (redirect.value == null) {
        router.push('/app/setup')
      } else {
        setUsername(redirect.value)

        let lvObj = await fetch('/api/ux')
        lvObj = await lvObj.json()
        setLv(lvObj.value)

        let entriesObj = await fetch('/api/ux/entries')
        entriesObj = await entriesObj.json()
        setEntries(entriesObj.value)

        await fetch('/api/ux/update')
      }
    }

    fetchInfo()

  }, [])


  const router = useRouter()
  const [username, setUsername] = useState('')
  const [lv, setLv] = useState(<span className='material-symbols-outlined animate-spin'>progress_activity</span>)
  const [entries, setEntries] = useState(<span className='material-symbols-outlined animate-spin'>progress_activity</span>)

  return (
    <div className='screen-style flex flex-col gap-8'>
      <div className='h-[30vh] w-full flex items-center justify-center'>
        <h1 className='animate__animated animate__slideInDown text-4xl bitter font-bold text-white px-4 py-2 border-2 rounded-2xl'>
          <span className='inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent'>
            Welcome Back,</span>
          <span className='text-cyan-400 mx-2'>{username}</span></h1>
      </div>
      <div className="h-fit flex flex-col items-center justify-center gap-6">
        <Card title={'No. of entries'} desc={entries} />
        <Card title={'Last Visited'} desc={lv} />
      </div>
    </div>

  )
}

export default page
