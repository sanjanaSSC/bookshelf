import React, { useRef } from 'react'
import bookImg from '../img/book-stack.png'


export default function SearchBar({setSearchTerm}) {
  const inputRef = useRef(null);

  function handleInput(){
    if (inputRef.current) {
      inputRef.current.focus();
    }  }

  return (
    <div className='relative col-span-2'>
      <input type="text" name="" id="" 
      ref={inputRef}
      onChange={(e)=>{setSearchTerm(e.target.value)}}
      placeholder='Search for your favorite books here!'
      className='mx-8 md:m-4 lg:m-4 w-[82%] md:w-[95%] lg:w-[95%]  rounded-3xl h-[50px]  border-gray-300 shadow-xl active:border-gray-100 px-12'
      />
      <img src={bookImg} alt="" className='absolute top-2 md:top-8   lg:top-8 left-10 md:left-8 lg:left-8 cursor-pointer'  onClick={handleInput}/>
    </div>
  )
}
