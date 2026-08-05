/*=========================================
Picker Shop BD
Firebase Configuration
Version : 1.0
=========================================*/

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

/*=========================================
Firebase Config
Replace with your own Firebase project config
=========================================*/

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId: "YOUR_SENDER_ID",

    appId: "YOUR_APP_ID"

};

/*=========================================
Initialize Firebase
=========================================*/

const app = initializeApp(firebaseConfig);

/*=========================================
Services
=========================================*/

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

/*=========================================
Export
=========================================*/

export {

    app,

    auth,

    db,

    storage

};

console.log("Firebase Initialized Successfully");
