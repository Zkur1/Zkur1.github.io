// Reads specific document from the "Users" collection in the firestore database.
function readCarData(){
    var docRef = firestore.collection("Cars").doc(localStorage.getItem("car_selector"));
    docRef.get().then(function(doc) {
        
        // If the document is correctly read. 
        if (doc.exists) {
            // Logs the content of the document to the console. 
            console.log("Document data:", doc.data());
            // Creates elements to be displayed on the page.
            let car_id = document.createElement('h2');
            let car_make = document.createElement('h2');
            let car_model_year = document.createElement('h2');
            let description_text = document.createElement('p');
            

            // Specifies both classes of the elements and their content. 
            car_id.setAttribute("class", 'car_id');
            car_id.textContent = "Bílnúmer: " + doc.data().carID;
             
            car_make.setAttribute("class", 'car_make');
            car_make.textContent = 'Tegund: ' + doc.data().manufacturer + " " + doc.data().model;
            
            car_model_year.setAttribute("class", 'car_model_year');
            car_model_year.textContent = 'Árgerð: ' + doc.data().modelYear;

            description_text.setAttribute("class", 'car_id');
            description_text.textContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci incidunt molestiae porro odit illum modi fugit? Nemo, commodi. Atque natus reprehenderit architecto laborum ipsam cumque, facere veniam non possimus error.";

            // Adds the elements on the page.
            car_info.insertBefore(car_id , car_info.firstChild);
            car_info.appendChild(car_make);
            car_info.appendChild(car_model_year);
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

// Runs "newCheckupDate" when "checkup_date_button" is pressed. 
// The function controls displays inputfields for the user to update maintenance information and writes said information to the database.  
document.getElementById("checkup_date_button").onclick = newCheckupDate;
function newCheckupDate(){
    var checkup_date = document.getElementById('checkup_date');
    var new_checkup_date = document.getElementById('new_checkup_date');
    var checkup_date_button = document.getElementById('checkup_date_button');
    var save_checkup_date_button = document.getElementById("save_checkup_date_button");
    // Determines if either the "current_maintenance" variable or the "new_checkup_date" inputfield should be displayed and hides the other. 
    if(checkup_date.style.display == "block"){
        checkup_date.style.display = "none";
        new_checkup_date.style.display = "block";
        checkup_date_button.style.display = "none";
        save_checkup_date_button.style.display = "block";
    }

    save_checkup_date_button.onclick = saveCheckupDate;
    function saveCheckupDate(){
        if(new_checkup_date.value.length == 10){
            // Writes user input to the subcollection "maintenance_history" in the database. 
            firestore.collection('Cars').doc(localStorage.getItem('car_selector')).collection('maintenance_history').add({
                checkupDate: new_checkup_date.value,
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
    var oil_change = document.getElementById('oil_change');
    var new_oil_change = document.getElementById('new_oil_change');
    var oil_change_button = document.getElementById('oil_change_button');
    var save_oil_change_button = document.getElementById('save_oil_change_button');

    // Determines if either the "current_maintenance" variable or the "new_oil_change" inputfield should be shown and hides the other. 
    if(oil_change.style.display == "block"){
        oil_change.style.display = "none";
        new_oil_change.style.display = "block";
        oil_change_button.style.display = "none";
        save_oil_change_button.style.display = "block";
    }

    save_oil_change_button.onclick = saveOilChange;
    function saveOilChange(){
        if(new_oil_change.value.length != 0){
            // Writes user input to the subcollection "maintenance_history" in the database. 
            firestore.collection('Cars').doc(localStorage.getItem('car_selector')).collection('maintenance_history').add({
                oilChangeKm: new_oil_change.value,
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
    var tire_change = document.getElementById('tire_change');
    var new_tire_change = document.getElementById('new_tire_change');
    var tire_change_button = document.getElementById('tire_change_button');
    var save_tire_change_button = document.getElementById('save_tire_change_button');


    // Determines if either the "current_maintenance" variable or the "new_tire_change" input field should be shown and hides the other. 
    if(tire_change.style.display == "block"){
        tire_change.style.display = "none";
        new_tire_change.style.display = "block";
        tire_change_button.style.display = "none";
        save_tire_change_button.style.display = "block";
    }

    save_tire_change_button.onclick = saveTireChange;
    function saveTireChange(){
        if(new_tire_change.value.length == 10){
            // Writes user input to the subcollection "maintenance_history" in the database. 
            firestore.collection('Cars').doc(localStorage.getItem('car_selector')).collection('maintenance_history').add({
                tireChangeKm: new_tire_change.value,
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
    



// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'bifreidir_default.html'){
        readCarData();
        }
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
