import React, { createContext, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import PersonalShelf from './pages/PersonalShelf'
import Login from './pages/Login';


export const PersonalBooksContext = createContext();




export default function App() {
  const[personalBooks, setPersonalBooks] = useState([]);


  return (
    <div className=''>
      <PersonalBooksContext.Provider value={[personalBooks, setPersonalBooks]}>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/shelf' element={<PersonalShelf/>}/>
      </Routes>
      </PersonalBooksContext.Provider>
    </div>
  )
}

