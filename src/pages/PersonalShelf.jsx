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
            <button><img src={home} alt="" className=' m-3 ml-1 md:m-4 lg:m-4 md:ml-10 lg:ml-10'/></button>
          </Link>
            <h2 className='txt-xl md:text-3xl lg:text-3xl bg-white ml-0 flex justify-center text-pink mt-2'><strong>MY BOOKSHELF</strong></h2>
        </div>
       
        <button className="text-sm md:text-md lg:text-md text-white py-1 font-medium rounded-md px-3  bg-pink" onClick={()=>{
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
                  <div  className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 pl-8 bg-white  border-pink m-4 shadow-2xl	 py-8 rounded-md ' >
                    <div className='mr-14'>
                      <h2  className='text-2xl font-bold text-pink '><strong>{book.title}</strong></h2>
                      <h2  className='text-xl font-semibold '>{book.author}</h2>
                    </div>
                    <div className='col-span-1 grid md:grid-cols-2 lg:grid-cols-2  '>
                      <div className='md:col-span-1 lg:col-span-1 w-full'>
                        <h2 className='text-sm mt-2 font-medium'><strong>Publisher :</strong> {book.publisher}</h2>
                        <h2 className='text-sm mt-2 font-medium'><strong>Publish Date :</strong> {book.date}</h2>                 
                      </div>
                      <div  className='md:col-span-1 lg:col-span-1 md:ml-28 lg:ml-40 w-full'>
                        <h2 className='text-sm mt-2 font-medium'><strong>Type: </strong>{book.type}</h2>
                        <h2 className='text-sm mt-2 font-medium'><strong>Subject: </strong>{book.subject1} {book.subject2}</h2>
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
          <h2 className='text-3xl md:text-5xl lg:text-5xl mt-12 text-black bg-white px-3 py-2  font-bold border-black'><em>NO BOOKS TO READ!</em></h2>
        </div>
        }
      </div>
      </div>
    
    </div>
  )
}
