import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ToggleButton from './components/ToggleButton'
import PokemonList from './components/PokemonList'
import PokemonPage from './components/PokemonPage'
import CreatePokemon from './components/CreatePokemon'
import './tailwind.output.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <ToggleButton className="" />
        <BrowserRouter>
        <Switch>
          <Route path='/pokemon/create'>
              <CreatePokemon />
          </Route>
          <Route path='/pokemon/:pokemonID'>
            <PokemonPage />
          </Route>
          <Route path="/">
            <PokemonList />
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
