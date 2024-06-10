import React, {  useContext, useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../component/SearchBar';
import BookCard from '../component/BookCard';
import { Link } from 'react-router-dom';
import { PersonalBooksContext } from '../App';
import shelf from '../img/shelf2.jpg'
import bookImg from '../img/storytelling (1).png'
import {savedBooksAtom} from "../store/SavedBooksAtom"
import {useSetRecoilState} from "recoil"




export default function Home() {

    const[books, setBooks] = useState([]);
    const[originalData, setOriginalData] = useState([]);
    const[searchTerm, setSearchTerm] = useState("");
    // const [personalBooks, setPersonalBooks] = useContext(PersonalBooksContext);
    const setSavedBooks = useSetRecoilState(savedBooksAtom);
    const [isLoading, setIsloading] = useState(true)



    async function getData(){
        try{
            const res = await axios.get('https://openlibrary.org/search.json?q=YOUR_QUERY&limit=10&page=1')
            console.log(res.data.docs,"data");
            setBooks(res.data.docs)
            setOriginalData(res.data.docs)
            setIsloading(false)
            // console.log(setBooks)
        }catch(err){
            console.log(err);
        }
        
    }

    useEffect(() => {
        setIsloading(true)
        setBooks(books);
    }, [])

    useEffect(() => {
         if(searchTerm === ""){
            setIsloading(true)
            getData();
        }else{
            const bookData = originalData.filter(book => book.title.toLowerCase().startsWith(searchTerm.trim().toLowerCase()));
            setBooks(bookData);
        }
        
    }, [searchTerm])

  

    function handleAdd({props}){
        const newBook = {
            title:props.title,
            author:props.author_name[0],
            publisher: props.publisher[0],
            date: props.publish_date,
            type: props.type,
            subject1 : props.subject_facet ? props.subject_facet[0] : "",
            subject2 : props.subject_facet ? props.subject_facet[1] : "",
            edition_key: props.edition_key
        }
        let alreadyPresentBook = []
        if(JSON.parse(localStorage.getItem("personalBooks")) != null){
            alreadyPresentBook = JSON.parse(localStorage.getItem("personalBooks"));
        }
        const bookFound = alreadyPresentBook.filter((eachBook) => eachBook.edition_key[0] == newBook.edition_key)
        console.log(newBook.edition_key,"key")
        console.log(alreadyPresentBook,"present")
        console.log(bookFound,"found")
        if(bookFound.length > 0){
          alert(`Book is already present in bookshelf`) 
        }
        else{


        setSavedBooks((prevBooks) => {

            localStorage.setItem("personalBooks", JSON.stringify([...prevBooks, newBook]) );
            
            return [...prevBooks, newBook]
            
            })

        alert(`Added ${props.title} to your Library`);
        }

    }

  return (
    <div className=''>
        <div className='flex flex-col md:pr-20  md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 '>
            <div className='md:col-span-1 lg:col-span-1 '>
                <div className='h-[50vh] md:inline md:fixed md:h-full lg:inline	lg:fixed lg:h-full pt-40 w-full md:w-[32%] lg:w-[32%]' style={{backgroundImage:`url(${shelf})`}}>
                <Link to='/self'>
                    <button className='px-4 py-3 w-3/4 bg-white ml-8 text-rose-950 font-bold rounded-md shadow-lg hover:border-white flex items-center justify-center gap-3 hover:scale-105 hover:shadow-lg hover:bg-pink hover:text-white transition-all duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-pink-600'>
                        <img src={bookImg} alt="Book" className='w-6 h-6'/>
                        <h2 className='text-2xl'>MY BOOKSHELF</h2>
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
                            {
                                (isLoading == true) ? 
                                <div class="flex justify-center items-center my-5">
                                    <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-gray-900"></div>
                                </div>
                                :
                                <h2 className='text-4xl mt-12 text-rose-950'><em>NO BOOKS FOUND!</em></h2>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}