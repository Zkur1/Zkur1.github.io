//Firebase configuration.
var firebaseConfig = {
    apiKey: "AIzaSyD_AIuy570j-oPay1rbdyK8HbNA5LmP3DQ",
    authDomain: "fagraf-abcf3.firebaseapp.com",
    databaseURL: "https://fagraf-abcf3.firebaseio.com",
    projectId: "fagraf-abcf3",
    storageBucket: "gs://fagraf-abcf3.appspot.com",
    messagingSenderId: "893547299015",
    appId: "1:893547299015:web:96a2793a72c7f717c87ee2"
  };

// Initialize Firebase.
firebase.initializeApp(firebaseConfig);

// Firestore key-functions variables.
var firestore = firebase.firestore();
var auth = firebase.auth();

// Global variables. 
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
