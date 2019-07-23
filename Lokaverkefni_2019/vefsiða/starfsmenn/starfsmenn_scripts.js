
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
var staff_info = document.querySelector("#description");
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

// Creates elements and renders "user_list".
function renderUserList(doc){
    
    // Creates elements.
    let li = document.createElement('li');
    let name = document.createElement('span');
    let staff_id = document.createElement('span');
    
    // Sets specific content in id to each element.
    li.setAttribute("data-id", doc.id);
    name.textContent = doc.data().staffName;
    staff_id.textContent = " :: " + doc.data().staffID;

    // Appends content into li.
    li.appendChild(name);
    li.appendChild(staff_id);

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

// Displays "add_staff" menu when the "add_button" is pressed.
document.getElementById("add_button").onclick = addStaffShow;
function addStaffShow(){
    var i = document.getElementById('dropdown_main');
    var x = document.getElementById('dropdown_remove');
    // Checks if the "remove_button" has been pressed and displays "dropdown_main" if it hasn't.
    if(x.style.display == "block"){
        removeStaffShow();
    }
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

// Displays "remove_staff" menu when the "remove_button" is pressed.
 document.getElementById("remove_button").onclick = removeStaffShow;
 function removeStaffShow(){
    var i = document.getElementById('dropdown_remove');
    var x = document.getElementById('dropdown_main');
    // Checks if the "add_button" has been pressed and displays "dropdown_remove" if it hasn't.
    if(x.style.display == "block"){
        addStaffShow();
    }
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

// Runs the function "addStaffToDatabase" when "save_button" is pressed.
// This function saves user input as a firestore document.
document.getElementById("save_button").onclick = function addStaffToDatabase(){
    var staff_name_in = document.querySelector("#staff_name_in");
    var staff_id_in = document.querySelector("#staff_id_in");
    var staff_mobile_in = document.querySelector("#staff_mobile_in");
    var staff_phoneNr_in = document.querySelector("#staff_phoneNr_in");
    var staff_email_in = document.querySelector("#staff_email_in");
    var staff_position_in = document.querySelector("#staff_position_in");

    // If either the "staff_id_in" or "staff_name_in" input fields are empty nothing will execute.
    if(staff_id_in.value == "FRS-" || staff_name_in.value == ""){
        }

    // If the "staff_id_in" or "staff_name_in" input fields contain text.
    else{
        // Displays a confirmation form with the information the user is adding to the database. 
        var answer = window.confirm("Bæta á við starfsmanni: " + staff_name_in.value + "\ná FRS-númeri: " + staff_id_in.value + ". ")
        // If the user confirms.
        if(answer){
            firestore.collection('Users').doc(staff_id_in.value).set({
                staffID: staff_id_in.value,
                staffName: staff_name_in.value,
                staffMobile: staff_mobile_in.value,
                staffPhoneNr: staff_phoneNr_in.value,
                staffEmail: staff_email_in.value,
                staffPosition: staff_position_in.value,


            });
            // Log confirmation message to console.
            console.log("Staff added!");
        }
        // If the user rejects.
        else{
        }
    }
    // Resets the default values of the inputs. 
    staff_name_in.value = "";
    staff_id_in.value = "FRS-";
    staff_mobile_in.value = "";
    staff_phoneNr_in.value = "";
    staff_email_in.value = "";
    staff_position_in.value = "";
}

// Runs the function "removeStaffFromDatabase" when "delete_button" is pressed.
// This function deletes user selected document from the firestore database.
document.getElementById("delete_button").onclick = function removeStaffFromDatabase(){
    var remove_staff_name_in = document.querySelector("#remove_staff_name_in");
    var remove_staff_id_in = document.querySelector("#remove_staff_id_in");
    // If either the "staff_id_in" or "staff_name_in" input fields are empty nothing will execute.
    if(remove_staff_id_in.value == "FRS-" && remove_staff_name_in.value == ""){
    }

    // If the "staff_id_in" or "staff_name_in" input fields contain text.
    else{
        // Displays a confirmation form with the information the user is deleting from the database. 
        var answer = window.confirm("Eyða á starfsmanni á FRS-númeri: " + remove_staff_id_in.value + ". ")
        // If the user confirms.
        if(answer){
            // Queries the firestore database for a spesific document determined by user input "staff_id_in".
            // Cycles through each document that matches the querying fields of "staff_id_in" and logs their firestore path to the console.
            firestore.collection("Users").where("staffID", "==", remove_staff_id_in.value).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    firestore.collection("Users").doc(doc.id).delete();
                });
            });
            // Log confirmation message to console.
            console.log("Staff deleted!");
        }
        // If the user rejects.
        else{
        }
    // Resets the default values of the inputs. 
    remove_staff_name_in.value = "";
    remove_staff_id_in.value = "FRS-";
    }
}

// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'starfsmenn.html'){
        // Gets a snapshot of documents inside the collection 'Users' and logs to console.
        firestore.collection('Users').orderBy('staffID').get().then((snapshot) => {
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
            if(nav_selector == 'verkfaeri' || nav_selector == 'staff_icon'){
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
