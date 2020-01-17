import React from 'react'
import './Project.css'
import firebase from './firebase'
import { IoIosTrash } from 'react-icons/io'

const Project = (props) => {


  const removeProject = () => {
    firebase.firestore().collection('projects').doc(props.id).delete()
  }

  return (
    <div className='project'>
      <div>
        <IoIosTrash onClick={removeProject}/>
      </div>
      <h4>{props.data.title}</h4>
      <p>{props.data.description}</p>
      {
        props.data.color && <p>farge: {props.data.color}</p>
      }
    </div>
  )
}

export default Project