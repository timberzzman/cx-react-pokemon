import React, { useEffect, useState } from 'react'
import '../App.css'
import LoadingScreen from './loadingScreen'
import '../tailwind.output.css'
import { useParams } from 'react-router-dom'

function PokemonPage() {
  const { pokemonID } = useParams()
  const [isLoaded, setLoaded] = useState(false)
  const [pokemon, setPokemon] = useState({})
  const [isPopup, setPopup] = useState(false)

  const deletePokemon = (event) => {
    event.preventDefault()
    if (confirm('Are you sure you want to delete this pokemon ?')) {
      fetch(`http://localhost:4242/pokemons/${pokemonID}`, {
        method: 'DELETE'
      }).then(response => response.json()).then((data) => {
        if (data.code === 200) {
          setPopup(true)
        }
      })
    }
  }

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
        <div className="my-12 mx-auto px-4">
          <div className="mb-8 grid justify-items-center">
            <div className="grid grid-cols-1 justify-items-center">
              <img src={pokemon.img} />
              <h1 className="self-center text-4xl">{`#${pokemon.id} ${pokemon.names.french}`}</h1>
            </div>
          </div>
          <div>
            <h1 className="text-4xl">Identité</h1>
            <hr className="border-b-2 border-black dark:border-white my-6"></hr>
          </div>
          <div className="grid grid-cols-2">
            <table className="text-left w-5/5 mr-8">
              <thead className="bg-gray-300 dark:bg-gray-800 flex w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2 ">Pokémon</th>
                  <th className="p-4 w-1/2 ">{pokemon.names.french}</th>
                </tr>
              </thead>
              <thead className="bg-gray-300 dark:bg-gray-800 flex w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">NomFR</th>
                  <th className="p-4 w-1/2">{pokemon.names.french}</th>
                </tr>
              </thead>
              <thead className="bg-gray-300 dark:bg-gray-800 flex w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">NomEN</th>
                  <th className="p-4 w-1/2">{pokemon.names.english}</th>
                </tr>
              </thead>
              <thead className="bg-gray-300 dark:bg-gray-800 flex w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">NomJP</th>
                  <th className="p-4 w-1/2">{pokemon.names.japanese}</th>
                </tr>
              </thead>
            </table>
            <table className="text-left w-full mr-8">
              <thead className="bg-gray-300 dark:bg-gray-800 flex w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2 ">Type</th>
                  <th className="p-4 w-1/2">{pokemon.type}</th>
                </tr>
              </thead>
              <thead className="bg-gray-300 dark:bg-gray-800 flex w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">Taille</th>
                  <th className="p-4 w-1/2">{`${pokemon.base.taille} m`}</th>
                </tr>
              </thead>
              <thead className="bg-gray-300 dark:bg-gray-800 flex w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">Poids</th>
                  <th className="p-4 w-1/2">{`${pokemon.base.poids} kg`}</th>
                </tr>
              </thead>
              <thead className="bg-gray-300 dark:bg-gray-800 flex w-full rounded-lg mb-1">
                <tr className="flex w-full mb-4">
                  <th className="p-4 w-1/2">Pokédex</th>
                  <th className="p-4 w-1/2">{`No ${pokemon.id}`}</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="mt-8">
            <h1 className="text-4xl">Attaques</h1>
            <hr className="border-b-2 border-black dark:border-white my-6"></hr>
            <table className="text-left w-full">
              <thead className="bg-gray-300 dark:bg-gray-800 flex w-full rounded-lg mb-1">
                <tr className="flex w-full">
                  <th className="p-4 w-full">Nom</th>
                  <th className="p-4 w-full">Niveau</th>
                  <th className="p-4 w-full">Puissance</th>
                  <th className="p-4 w-full">Precision</th>
                  <th className="p-4 w-full">pp</th>
                </tr>
              </thead>
              <tbody className="bg-grey-light flex flex-col items-center justify-between w-full">
              {pokemon.attaques.map((element) =>
                <tr className="flex w-full mb-4" key={`attaques_${element.id}`}>
                  <th className="p-4 w-full" key={'attaques_nom'}>{element.nom}</th>
                  <th className="p-4 w-full" key={'attaques_niveau'}>{element.niveau}</th>
                  <th className="p-4 w-full" key={'attaques_puissance'}>{element.puissance}</th>
                  <th className="p-4 w-full" key={'attaques_precision'}>{element.precision}</th>
                  <th className="p-4 w-full" key={'attaques_pp'}>{element.pp}</th>
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <div>
            <div className="flex justify-center">
              <button className="bg-red-500 text-white px-5 py-3 outline-none shadow-md border-solid rounded-lg hover:bg-red-700 hover:shadow-inner dark:bg-red-500 dark:hover:bg-red-700" onClick={deletePokemon}>
                {`Delete ${pokemon.names.french}`}
              </button>
            </div>
          </div>
          { isPopup
            ? <div className="popup">
                <div className="popup_inner bg-white dark:bg-gray-900 rounded-lg flex flex-wrap justify-center content-center">
                  <div className="flex flex-col justify-center">
                    <h1 className="m-3">The pokemon {pokemon.names.french} has been deleted</h1>
                    <button className="mx-2 px-5 py-3 focus:outline-none focus:ring-0 shadow-md border-solid rounded-lg hover:shadow-inner bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-500" onClick={() => { window.location.href = '/' }}>Go back to pokemons</button>
                  </div>
                </div>
              </div>
            : ''}
        </div>
      </div>
    )
  } else {
    return (
      <LoadingScreen />
    )
  }
}

export default PokemonPage
