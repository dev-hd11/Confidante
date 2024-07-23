// (C) 2024, Himank Deka
import React from 'react'
import '@/app/auth/local.css'
import 'animate.css'

const Card = ({title, desc}) => {
  return (
    <div className='animate__animated animate__fadeInUp flex flex-col bg-gradient-to-r josefin-sans from-blue-500 via-blue-600 to-blue-800 rounded-2xl h-[20vh] w-[25vw] p-6'>
      <span className='h-[5vh]'>{title}</span>
      <span className='h-[15vh] flex items-center justify-center font-bold text-4xl'>{desc}</span>
    </div>
  )
}

export default Card
