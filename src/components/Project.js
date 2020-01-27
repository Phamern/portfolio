import React from 'react'
import './Project.css'
import './LandingPage.css'
import firebase from './firebase'
import { IoMdTrash, IoIosCode } from 'react-icons/io'
import { Link, navigate } from '@reach/router'

const Project = (props) => {

  // const [activeProject, setActiveProject] = useState(false)
  // onClick={ () => setActiveProject(!activeProject)} className={activeProject ? 'project active' : 'project'}

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

  return (
    <>
    <h3 className='display-title'>{props.data.title}</h3>
    <div className='project'>
      {
        props.data.defaultImage && 
      <img  
        onClick={() => navigate('/projects/' + props.id)} 
        src={props.data.defaultImage} alt='default' 
      />
      }
      <h3>{props.data.title}</h3>
        {/* <div className='year'>
          {props.data.year}
        </div>
        <div className='byline'>
          {props.data.byline}
        </div> */}
        <Link to={'/projects/' + props.id}>See project</Link>
      {
        props.signedIn &&
      <div className='admin-icons'>
        <Link to={'/edit/' + props.id}>
          <IoIosCode />
        </Link>
        <IoMdTrash onClick={removeProject} />
      </div>
      }
    </div>
    </>
  )
}

export default Project