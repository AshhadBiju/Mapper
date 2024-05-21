// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-r5o1rG-3pI6mlgie_SLvRZw_MSl37Qo",
  authDomain: "map-be-dc87c.firebaseapp.com",
  projectId: "map-be-dc87c",
  storageBucket: "map-be-dc87c.appspot.com",
  messagingSenderId: "907718820089",
  appId: "1:907718820089:web:f317f9886f9cdc0ab7e228",
  measurementId: "G-73PRL9DCYB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default getFirestore();
