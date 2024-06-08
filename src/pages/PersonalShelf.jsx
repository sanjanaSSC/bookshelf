import React, { useContext } from 'react'
import { PersonalBooksContext } from '../App'
import BookCard from '../component/BookCard';
import shelf from '../img/pshelf.jpg'
import home from '../img/home.png'
import { Link } from 'react-router-dom';


export default function PersonalShelf() {
  const [personalBooks, setPersonalBooks] = useContext(PersonalBooksContext);
  console.log(personalBooks,"books")

  return (
    <div className='pb-20 bg-sandybrown h-full'>
      <div className='flex flex-row-reverse md:flex-row lg:flex-row py-3 fixed w-full bg-white border-b-2 border-b-black'>
        <Link to='/'><button><img src={home} alt="" className=' m-4 ml-10'/></button></Link>
        <h2 className='text-3xl bg-white ml-0 flex justify-center text-pink mt-2'><strong>MY BOOKSHELF</strong></h2>
      </div>
      <div style={{backgroundImage:`url(${shelf})`}} className='w-full h-[70vh]'></div>
      <div className='mx-8 md:mx-20 lg:mx-20 mt-10'>
        {personalBooks.length > 0 ?
        <div>
          <div className='flex flex-col '>
          {personalBooks.map((book, index) => {
            return (
              <div key={index}>
                  <div  className='p-4 bg-white  border-pink m-4 shadow-2xl	 py-16 rounded-md ' >
                    <h2  className='text-2xl font-bold text-pink flex justify-center'><strong>{book.title}</strong></h2>
                    <h2  className='text-xl font-semibold flex justify-center'>{book.author}</h2>
                  </div>
              </div>
            )
          })}
          </div>
          <div className='flex justify-center'>
              <h2 className='text-4xl mt-12 text-rose-950'><em>THE END!</em></h2>
          </div>  
        </div>
        :
        <div className='flex justify-center'>
          <h2 className='text-4xl mt-12 text-rose-950'><em>NO BOOKS TO READ!</em></h2>
        </div>
        }
      </div>
    </div>
  )
}
