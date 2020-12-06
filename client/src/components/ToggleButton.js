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
      <div>
        <button
        id="toggleButton"
        onClick={this.handleClick}
        className="bg-gray-100 hover:bg-gray-200 px-4 py-3 shadow-md border-solid focus:outline-none focus:ring-0 rounded-full hover:shadow-inner dark:bg-gray-800 dark:hover:bg-gray-500">
          {this.state.isDarkTheme ? document.querySelector('html').classList.add('dark') : document.querySelector('html').classList.remove('dark')}
        <FontAwesomeIcon icon={this.state.isDarkTheme ? faSun : faMoon} />
        </button>
      </div>
    )
  }
}

export default ToggleButton
