import React from 'react'
import './Project.css'
import firebase from './firebase'
import { IoMdTrash, IoIosCode } from 'react-icons/io'

const Project = (props) => {
  const removeProject = () => {
    if(window.confirm('sure?')) {
      firebase.firestore()
      .collection('projects')
      .doc(props.id)
      .delete()
      .then( ref => console.log('Document was deleted'))
      .catch(error => console.log(error))
    }
  }

  const editProject = () => {

  }

  return (
    <div className='project'>
      <h4>{props.data.title}</h4>
      <p>{props.data.description}</p>
      {
        props.data.color && <p>farge: {props.data.color}</p>
      }
      {
        props.signedIn &&
      <div className='admin-icons'>
        <IoIosCode onClick={editProject} />
        <IoMdTrash onClick={removeProject} />
      </div>
      }
    </div>
  )
}

export default Project