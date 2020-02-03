import React, { useState, useEffect } from 'react'
import './Projects.css'
import firebase from './firebase'
import Project from './Project'
import { IoMdAdd } from 'react-icons/io'
import { navigate } from '@reach/router'
import PulseLoader from 'react-spinners/PulseLoader'

const Projects = (props) => {
  const [projects, setProjects] = useState()
  const [top, setTop] = useState(0)

  useEffect( () => {
    console.log('fetch')
    firebase
    .firestore()
    .collection('projects')
    .orderBy('orderNr')
    .onSnapshot(
      snapshot => setProjects(snapshot.docs)
    )
  }, [])

  useEffect(()=>{
    console.log('trying to scroll', top)
    window.scrollTo(0, top)
  }, [top])

  const addProject = () => {
    firebase.firestore().collection('projects').add(
      {
        title: '0 New project',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
    )
    .then(doc => navigate(process.env.PUBLIC_URL + '/edit/' + doc.id) )
  }

  return (
    <>
        { props.signedIn &&
            <div className='add'>
                <IoMdAdd className='icons' onClick={addProject} />
            </div>
        }

        {
          projects 
          ?
          <>
            {
              projects.map(
              project => 
              <Project 
                key={project.id}
                id={project.id}
                setTop={setTop}
                data={project.data()}
                signedIn={props.signedIn}/>
              )
            }
            </>
          :
          <PulseLoader />
        }

    </>
  )
}

export default Projects