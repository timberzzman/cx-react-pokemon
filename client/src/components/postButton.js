import React from 'react'
import '../App.css'
import '../tailwind.output.css'

function postButton() {
  return (
        <a href="/pokemon/create">
            <button className="mx-2 px-5 py-3 focus:outline-none focus:ring-0 shadow-md border-solid rounded-lg hover:shadow-inner bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-500">
                Add a pokemon
            </button>
        </a>
  )
}

export default postButton
