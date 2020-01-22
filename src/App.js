import React, { useState, useEffect } from 'react'
import './App.css'
import { Router, navigate } from '@reach/router'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Header from './components/Header'
import Cv from './components/Cv'
import Login from './components/Login'
import firebase from './components/firebase'
import Edit from './components/Edit'
import ProjectDetails from './components/ProjectDetails'

const App = () => {

  const Default = () => {
    navigate('/projects')
    return(
      <>
      </>
    )
  }

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
        <Default path='/' />
        <Projects path='/projects' signedIn={signedIn} />
        <ProjectDetails path='/projects/:id'/>
        <Contact path='/contact' />
        <Cv path='/cv' />
        <Login signedIn={signedIn} setSignedIn={setSignedIn} path='/login' />
        <Edit path='/edit/:id' />
      </Router>
    </>
  )
}

export default App;
