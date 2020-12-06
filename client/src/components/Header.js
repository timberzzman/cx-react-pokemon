import React from 'react'
import ToggleButton from './ToggleButton'
import PostButton from './postButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <header className="h-24 flex justify-between content-center">
        <div className="flex m-5">
            <a href="/">
                <FontAwesomeIcon icon={faHome} size={'3x'} className="text-gray-300 hover:text-gray-400" />
            </a>
        </div>
        <div className="flex flex-row m-5">
            <PostButton />
            <ToggleButton className="" />
        </div>
    </header>
  )
}

export default Header
