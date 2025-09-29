// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgXOvtxtr2X1BYFAb0LMjBvoPRPLkSEyU",
  authDomain: "wa-clone-45d03.firebaseapp.com",
  projectId: "wa-clone-45d03",
  storageBucket: "wa-clone-45d03.firebasestorage.app",
  messagingSenderId: "133917265347",
  appId: "1:133917265347:web:39147999f3668882e6c176"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore=getFirestore(app);
export { auth, firestore }