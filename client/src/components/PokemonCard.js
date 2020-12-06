import React from 'react'
import propTypes from 'prop-types'
import '../App.css'
import '../tailwind.output.css'

function PokemonCard(props) {
  return (
    <div>
      <article className="overflow-hidden rounded-lg shadow-lg hover:shadow-inner hover:bg-gray-100 px-16 py-16 mx-8 my-8">
        <a href={`http://localhost:3000/pokemon/${props.id}`}>
        <img alt="Image pokemon" className="block h-auto w-full" src={props.url} />
        </a>
        <header className="flex justify-start leading-tight p-2">
          <h1 className="text-lg">
            <a className="no-underline hover:underline text-black" href={`http://localhost:3000/pokemon/${props.id}`}>{props.name}</a>
            <p className="absolute right text-grey-darker text-sm">N°{props.id}</p>
          </h1>
        </header>
      </article>
    </div>
  )
}

PokemonCard.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  url: propTypes.string
}

export default PokemonCard
