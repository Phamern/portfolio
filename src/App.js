import React, { useState, useEffect } from 'react'
import './App.css'
import { Router } from '@reach/router'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Header from './components/Header'
import Login from './components/Login'
import firebase from './components/firebase'
import Edit from './components/Edit'
import ProjectDetails from './components/ProjectDetails'
import LandingPage from './components/LandingPage'

const App = () => {

  const [signedIn, setSignedIn] = useState(false)

  useEffect( () => {
    console.log('use effect')
    firebase.auth().onAuthStateChanged(
      user => {
        if(user) {
          setSignedIn(true)
        } else {
          setSignedIn(false)
        }
      }
    )
  })

  return (
    <div>
      <Header signedIn={signedIn} />
      <Router basepath={process.env.PUBLIC_URL}>
        <LandingPage default path='/home' />
        <Projects path='/projects' signedIn={signedIn} />
        <ProjectDetails signedIn={signedIn} path='/projects/:id'/>
        <Contact path='/about' />
        <Login signedIn={signedIn} setSignedIn={setSignedIn} path='/login' />
        <Edit path='/edit/:id' />
      </Router>
    </div>
  )
}

export default App;
