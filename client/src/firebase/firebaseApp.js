import firebase from "firebase/app";
import SETTINGS from "settings";

const firebaseConfig = {
  firebase: {
    key: SETTINGS.firebase.key,
    publicVapid: SETTINGS.firebase.publicVapid,
    publicVapidOrg: SETTINGS.firebase.publicVapidOrg,
    configs: {
      apiKey: SETTINGS.firebase.configs.apiKey,
      authDomain: SETTINGS.firebase.configs.authDomain,
      projectId: SETTINGS.firebase.configs.projectId,
      storageBucket: SETTINGS.firebase.configs.storageBucket,
      messagingSenderId: SETTINGS.firebase.configs.messagingSenderId,
      appId: SETTINGS.firebase.configs.appId,
      measurementId: SETTINGS.firebase.configs.measurementId,
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