import React, { useState, useEffect } from 'react'
import './ProjectDetails.css'
import firebase from './firebase'
import {MdKeyboardBackspace} from 'react-icons/md'
import { IoIosCode } from 'react-icons/io'
import parse from 'html-react-parser'
import { Link } from '@reach/router'
// import {useSpring, animated} from 'react-spring'

const ProjectDetails = (props) => {

  // const fadein = useSpring({opacity: 1, from: {opacity: 0}})

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
    .orderBy('orderNr')
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
            <div>
              <Link className='back-button' to='/projects'>
                <MdKeyboardBackspace className='back-icon'/>
              </Link>
            </div>
            <div>
              {
                props.signedIn &&
                <Link className='edit-button' to={'/edit/' + props.id}>
                  <IoIosCode />
                </Link>
              }
            </div>
            <div className='project-detail-title'>{project.title} </div>
            <div className='info-grid'>
              <div className='description'>
                {
                  project.description &&
                  parse(project.description)
                }
             </div>
             <div className='vertical-separator'></div>
             <div className='project-list-info'>
               <div className='list-info-items'>
                <p className='tagName'>Type</p>
                <div className='year'>{project.type}</div>
               </div>
               <div className='list-info-items'>
                <p className='tagName'>Date</p>
                <div className='year'>{project.year}</div>
               </div>
               <div className='list-info-items'>
                <p className='tagName'>Tech</p>
                <div className='year'>{project.tech}</div>
               </div>
               <div className='list-info-items'>
                <p className='tagName'>Contributors</p>
                <div className='year'>{project.contributors}</div>
               </div>
             </div>
            </div>
            {
              project.parallaxImage && 
            <img 
              className="project-details-img-parallax"
              src={project.parallaxImage} alt='parallax' /
            >
            }
            
             <div className='concept'>
                {
                  project.concept &&
                  parse(project.concept)
                }
             </div>
             {/* {
              project.defaultImage && 
              <img 
                className="project-details-img-default"
                src={project.defaultImage} alt='default' 
              />
            } */}
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
  