import React, { useState, useEffect } from 'react'
import './ProjectDetails.css'
import firebase from './firebase'
import {MdKeyboardBackspace} from 'react-icons/md'
import { IoIosCode } from 'react-icons/io'
import parse from 'html-react-parser'
import { Link } from '@reach/router'
// import {useSpring, animated} from 'react-spring'

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
              <Link className='back-button' to={process.env.PUBLIC_URL + '/projects'}>
                <MdKeyboardBackspace className='back-icon'/>
              </Link>
            </div>
            <div>
              {
                props.signedIn &&
                <Link className='edit-button' to={process.env.PUBLIC_URL + '/edit/' + props.id}>
                  <IoIosCode />
                </Link>
              }
            </div>
            <section className='top-info-section'>
              <div className='project-detail-title'>{project.title} </div>
              <div className='info-grid'>
                <div className='description'>
                  {
                    project.description &&
                    parse(project.description)
                  }
              </div>
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
                  <p className='tagName'>Role</p>
                  <div className='year'>{project.role}</div>
                </div>
                { 
                  project.website &&
                  <div className='list-info-items'>
                    <p className='tagName'>Website</p>
                    <div className='year'>{parse(project.website)}</div>
                  </div>
                }
                { 
                  project.styleguide &&
                  <div className='list-info-items'>
                    <p className='tagName'>Styleguide</p>
                    <div className='year'>{parse(project.styleguide)}</div>
                  </div>
                }
                </div>
              </div>
            </section>
            
            {
              project.introImage && 
            <img 
              className="project-details-img-intro"
              src={project.introImage} alt='intro' /
            >
            }
            <section className='concept-section'>
             <div className='concept-description'>
               <div className='concept-title'>Concept</div>
                {
                  project.concept &&
                  parse(project.concept)
                }
             </div>
             <div className='concept-name'>
               <div className='concept-title'></div>
                {
                  project.conceptName &&
                  parse(project.conceptName)
                }
             </div>
          </section>
            {
                project.resultImage && 
              <img 
                className="project-details-img-result"
                src={project.resultImage} alt='result' /
              >
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
       <Link className='prev' to={process.env.PUBLIC_URL + '/projects/' + prev.id}>Previous project</Link>
       <div className='divider'>|</div>
       <Link className='next' to={process.env.PUBLIC_URL + '/projects/' + next.id}>Next project</Link>
      </div>
    }
  </div>
  </>
  )
}

export default ProjectDetails
  