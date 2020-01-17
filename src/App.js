import React, { useState, useEffect } from 'react'
import './App.css'
import { Router } from '@reach/router'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Header from './components/Header'
import Cv from './components/Cv'
import Login from './components/Login'
import firebase from './components/firebase'
import Edit from './components/Edit'

const App = () => {

  const [signedIn, setSignedIn] = useState(false)

  useEffect( () => {
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
    <>
      <Header signedIn={signedIn} />
      <Router>
        <Projects path='/' signedIn={signedIn} />
        <Contact path='/contact' />
        <Cv path='/cv' />
        <Login signedIn={signedIn} setSignedIn={setSignedIn} path='/login' />
        <Edit path='/edit/:id' />
      </Router>
    </>
  )
}

export default App;
