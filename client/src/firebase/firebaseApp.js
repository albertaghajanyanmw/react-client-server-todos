// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyD2gUTBSc1Tn7AO9mye-2opiJLWtV7VllE",
  authDomain: "client-server-todo-pwa.firebaseapp.com",
  projectId: "client-server-todo-pwa",
  storageBucket: "client-server-todo-pwa.appspot.com",
  messagingSenderId: "682081838658",
  appId: "1:682081838658:web:bb372ec701e40d7132afdb",
  measurementId: "G-TPFS1C3DGK"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;


