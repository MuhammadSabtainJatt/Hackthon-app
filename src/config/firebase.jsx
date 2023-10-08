import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD7USCaP7eQSn2zfKHFWNVIWGp1nI57h9A",
  authDomain: "hackathon-app-wmad6-93848.firebaseapp.com",
  projectId: "hackathon-app-wmad6-93848",
  storageBucket: "hackathon-app-wmad6-93848.appspot.com",
  messagingSenderId: "617104172330",
  appId: "1:617104172330:web:154fb232c6eec55c266a53",
  measurementId: "G-JR9RXEZ799"
};



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export{analytics,firestore,auth}