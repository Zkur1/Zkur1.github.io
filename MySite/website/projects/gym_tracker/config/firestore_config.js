//Firebase configuration.
var firebaseConfig = {
    apiKey: "AIzaSyCryZT0PFrzfnTKupOyo3ECuOS-16SUkR4",
    authDomain: "askur-s-website.firebaseapp.com",
    databaseURL: "https://askur-s-website.firebaseio.com",
    projectId: "askur-s-website",
    storageBucket: "askur-s-website.appspot.com",
    messagingSenderId: "1050532837660",
    appId: "1:1050532837660:web:b736123f1e4041cee4e2d9",
    measurementId: "G-94P2ZNQF5W"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Firestore key-functions variables.
  var firestore = firebase.firestore();
  
  // Global variables. 
  var sPath = window.location.pathname;
  var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
  