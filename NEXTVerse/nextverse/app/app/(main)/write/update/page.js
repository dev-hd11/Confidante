// (C) 2024, Himank Deka
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button, { style2 } from '@/components/Button';
import '@/app/app/(main)/write/styles.css'

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 0;

  const fetchEntry = async () => {
    try {
      const response = await fetch('/api/update/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: id })
      });

      const diaryData = await response.json();

      if (!diaryData) {
        router.push('/app/write');
      } else {
        setValue('title', diaryData.value[0].title);
        setValue('content', diaryData.value[0].content);
      }
    } catch (error) {
      console.error('Error fetching entry:', error);
      router.push('/app/write');
    }
  };

  useEffect(() => {
    if (id == 0) {
      router.push('/app/write');
      return;
    }
    fetchEntry();
  }, [id]);

  const [err, setErr] = useState('');

  const onSubmit = async (data) => {
    setErr('');

    const newData = {
      ...data,
      en_id: id
    };

    try {
      if (data.title == '') {
        alert('Cannot create empty entry!')
        return
      }
      const response = await fetch('/api/update/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      const post = await response.json();

      if (post.status === 'ok') {
        router.push('/app/diary?update=true');
      } else {
        setErr(post.message);
      }
    } catch (error) {
      setErr('An error occurred while submitting the form.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="screen-style">
        <div id="head" className="animate__animated animate__fadeInDown w-[85vw] justify-between h-[15vh] flex border-b">
          <h1 className="w-1/2 chakra-petch flex px-10 items-center bg-gradient-to-r from-purple-300 via-purple-600 to-purple-700 text-transparent bg-clip-text h-full text-3xl font-bold">
            Update
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
            />
            {errors.title && <span className="text-red-500">Title is required</span>}
          </div>
          <div className="flex gap-2 items-center">
            <textarea
              className="bg-slate-900 max-h-[40vh] disabled:opacity-20 md:py-4 py-3 md:text-lg text-base md:px-6 px-4 rounded-xl focus:placeholder-cyan-600 focus:border-cyan-400 focus:text-cyan-400 md:w-[40vw] md:h-[35vh] h-[50vh] w-[80vw] border hover:bg-slate-800 transition-all duration-300"
              placeholder="Enter your contents here.."
              {...register('content')}
            ></textarea>
            {errors.content && <span className="text-red-500">Content is required</span>}
          </div>
          <Button name="Update" type="submit" btnStyle={style2} action={handleSubmit(onSubmit)} />
        </form>
        <span className="text-red-500 my-24">{err}</span>
      </div>
    </>
  );
};

export default Page;
