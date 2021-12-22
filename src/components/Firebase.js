import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

const db = firebase.initializeApp({
  apiKey: "AIzaSyCbv4iXJ4QiKJZ1EqnOyUS0j4JWwpOQ7OY",
  authDomain: "react-verbs-irregulars.firebaseapp.com",
  projectId: "react-verbs-irregulars",
  storageBucket: "react-verbs-irregulars.appspot.com",
  messagingSenderId: "819114635761",
  appId: "1:819114635761:web:71ed0314d76d0722929450"
});

export default db;