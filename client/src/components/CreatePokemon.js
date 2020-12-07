import React, { useState } from 'react'

function CreatePokemon() {
  const [pokemon, setPokemon] = useState({})
  const [msg, setMsg] = useState(false)
  const [msgType, setMsgType] = useState('')
  const [message, setMessage] = useState('')
  const htmlMessage = (
    <div className={ msgType } role="alert">
      <p>{message}</p>
    </div>
  )

  const myChangeHandler = (event) => {
    const nam = event.target.name
    const val = event.target.value
    setPokemon(element => Object.assign(element, { [nam]: val }))
  }
  const mySubmitHandler = (event) => {
    event.preventDefault()
    setMsg(false)
    if (!pokemon.nom || !pokemon.type) {
      setMsgType('message_error')
      setMessage('Please fill out all fields.')
      setMsg(true)
    } else {
      fetch('http://localhost:4242/pokemons/', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pokemon)
      }).then(response => response.json()).then((data) => {
        if (data.code === 200) {
          setMsgType('message_success')
          setMessage(data.message)
          setMsg(true)
        }
      })
    }
  }

  return (
    <form onSubmit={mySubmitHandler}>
    <div className="flex justify-around items-center px-16 py-16 mx-8 my-8 mb-0 pb-3">
      <div className=" w-1/2 -mx-3 mb-6">
        <div className="w-full px-3 mb-6 ">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="nom">
            Nom
          </label>
          <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 dark:text-black" id="nom" name='nom' type="text" placeholder="Rayquaza" onChange={myChangeHandler}></input>
        </div>
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="type">
            Type
          </label>
          <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 dark:text-black" id="type" name='type' type="text" placeholder="Dragon" onChange={myChangeHandler}></input>
          <div className="flex justify-center mt-10">
            {
              msg ? htmlMessage : ''
            }
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center">
      <a href="/pokemon/create">
        <button className="bg-gray-300 hover:bg-gray-400 hover:text-white px-8 py-5 outline-none shadow-md border-solid rounded-lg hover:shadow-inner dark:bg-gray-800 dark:hover:bg-gray-500" type="submit">
          Ajouter le Pokémon
        </button>
      </a>
      </div>
    </form>
  )
}

export default CreatePokemon
