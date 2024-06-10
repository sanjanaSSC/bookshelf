import React from 'react'

export default function BookCard({props, handleAdd}) {
  return (
    <div className='col-span-1 p-4 pl-6 my-8 bg-sandybrown border-rose-950 md:m-4 lg:m-4 shadow-2xl	 py-8 rounded-md hover:bg-pink hover:border-rose-900 hover:text-white hover:drop-shadow-2xl ' >
      <h2 className='text-xl font-bold '><strong>{props.title}</strong></h2>
      <h2 className='text-sm mt-2 font-semibold '>{props.author_name[0]}</h2>
      <h2 className='text-xs mt-5'>{props.publisher[0]}</h2>
      <h2 className='text-xs mt-2'>Publish date : {props.publish_date}</h2>
      <h2 className='text-xs mt-2'>Type : {props.type}</h2>
      <h2 className='text-xs mt-2'>{props.subject_facet ? props.subject_facet[0] : ""}  {props.subject_facet ? props.subject_facet[1] : ""}</h2>
      <button className='border-2 border-pink shadow-xl bg-white px-4 rounded-md text-black font-semibold py-1 mt-5 hover:bg-[#f1dfdf]' 
      onClick={() => handleAdd({props})}         
      aria-label={`Add ${props.title} to my Library`}
      >ADD to My Bookshelf</button>
    </div>
  )
}
