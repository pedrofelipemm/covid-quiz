import firebase from 'firebase/app';
import 'firebase/firestore';

export default function initDb() {
  const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app();
  }

  return firebase;
}
