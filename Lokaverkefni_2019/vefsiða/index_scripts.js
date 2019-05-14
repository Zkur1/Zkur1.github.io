
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
var tool_list = document.querySelector("#tool_list");
var tool_selector = "";
var tool_info = document.querySelector("#description");
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
var counter = 0;

// Creates elements and renders "tool_list".
function renderToolList(doc){
    
    // Creates elements.
    let li = document.createElement('li');
    let tool_name_id = document.createElement('span');
    
    // Sets specific content in id to each element.
    li.setAttribute("id", doc.id);
    li.setAttribute("sorting_nr", counter);
    tool_name_id.textContent = doc.data().toolName + " :: " +  doc.data().toolID;

    // Appends content into li.
    li.appendChild(tool_name_id);

    // Appends li to the tool_list (ul)
    tool_list.appendChild(li);

    // Adds "onclick" function to each element in the list.
    li.onclick = function goToTool(){
        tool_selector = li.getAttribute('id');
        localStorage.setItem("tool_selector", doc.id);
        window.open("verkfaeri/verkfaeri_default.html", "_self");
        
    }

    // Enables scrolling inside of a spescific div.
    document.addEventListener("touchstart", function(){}, true)
}


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'index.html'){
        // Gets a snapshot of first 10 documents inside the collection 'Tools' and renders new li element for each snapshot.
        firestore.collection('Tools').get().then((snapshot) => {
        snapshot.docs.slice(-10).forEach(doc => {
            renderToolList(doc);
            counter += 1;
        })
    })
}
}

testForPage();



