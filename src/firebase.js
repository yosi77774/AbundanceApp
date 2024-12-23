import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAMX05gCSPrOWEuTex35lPAavZFGed90MU",
    authDomain: "abundance-app.firebaseapp.com",
    projectId: "abundance-app",
    storageBucket: "abundance-app.appspot.com", // תיקון הכתובת
    messagingSenderId: "885994122748",
    appId: "1:885994122748:web:9432f4b2c63bc1bacd5679",
    measurementId: "G-406FL6S5ZM"
};

// אתחול Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
