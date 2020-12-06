import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import LoadingScreen from './loadingScreen'
import '../App.css'
import '../tailwind.output.css'

function PokemonList() {
  const [isLoaded, setLoaded] = useState(false)
  const [pokemonList, setPokemonList] = useState([])
  useEffect(() => {
    fetch('http://localhost:4242/pokemons')
      .then((response) => response.json())
      .then((data) => {
        for (const element of data.data) {
          setPokemonList(pokemonList => pokemonList.concat(element))
        }
        setLoaded(true)
      })
  }, [])
  if (isLoaded) {
    return (
      <div className="my-12 mx-auto">
        <div className="flex flex-raw mx-1">
          <div className="grid grid-cols-5 my-1 px-1 w-full">
                {pokemonList.map((element) => <PokemonCard key={parseInt(element.numero)} id={element.numero} name={element.nom} url={element.url} />)}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
}

export default PokemonList
