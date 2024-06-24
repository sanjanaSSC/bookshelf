import React, {  useContext, useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../component/SearchBar';
import BookCard from '../component/BookCard';
import { Link } from 'react-router-dom';
import { PersonalBooksContext } from '../App';
import shelf from '../img/shelf2.jpg'
import bookImg from '../img/storytelling (1).png'
import {filteredOptionAtom, genreFilterAtom, publisherFilterAtom, savedBooksAtom} from "../store/SavedBooksAtom"
import {useRecoilState, useSetRecoilState} from "recoil"
import NavBar from '../component/NavBar';
import Filter from '../component/Filter';




export default function Home() {

    const[books, setBooks] = useState([]);
    const[originalData, setOriginalData] = useState([]);
    const[searchTerm, setSearchTerm] = useState("");
    const setSavedBooks = useSetRecoilState(savedBooksAtom);
    const [isLoading, setIsloading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(1);
    const [filteredOptions, setFilteredOptions] = useRecoilState(filteredOptionAtom)
    const [genreFilter, setGenreFilter] = useRecoilState(genreFilterAtom)
    const [publisherFilter, setPublisherFilter] = useRecoilState(publisherFilterAtom)
    const [filteredBooks, setFilteredBooks] = useState([]);  // Assuming you want to store the filtered books


    const itemsPerPage = 6;

    const startIndex = (currentIndex - 1) * itemsPerPage;
    const totalPages = Math.ceil(books.length / itemsPerPage);


    async function getData(){
        try{
            const res = await axios.get('http://localhost:5000/users/books')
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
        // setBooks(books);
        getData();
    }, [])


    useEffect(() => {
        const filterBooks = () => {
            let filtered = originalData;

            if (searchTerm) {
                filtered = filtered.filter(book =>
                    book.name.toLowerCase().startsWith(searchTerm.trim().toLowerCase())
                );
            }

            // if (filteredOptions.length > 0) {
            //     filtered = filtered.filter(book =>
            //         filteredOptions.some(eachGenre =>
            //             eachGenre.toLowerCase() === book.genre.trim().toLowerCase()
            //         )
            //     );
            // }

            if (genreFilter.length > 0 && publisherFilter.length > 0) {
                filtered = originalData.filter(book =>
                    genreFilter.some(genre => genre.toLowerCase() === book.genre.trim().toLowerCase()) &&
                    publisherFilter.some(publisher => publisher.toLowerCase() === book.publisher.trim().toLowerCase())
                );
            } else if (genreFilter.length > 0) {
                filtered = originalData.filter(book =>
                    genreFilter.some(genre => genre.toLowerCase() === book.genre.trim().toLowerCase())
                );
            } else if (publisherFilter.length > 0) {
                filtered = originalData.filter(book =>
                    publisherFilter.some(publisher => publisher.toLowerCase() === book.publisher.trim().toLowerCase())
                );
            }

            setFilteredBooks(filtered);
            setBooks(filtered); // Update the main books state for pagination
            setIsloading(false);
        };

        filterBooks();
    }, [searchTerm, genreFilter, publisherFilter, originalData]);

    const currentBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage)
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
                <div className='flex '>
                    <SearchBar setSearchTerm={setSearchTerm}/>
                    <Filter/>
                </div>
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