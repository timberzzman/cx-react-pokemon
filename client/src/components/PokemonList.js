import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:4242/pokemons')
      .then((res) => {
        setPokemonList(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  })
  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            {pokemonList.map(function (pokemon, index) {
              console.log(`index: ${index} | N° pokemon: ${pokemon.numero}`)
              const pokemonId = pokemon.numero
              return <PokemonCard key={index} id={pokemonId} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default PokemonList
