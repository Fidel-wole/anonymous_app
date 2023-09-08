import React from 'react'
import { NavLink } from 'react-router-dom'

import './header.css'
const Header = () => {
  return (
    <>
    <div className="">
    <header>
      <NavLink to="/" className="p">Play</NavLink>
      <NavLink to="/messages" className="p">Inbox</NavLink>
    </header>
    </div>
   
    </>
  )
}

export default Header