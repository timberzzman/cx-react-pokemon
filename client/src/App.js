import React, { Component } from 'react'
import ToggleButton from './components/ToggleButton'
import PokemonList from './components/PokemonList'
// import logo from './assets/pokeball.svg'
import './App.css'
import './tailwind.output.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <ToggleButton className="" />
        <PokemonList />
      </div>
    )
  }
}
