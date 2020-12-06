import React from 'react'
import '../App.css'
import '../tailwind.output.css'

function postButton() {
  return (
      <button className="absolute top-5 right-16 px-2 py-1 outline-none shadow-md border-solid rounded-full hover:shadow-inner">
        <a href="http://localhost:3000/pokemon/create">Add a pokemon</a>
      </button>
  )
}

export default postButton
