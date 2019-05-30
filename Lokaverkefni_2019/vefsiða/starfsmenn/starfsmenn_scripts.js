
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
var user_list = document.querySelector("#user_list");
var user_selector = "FRS-002";
var user_info = document.querySelector("#description");
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

// Creates elements and renders "user_list".
function renderUserList(doc){
    
    // Creates elements.
    let li = document.createElement('li');
    let name = document.createElement('span');
    let user_id = document.createElement('span');
    
    // Sets specific content in id to each element.
    li.setAttribute("data-id", doc.id);
    name.textContent = doc.data().firstName + " " +  doc.data().lastName;
    user_id.textContent = " :: " + doc.data().userID;

    // Appends content into li.
    li.appendChild(name);
    li.appendChild(user_id);

    // Appends li to the user_list (ul)
    user_list.appendChild(li);

    // Adds "onclick" function to each element in the list.
    li.onclick = function goToStaff(){
        user_selector = li.getAttribute('data-id');
        localStorage.setItem("user_selector", user_selector);
        console.log(user_selector);
        window.open("staff/staff_default.html", "_self");
        
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
    ul = document.getElementById("user_list");
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


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'starfsmenn.html'){
        // Gets a snapshot of documents inside the collection 'Users' and logs to console.
        firestore.collection('Users').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderUserList(doc);
            console.log(doc.id)
                })
            })
        }   
    // Checks if page is being viewed on a smartphone and displays navbar accordinly. 
    if (/Mobi/.test(navigator.userAgent)) {
        document.getElementById('navigation').style.display = 'none';     
        document.getElementById('m_navigation').style.display = 'block';
        
        // Assigns 'nav_ul' to a varible to be used later.
        var nav_ul = document.getElementById('nav_ul');
        // When 'nav_ul' (the mobile navbar) is clicked.
        nav_ul.onclick = function(event){
            // Checks which button on the navbar was pressed.
            function getEventTarget(nav_li){
                nav_li = nav_li || window.event;
                return nav_li.target || nav_li.srcElement; 
                }
            // Fetches the id tag for the button that has been pressed.
            var target = getEventTarget(event);
            var nav_selector = target.getAttribute('id');

            // Goes to different site depending on which button is pressed. 
            if(nav_selector == 'verkfaeri' || nav_selector == 'tool_icon'){
                window.open("../index.html", "_self");
                }
            else if(nav_selector == 'bifreidir' || nav_selector == 'car_icon'){
                window.open('../bifreiðir/bifreidir.html','_self')
                }
            else if(nav_selector == 'starfsmenn' || nav_selector == 'staff_icon'){
                window.open('../starfsmenn/starfsmenn.html','_self')
                }
            else if(nav_selector == 'bifreidir' || nav_selector == 'settings_icon'){
                window.open('../stillingar/stillingar.html','_self')
                }
            }   

        }
}
testForPage();



