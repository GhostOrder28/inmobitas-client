import { initializeApp } from 'firebase/app';
import {
  getAuth,
} from 'firebase/auth';
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDuS4XAjDioLf4Mms9mowLlAwwbZqjrVxQ",
  authDomain: "real-estate-management-a-d76d7.firebaseapp.com",
  projectId: "real-estate-management-a-d76d7",
  storageBucket: "real-estate-management-a-d76d7.appspot.com",
  messagingSenderId: "1026746993507",
  appId: "1:1026746993507:web:4c48da16dd1098bd6b6156"
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
