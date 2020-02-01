import React, { useState, useEffect } from 'react'
import './ProjectDetails.css'
import firebase from './firebase'
import {MdKeyboardBackspace} from 'react-icons/md'
import parse from 'html-react-parser'
import { Link } from '@reach/router'

const ProjectDetails = (props) => {

  const [project, setProject] = useState()
  const [prev, setPrev] = useState()
  const [next, setNext] = useState()

  useEffect( () => {
    firebase
    .firestore()
    .collection('projects')
    .doc(props.id)
    .onSnapshot(
      snapshot => setProject(snapshot.data())
    )
  }, [props.id])

  useEffect( () => {
    firebase
    .firestore()
    .collection('projects')
    .orderBy('title')
    .get()
    .then( projects => {
      const array = projects.docs.map( doc => { return {id: doc.id, title: doc.data().title} })
      const myArrPos = array.indexOf(array.find( el => el.id === props.id))
      setNext( myArrPos + 1 === array.length ? array[0] : array[myArrPos + 1])
      setPrev( myArrPos === 0 ? array[array.length - 1] : array[myArrPos - 1])
      window.scrollTo(0, 0)
    })
  },[props.id])

  return (
    <>
    <main className='project-details'>
      {
        project 
        ?
        <div className='project-details-content'>
            <p>
              <Link className='back-button' to='/projects'><MdKeyboardBackspace className='back-icon'/></Link>
            </p>
            <h3 className='project-detail-title'>{project.title}</h3>
            <div className='info-grid'>
              <div className='year'> {project.year}</div>
              <div className='description'>
                {
                  project.description &&
                  parse(project.description)
                }
             </div>
            </div>
            {
              project.defaultImage && 
              <img 
                class="project-details-img"
                src={project.defaultImage} alt='default' 
              />
            }
             <div className='concept'>
                {
                  project.concept &&
                  parse(project.concept)
                }
             </div>
            {
              project.parallaxImage && 
            <img src={project.parallaxImage} alt='parallax' />
            }
            
        </div>
        :
        <h2>Fetching project, hold on</h2>
      }
    </main>
    <div className='pager'>
    {
      (prev && next) &&
      <div className='navigate-projects'>
       <Link className='prev' to={'/projects/' + prev.id}>Previous project</Link>
       <div className='divider'>|</div>
       <Link className='next' to={'/projects/' + next.id}>Next project</Link>
      </div>
    }
  </div>
  </>
  )
}

export default ProjectDetails
  