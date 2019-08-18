// Global variables.
// Creates variables from the elements of the page to be used later.
var checkup_date = document.getElementById('checkup_date');
var new_checkup_date = document.getElementById('new_checkup_date');
var checkup_date_button = document.getElementById('checkup_date_button');
var save_checkup_date_button = document.getElementById("save_checkup_date_button");

var oil_change = document.getElementById('oil_change');
var new_oil_change = document.getElementById('new_oil_change');
var oil_change_button = document.getElementById('oil_change_button');
var save_oil_change_button = document.getElementById("save_oil_change_button");

var tire_change = document.getElementById('tire_change');
var new_tire_change = document.getElementById('new_tire_change');
var tire_change_button = document.getElementById('tire_change_button');
var save_tire_change_button = document.getElementById("save_tire_change_button");


// Displays all live data (data that can change) on the page and updates said data in real time. 
function displayLiveData(){
    // Listens for changes in the "chekcup_history" subcollection
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("checkup_history").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            liveMaintenanceData();
        });
    });

    // Listens for changes in the "oil_change_history" subcollection
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("oil_change_history").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            liveMaintenanceData();
        });
    });

    // Listens for changes in the "oil_change_history" subcollection
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("tire_change_history").onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            liveMaintenanceData();
        })
    });

    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).onSnapshot(function(){
        showCarStatus();
    });
}
      

// Reads specific document from the "Users" collection in the firestore database.
function displayCarData(){
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).get().then(function(doc) {
        
        // If the document is correctly read. 
        if (doc.exists) {
            // Logs the content of the document to the console. 
            console.log("Document data:", doc.data());
            // Creates elements to be displayed on the page.
            let car_id = document.createElement('h2');
            let car_make = document.createElement('h2');
            let car_model_year = document.createElement('h2');
            let car_loan_status = document.createElement('h2');
            let description_text = document.createElement('p');
            

            // Specifies both classes of the elements and their content. 
            car_id.setAttribute("class", 'car_id');
            car_id.textContent = "Bílnúmer: " + doc.data().carID;
             
            car_make.setAttribute("class", 'car_make');
            car_make.textContent = 'Tegund: ' + doc.data().manufacturer + " " + doc.data().model;
            
            car_model_year.setAttribute("class", 'car_model_year');
            car_model_year.textContent = 'Árgerð: ' + doc.data().modelYear;

            car_loan_status.setAttribute("id", "car_loan_status")

            description_text.setAttribute("class", 'car_id');
            description_text.textContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci incidunt molestiae porro odit illum modi fugit? Nemo, commodi. Atque natus reprehenderit architecto laborum ipsam cumque, facere veniam non possimus error.";

            // Adds the elements on the page.
            car_info.insertBefore(car_id , car_info.firstChild);
            car_info.appendChild(car_make);
            car_info.appendChild(car_model_year);
            car_info.appendChild(car_loan_status);
            car_info.appendChild(description_text);
        
        // If the document is not correctly read. 
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    // If an error accours when reading the document. 
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}



// Determines information to be desplayed in the "maintenance" portion of the page. 
function displayMaintenanceData(){
     // If the specific cars checkup history is blank. 
     if(checkup_date.textContent != ""){
        firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("checkup_history").orderBy("dateCreated", "desc").limit(1).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                new_checkup_date.placeholder = doc.data().checkupDate;
            });
        });
    }

    // If there are entries in the specific cars checkup history. 
    else{
        checkup_date.textContent = "Óskráð. ";
        new_checkup_date.placeholder = "00/00/000";
    }

     // If the specific cars oil change history is blank. 
     if(oil_change.textContent != ""){
        firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("oil_change_history").orderBy("dateCreated", "desc").limit(1).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                new_oil_change.placeholder = doc.data().oilChangeKm;
            });
        });
    }

    // If there are entries in the specific cars oil change history. 
    else{
        oil_change.textContent = "Óskráð. ";
        new_oil_change.placeholder = "00.000 km";
    }

     // If the specific cars tire change history is blank. 
     if(tire_change.textContent != ""){
        firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("tire_change_history").orderBy("dateCreated", "desc").limit(1).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                new_tire_change.placeholder = doc.data().tireChangeDate;
            });
        });
    }

    // If there are entries in the specific cars tire change history. 
    else{
        tire_change.textContent = "Óskráð. ";
        new_tire_change.placeholder = "00/00/0000";
    }
}




// Reads from the database and displays live information about the cars maintenance.
function liveMaintenanceData(){
    // Reads from the subcollection "checkup_history" of the cars document and uses the variable "checkupDate" from the subcollection to display the latest checkup date on the page. 
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("checkup_history").orderBy("dateCreated", "desc").limit(1).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            checkup_date.innerHTML = doc.data().checkupDate;
        });
    });
    
    // Reads from the subcollection "checkup_history" of the cars document and uses the variable "checkupDate" from the subcollection to display the latest checkup date on the page. 
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("oil_change_history").orderBy("dateCreated", "desc").limit(1).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            oil_change.innerHTML = doc.data().oilChangeKm + " km";
        });
    });

    // Reads from the subcollection "checkup_history" of the cars document and uses the variable "checkupDate" from the subcollection to display the latest checkup date on the page. 
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("tire_change_history").orderBy("dateCreated", "desc").limit(1).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            tire_change.innerHTML = doc.data().tireChangeDate;
        });
    });
}


// When the "history_button" is pressed a new history page opens. 
document.getElementById("history_button").onclick = function openHistoryPage(){
    window.open("vidhald_saga/vidhald_saga.html", "_self");
}


// Runs "newCheckupDate" when "checkup_date_button" is pressed. 
// The function controls displays inputfields for the user to update maintenance information and writes said information to the database.  
document.getElementById("checkup_date_button").onclick = newCheckupDate;
function newCheckupDate(){
    // Determines if either the "current_maintenance" variable or the "new_checkup_date" inputfield should be displayed and hides the other. 
    if(checkup_date.style.display == "block"){
        checkup_date.style.display = "none";
        new_checkup_date.style.display = "block";
        checkup_date_button.style.display = "none";
        save_checkup_date_button.style.display = "block";
        
    }
    
    // Executes the function "displayMaintenanceData" to determine the placeholder of "new_checkup_date".
    displayMaintenanceData();

    // Retrieves the name of the staff using the car and adds it to the variable "checkupStaff". 
    var checkup_staff = "";
    firestore.collection("Cars").doc(localStorage.getItem('car_selector')).get().then(function(doc){
        checkup_staff = doc.data().inUseBy;
    });

    // If the "save_checkup_date_button" is clicked. 
    save_checkup_date_button.onclick = saveCheckupDate;
    // Saves the users input to the database and resets the input field and button. 
    function saveCheckupDate(){
        if(new_checkup_date.value.length == 10){
            // Writes user input to the subcollection "maintenance_history" in the database. 
            firestore.collection('Cars').doc(localStorage.getItem('car_selector')).collection('checkup_history').add({
                checkupDate: new_checkup_date.value,
                checkupStaff: checkup_staff,
                dateCreated: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
            });
            
            // Hides the "save_checkup_date_button" button and displays "checkup_date_button".
            save_checkup_date_button.style.display = "none";
            checkup_date_button.style.display = "block"

            // Hides "new_checkup_date" and displays "checkup_date".
            new_checkup_date.style.display = "none";
            checkup_date.style.display = "block";

            // Clears the input field.
            new_checkup_date.value = "";
        }

        else{
            alert('ATH: Dagsetning þarf að vera á forminu 00/00/0000. ')
        }
    }
}


// Runs "newOilChange" when "oil_change_button" is pressed. 
// The function controls displays inputfields for the user to update maintenance information and writes said information to the database.
document.getElementById("oil_change_button").onclick = newOilChange;
function newOilChange(){
    // Determines if either the "current_maintenance" variable or the "new_oil_change" inputfield should be shown and hides the other. 
    if(oil_change.style.display == "block"){
        oil_change.style.display = "none";
        new_oil_change.style.display = "block";
        oil_change_button.style.display = "none";
        save_oil_change_button.style.display = "block";
        firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("oil_change_history").orderBy("dateCreated", "desc").limit(1).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                new_oil_change.placeholder = doc.data().oilChangeKm + " km";
            });
        });
    }

    // Retrieves the name of the staff using the car and adds it to the variable "oil_change_staff". 
    var oil_change_staff = "";
    firestore.collection("Cars").doc(localStorage.getItem('car_selector')).get().then(function(doc){
        oil_change_staff = doc.data().inUseBy;
    });

    // If the "save_oil_change_button" is clicked. 
    save_oil_change_button.onclick = saveOilChange;
    // Saves the users input to the database and resets the input field and button. 
    function saveOilChange(){
        if(new_oil_change.value.length != 0){
            // Writes user input to the subcollection "maintenance_history" in the database. 
            firestore.collection('Cars').doc(localStorage.getItem('car_selector')).collection('oil_change_history').add({
                oilChangeKm: new_oil_change.value,
                oilChangeStaff: oil_change_staff,
                dateCreated: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
            });
            
            // Hides the "save_oil_change_button" button and displays "oil_change_button".
            save_oil_change_button.style.display = "none";
            oil_change_button.style.display = "block"

            // Hides "new_oil_change" and displays "oil_change".
            new_oil_change.style.display = "none";
            oil_change.style.display = "block";

            // Clears the input field.
            new_oil_change.value = "";
        }

        else{
            alert("ATH: Vinsamlegast skráðu kílómetrafjölda. ")
        }
    }

}

// Runs "newTireChange" when "tire_change_button" is pressed. 
// The function controls displays inputfields for the user to update maintenance information and writes said information to the database.
document.getElementById("tire_change_button").onclick = newTireChange;
function newTireChange(){
    // Determines if either the "current_maintenance" variable or the "new_tire_change" input field should be shown and hides the other. 
    if(tire_change.style.display == "block"){
        tire_change.style.display = "none";
        new_tire_change.style.display = "block";
        tire_change_button.style.display = "none";
        save_tire_change_button.style.display = "block";
        firestore.collection("Cars").doc(localStorage.getItem("car_selector")).collection("tire_change_history").orderBy("dateCreated", "desc").limit(1).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                new_tire_change.placeholder = doc.data().tireChangeDate;
            });
        });
    }

    // Retrieves the name of the staff using the car and adds it to the variable "tire_change_staff". 
    var tire_change_staff = "";
    firestore.collection("Cars").doc(localStorage.getItem('car_selector')).get().then(function(doc){
        tire_change_staff = doc.data().inUseBy;
    });

    // If the "save_tire_change_button" is clicked. 
    save_tire_change_button.onclick = saveTireChange;
    // Saves the users input to the database and resets the input field and button. 
    function saveTireChange(){
        if(new_tire_change.value.length == 10){
            // Writes user input to the subcollection "maintenance_history" in the database. 
            firestore.collection('Cars').doc(localStorage.getItem('car_selector')).collection('tire_change_history').add({
                tireChangeDate: new_tire_change.value,
                tireChangeStaff: tire_change_staff,
                dateCreated: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
            });
            
            // Hides the "save_tire_change_button" button and displays "tire_change_button".
            save_tire_change_button.style.display = "none";
            tire_change_button.style.display = "block"

            // Hides "new_tire_change" and displays "tire_change".
            new_tire_change.style.display = "none";
            tire_change.style.display = "block";

            // Clears the input field.
            new_tire_change.value = "";
        }

        else{
            alert("ATH: Dagsetning þarf að vera á forminu 00/00/0000. ")
        }
    }
}


// Resets all input fields and buttons in the "maintenance" section to "current_maintenance". 
document.getElementById("cancel_button").onclick = cancelMaintenanceUpdate;
function cancelMaintenanceUpdate(){  
    // Resets fields for "checkup_date" section
    if(checkup_date.style.display == "none"){
        new_checkup_date.style.display = "none";
        new_checkup_date.value = "";
        checkup_date.style.display = "block";
        save_checkup_date_button.style.display = "none";
        checkup_date_button.style.display = "block";
    }

    // Resets fields for "oil_change" section
    if(oil_change.style.display == "none"){
        new_oil_change.style.display = "none";
        new_oil_change.value = "";
        oil_change.style.display = "block";
        save_oil_change_button.style.display = "none";
        oil_change_button.style.display = "block";
    }
    
    // Resets fields for "tire_change" section
    if(tire_change.style.display == "none"){
        new_tire_change.style.display = "none";
        new_tire_change.value = "";
        tire_change.style.display = "block";
        save_tire_change_button.style.display = "none";
        tire_change_button.style.display = "block";
    }
}


// Displays a menu to loan a car if its "inUse" varible is false and a menu to return the car if the variable is true.
function showCarStatus(){
    var in_stock = document.getElementById('in_stock');
    var out_of_stock = document.getElementById('out_of_stock');
    // References the variable "docRef" made previously to communicate with firestore.
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).get().then(function(doc) {
        // If the document is correctly read. 
        if(doc.exists) {
            // if "inUse" is true the menu for returning the car will be displayed.
            if(doc.data().inUse == true){
                in_stock.style.display = "none";
                out_of_stock.style.display = "block";
            }
            // if "inUse" is false the menu for loaning the car will be displayed.
            else{
                in_stock.style.display = "block";
                out_of_stock.style.display = "none";
            }
            
            // Updates the cars status indicator at the top of the page.
            var car_loan_status = document.getElementById("car_loan_status")

            // If the car is being used/loaned.
            if(doc.data().inUse == true){
                // Changes the class and text content of the element to suit its current state. 
                car_loan_status.setAttribute("class", 'car_out_of_stock');
                car_loan_status.textContent = "Bifreið skráð á : " + doc.data().inUseBy;
                
                // Reads from the "Users" subcollection and appends staffName to the "car_loan_status".
                firestore.collection('Users').where("staffID", "==", doc.data().inUseBy).get().then((snapshot) =>{
                    snapshot.docs.forEach(doc => {
                        car_loan_status.textContent += " / " + doc.data().staffName;
                    });
                });
            }

            // If the car is available. 
            else{
                // Changes the class and text content of the element to suit its current state. 
                car_loan_status.setAttribute("class", 'car_in_stock');
                car_loan_status.textContent = "Bifreið er laus. "
            }
        }
    });
}


// Runs the function "loanCar" when "save_button" is pressed.
document.getElementById("save_button").onclick = loanCar;
function loanCar(){
    // Fetches input tags on the html and puts them into variables to be used later. 
    var user_name_in = document.querySelector("#user_name_in");
    firestore.collection('Cars').doc(localStorage.getItem("car_selector")).update({
        inUse: true,
        inUseBy: user_name_in.value,
    })
    
    // Creates an "in_out" subcollection to the firestore document and appends variables intended to store data about the loan of the car. 
    firestore.collection('Cars').doc(localStorage.getItem("car_selector")).collection("in_out").add({
        checkOutDate: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
        checkOutUser: user_name_in.value,
        checkInDate: "",
        checkInUser: "",
    })

    // Resets the input fields. 
    user_name_in.value = "FRS-";
}


// Runs the function "returnCar" when "return_button" is pressed.
document.getElementById("return_button").onclick = returnCar;
function returnCar(){
    // Fetches input tags on the html and puts them into variables to be used later. 
    var return_user_name_in = document.querySelector("#return_user_name_in");
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).get().then(function(doc) {
        // If the document is correctly read. 
        if(doc.exists) {
            // if "inUseBy" mathces with the user input the menus will switch and variables regarding the loan will change accordingly. 
            firestore.collection('Cars').doc(localStorage.getItem("car_selector")).update({
                inUse: false,
                inUseBy: "",
            });

            // Logs who returns the car and when and logs it to variables stored in the subcollection "in_out".
            firestore.collection('Cars').doc(localStorage.getItem("car_selector")).collection("in_out").orderBy("checkOutDate", "desc").limit(1).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    firestore.collection('Cars').doc(localStorage.getItem("car_selector")).collection("in_out").doc(doc.id).update({
                        checkInDate: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
                        checkInUser: return_user_name_in.value,
                    });
                });
            });
        }
    });

    // Clears input field. 
    //return_user_name_in.value = "FRS-";
}


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
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
                window.open("../../index.html", "_self");
                }
            else if(nav_selector == 'bifreidir' || nav_selector == 'car_icon'){
                window.open('../../bifreiðir/bifreidir.html','_self')
                }
            else if(nav_selector == 'starfsmenn' || nav_selector == 'staff_icon'){
                window.open('../../starfsmenn/starfsmenn.html','_self')
                }
            else if(nav_selector == 'bifreidir' || nav_selector == 'settings_icon'){
                window.open('../../stillingar/stillingar.html','_self')
                }
            }   
    
        }
}
    

testForPage();
displayCarData();
displayLiveData();
displayMaintenanceData();
