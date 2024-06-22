import React from 'react'

export default function BookCard({props, handleAdd}) {
  return (
    <div className='col-span-1 p-4 bg-white pl-6 m-4 shadow-3xl	 py-8 rounded-md hover:bg-pink hover:border-rose-900 hover:text-white hover:drop-shadow-2xl ' >
      <h2 className='text-xl font-bold '><strong>{props.name}</strong></h2>
      <h2 className='text-sm mt-2 font-semibold '>{props.author}</h2>
      <h2 className='text-xs mt-5'>{props.publisher}</h2>
      <h2 className='text-xs mt-2'>Publish date : {props.date ? props.date : "None"}</h2>
      <h2 className='text-xs mt-2'>Type : {props.genre}</h2>
      <button className='border-2 border-pink shadow-xl px-4 rounded-md text-black font-semibold py-1 mt-5 hover:bg-[#e4bcbc] bg-white' 
      onClick={() => handleAdd({props})}         
      aria-label={`Add ${props.title} to my Library`}
      >ADD to My Bookshelf</button>
    </div>
  )
}
