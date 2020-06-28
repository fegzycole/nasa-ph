/* eslint-disable camelcase */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const {
  REACT_APP_apiKey,
  REACT_APP_authDomain,
  REACT_APP_databaseURL,
  REACT_APP_projectId,
  REACT_APP_storageBucket,
  REACT_APP_messagingSenderId,
  REACT_appId,
} = process.env;

const config = {
  apiKey: REACT_APP_apiKey,
  authDomain: REACT_APP_authDomain,
  databaseURL: REACT_APP_databaseURL,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_appId,
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // eslint-disable-next-line no-use-before-define
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  // eslint-disable-next-line consistent-return
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export default firebase;
