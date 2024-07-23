// (C) 2024, Himank Deka
'use client'
import React, { useState, useEffect } from 'react'
import 'animate.css'
import Navigation from '@/components/Navigation'
import { useRouter } from 'next/navigation'
import Button, { style2 } from '@/components/Button'
import './style.css'

const page = () => {
    const [cls, setCls] = useState('')
    const [show, setShow] = useState(true)
    const [text, setText] = useState('By using this application, you agree to all the terms and conditions mentioned in this license.')
    const date = new Date()
    const router = useRouter()

    const fetchD = async () => {

        let allow = await fetch('/api/data')
        allow = await allow.json()

        if (allow.value) {
            setShow(false)
            setText('You have agreed to comply to all the terms and conditions mentioned in this license.')
        } 
      }

    useEffect(() => {
      fetchD()

    }, [])
    

    return (
        <>
            <div className='h-[90vh] w-screen overflow-auto' onScroll={() => setCls('bg-black/60 backdrop-blur-sm')}>
                <div className="fixed inset-0 z-[0] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <Navigation notHome={true} />
                <div id='head' className={cls + ' sticky z-30 poppins top-0 flex h-[15vh] animate__animated animate__fadeInDown items-center justify-center border-b border-b-red-500 gap-4 md:text-3xl text-xl'}>
                    <span className="font-semibold alice text-4xl">Confidante&trade;</span><span className='font-semibold'>End User License Agreement</span>
                </div>

                <p className='p-4 exo-2 text-lg animate__animated animate__fadeIn animate__delay-2s'>
                    <span className='font-bold w-full py-5 border-b flex items-center justify-center'>Copyright &copy; 2023 - {date.getFullYear()}, Himank Deka and Contributers [Only to their contributed resources]</span> <br /><br />

                    Definitions: <br />
                    "Software" refers to the original work described in this license. <br />
                    "Contributions" refer to patches, additions, or modifications to the Software. <br />
                    "Malicious versions" refer to any modified versions of the Software intended for harmful purposes <br /><br />

                    Permission is hereby granted, free of charge, to any person obtaining a copy <br />
                    of this software and associated documentation files (the "Software"), to deal <br />
                    in the Software under the following conditions: <br /><br />

                    1. Redistributions of source code must retain the above copyright notice, <br />
                    this list of conditions, and the following disclaimer. <br />

                    2. Redistributions in binary form must reproduce the above copyright notice, <br />
                    this list of conditions, and the following disclaimer in the documentation <br />
                    and/or other materials provided with the distribution. <br /><br />

                    3. Any redistribution, use, or modification of the Software in binary form, <br />
                    including but not limited to incorporating the Software into proprietary <br />
                    software, is strictly prohibited without the express written permission <br />
                    of the copyright holder(s). <br /><br />

                    4. Any use or distribution of the Software that poses a security risk, including <br />
                    but not limited to utilizing cryptographic algorithms, must comply with all <br />
                    applicable laws and regulations regarding encryption and data protection. <br /><br />

                    5. The Software may not be used for any unlawful, malicious, or harmful purposes, <br />
                    including but not limited to cyber attacks, unauthorized access to computer systems <br />
                    or networks, or any other activity deemed harmful by the copyright holder(s). <br /><br />

                    6. The creation of malicious versions of the Software is strictly prohibited. <br />
                    Any such versions will be considered a violation of this license. <br /><br />

                    7. The Software may not be used for financial or commercial gains without prior <br />
                    written permission from the copyright holder(s). <br /><br />

                    8. Users are allowed to make contributions to the original software by submitting <br />
                    patches, additions, or modifications. Any contributions made to the Software <br />
                    will be subject to the terms of this license. <br /><br />

                    9. Any derivative works based on the Software, including modifications or additions, <br />
                    must be clearly attributed to the original authors. Failure to provide proper <br />
                    attribution is a violation of this license. <br /><br />

                    10. Redistributions of any form must be made exclusively through a publicly accessible <br />
                    version control system, such as GitHub. <br /><br />

                    By using this Software, you agree to be bound by the terms and conditions of this license. <br />
                    If you do not agree with these terms, you are not permitted to use the Software. <br /><br />

                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR <br />
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, <br />
                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE <br />
                    AUTHORS OR COPYRIGHT holder(s)S BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER <br />
                    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, <br />
                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE <br />
                    SOFTWARE.
                </p>

                <div className={'my-5 w-full flex items-center justify-center ' + (show ? '' : 'hidden')}>
                    <Button name={'Agree'} btnStyle={style2 + ' z-10'} action={async () => {
                        const req = await fetch('api/data/done')
                        const res = await req.json()

                        if (res.value) {
                            fetchD()

                            setTimeout(() => {
                                router.push('/')
                            }, 1000);
                            
                        }
                    }} />
                </div>
            </div>
            <div className='fixed bottom-0 animate__animated animate__fadeInUp animate__delay-1s border-t w-screen bg-slate-900 flex items-center justify-center font-bold border-cyan-500 h-[10vh]'>
                {text}
            </div>
        </>
    )
}

export default page
