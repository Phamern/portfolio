import React, { useState, useEffect } from 'react'
import './Projects.css'
import firebase from './firebase'
import Project from './Project'
import { IoMdAdd } from 'react-icons/io'
import { navigate } from '@reach/router'
import PulseLoader from 'react-spinners/PulseLoader'
import Masonry from 'react-masonry-css'

const Projects = (props) => {

  const [projects, setProjects] = useState([])

  useEffect( () => {
    firebase
    .firestore()
    .collection('projects')
    .orderBy('title')
    .onSnapshot(
      snapshot => setProjects(snapshot.docs)
    )
  }, [])

  const addProject = () => {
    firebase.firestore().collection('projects').add(
      {
        title: '0 New project',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
    )
    .then(doc => navigate('/edit/' + doc.id) )
  }

  return (
    <main>
        { props.signedIn &&
            <div className='add'>
                <IoMdAdd className='icons' onClick={addProject} />
            </div>
        }

        {
          projects.length > 0
          ?
          <Masonry
            breakpointCols = {
              {
                default: 3,
                1300: 2,
                1100: 1
              }
            }
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
          
            {
              projects.map(
              project => 
              <Project 
                key={project.id}
                id={project.id}
                data={project.data()}
                signedIn={props.signedIn}/>
              )
            }
          </Masonry>
          :
          <PulseLoader />
        }

    </main>
  )
}

export default Projects