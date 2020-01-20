import React, { useState, useEffect } from "react"
import firebase from "./firebase"
import "./Edit.css"
import FileUploader from 'react-firebase-file-uploader'
import { Link } from '@reach/router'

const Edit = props => {
  const [project, setProject] = useState({})
  const [status, setStatus] = useState('')


  //første som skjer i et komponenet
  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .doc(props.id)
      .onSnapshot(snapshot =>
        //returnerer rent JSON obj
        setProject(snapshot.data())
      );
  }, [props.id])

  const saveProject = () => {}

  const updateValue = e => {
    e.persist();
    console.log(project)
    setProject(existingProject => ({
      ...existingProject,
      [e.target.name]: e.target.value
    }));
  };

  const submitChanges = (e) => {
    setStatus('Updating project, please hold')
    e.preventDefault()
    firebase.firestore().collection('projects').doc(props.id)
      .update(project)
      .then(() => setStatus('Project updated'))
      .catch(error => console.log(error.message))
  }

  const uploadStart = () => {
    setStatus('uploading image, please hold')
  }

  const uploadError = (error) => {
    setStatus(error)
  }

  const handleProgress = (percentage) => {
    console.log(percentage)
  }

 const uploadSuccess = (filename) => {
    firebase
    .storage()
    .ref('images')
    .child(filename)
    .getDownloadURL()
    .then(
      url => setProject( existingProject => ( {
        ...existingProject,
        defaultImage: url
      } ) )
    )
    setStatus('Image uploaded')
  }

  return (
    <main className='edit'>
      <h1>Edit Project : {project.title}</h1>
      <form onSubmit={saveProject}>
      <p>Title: </p>
        <input
          onChange={updateValue}
          name="title"
          value={project.title}
          placeholder="Title"
        />
        <p>Description: </p>
        <textarea
          onChange={updateValue}
          name="description"
          value={project.description}
          placeholder="description"
        />
        <p>Color: </p>
        <input 
          onChange={updateValue}
          name='color'
          value={project.color}
          />
        {
          project.defaultImage &&
          <img src={project.defaultImage} alt='image' />
        }
        <label>
          <div className='uploadButton'>
            {project.defaultImage ? 'replace image' : 'upload image'}
          </div>
          <FileUploader
            hidden
            accept="image/*"
            storageRef={firebase.storage().ref('images')}
            onUploadStart={uploadStart}
            onUploadError={uploadError}
            onUploadSuccess={uploadSuccess}
            onProgress={handleProgress}
          />
        </label>
      </form>
      <button onClick={submitChanges}>
          <Link to='/'>
           Submit Changes
          </Link>
        </button>
      <p>{status}</p>
    </main>
  );
};

export default Edit;
