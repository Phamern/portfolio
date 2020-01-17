import React from 'react'
import './Header.css'
import { Link } from '@reach/router'

const Header = ( props ) => {
  return (
    <header>
      <h1>eivind | pham</h1>
      <Link to='/'>Home</Link>
      <Link to='/contact'>Contact</Link>
      <Link to='/cv'>CV</Link>
      <Link to='/login'>
        {
          props.signedIn
          ? 'Profile'
          : 'Login'
        }
      </Link>
    </header>
  )
}

export default Header