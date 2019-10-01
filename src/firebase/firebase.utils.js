import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const config = {
  apiKey: 'AIzaSyDHwM4PAA7XhqBpuyialsrD6T9tqCSWAhQ',
  authDomain: 'clothing-db-54498.firebaseapp.com',
  databaseURL: 'https://clothing-db-54498.firebaseio.com',
  projectId: 'clothing-db-54498',
  storageBucket: '',
  messagingSenderId: '321058574222',
  appId: '1:321058574222:web:8b906550bc2df256099edf',
  measurementId: 'G-P7T9CEMQ6D'
};
// Initialize Firebase
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
