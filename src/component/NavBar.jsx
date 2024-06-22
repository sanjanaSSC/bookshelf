import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil';
import { loggedInAtom } from '../store/SavedBooksAtom';

function ButtonLink({ path, name, className, handleClick }) {

    return (
        <Link to={path}>
            <button className={`rounded-md px-4 py-1 ${className}`} onClick={handleClick}>{name}</button>
        </Link>
    );
}
export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInAtom);

  function handleLogOut(){
    setIsLoggedIn(false);
  }

  return (
    <div className='flex justify-between pt-4 pb-1 bg-beige px-8'>
      <div>
        {(isLoggedIn) && 
        <div>
          <ButtonLink name="Home" path='/home' className="bg-beige text-pink font-bold"/>
          <ButtonLink name="Personal Shelf" path='/shelf' className="bg-beige text-pink font-bold"/>
        </div>
        }
      </div>
      <div>
        {(isLoggedIn) ?
        <div>
          <ButtonLink name="LogOut" path='/' className="bg-pink text-white mx-2 text-sm" handleClick={handleLogOut}/>
        </div>
        :
        <div>
          <ButtonLink name="Sign In" path='/signin' className="bg-pink text-white mx-2 text-sm"/>
          <ButtonLink name="Sign Up" path='/' className="bg-pink text-white mx-2 text-sm"/>
        </div>
        }
      </div>
    </div>
  )
}
