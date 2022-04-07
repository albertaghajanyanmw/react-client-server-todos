const SETTINGS = {
    apiUrl: process.env.REACT_APP_API_URL,
    pushNotification: {
        publicVapidKey: process.env.REACT_APP_PUBLIC_VAPID_KEY,
    },
    firebase: {
        key: process.env.REACT_APP_FIREBASE_KEY,
        publicVapid: process.env.REACT_APP_FIREBASE_PUBLIC_VAPID,
        configs: {
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_AUTH_DOMAIN,
          projectId: process.env.REACT_APP_PROJECT_ID,
          storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_MESSENGER_SENDER_ID,
          appId: process.env.REACT_APP_APP_ID,
          measurementId: process.env.REACT_APP_MEASUREMENT_ID,
        }
      }
};

export default SETTINGS;
