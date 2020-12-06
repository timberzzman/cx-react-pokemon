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
          <a
            className="absolute left focus:outline-none focus:ring-0 focus:ring-black focus:border-transparent"
            href="http://localhost:3000/"
          >
            <FontAwesomeIcon icon={faLongArrowAltLeft} size="5x" />
          </a>
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
                <div className="popup_inner">
                  <div className='flex items-center w-full bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert"'>
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <h1>The pokemon {pokemon.names.french} has been deleted</h1>
                    <button className="" onClick={() => { window.location.href = 'http://localhost:3000/' }}>
                      <svg className="fill-current h-6 w-6 text-white" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            : ''}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <img className="Logo-Animation" src="pokeball.svg" />
      </div>
    )
  }
}

export default PokemonPage
