//Firebase configuration.
var firebaseConfig = {
    apiKey: "AIzaSyAQCv7N_Ca0My8g85_GnTFO632qn8UmnBc",
    authDomain: "fagraf-2019.firebaseapp.com",
    databaseURL: "https://fagraf-2019.firebaseio.com",
    projectId: "fagraf-2019",
    storageBucket: "fagraf-2019.appspot.com",
    messagingSenderId: "1072889478071",
    appId: "1:1072889478071:web:a8c6b621894abdab"
};
// Initialize Firebase.
firebase.initializeApp(firebaseConfig);

// Firestore key-functions variables.
var firestore = firebase.firestore();
var auth = firebase.auth();

// Global variables. 
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);