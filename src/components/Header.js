import React, { useState } from 'react'
import './Header.css'
import { Link } from '@reach/router'
import { MdMenu } from 'react-icons/md'

const Header = ( props ) => {

  const [show, setShow] = useState(false)

  const isPartiallyActive = ({
    isPartiallyCurrent
  }) => {
    return isPartiallyCurrent
    ?
    {className: 'active'}
    :
    null
  }

  return (
    <div className='header-container'>
      <MdMenu className='burger-menu edit-icons' size='32'onClick={ () => setShow(!show)} />
      <header  className={ show ? 'visible' : ''} onClick={ () => setShow(false)}>
        <Link to='/home'><h1>eivind | pham</h1></Link>
        <div className='header-right-items'>
          <Link getProps={isPartiallyActive} to='/projects'>projects</Link>
          <div>|</div>
          <Link to='/about'>about</Link>
          <Link to='/login'>
            {
              props.signedIn
              ? 'profile'
              : 'login'
            }
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Header