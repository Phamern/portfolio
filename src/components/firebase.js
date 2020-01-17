import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDWKSZv9C25MZmJoaD-F1TCSb07FWuq2Hg",
  authDomain: "react-blog-firebase-2e015.firebaseapp.com",
  databaseURL: "https://react-blog-firebase-2e015.firebaseio.com",
  projectId: "react-blog-firebase-2e015",
  storageBucket: "react-blog-firebase-2e015.appspot.com",
  messagingSenderId: "908821575395",
  appId: "1:908821575395:web:dc6b6d815745266aacb7d6",
  measurementId: "G-LP179V7VX2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase