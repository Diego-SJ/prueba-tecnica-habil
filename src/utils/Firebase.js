import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAy6QBt97JYD7-oA7y0ObvVOXPiIwiuZPc",
  authDomain: "prueba-tecnica-habil.firebaseapp.com",
  databaseURL: "https://prueba-tecnica-habil.firebaseio.com",
  projectId: "prueba-tecnica-habil",
  storageBucket: "prueba-tecnica-habil.appspot.com",
  messagingSenderId: "1017055059909",
  appId: "1:1017055059909:web:f16e3d0f17c9fe2c35b5ac"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
