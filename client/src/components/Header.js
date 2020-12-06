import React from 'react'
import ToggleButton from './ToggleButton'
import PostButton from './postButton'

function Header() {
  return (
    <header className="h-24 flex justify-end content-center">
        <div className="flex flex-row m-5">
            <PostButton />
            <ToggleButton className="" />
        </div>
    </header>
  )
}

export default Header
