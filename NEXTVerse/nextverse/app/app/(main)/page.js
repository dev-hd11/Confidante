'use client'
import React, { useState, useEffect } from 'react'
import Button, { style2 } from '@/components/Button'
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
      }
    }

    fetchInfo()

  }, [])


  const router = useRouter()
  const [username, setUsername] = useState('')

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
      setTimeout(() => {
        router.push('/')
      }, 1000);
    }
  }

  return (
    <div className='screen-style flex flex-col gap-8'>
      <div className='h-[30vh] w-full flex items-center justify-center'>
        <h1 className='text-4xl bitter font-bold text-white px-4 py-2 border-2 rounded-2xl'>
          <span className='inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent'>
            Welcome Back,</span>
          <span className='text-cyan-400 mx-2'>{username}</span></h1>
      </div>
    </div>

  )
}

export default page
