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
import NavBar from '../component/NavBar';




export default function Home() {

    const[books, setBooks] = useState([]);
    const[originalData, setOriginalData] = useState([]);
    const[searchTerm, setSearchTerm] = useState("");
    // const [personalBooks, setPersonalBooks] = useContext(PersonalBooksContext);
    const setSavedBooks = useSetRecoilState(savedBooksAtom);
    const [isLoading, setIsloading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(1);

    const itemsPerPage = 6;

    const startIndex = (currentIndex - 1) * itemsPerPage;
    const totalPages = Math.ceil(books.length / itemsPerPage);


    async function getData(){
        try{
            const res = await axios.get('http://localhost:3000/books')
            console.log(res.data.books,"data");
            setBooks(res.data.books)
            setOriginalData(res.data.books)
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
            const bookData = originalData.filter(book => book.name.toLowerCase().startsWith(searchTerm.trim().toLowerCase()));
            setBooks(bookData);
        }
        
    }, [searchTerm])

    const currentBooks = books.slice(startIndex, startIndex + itemsPerPage)
    console.log(currentBooks,"curr")

    const handleClick = (page) => {
        setCurrentIndex(page);
      };

    function handleAdd({props}){
        const newBook = {
            name:props.name,
            author:props.author,
            publisher: props.publisher,
            date: props.date,
            genre: props.genre,
            id: props.id
        }
        let alreadyPresentBook = []
        if(JSON.parse(localStorage.getItem("personalBooks")) != null){
            alreadyPresentBook = JSON.parse(localStorage.getItem("personalBooks"));
        }
        const bookFound = alreadyPresentBook.filter((eachBook) => eachBook.id == newBook.id)
        console.log(newBook.id,"key")
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

        alert(`Added ${props.name} to your Library`);
        }

    }

    const handleNavigation = () => {
        // Reset scroll position to the top of the page
        window.scrollTo(0, 0);
    };

  return (
        <div className='bg-beige overflow-x-hidden'>
            <NavBar/>
            <div className='mx-20 py-20'>
                <SearchBar setSearchTerm={setSearchTerm}/>
                <div className=''>
                    {currentBooks.length > 0 ? 
                        <div className=''>
                            <div  className='grid grid-cols-3 gap-4 mt-6'>{currentBooks.map((book, index) => {
                            return(
                                    <div className='col-span-1'>
                                        <BookCard key={index} props={book} handleAdd={handleAdd}/>
                                    </div>
                                )
                            })}
                            </div>   
                            <div  className='flex justify-center'>
                                {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleClick(index + 1)}
                                    disabled={currentIndex === index + 1}
                                    className='rounded-full p-1 px-2 m-1 border-2 border-pink text-pink font-bold hover:bg-white '
                                >
                                    {index + 1}
                                </button>
                                ))}
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
                                <h2 className='text-2xl md:text-4xl lg:text-4xl mt-12 text-rose-950'><em>NO BOOKS FOUND!</em></h2>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
  )
}