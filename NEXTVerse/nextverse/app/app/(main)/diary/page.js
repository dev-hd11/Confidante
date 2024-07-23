// (C) 2024, Himank Deka
"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import remarkBreaks from "remark-breaks";
import Markdown from 'react-markdown'
import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/app/auth/local.css';
import remarkGfm from "remark-gfm";
import 'animate.css'

const Page = () => {
  const [usName, setUsName] = useState("");
  const [entries, setEntries] = useState([]);
  const [viewEn, setViewEn] = useState([]);
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(1);
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clsName, setClassName] = useState('hidden')
  const [en_title, setEn_title] = useState('')
  const [en_content, setEn_content] = useState('')
  const [en_date, setEn_date] = useState('')
  const [htmlRender, setHtmlRender] = useState('')
  const [useMd, setUseMd] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [en_starred, setEn_starred] = useState('')
  const [show, setShow] = useState('hidden')
  const [disabled, setDisabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [filter_text, setFilter_text] = useState('Filter')
  const [sort_text, setSort_text] = useState('Sort')
  const [search, setSearch] = useState(false)
  const [total_pages, setTotal_pages] = useState(1)
  const [out, setOut] = useState('')
  const router = useRouter();
  const searchParams = useSearchParams();
  const svalue = useRef()

  useEffect(() => {
    if (entries.length % 5 != 0) {
      setTotal_pages(Math.floor(entries.length / 5) + 1)
    } else {
      setTotal_pages(entries.length / 5)
    }

  }, [entries])

  useEffect(() => {
    if (!loading && entries.length == 0 && filter_text == 'Filter' && !search) {
      setDisabled(true)
    }
  }, [entries])



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  const displayEntry = (title, content, date, star) => {
    setClassName("fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm w-[100vw] h-[100vh] z-50")
    setShow('block')
    setEn_title(title)
    setEn_content(content);
    setHtmlRender(content.replace(/\n/g, '<br/>'))
    setEn_date(date)
    setEn_starred(star)
  }

  const notify = (message = 'New entry created successfully!') => {
    toast.success(message, {
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

  const searchEn = async () => {
    let en_name = svalue.current.value
    fetchDiaryEntries('/api/search', true, en_name)
  }

  useEffect(() => {
    if (!search) {
      fetchDiaryEntries()
      svalue.current.value = ''
    }
  }, [search])


  const fetchDiaryEntries = async (uri = "/api/diary", post_req = false, value = null) => {
    try {
      const redirect = await fetch("/api/setup");
      const redirectData = await redirect.json();

      if (redirectData.value == null) {
        router.push("/app/setup");
        return;
      }

      setUsName(redirectData.value);

      let diaryData = ''

      if (post_req) {
        let conn = await fetch(uri, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ value: value })
        })

        diaryData = await conn.json();
      } else {
        const diaryResponse = await fetch(uri);
        diaryData = await diaryResponse.json();
      }

      if (!diaryData.value) {
        setEntries([]);
        setLoading(false);
        return;
      }

      const formattedEntries = diaryData.value.map(entry => ({
        ...entry,
        selected: false
      }));

      setEntries(formattedEntries);

      if (formattedEntries.length > 0) {
        setViewEn(formattedEntries.slice(0, 5));
        setIndex(5);
      } else {
        setViewEn([]);
        setIndex(0);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiaryEntries();

    const saved = searchParams.get('saved');
    const update = searchParams.get('update');
    if (saved === 'true') {
      notify();
    }
    if (update === 'true') {
      notify('Entry updated successfully!');
    }

    const date = new Date()

    if (date.getHours() > 17) {
      setDarkMode(true)
    }
  }, [searchParams]);

  const handleClick = (idx) => {
    const updatedEntries = [...viewEn];
    updatedEntries[idx].selected = !updatedEntries[idx].selected;
    setViewEn(updatedEntries);
  };

  const del = async (idx, title) => {
    const data = {
      en_id: idx
    }

    const response = await fetch('/api/deleteEn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const post = await response.json();

    if (post.status === 'ok') {
      fetchDiaryEntries()
      setCounter(1)
      notify(`${title} successfully deleted!`)

      let id = await fetch('/api/ux/entries')
      id = await id.json()
      id = id.value

      let conn = await fetch('/api/ux/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: id - 1
        })
      })

    }
  }

  const fav = async (idx, value, title) => {

    const data = {
      en_id: idx,
      value: !value
    }

    const response = await fetch('/api/star', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const post = await response.json();

    if (post.status === 'ok') {
      if (filter_text == 'Favourites') {
        fetchDiaryEntries('/api/filter/favourites')
      } else if (filter_text == 'General') {
        fetchDiaryEntries('/api/filter/general')
      } else {
        fetchDiaryEntries()
      }
      setCounter(1)
      if (!value) {
        notify(`${title} successfully marked as favourite!`)
      } else {
        notify(`${title} successfully removed from favourites!`)
      }
    }
  }

  const countWords = (str) => {
    str = str.trim();

    if (str === "") {
      return 0;
    }

    const words = str.split(/\s+/);

    return words.length;
  }

  const prev = () => {
    if (counter <= 1) return;

    const prevIndices = [...indices];
    const prevIndex = prevIndices.pop() || 0;

    setCounter(counter - 1);
    setViewEn(entries.slice(prevIndex - 5, prevIndex));
    setIndex(prevIndex);
    setIndices(prevIndices);
  };

  const next = () => {
    if (index >= entries.length) return;

    const newIndices = [...indices, index];

    setCounter(counter + 1);
    setViewEn(entries.slice(index, index + 5));
    setIndex(index + 5);
    setIndices(newIndices);
  };

  return (
    <div className="screen-style" onClick={
      () => {
        if (isOpen) {
          setIsOpen(false)
        }
        if (isOpen2) {
          setIsOpen2(false)
        }
      }
    }>
      <div className={clsName + ' ' + out}>
        <button className={"fixed top-10 right-10 " + show} onClick={() => {
          setOut('animate__animated animate__slideOutDown')
          setTimeout(() => {

            setClassName('hidden')
            setShow('hidden')
          }, 1000);

        }}><span className="material-symbols-outlined hover:text-red-600">close</span></button>
        <div className={'animate__animated animate__fadeInUp ' + (!(en_starred) ? "bg-gradient-to-bl from-slate-700/90 via-bg-slate-800/90 to-slate-900/80" : "bg-gradient-to-bl from-orange-400/70 via-bg-red-700/70 to-red-950/70") + " backdrop-blur-lg w-[70%] h-[80%] rounded-lg"}>
          <div className="h-[20%] gap-3 flex flex-col items-center justify-center w-full border-b border-b-white">
            <h1 className="text-4xl font-bold capitalize">{en_title}</h1>
            <p>{en_date}</p>
          </div>
          <div className="h-[80%] w-full flex items-center justify-center">
            <div className={"h-[90%] w-[95%] transition-all duration-300 flex flex-col poppins-medium rounded-xl border-2 " + (darkMode ? 'bg-slate-950 text-white border-white' : 'bg-slate-200 border-black text-black')}>
              <div className={(darkMode ? 'border-white' : 'border-black') + " border-b h-[10%] justify-between flex"}>
                <div className="flex">
                  <div className={"flex border-r " + (darkMode ? 'border-white' : 'border-black')}>
                    <abbr title="Light Mode" className="no-underline"><button onClick={() => { setDarkMode(false) }} className={"h-full px-4 flex items-center justify-center " + (darkMode ? 'rounded-tl-xl  hover:bg-slate-600' : 'text-white bg-slate-800 rounded-tl-lg')}><span className="material-symbols-outlined no-fill">light_mode</span></button></abbr>
                    <abbr title="Dark Mode" className="no-underline"><button onClick={() => { setDarkMode(true) }} className={"h-full px-4 flex items-center justify-center " + (darkMode ? 'bg-slate-800 ' : 'hover:text-white hover:bg-slate-600')}><span className="material-symbols-outlined no-fill">dark_mode</span></button></abbr>
                  </div>
                  <div className={"flex border-r " + (darkMode ? 'border-white' : 'border-black')}>
                    <abbr title="Use Markdown" className="no-underline"><button onClick={() => {
                      if (useMd) {
                        let a = confirm('We have enabled markdown for your safety. Are you sure you want to switch to HTML Rendering?')
                        if (!a) {
                          return
                        }
                      }
                      setUseMd(!useMd)
                    }} className={"h-full px-4 flex items-center justify-center " + (darkMode && !useMd ? 'text-white hover:bg-slate-600' : '') + (useMd ? ' bg-slate-800 text-white' : '') + (!darkMode && !useMd ? 'text-black hover:bg-slate-600 hover:text-white' : '')}><span className="material-symbols-outlined no-fill">markdown</span></button></abbr>
                  </div>
                </div>
                <div className={"h-full px-5 flex justify-center items-center border-l  " + (darkMode ? 'text-white border-white' : 'text-black border-black')}>
                  {countWords(en_content)} words
                </div>
              </div>

              {useMd && (<Markdown className="animate__animated animate__fadeIn animate__delay-1s p-6 h-[90%] overflow-auto" remarkPlugins={[remarkBreaks, remarkGfm]}>{en_content}</Markdown>)}
              {!useMd && (<p className="animate__animated animate__fadeIn animate__delay-1s p-6 h-[90%] overflow-auto" dangerouslySetInnerHTML={{ __html: htmlRender }}></p>)}
            </div>
          </div>
        </div>
      </div>
      <div id="head" className="animate__animated animate__fadeInDown w-[85vw] justify-between h-[15vh] flex border-b">
        <h1 className={"flex px-10 items-center h-full text-3xl text-red-600 font-bold"}>
          {usName}'s Diary
        </h1>
        <div className="flex items-center h-full">
          <div className={'relative inline-block mr-5 ' + (search ? 'hidden' : '')}>
            <button disabled={disabled} onClick={toggleDropdown} className={"py-4 disabled:hover:scale-100 disabled:hover:bg-slate-800 disabled:opacity-50 w-32 hover:bg-slate-700 transition-all duration-300 font-semibold flex gap-1 items-center justify-center bg-slate-800 text-white " + (isOpen ? 'border-t border-r border-l rounded-t-3xl' : 'rounded-3xl  border hover:scale-110')}>
              <span className="material-symbols-outlined no-fill">filter_alt</span>
              {filter_text}
            </button>
            {isOpen && (
              <div className={"absolute w-32 transition-all duration-300 flex flex-col bg-slate-800 gap-3 border-b border-l border-r rounded-b-xl"}>
                <a onClick={() => {
                  setFilter_text('All')
                  setSort_text('Sort')
                  setIsOpen(false)
                  fetchDiaryEntries()
                }} className='p-2 text-white hover:bg-slate-600 cursor-pointer'>All</a>
                <a onClick={() => {
                  setFilter_text('General')
                  setSort_text('Sort')
                  setIsOpen(false)
                  fetchDiaryEntries('/api/filter/general')
                }} className='p-2 text-white hover:bg-slate-600 cursor-pointer'>General</a>
                <a onClick={() => {
                  setFilter_text('Favourites')
                  setSort_text('Sort')
                  setIsOpen(false)
                  fetchDiaryEntries('/api/filter/favourites')
                }} className='p-2 text-white hover:bg-slate-600 cursor-pointer rounded-b-xl'>Favourites</a>
              </div>
            )}
          </div>
          <div className={'relative inline-block mr-5 ' + (search ? 'hidden' : '')}>
            <button onClick={toggleDropdown2} disabled={disabled || (entries.length < 2)} className={"py-4 disabled:hover:scale-100 disabled:hover:bg-slate-800 disabled:opacity-50 w-32 hover:bg-slate-700 transition-all duration-300 font-semibold flex gap-1 items-center justify-center bg-slate-800 text-white " + (isOpen2 ? 'border-t border-r border-l rounded-t-3xl' : 'rounded-3xl  border hover:scale-110')}>
              <span className="material-symbols-outlined">sort</span>
              {sort_text}
            </button>
            {isOpen2 && (
              <div className={"absolute w-32 transition-all duration-300 flex flex-col bg-slate-800 gap-3 border-b border-l border-r rounded-b-xl"}>
                <a onClick={() => {
                  setSort_text('Ascending')
                  setIsOpen2(false)
                  if (filter_text === 'Favourites') {
                    fetchDiaryEntries('/api/filter/favourites/asc')
                  } else if (filter_text === 'General') {
                    fetchDiaryEntries('/api/filter/general/asc')
                  } else {
                    fetchDiaryEntries('/api/sort/asc')
                  }
                }} className='p-2 text-white hover:bg-slate-600 cursor-pointer'>Ascending</a>
                <a onClick={() => {
                  setSort_text('Descending')
                  setIsOpen2(false)
                  if (filter_text === 'Favourites') {
                    fetchDiaryEntries('/api/filter/favourites/dec')
                  } else if (filter_text === 'General') {
                    fetchDiaryEntries('/api/filter/general/dec')
                  } else {
                    fetchDiaryEntries('/api/sort/dec')
                  }
                }} className='p-2 text-white hover:bg-slate-600 cursor-pointer rounded-b-xl'>Descending</a>
              </div>
            )}
          </div>
          <div id={'search'} className={'mr-10 flex'}>
            <button onClick={() => {
              setSearch(!search)
            }} className="disabled:opacity-50 disabled:hover:text-white hover:text-cyan-500 disabled:cursor-not-allowed cursor-pointer" disabled={disabled}><span className="mr-5 material-symbols-outlined scale-125 transition-all duration-300">search</span></button>
            <input type="text" placeholder="Search..." onKeyUp={() => { searchEn() }} ref={svalue} className={out + "animate__animated animate__fadeInRight font-semibold exo-2 border-b-2 focus:hover:opacity-100 focus:text-cyan-500 focus:border-b-cyan-500 focus:placeholder-cyan-500 transition-all duration-300 text-lg w-[30vw] hover:opacity-50 bg-transparent" + (search ? '' : ' hidden')} />
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex h-[75vh] items-center justify-center">
          <span className="material-symbols-lg mx-auto my-auto animate-spin">
            progress_activity
          </span>
        </div>
      )}
      {!loading && entries.length === 0 && (
        <div className="flex flex-col h-[70vh] items-center gap-3 justify-center">
          <lord-icon
            src="https://cdn.lordicon.com/hjbrplwk.json"
            trigger="in"
            delay="500"
            state="in-reveal"
            style={{ width: 150, height: 150 }}
          ></lord-icon>
          <h2 className="text-4xl mt-5 font-bold">No Entries</h2>
          <p className="text-xl text-slate-400">Create an entry to view it here.</p>
        </div>
      )}
      {!loading && entries.length > 0 && (
        <>
          <div className="min-h-[55vh] w-full my-5 flex items-center flex-col gap-6">
            {viewEn.map((item, idx) => (
              <div
                key={idx}
                className={`flex px-6 animate__animated animate__fadeInLeft py-3 text-xl justify-between items-center font-semibold rounded-xl border border-transparent hover:border-slate-600 w-[50%] ` + (item.selected ? (item.starred ? 'bg-orange-600' : 'bg-slate-700') : 'bg-gradient-to-tr ' + (item.starred ? 'from-red-900 to-red-500' : 'from-slate-900 to-slate-800'))}
                onClick={() => handleClick(idx)}
              >
                {item.title}
                <div>
                  <abbr title="Open"><span className={item.selected ? 'material-symbols-outlined transition-all duration-300 hover:bg-slate-600 rounded-full p-2 cursor-pointer' : 'hidden'} onClick={() => {
                    displayEntry(item.title, item.content, item.created_at, item.starred)
                    setOut('')
                  }}>publish</span></abbr>
                  <abbr title="Delete"><span className={item.selected ? 'material-symbols-outlined transition-all duration-300 hover:bg-slate-600 rounded-full p-2 cursor-pointer' : 'hidden'} onClick={() => { del(item.en_id, item.title) }}>delete</span></abbr>
                  <abbr title="Edit"><span className={item.selected ? 'material-symbols-outlined transition-all duration-300 hover:bg-slate-600 rounded-full mr-2 p-2 cursor-pointer no-fill' : 'hidden'} onClick={() => { router.push(`/app/write/update?id=${item.en_id}`) }}>edit</span></abbr>
                  <span
                    onClick={() => { fav(item.en_id, item.starred, item.title) }}
                    className={!(item.starred) ? "material-symbols-outlined transition-all duration-300 hover:text-red-700 cursor-pointer" : "hidden"}
                  >
                    favorite
                  </span>
                  <span
                    onClick={() => { fav(item.en_id, item.starred, item.title) }}
                    className={item.starred ? "material-symbols-outlined transition-all duration-300 cursor-pointer" : "hidden"}
                  >
                    do_not_disturb_on
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className='w-[100%] flex items-center justify-center my-3'>
            <div className='flex items-center gap-9 justify-center p-4 border rounded-xl'>
              <button onClick={prev} disabled={counter === 1} className='disabled:opacity-50 disabled:hover:bg-cyan-500 rounded-3xl flex items-center justify-center bg-cyan-500 py-2 px-10 hover:bg-cyan-800 transition-all duration-300'>
                <span className="material-symbols-outlined">
                  arrow_back
                </span>
              </button>
              <span>{counter}/{total_pages}</span>
              <button onClick={next} disabled={index >= entries.length} className='disabled:opacity-50 disabled:hover:bg-cyan-500 rounded-3xl flex items-center justify-center bg-cyan-500 py-2 px-10 hover:bg-cyan-800 transition-all duration-300'>
                <span className="material-symbols-outlined">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </>
      )}
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
