import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons'
import '../App.css'
import '../tailwind.output.css'

class ToggleButton extends Component {
  constructor(props) {
    super(props)
    this.state = { isDarkTheme: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState((state) => ({
      isDarkTheme: !state.isDarkTheme
    }))
  }

  render() {
    return (
      <button
        id="toggleButton"
        onClick={this.handleClick}
        className="absolute top-0 right-0 px-2 py-1 outline-none shadow-md border-solid rounded-full"
      > <p>{`${this.state.isDarkTheme ? 'Light mode' : 'Dark mode'}`} </p>
        <FontAwesomeIcon icon={this.state.isDarkTheme ? faSun : faMoon} />
      </button>
    )
  }
}

export default ToggleButton
