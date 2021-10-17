import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBUxfhHnxCt0d4-sPfqWKh44oxUD3MWmyI",
  authDomain: "insta-clone-nextjs.firebaseapp.com",
  projectId: "insta-clone-nextjs",
  storageBucket: "insta-clone-nextjs.appspot.com",
  messagingSenderId: "760362071825",
  appId: "1:760362071825:web:ee2962adc641f0e36bfeb0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore();
const storage = getStorage();

export { app, db, storage }