import React, { useState, useEffect } from 'react'
import './ProjectDetails.css'
import firebase from './firebase'
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
    })
  },[props.id])

  // let styles
  // if(project) {
  //   styles = {
  //     parallax: {
  //       backgroundImage: 'url(' + project.parallax + ')',
  //     }
  //   }
  // }

  return (
    <main className='project-details'>
      {
        project 
        ?
        <div>
          {/* {
            project.displayImage &&
            <div style={StyleSheet.parallaxImage}>{project.title}</div>
          }
          <div className='project-content'> */}
            <p>
              <Link to='/projects'>Back</Link>
            </p>
            {
              project.defaultImage && 
            <img src={project.defaultImage} alt='default' />
            }
            <h3>{project.title}</h3>
            <div className='year'>
              {project.year}
            </div>
            <div className='description'>
              {
                project.description &&
                parse(project.description)
              }
            {/* </div> */}
            </div>
            <div className='pager'>
              {
                (prev && next) &&
                <>
                 <Link className='prev' to={'/projects/' + prev.id}>{prev.title}</Link>
                 <Link className='next' to={'/projects/' + next.id}>{next.title}</Link>
                </>
              }
            </div>
        </div>
        :
        <h2>Fetching project, hold on</h2>
      }
    </main>
  )
}

export default ProjectDetails
  