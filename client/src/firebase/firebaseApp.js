import firebase from "firebase/app";

// todo move to env
const firebaseConfig = {
  firebase: {
    key: 'BK4lsm6R2kc8Rtwyf7z0Nk-iEEXhDPf-HzzzM9_q4VzhcFzxnI2cjX01Eh7b-Opyy-TJATqvx9Fhs308k3J8bv0',
    publicVapid: 'BO8fqOl2Qdr5Fhrg6U3e18YEFuAWDzawgXX1xfejO5lmwq9ijMREAdQF5WBF_8ffjgAt2vCf4EkNiXm3JkN7YxE',
    publicVapidOrg: 'BK4lsm6R2kc8Rtwyf7z0Nk-iEEXhDPf-HzzzM9_q4VzhcFzxnI2cjX01Eh7b-Opyy-TJATqvx9Fhs308k3J8bv0',
    configs: {
      apiKey: "AIzaSyD2gUTBSc1Tn7AO9mye-2opiJLWtV7VllE",
      authDomain: "client-server-todo-pwa.firebaseapp.com",
      projectId: "client-server-todo-pwa",
      storageBucket: "client-server-todo-pwa.appspot.com",
      messagingSenderId: "682081838658",
      appId: "1:682081838658:web:bb372ec701e40d7132afdb",
      measurementId: "G-TPFS1C3DGK",
    }
  }
};

// Initialize Firebase
let firebaseApp;
if (!firebase.apps.length) {
  console.log("Initializing firebaseApp")
  firebaseApp = firebase.initializeApp(firebaseConfig.firebase.configs);
}

export default firebaseApp;


