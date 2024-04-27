import React from 'react'

const Footer = ({app}) => {
  return (
    <div className={'flex md:flex-row flex-col font-bold arvo-regular md:h-[10vh] h-fit bg-slate-900 items-center w-full' + (app ? ' fixed bottom-0 border-t' : '')}>
      <span className='md:py-0 py-[5%] text-xs lg:text-base flex justify-center md:border-r md:border-b-0 md:w-[50%] w-full border-b'>Copyright &copy; 2024 Confidante - All rights reserved</span>
      <span className='md:py-0 py-[5%] text-xs md:w-[50%] lg:text-base flex justify-center'>Created by Himank Deka</span>
    </div>
  )
}

export default Footer
