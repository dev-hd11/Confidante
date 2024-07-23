// (C) 2024, Himank Deka
'use client'
import React from 'react'
import '@/app/app/(main)/write/styles.css'

const page = () => {
    return (
        <div className='screen-style'>
            <div id="head" className="w-[85vw] justify-between h-[15vh] flex border-b">
                <h1 className="w-1/2 flex px-10 items-center h-full text-3xl text-cyan-500">
                    Why Use Markdown?
                </h1>
            </div>
            <div className='p-8 h-[85vh]'>
                <blockquote cite='https://commonmark.org/help/'>Markdown is a simple way to format text that looks great on any device. It doesn’t do anything fancy like change the font size, color, or type — just the essentials, using keyboard symbols you already know.</blockquote><br />
                <p>We have introduced <span className='arsenal-sc capitalize font-semibold text-xl'>markdown</span>, so that the users can style the text that they write. But this feature is still in BETA stage, so some features might not work as expected.</p>
                <p>We recommend users to use <span className='arsenal-sc capitalize font-semibold text-xl'>markdown</span> instead of <i>HTML Rendering</i> to ensure prevention of <b>XSS attacks</b> and <b>malicious HTML elements</b>. <a className='hover:underline active:text-red-600 text-cyan-300' target='_blank' href="https://commonmark.org/help/">Learn More</a>
                </p><br />
                <div>
                    <h1 className='font-bold text-2xl'>Basic Markdown :</h1>
                    <table className='border-collapse w-1/2 mt-4 mb-3'>
                        <thead>
                            <th className='border py-3  px-2 text-left bg-slate-800 text-white'>Styling</th>
                            <th className='border py-3  px-2 text-left bg-slate-800 text-white'>Symbols</th>
                        </thead>
                        <tr>
                            <td className='border p-2'>Bold</td>
                            <td className='border p-2'>**Your text**</td>
                        </tr>
                        <tr>
                            <td className='border p-2'>Italics</td>
                            <td className='border p-2'>*Your text*</td>
                        </tr>
                        <tr>
                            <td className='border p-2'>Hyperlink</td>
                            <td className='border p-2'>[Link Name](URL)</td>
                        </tr>
                        <tr>
                            <td className='border p-2'>Image</td>
                            <td className='border p-2'>![Image Name](Image URL)</td>
                        </tr>
                        <tr>
                            <td className='border p-2'>Heading (3)</td>
                            <td className='border p-2'>#(no. of hastags can be max. 3. It indicates type of heading) Your text</td>
                        </tr>
                    </table>
                </div>
                            </div>
        </div>
    )
}

export default page
