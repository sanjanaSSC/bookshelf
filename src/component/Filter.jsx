import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { filteredOptionAtom, genreFilterAtom, publisherFilterAtom } from '../store/SavedBooksAtom';

export default function Filter() {
    const[isDropDown, setIsDropDown] = useState(false);
    const[filteredOptions, setFilteredOptions] = useRecoilState(filteredOptionAtom);
    const [genreFilter, setGenreFilter] = useRecoilState(genreFilterAtom)
    const [publisherFilter, setPublisherFilter] = useRecoilState(publisherFilterAtom)

    function handleDropDown(){
        setIsDropDown(prev => !prev)
    }

    function handleGenreFilter(e){
        const {name, checked} = e.target;
        if(checked === true){
            setGenreFilter(prev => ([...prev, name]))
        }else{
            const filteredArray = genreFilter.filter((eachFilter) => eachFilter !== name)
            setGenreFilter(filteredArray);
        }
        console.log(genreFilter)
    }

    function handlePublisherFilter(e){
        const {name, checked} = e.target;
        if(checked === true){
            setPublisherFilter(prev => ([...prev, name]))
        }else{
            const filteredArray = publisherFilter.filter((eachFilter) => eachFilter !== name)
            setPublisherFilter(filteredArray);
        }
        console.log(publisherFilter)
    }



  return (
    <div className='z-10 absolute bg-white left-[48vw] '>
      <button className='p-2 rounded-none' onClick={handleDropDown}>Filter</button>
       { isDropDown &&
       <div className='flex shadow-inner px-5'>
            <div>
                <h2 className='p-3 m-2 rounded-none'>Genre</h2>
                <ul>
                    <li className="m-1">
                        <input type="checkbox" className="mt-1" name="Fantacy" id="" onChange={(e) => handleGenreFilter(e)} />
                        <label className="ml-2">Fantacy</label>
                    </li>
                    <li className="m-1">
                        <input type="checkbox" className="mt-1" name="Sci-Fi" id="" onChange={(e) => handleGenreFilter(e)}  />
                        <label className="ml-2">Sci-Fi</label>
                    </li>
                    <li className="m-1">
                        <input type="checkbox" className="mt-1" name="Horror" id="" onChange={(e) => handleGenreFilter(e)}  />
                        <label className="ml-2">Horror</label>
                    </li>
                    <li  className="m-1">
                        <input type="checkbox" className='mt-1' name="Romance" id="" onChange={(e) => handleGenreFilter(e)}  />
                        <label className="ml-2">Romance</label>
                    </li>
                    <li className="m-1">
                        <input type="checkbox" className="mt-1" name="Thriller" id="" onChange={(e) => handleGenreFilter(e)}  />
                        <label className="ml-2">Thriller</label>
                    </li>
                    <li className="m-1">
                        <input type="checkbox" className="mt-1" name="Self-Help" id="" onChange={(e) => handleGenreFilter(e)}  />
                        <label className="ml-2">Self Help</label>
                    </li>
                    <li className="m-1">
                        <input type="checkbox" className="mt-1" name="Autobiography" id="" onChange={(e) => handleGenreFilter(e)}  />
                        <label className="ml-2">Autobiography</label>
                    </li>
                    <li className="m-1">
                        <input type="checkbox" className="mt-1" name="History" id="" onChange={(e) => handleGenreFilter(e)}  />
                        <label className="ml-2">History</label>
                    </li>
                    <li className="m-1">
                        <input type="checkbox" className="mt-1" name="Philosophy" id="" onChange={(e) => handleGenreFilter(e)}  />
                        <label className="ml-2">Philosophy</label>
                    </li>
                    <li className="m-1">
                        <input type="checkbox" className="mt-1" name="Young Adult" id="" onChange={(e) => handleGenreFilter(e)}  />
                        <label className="ml-2">Young Adult</label>
                    </li>
                    <li className="m-1">
                        <input type="checkbox" className="mt-1" name="Health and Wellness" id="" onChange={(e) => handleGenreFilter(e)}  />
                        <label className="ml-2">Health and Wellness</label>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className='p-3 m-2 rounded-none'>Author</h2>
                <ul>
                <li className="m-1">
                        <input type="checkbox" className="mt-1" name="Doubleday" id="" onChange={(e) => handlePublisherFilter(e)} />
                        <label className="ml-2">Doubleday</label>
                    </li>
                </ul>
            </div>
        </div>
        }
    </div>
  )
}
