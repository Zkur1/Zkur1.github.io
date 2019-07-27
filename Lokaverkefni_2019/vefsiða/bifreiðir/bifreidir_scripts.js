
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
    li.setAttribute("id", doc.id);
    car_id.textContent = doc.data().carID + " :: " +  doc.data().manufacturer + " " + doc.data().model;

    // Appends content into li.
    li.appendChild(car_id);

    // Appends li to the user_list (ul)
    car_list.appendChild(li);

    // Adds "onclick" function to each element in the list.
    li.onclick = function goToCar(){
        car_selector = li.getAttribute('id');
        localStorage.setItem("car_selector", car_selector);
        console.log(car_selector);
        window.open("cars/bifreidir_default.html", "_self");   
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
    ul = document.getElementById("car_list");
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
document.getElementById("add_button").onclick = addToolShow;
function addToolShow(){
    var dropdown_main = document.getElementById('dropdown_main');
    var dropdown_remove = document.getElementById('dropdown_remove');
    var main = document.getElementById('main');
    // Checks if the "remove_button" has been pressed and displays "dropdown_main" if it hasn't.
    if(dropdown_remove.style.display == "block"){
        removeToolShow();
    }
    else{
        // Determines if the menu is being displayed and hides it or shows it accordingly. Also shrinks the "tool_list" to fit the page when a dropdown menu is shown. 
        if(dropdown_main.style.display == "block"){
            dropdown_main.style.display = "none";
            main.style.height = "66%";
        }
        else{
            dropdown_main.style.display = "block";
            main.style.height = "18%";
        }
    }
}

// Displays "remove_tool" menu when the "remove_button" is pressed.
 document.getElementById("remove_button").onclick = removeToolShow;
 function removeToolShow(){
    var dropdown_remove = document.getElementById('dropdown_remove');
    var dropdown_main = document.getElementById('dropdown_main');
    // Checks if the "add_button" has been pressed and displays "dropdown_remove" if it hasn't.
    if(dropdown_main.style.display == "block"){
        addToolShow();
    }
    else{
        // Determines if the menu is being displayed and hides it or shows it accordingly. Also shrinks the "tool_list" to fit the page when a dropdown menu is shown. 
        if(dropdown_remove.style.display == "block"){
            dropdown_remove.style.display = "none";
            main.style.height = "66%";
        }
        else{
            dropdown_remove.style.display = "block";
            main.style.height = "42%";
        }
    }
}

// Runs the function "addCarToDatabase" when "save_button" is pressed.
// This function saves user input as a firestore document.
document.getElementById("save_button").onclick = addCarToDatabase;
function addCarToDatabase(){
    var car_manufacturer_in = document.querySelector("#car_manufacturer_in");
    var car_model_in = document.querySelector("#car_model_in");
    var car_id_in = document.querySelector("#car_id_in");
    var car_model_year_in = document.querySelector("#car_model_year_in");
    var car_milage_in = document.querySelector("#car_milage_in");
    var car_checkup_date_in = document.querySelector("#car_checkup_date_in");
    

    // If the "car_id_in" input field is empty nothing will execute.
    if(car_id_in.value == ""){
        }

    // If the "car_id_in" input field contains text.
    else{
        // Displays a confirmation form with the information the user is adding to the database. 
        var answer = window.confirm("Bæta á við bifreið: " + car_manufacturer_in.value + " " + car_model_in.value + "\ná Bílnúmeri: " + car_id_in.value + ". ")
        // If the user confirms.
        if(answer){
            firestore.collection('Cars').add({
                manufacturer: car_manufacturer_in.value,
                model: car_model_in.value,
                carID: car_id_in.value,
                modelYear: car_model_year_in.value,
                milage: car_model_year_in.value,
                checkupDate: car_checkup_date_in.value,
            });
            // Log confirmation message to console.
            console.log("Car added!");
            // Resets the default values of the inputs. 
            car_manufacturer_in.value = "";
            car_model_in.value = "";
            car_id_in.value = "";
            car_model_year_in.value = "";
            car_milage_in.value = "";
            car_checkup_date_in.value = "";
        }
        // If the user rejects.
        else{
        }
    }
}

// Runs the function "removeCarFromDatabase" when "delete_button" is pressed.
// This function deletes user selected document from the firestore database.
document.getElementById("delete_button").onclick = removeCarFromDatabase;
function removeCarFromDatabase(){
    var remove_car_id_in = document.querySelector("#remove_car_id_in");
    // If the "car_id_in" input field is empty nothing will execute.
    if(remove_car_id_in.value == ""){
    }

    // If the "car_id_in" input field contains text.
    else{
        // Displays a confirmation form with the information the user is deleting from the database. 
        var answer = window.confirm("Eyða á bifreið á bílnúmeri: " + remove_car_id_in.value + ". ")
        // If the user confirms.
        if(answer){
            // Queries the firestore database for a spesific document determined by user input "car_id_in".
            // Cycles through each document that matches the querying fields of "car_id_in" and logs their firestore path to the console.
            firestore.collection("Cars").where("carID", "==", remove_car_id_in.value).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    firestore.collection("Cars").doc(doc.id).delete();
                    console.log(doc.id)
                });
            });
            // Log confirmation message to console.
            console.log("Car deleted!");
            
            // Resets the default values of the inputs. 
            remove_car_id_in.value = "";
        }
        // If the user rejects.
        else{
        }
    }
}


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'bifreidir.html'){
        // Detects any changes to the collection "Tools", snapshots them and updates the tool list accordingly.
        // Note: function "orderBy()" lists the objects in order of "toolID".
        firestore.collection('Cars').orderBy('carID').onSnapshot(snapshot => {
            var changes = snapshot.docChanges();
            // changes.slice(-10).forEach(doc =>   ---------------------- If you only want to display a finite number of elements (in this case 10 elements).
            changes.forEach(change => {
                if(change.type == 'added'){
                    renderCarList(change.doc);
                }
                else if(change.type == 'removed'){
                    var li = car_list.querySelector('[id=' + change.doc.id + ']');
                    car_list.removeChild(li);
                }
            });
        });

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
}

testForPage();
