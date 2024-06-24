import React, { useRef } from 'react'
import bookImg from '../img/book-stack.png'


export default function SearchBar({setSearchTerm}) {
  const inputRef = useRef(null);

  function handleInput(){
    if (inputRef.current) {
      inputRef.current.focus();
    }  }

  return (
    // <div className='relative col-span-2'>
    //   <input type="text" name="" id="" 
    //   ref={inputRef}
    //   onChange={(e)=>{setSearchTerm(e.target.value)}}
    //   placeholder='Search for your favorite books here!'
    //   className='mx-3 md:m-4 lg:m-4 w-[97%] text-xs  rounded-3xl h-[50px]  border-gray-300 shadow-xl active:border-gray-100 px-12'
    //   />
    //   <img src={bookImg} alt="" className='absolute top-3 md:top-8   lg:top-8 left-7 md:left-8 lg:left-8 cursor-pointer'  onClick={handleInput}/>
    // </div>
    <div className="flex justify-end">
    <div className="relative">
        <input type="text" 
        placeholder="Search..." 
        className="lg:w-[40vw] md:w-48 sm:w-32 h-10 pl-4 pr-10 mr-4 rounded-full border-2 border-gray-300 focus:outline-none focus:border-rose-950 focus:ring-2 focus:ring-rose-200 transition duration-300"
        ref={inputRef}
        onChange={(e)=>{setSearchTerm(e.target.value)}}
        />
        <button className="absolute right-0 top-0 mt-1 mr-6 w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-800 text-white flex items-center justify-center transition duration-300" onClick={handleInput} >
             <img src={bookImg} alt=""/>
        </button>
    </div>
</div>



  )
}
