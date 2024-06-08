import React from 'react'

export default function BookCard({props, handleAdd}) {
  return (
    <div className='col-span-1 p-4 pl-6 my-8 bg-sandybrown border-rose-950 m-4 shadow-2xl	 py-8 rounded-md hover:bg-pink hover:border-rose-900 hover:text-white hover:drop-shadow-2xl ' >
      <h2 className='text-xl font-bold '><strong>{props.title}</strong></h2>
      <h2 className='text-sm  font-semibold '>{props.author_name[0]}</h2>
      <h2 className='text-xs mt-5'>{props.publisher[0]}</h2>
      <button className='border-2 border-pink shadow-xl bg-white px-4 rounded-md text-black font-semibold py-1 mt-5 ' 
      onClick={() => handleAdd({props})}         
      aria-label={`Add ${props.title} to my Library`}
      >ADD to my Library</button>
    </div>
  )
}
