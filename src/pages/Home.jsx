import React, {  useContext, useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../component/SearchBar';
import BookCard from '../component/BookCard';
import { Link } from 'react-router-dom';
import { PersonalBooksContext } from '../App';
import shelf from '../img/shelf2.jpg'
import bookImg from '../img/storytelling (1).png'



export default function Home() {

    const[books, setBooks] = useState([]);
    const[originalData, setOriginalData] = useState([]);
    const[searchTerm, setSearchTerm] = useState("");
    const [personalBooks, setPersonalBooks] = useContext(PersonalBooksContext);




    async function getData(){
        try{
            const res = await axios.get('https://openlibrary.org/search.json?q=YOUR_QUERY&limit=10&page=1')
            console.log(res.data.docs,"data");
            setBooks(res.data.docs)
            setOriginalData(res.data.docs)
            // console.log(setBooks)
        }catch(err){
            console.log(err);
        }
        
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
         if(searchTerm === ""){
            setBooks([]);
        }else{
            const bookData = originalData.filter(book => book.title.toLowerCase().startsWith(searchTerm.trim().toLowerCase()));
            setBooks(bookData);
        }
        
    }, [searchTerm])

    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem('personalBooks'));
        if (savedBooks) {
            setPersonalBooks(savedBooks);
        }
    }, [setPersonalBooks]);

    useEffect(() => {
        localStorage.setItem('personalBooks', JSON.stringify(personalBooks));
    }, [personalBooks]);

    function handleAdd({props}){
        const newBook = {
            title:props.title,
            author:props.author_name[0]
        }
        setPersonalBooks(prevBooks => {
            const updatedBooks = [...prevBooks, newBook];
            localStorage.setItem('personalBooks', JSON.stringify(updatedBooks)); // Save to localStorage
            return updatedBooks;
        });
        alert(`Added ${props.title} to your Library`);
        console.log(personalBooks);
    
    }

  return (
    <div className=''>
        <div className='flex flex-col md:pr-20  md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 '>
            <div className='md:col-span-1 lg:col-span-1 '>
                <div className='h-[50vh] md:inline md:fixed md:h-full lg:inline	lg:fixed lg:h-full pt-40 w-full md:w-[32%] lg:w-[32%]' style={{backgroundImage:`url(${shelf})`}}>
                    <Link to='/self'>
                        <button className='px-3 py-3 w-3/4 bg-white ml-8 text-rose-950 font-bold rounded-md  flex hover:scale-105 hover:shadow-inner hover:bg-pink hover:text-white 	transition-colors duration-400 ease-in-out	'> 
                            <img src={bookImg} alt="" />
                            <h2 className='ml-3 text-2xl'>MY BOOKSHELF</h2>
                        </button>
                    </Link>
                </div>
            </div>
            <div className='col-span-2 pb-20 pt-10 md:pl-20 pl-6 pr-6'>
                <SearchBar setSearchTerm={setSearchTerm}/>
                <div>
                    {books.length > 0 ? 
                        <div>
                            <div  className=' mt-6'>{books.map((book, index) => {
                            return(
                                <div>
                                    <div className='ml-4 mr-8 md:m-0'>
                                        <BookCard key={index} props={book} handleAdd={handleAdd}/>
                                    </div>
                                </div>
                                )
                            })}</div>
                            <div className='flex justify-center'>
                                <h2 className='text-4xl mt-12 text-rose-950'><em>THE END!</em></h2>
                            </div>    
                        </div>
                        :
                        <div className='flex justify-center'>
                            <h2 className='text-4xl mt-12 text-rose-950'><em>{searchTerm ? "NO BOOKS FOUND!" : "FIND AMAZING BOOKS TO READ"}</em></h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
