import React, { useEffect, useRef } from 'react'
import './Projects.css'
import firebase from './firebase'
import Project from './Project'
import { IoMdAdd } from 'react-icons/io'
import { navigate } from '@reach/router'
import PulseLoader from 'react-spinners/PulseLoader'

const Projects = (props) => {
  const scrollContainer = useRef()

  useEffect( () => {
    scrollContainer.current.scroll(0, props.top)
  })
  
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
    <div ref={scrollContainer} className="project-container">
        { props.signedIn &&
            <div className='add'>
                <IoMdAdd className='icons' onClick={addProject} />
            </div>
        }

        {
          props.projects
          ?
          <>
            {
              props.projects.map(
              (project, index) => 
              <Project 
                key={project.id}
                id={project.id}
                setTop={props.setTop}
                index={index}
                data={project.data()}
                signedIn={props.signedIn}/>
              )
            }
            </>
          :
          <PulseLoader />
        }

    </div>
  )
}

export default Projects