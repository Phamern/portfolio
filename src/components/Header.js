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
        <Link className='logo' to='/home'><p>e | p</p></Link>
        <div className='header-right-items'>
          <Link getProps={isPartiallyActive} to={process.env.PUBLIC_URL + '/projects'}>projects</Link>
          <p className='divider'>|</p>
          <Link to={process.env.PUBLIC_URL + '/about'}>about</Link>
        </div>
      </header>
    </div>
  )
}

export default Header