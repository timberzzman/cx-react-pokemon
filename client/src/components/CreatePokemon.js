import React, { useState } from 'react'

function CreatePokemon() {
  const [pokemon, setPokemon] = useState({})

  const myChangeHandler = (event) => {
    const nam = event.target.name
    const val = event.target.value
    setPokemon(element => Object.assign(element, { [nam]: val }))
  }
  const mySubmitHandler = (event) => {
    event.preventDefault()
    if (!pokemon.nom || !pokemon.type) {
      console.log('its required bitch')
    } else {
      console.log('Its good bro')
    }
  }

  return (
    <form onSubmit={mySubmitHandler}>
        <h1>Hello {pokemon.name}</h1>
        <p>Enter your name:</p>
        <input name='nom' type="text" onChange={myChangeHandler}/>
        <input name='type' type="text" onChange={myChangeHandler}/>
        <input type="submit" />
    </form>
  )
}

export default CreatePokemon
