import React, { useState } from 'react'
import './Header.css'
import { Link } from '@reach/router'
import { MdMenu } from 'react-icons/md'

const Header = ( props ) => {

  const [show, setShow] = useState(false)

  return (
    <div className='header-container'>
      <MdMenu className='burger-menu' onClick={ () => setShow(!show)} />
      <header  className={ show ? 'visible' : ''} onClick={ () => setShow(false)}>
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
    </div>
  )
}

export default Header