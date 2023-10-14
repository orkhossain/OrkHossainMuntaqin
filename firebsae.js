// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgDPxARoZNo1s-G9zQofdLX2RpEO39yq4",
  authDomain: "portfolio-b12ff.firebaseapp.com",
  projectId: "portfolio-b12ff",
  storageBucket: "portfolio-b12ff.appspot.com",
  messagingSenderId: "414998079538",
  appId: "1:414998079538:web:70b6eb2508b01d3448342b",
  measurementId: "G-3WTSX13HJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);