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
var tool_info = document.querySelector("#description");
var add_remove = document.querySelector("#add_remove");
var tool_selector = "";
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


// Displays list items as the user types in a dropdown fashion.
function searchDropdown() {
    // Creates variable to be used in the searchloop.
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search_bar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("tool_list");
    li = ul.getElementsByTagName("li");
    // Loops through all items in list and hides those who don't match the search query.
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("span")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


// Displays "add_tool" menu when the "add_button" is pressed.
document.getElementById("add_button").onclick = function addToolShow(){
    var i = document.getElementById('dropdown_main');
    var x = document.getElementById('dropdown_remove');
    // Checks if the "remove_button" has been pressed and displays "dropdown_main" if it hasn't.
    if(x.style.display == "block"){}
    else{
        // Determines if the menu is being displayed and hides it or shows it accordingly. 
        if(i.style.display == "block"){
            i.style.display = "none";
        }
        else{
            i.style.display = "block";
        }
    }
}

// Displays "add_tool" menu when the "add_button" is pressed.
document.getElementById("remove_button").onclick = function removeToolShow(){
    var i = document.getElementById('dropdown_remove');
    var x = document.getElementById('dropdown_main');
    // Checks if the "add_button" has been pressed and displays "dropdown_remove" if it hasn't.
    if(x.style.display == "block"){}
    else{
        // Determines if the menu is being displayed and hides it or shows it accordingly. 
        if(i.style.display == "block"){
            i.style.display = "none";
        }
        else{
            i.style.display = "block";
        }
    }
}

// Makes sure this javascript file is only run on a specific page.
function testForPage(){
    if(sPage.trim() === 'index.html'){
        // Gets a snapshot of first 10 documents inside the collection 'Tools' and renders new li element for each snapshot.
        firestore.collection('Tools').get().then((snapshot) => {
        //snapshot.docs.slice(-10).forEach(doc =>   ---------------------- If you only want to display a finite number of elements.
            snapshot.docs.forEach(doc => {
            renderToolList(doc);
            counter += 1;
        })
    })

    if (/Mobi/.test(navigator.userAgent)) {
        document.getElementById('navigation').style.display = 'none';
    }
}
}


testForPage();



