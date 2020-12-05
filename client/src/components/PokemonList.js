import React, { useEffect, useState } from 'react'
// import Test from './test'
import PokemonCard from './PokemonCard'

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([])
  useEffect(() => {
    fetch('http://localhost:4242/pokemons')
      .then((response) => response.json())
      .then((data) => {
        for (const element of data.data) {
          setPokemonList(pokemonList => pokemonList.concat(element))
        }
      })
  }, [])
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
          <article className="overflow-hidden rounded-lg shadow-lg">
              {pokemonList.map((element) => <PokemonCard key={parseInt(element.numero)} id={element.numero} name={element.nom} url={element.url} />)}
          </article>
        </div>
      </div>
    </div>
  )
}

export default PokemonList
