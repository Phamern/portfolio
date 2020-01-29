import React, { useState, useEffect } from "react"
import firebase from "./firebase"
import "./Edit.css"
import FileUploader from 'react-firebase-file-uploader'
import { Link } from '@reach/router'

const Edit = props => {
  const [project, setProject] = useState()
  const [status, setStatus] = useState('')
  const [imageName, setImageName] = useState('defaultImage')

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

  const updateValue = 
    e => {
    e.persist();
      switch(e.target.type) {
        case 'checkbox': {
            setProject(
              existingProject => ({
              ...existingProject,
              [e.target.name]: e.target.value
          }))
          break;
          }
        case 'text': {
          setProject(
            existingProject => ({
            ...existingProject,
            [e.target.name]: e.target.value
          }))
          break;
        }
        default: {
          setProject(
            existingProject => ({
            ...existingProject,
            [e.target.name]: e.target.value
          }))
        }
      }
    }

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
        [imageName]: url
      } ) )
    )
    setStatus('Image uploaded')
  }

  return (
    <main className='edit'>
      {
        project ?
        <>
        <h1>Edit Project : {project.title}</h1>
        <form onSubmit={saveProject}>
        <p>Title: </p>
          <input
            onChange={updateValue}
            name="title"
            value={project.title}
            placeholder="Title"
          />
          <input 
            onChange={updateValue}
            name='year'
            value={project.year}
            placeholder='year'
            />
          <input 
            onChange={updateValue}
            name='byline'
            value={project.byline}
            placeholder='byline'
            />
          <div className='checkboxes'>
            <label htmlFor='htmlCss'>html/css</label>
            <input name='htmlCss' id='htmlCss' type='checkbox' onChange={updateValue} defaultChecked={project.htmlCss}/>
            <label htmlFor='htmlCss'>Javascript</label>
            <input name='javascript' id='javascript' type='checkbox' onChange={updateValue} defaultChecked={project.javascript}/>
            <label htmlFor='ux'>UX</label>
            <input name='ux' id='ux' type='checkbox' onChange={updateValue} defaultChecked={project.ux}/>
            <label htmlFor='published'>Published</label>
            <input name='published' id='published' type='checkbox' onChange={updateValue} defaultChecked={project.published}/>
          </div>
          <p>Description: </p>
          <textarea
            onChange={updateValue}
            name="description"
            value={project.description}
            placeholder="description"
          />

          <div className='project-images'>
            {
              project.defaultImage &&
              <div>
                <p className='imageNameIndicator'>Default</p>
                <img src={project.defaultImage} alt='default' />
              </div>
            }
            {
              project.displayImage &&
              <div>
                <p className='imageNameIndicator'>Display</p>
                <img src={project.displayImage} alt='display' />
              </div>
            }
            {
              project.parallaxImage &&
              <div>
                <p className='imageNameIndicator'>Parallax Image</p>
                <img src={project.parallaxImage} alt='parallaxImage' />
              </div>
            }
           </div>
          <select name='imageName' onChange={ e => setImageName(e.target.value)}>
            <option name='defaultImage' value='defaultImage'>Default Image</option>
            <option name='displayImage' value='displayImage'>Display Image</option>
            <option name='parallaxImage' value='parallaxImage'>Parallax Image</option>
          </select>
          <label>
            <div className='uploadButton'>
              {/* {project.defaultImage ? 'upload image' : 'upload image'} */}
              upload image
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
        </>
        : <h2>fetching...</h2>
      }
    </main>
  );
};

export default Edit;
