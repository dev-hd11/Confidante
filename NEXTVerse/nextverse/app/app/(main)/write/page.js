// (C) 2024, Himank Deka
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button, { style2 } from '@/components/Button';
import { ToastContainer, toast } from 'react-toastify';
import './styles.css'
import 'animate.css'

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm();

  const notify = (message = 'Cannot create empty entry!') => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const router = useRouter();

  const [err, setErr] = useState('');

  const onSubmit = async (data) => {
    setErr('');

    try {
      if (data.title == '') {
        alert('Cannot create empty entry!')
        return
      }
      let id = await fetch('/api/ux/entries')
      id = await id.json()
      id = id.value

      data['id'] = id

      const response = await fetch('/api/diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const post = await response.json();

      if (post.status === 'ok') {

        let conn = await fetch('/api/ux/entries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            value: id + 1
          })
        })

        router.push('/app/diary?saved=true')
      } else {
        setErr(post.message);
      }
    } catch (error) {
      setErr('An error occurred while submitting the form.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="screen-style">
      <div id="head" className="animate__animated animate__fadeInDown w-[85vw] justify-between h-[15vh] flex border-b">
        <h1 className="w-1/2 flex px-10 items-center h-full text-3xl text-red-600 font-bold">
          Write
        </h1>
        <div className='flex gap-2 px-6 justify-center items-center text-xl '>
          <p onClick={() => router.push('/app/learn-more/markdown')} className='cursor-pointer flex justify-center items-center font-semibold text-xl arsenal-sc'>Markdown<span className='ml-2 font-sans py-1 px-3 text-sm rounded-full bg-slate-500 uppercase'>Beta</span></p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn animate__delay-1s flex flex-col w-full items-center my-14 h-[10vh] gap-6">
        <div className="flex gap-2 items-center">
          <input
            className="bg-transparent disabled:opacity-20 md:py-4 py-3 md:text-lg text-base md:px-6 focus:hover:opacity-100 px-4 focus:placeholder:text-cyan-600 focus:border-cyan-400 focus:text-cyan-400 md:w-[40vw] w-[80vw] border-b-2 hover:opacity-50 transition-all duration-300"
            placeholder="Enter Title"
            type="text"
            {...register('title')}
            required
          />
        </div>
        <div className="flex gap-2 items-center">
          <textarea
            className="bg-slate-900 max-h-[40vh] disabled:opacity-20 md:py-4 py-3 md:text-lg text-base md:px-6 px-4 rounded-xl focus:placeholder-cyan-600 focus:border-cyan-400 focus:text-cyan-400 md:w-[40vw] md:h-[35vh] h-[50vh] w-[80vw] border hover:bg-slate-800 transition-all duration-300"
            placeholder="Enter your contents here.."
            {...register('content')}
            required
          ></textarea>
        </div>
        <Button name="Create" type="submit" btnStyle={style2} action={handleSubmit(onSubmit)} />
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
  
    </div>
  );
};

export default Page;
