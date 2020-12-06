import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import '../App.css'
import '../tailwind.output.css'
import { useParams } from 'react-router-dom'

function PokemonPage() {
  const { pokemonID } = useParams()
  const [isLoaded, setLoaded] = useState(false)
  const [pokemon, setPokemon] = useState({})

  useEffect(() => {
    fetch(`http://localhost:4242/pokemons/${pokemonID}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon((pokemon) => Object.assign(pokemon, data.data))
        setLoaded(true)
      })
  }, [])
  if (isLoaded) {
    return (
      <div>
        <div className="container my-12 mx-auto px-4">
          <a
            className="absolute left focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            href="http://localhost:3000/"
          >
            <FontAwesomeIcon icon={faLongArrowAltLeft} size="7x" />
          </a>
          <div className="mb-8 grid justify-items-center">
            <div className="grid grid-cols-2 justify-items-center">
              <h1 className="self-center text-4xl">{`#${pokemon.id} ${pokemon.names.french}`}</h1>
              <img src={pokemon.img} />
            </div>
          </div>
          <div>
            <h1 className="text-4xl">Identité</h1>
            <hr className="border-b-2 border-black my-6"></hr>
          </div>
          <div className="grid grid-cols-2">
            <table className="text-left w-5/5 mr-8">
              <thead className="bg-black opacity-25 flex text-white w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2 ">Pokémon</th>
                  <th className="p-4 w-1/2 ">{pokemon.names.french}</th>
                </tr>
              </thead>
              <thead className="bg-black opacity-25 flex text-white w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">NomFR</th>
                  <th className="p-4 w-1/2">{pokemon.names.french}</th>
                </tr>
              </thead>
              <thead className="bg-black opacity-25 flex text-white w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">NomEN</th>
                  <th className="p-4 w-1/2">{pokemon.names.english}</th>
                </tr>
              </thead>
              <thead className="bg-black opacity-25 flex text-white w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">NomJP</th>
                  <th className="p-4 w-1/2">{pokemon.names.japanese}</th>
                </tr>
              </thead>
            </table>
            <table className="text-left w-full mr-8">
              <thead className="bg-black opacity-25 flex text-white w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2 ">Type</th>
                  <th className="p-4 w-1/2">{pokemon.type}</th>
                </tr>
              </thead>
              <thead className="bg-black opacity-25 flex text-white w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">Taille</th>
                  <th className="p-4 w-1/2">{`${pokemon.base.taille} m`}</th>
                </tr>
              </thead>
              <thead className="bg-black opacity-25 flex text-white w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">Poids</th>
                  <th className="p-4 w-1/2">{`${pokemon.base.poids} kg`}</th>
                </tr>
              </thead>
              <thead className="bg-black opacity-25 flex text-white w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">Pokédex</th>
                  <th className="p-4 w-1/2">{`No ${pokemon.id}`}</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="mt-8">
            <h1 className="text-4xl">Attaques</h1>
            <hr className="border-b-2 border-black my-6"></hr>
          </div>
          <div>
            <button className="absolute right-5 bg-red-400 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
              {`Delete ${pokemon.names.french}`}
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <img src="pokeball.svg" />
      </div>
    )
  }
}

export default PokemonPage
