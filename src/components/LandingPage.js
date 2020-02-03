import React from 'react'
import './LandingPage.css'
import { Link } from '@reach/router'

const LandingPage = (props) => {

  return(
        <main>
          <div className='introPage'>
            <div className='name-wrapper'>
              <div className='name'>eivind pham</div>
              <div className='separator'>|</div>
              <Link to={process.env.PUBLIC_URL + '/projects'} className='nav-projects'>projects</Link>
            </div>
            <p>Digital designer based in Oslo, Norway</p>
          </div>
        </main>
      )
    }

export default LandingPage