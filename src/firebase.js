// Import the functions you need from the SDKs you need

import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWi4oEv-ZlmInopObqWeM7Lav0F9iCHNY",
    authDomain: "linkedin-clone-743ff.firebaseapp.com",
    projectId: "linkedin-clone-743ff",
    storageBucket: "linkedin-clone-743ff.appspot.com",
    messagingSenderId: "159614907658",
    appId: "1:159614907658:web:539d2ad8407b94cca876f3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage();

export {auth, provider, storage, db}
