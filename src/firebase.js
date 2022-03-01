import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp5zTkgQklNFuLh-WZcA-icn7-fS10LUw",
  authDomain: "clone-cfcff.firebaseapp.com",
  projectId: "clone-cfcff",
  storageBucket: "clone-cfcff.appspot.com",
  messagingSenderId: "670675979743",
  appId: "1:670675979743:web:87c4f0d85b4cfd9379086a",
  measurementId: "G-BF4H733X0E"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig); // so we initialized the app with the firebase configurations and settings.
  const db = firebaseApp.firestore(); /// we have the database from firebase in this db variable
  const auth = firebase.auth(); /// we have the authentication details of the user from the firebase in this auth variable.

  export {db,auth};