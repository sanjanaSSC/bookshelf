import React, { useContext, useEffect } from 'react'
import { PersonalBooksContext } from '../App'
import BookCard from '../component/BookCard';
import shelf from '../img/pshelf.jpg'
import home from '../img/home.png'
import { Link, useNavigate } from 'react-router-dom';
import {savedBooksAtom} from "../store/SavedBooksAtom"
import {useRecoilValue, useSetRecoilState} from "recoil"



export default function PersonalShelf() {
  // const [personalBooks, setPersonalBooks] = useContext(PersonalBooksContext);
  const navigate = useNavigate()

  let savedBooksLocalStorage = []
  if(JSON.parse(localStorage.getItem("personalBooks")) != null){
    savedBooksLocalStorage = JSON.parse(localStorage.getItem("personalBooks"));
    }
    
  const setSavedBooks = useSetRecoilState(savedBooksAtom);
  // console.log(personalBooks,"books")
  console.log(savedBooksLocalStorage,"ls")

  return (
    <div className='h-full  bg-sandybrown'>
      <div className='flex justify-between md:flex-row lg:flex-row py-3 px-3 fixed w-full bg-white border-b-2 border-b-black'>
        <div className='flex flex-row'>
          <Link to='/'>
            <button><img src={home} alt="" className=' m-4 ml-10 '/></button>
          </Link>
            <h2 className='text-3xl bg-white ml-0 flex justify-center text-pink mt-2'><strong>MY BOOKSHELF</strong></h2>
        </div>
       
        <button className="text-md text-white font-medium rounded px-3  bg-pink" onClick={()=>{
          localStorage.setItem("personalBooks",JSON.stringify([]))
          setSavedBooks([])
          navigate("/self",{replace:true})
          }}>Remove Books
        </button>
      </div>
      <div style={{backgroundImage:`url(${shelf})`}} className='w-full h-full pt-28 min-h-[100vh]'>
      <div className='mx-8 md:mx-20 lg:mx-20 '>
        {savedBooksLocalStorage.length > 0 ?
        <div>
          <div className='flex flex-col '>
          {savedBooksLocalStorage.map((book, index) => {
            return (
              <div key={index}>
                  <div  className='flex justify-between  px-8 bg-white  border-pink m-4 shadow-2xl	 py-8 rounded-md ' >
                    <div className='mr-14'>
                      <h2  className='text-2xl font-bold text-pink '><strong>{book.title}</strong></h2>
                      <h2  className='text-xl font-semibold '>{book.author}</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-28 lg:gap-28 '>
                      <div className='md:col-span-1 lg:col-span-1 flex flex-col justify-start'>
                        <h2 className='text-sm mt-2 font-medium'>Publisher : {book.publisher}</h2>
                        <h2 className='text-sm mt-2 font-medium'>Publish Date : {book.date}</h2>                 
                      </div>
                      <div  className='md:col-span-1 lg:col-span-1'>
                        <h2 className='text-sm mt-2 font-medium'>Type: {book.type}</h2>
                        <h2 className='text-sm mt-2 font-medium'>Subject: {book.subject1} {book.subject2}</h2>
                      </div>
                    </div>
                  </div>
              </div>
            )
          })}
          </div>
          <div className='flex justify-center'>
              <h2 className='text-5xl mt-12 text-white font-bold border-black mb-5'><em>THE END!</em></h2>
          </div>  
        </div>
        :
        <div className='flex justify-center'>
          <h2 className='text-5xl mt-12 text-black bg-white px-3 py-2  font-bold border-black'><em>NO BOOKS TO READ!</em></h2>
        </div>
        }
      </div>
      </div>
    
    </div>
  )
}
