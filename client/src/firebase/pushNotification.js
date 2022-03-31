import firebaseApp from './firebaseApp';
import 'firebase/messaging';
import usersService from "services/usersService";
import { isLoggedIn } from "services/authService";

export const initializeFirebase = () => {
  navigator.serviceWorker
    .register('./service-worker-sync.js')
    .then( (registration) => {
        firebaseApp.messaging().useServiceWorker(registration);
    });
}

const messaging = firebaseApp.messaging();
export const askForPermissionToReceiveNotifications = async () => {
  try {
    await messaging.requestPermission();
    messaging.usePublicVapidKey(process.env.REACT_APP_PUBLIC_VAPID_KEY_ORG);
    const token = await messaging.getToken();
    sendTokenToServer(token);
    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then(refreshedToken => {
          setTokenSentToServer(false);
          sendTokenToServer(refreshedToken);
        })
        .catch(err => {
          console.log("Unable to retrieve refreshed token ", err);
        });
    });
    messaging.onMessage(payload => {
      const { notification: { body, title, click_action } } = payload;
      console.log("Message received. ", body, title, click_action);
      let host = "/";
      if (click_action) {
        host = click_action.replace(/(.+\/\/[^/]+\/)/g, "/");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const isTokenSentToServer = () => {
  return window.localStorage.getItem("sentToServer") === "1";
};

const setTokenSentToServer = sent => {
  window.localStorage.setItem("sentToServer", sent ? "1" : "0");
};

const sendTokenToServer = async (token) => {
  if (!isTokenSentToServer()) {
      try {
        console.log("Sending token to server...");
        const currentUser = isLoggedIn();
        await usersService.sendFirebaseToken(currentUser.id, { firebaseToken: token, deviceType: "web" });
        console.log("Token successfully sent to server...");
        setTokenSentToServer(true);
      } catch(err) {
        console.log("Token sending failed...", err);
      }
  } else {
    console.log("Token already sent to server so won't send it again unless it changes");
  }
};