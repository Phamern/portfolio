import React from 'react' 
import firebase from './firebase'

const Login = (props) => {

  const styles = {
    login: {
      placeItems: 'center'
    },

    loginImage: {
      width: '100px',
      borderRadius: '50%',
      marginBottom: '3rem',
      marginTop: '2rem'
    }
  }

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
    <main style={styles.login}>
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
          <img style={styles.loginImage} alt='profile display' src={firebase.auth().currentUser.photoURL} />
        }
        <button onClick={logout} >Sign Out</button>
        </>
      }
     
    </main>
  )
}

export default Login