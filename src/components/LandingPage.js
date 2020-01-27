import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import firebase from './firebase'
import Project from './Project'
import { IoMdAdd } from 'react-icons/io'
import { navigate } from '@reach/router'
import PulseLoader from 'react-spinners/PulseLoader'
import Masonry from 'react-masonry-css'

const LandingPage = (props) => {

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

  return(
    <>
    <div className='introPage'>
      <h1>eivind pham</h1>
      <p>Digital Designer based in Oslo, Norway</p>
    </div>
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
                    default: 1,
                  }
                }
                className="project-grid"
                columnClassName="project-grid_column"
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
        </>
      )
    }

export default LandingPage