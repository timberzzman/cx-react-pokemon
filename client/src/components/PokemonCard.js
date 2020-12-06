import React from 'react'
import propTypes from 'prop-types'
import '../App.css'
import '../tailwind.output.css'

function PokemonCard(props) {
  return (
    <div className="cursor-pointer bg-gray-100 overflow-hidden rounded-lg shadow-lg hover:shadow-inner hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-500 dark:hover:shadow-inner px-16 py-16 mx-8 my-8"
    onClick={() => { window.location.href = `/pokemon/${props.id}` }}>
      <div>
        <a href={`/pokemon/${props.id}`}>
          <img alt="Image pokemon" className="block h-auto w-full" src={props.url} />
        </a>
      </div>
      <div className="text-center">
        <h1><a className="no-underline hover:underline" href={`/pokemon/${props.id}`}>{props.name}</a></h1>
        <p className="text-grey-darker text-sm">N°{props.id}</p>
      </div>
    </div>
  )
}

PokemonCard.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  url: propTypes.string
}

export default PokemonCard
