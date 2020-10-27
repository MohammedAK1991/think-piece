import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoWRXlBhHl8wyfr5q9QiNntKxMWfEGOWA",
  authDomain: "think-piece-754e5.firebaseapp.com",
  databaseURL: "https://think-piece-754e5.firebaseio.com",
  projectId: "think-piece-754e5",
  storageBucket: "think-piece-754e5.appspot.com",
  messagingSenderId: "752009283124",
  appId: "1:752009283124:web:3858db745b55864604ec61",
  measurementId: "G-49T4YX9ZGK"
};

firebase.initializeApp(firebaseConfig)

window.firebase = firebase;

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut()

export default firebase;