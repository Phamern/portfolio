import React from 'react' 
import firebase from './firebase'

const Login = (props) => {

  const loginWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')

    firebase.auth()
    .signInWithPopup(provider)
    .catch( error => {
      console.log(error)
    })
  }

  const logout = () => {
    firebase.auth().signOut()
  }

  return (
    <main className='login'>
      {
        !props.signedIn &&
        <button onClick={loginWithGoogle} >Sign in</button>
      }
      {
        props.signedIn &&
        <>
        <h1>You are signed in to firebase</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}</p>
        {
          firebase.auth().currentUser.photoURL &&
          <img alt='profile image' src={firebase.auth().currentUser.photoURL} />
        }
        <button onClick={logout} >Sign Out</button>
        </>
      }
     
    </main>
  )
}

export default Login