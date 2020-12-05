import React from 'react'
import propTypes from 'prop-types'

function PokemonCard(props) {
  return (
    <div>
        <img alt="Image pokemon" className="block h-auto w-full" src={props.url} />
        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a className="no-underline hover:underline text-black">{props.name}</a>
          </h1>
          <p className="text-grey-darker text-sm">N°{props.id}</p>
        </header>
    </div>
  )
}

PokemonCard.propTypes = {
  id: propTypes.string,
  name: propTypes.string,
  url: propTypes.string
}

export default PokemonCard
