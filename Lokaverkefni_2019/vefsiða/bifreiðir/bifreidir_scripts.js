
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

// Global varibles.
var car_list = document.querySelector("#car_list");
var car_selector = "";
var car_info = document.querySelector("#description");
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

// Creates elements and renders "user_list".
function renderCarList(doc){
    
    // Creates elements.
    let li = document.createElement('li');
    let car_id = document.createElement('span');

    
    // Sets specific content in id to each element.
    li.setAttribute("data-id", doc.id);
    car_id.textContent = doc.data().carID + " :: " +  doc.data().carMake;

    // Appends content into li.
    li.appendChild(car_id);

    // Appends li to the user_list (ul)
    car_list.appendChild(li);

    // Adds "onclick" function to each element in the list.
    li.onclick = function goToStaff(){
        car_selector = li.getAttribute('data-id');
        localStorage.setItem("car_selector", car_selector);
        console.log(car_selector);
        window.open("cars/bifreidir_default.html", "_self");
        
    }
    
    // Enables scrolling inside of a spescific div.
    document.addEventListener("touchstart", function(){}, true)
}

console.log(sPage.trim())
// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'bifreidir.html'){
        // Gets a snapshot of documents inside the collection 'Users' and logs to console.
        firestore.collection('Cars').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderCarList(doc);
            console.log(doc.id)
        })
    })
}
}
testForPage();



