import React from 'react'
import './Project.css'
import './LandingPage.css'
import firebase from './firebase'
import { IoMdTrash, IoIosCode } from 'react-icons/io'
import { Link, navigate } from '@reach/router'
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 200, (x - window.innerWidth / 2) / 200, 1.1]
const trans = (x, y, s) => `perspective(800px) rotateX(${x}deg) rotateY(${y}deg)`

const Project = (props) => {

  const [animation, setAnimation] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 50, tension: 350, friction: 40 } }))

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

  const goto = e => {
    let top = e.target.parentElement.offsetHeight * props.index
    props.setTop( top )
    navigate(process.env.PUBLIC_URL + '/projects/' + props.id) 
  }

  return (
    <>
      <div className="project">
        {
          props.data.defaultImage && 
          <animated.img 
            className="project-overview-img"
            onMouseMove={({ clientX: x, clientY: y }) => setAnimation({ xys: calc(x, y) })}
            onMouseLeave={() => setAnimation({ xys: [0, 0, 1] })}
            style={{ transform: animation.xys.interpolate(trans) }}
            onClick={goto} 
            src={props.data.defaultImage} alt='default' 
          />
        }
          <div className='display-title'>{props.data.title}</div>
          <Link className='view-project' to={process.env.PUBLIC_URL + '/projects/' + props.id}>View project</Link>
        {
          props.signedIn &&
        <div className='admin-icons'>
          <Link to={process.env.PUBLIC_URL + '/edit/' + props.id}>
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