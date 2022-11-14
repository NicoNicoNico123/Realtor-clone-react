// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_hh1cCE7kyKLjVQA7C5kfMoPcH4XbcLc",
  authDomain: "realtor-clone-react-1a692.firebaseapp.com",
  projectId: "realtor-clone-react-1a692",
  storageBucket: "realtor-clone-react-1a692.appspot.com",
  messagingSenderId: "539617858450",
  appId: "1:539617858450:web:2a8e57bcc2ac043a1aa74b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();