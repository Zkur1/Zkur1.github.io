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

var car_selector = localStorage.getItem("car_selector");

var original_dimensions = window.innerWidth + window.innerHeight;



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


    // Live Function! runs functions responsible for displaying live data on the site. 
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).onSnapshot(function(){
        showCarStatus();
        showCarDesc();
        renderCarImg();
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

            // Specifies both classes of the elements and their content. 
            car_id.setAttribute("class", 'car_id');
            car_id.textContent = "Bílnúmer: " + doc.data().carID;
             
            car_make.setAttribute("class", 'car_make');
            car_make.textContent = 'Tegund: ' + doc.data().manufacturer + " " + doc.data().model;
            
            car_model_year.setAttribute("class", 'car_model_year');
            car_model_year.textContent = 'Árgerð: ' + doc.data().modelYear;

            car_loan_status.setAttribute("id", "car_loan_status");

            // Adds the elements on the page.
            car_info.insertBefore(car_loan_status, car_info.firstChild);
            car_info.insertBefore(car_model_year, car_info.firstChild);
            car_info.insertBefore(car_make, car_info.firstChild);
            car_info.insertBefore(car_id , car_info.firstChild);
        } 
        // If the document is not correctly read. 
        else{
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
    // If an error accours when reading the document. 
    }).catch(function(error) {
        console.log("Error getting document:", error);
        });
}


// Reads from the database and shows up do date description of the car. 
function showCarDesc(){
    firestore.collection("Cars").doc(localStorage.getItem("car_selector")).get().then(function(doc) {
        // If the document is correctly read. 
        if(doc.exists){
            var description_text = document.getElementById("description_text");
            var inner_text = ""

            // Reads the "description" variable of the car from the database and appends its content to the local variable "inner_text".
            firestore.collection('Cars').doc(car_selector).get().then(function(doc){
                inner_text = doc.data().description;
            });

            // Makes sure the code above has excuted an then appends the content of the "inner_text" variable to the element "description_text". 
            firestore.collection('Cars').doc(car_selector).onSnapshot(function(){
                description_text.innerText = inner_text;

                // Changes the description text to basic "click me" text if the database variable == undefined. 
                if(description_text.innerHTML == "undefined" || description_text.innerHTML == ""){
                    description_text.innerHTML = "Ýttu til að bæta við lýsingu. ";
                }
            })
        } 
        // If the document is not correctly read. 
        else{
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    // Catches any errors. 
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}


// Either shows or hides the "description_text" editor menu and saves the user input to the "description" variable in the database.
description_text = document.getElementById("description_text");
description_text.addEventListener("click", EditDescText);
function EditDescText(){
    var desc_save_button = document.getElementById("desc_save_button");
    var desc_cancel_button = document.getElementById("desc_cancel_button");

    // Shows the editor menu when the textblock is clicked and adds a background and border. 
    if(desc_save_button.style.display == "none"){
        desc_save_button.style.display = "block";
        desc_cancel_button.style.display = "block";
        description_text.style.cssText += "border: solid; border-width: 1px; background: #e2e2e2";
        // If the description text placeholder is being displayed. 
        if(description_text.innerHTML == "Ýttu til að bæta við lýsingu. "){
            description_text.innerHTML = "";
}
    }

    // Hides the editor menu when the "desc_cancel_button" is clicked. 
    desc_cancel_button.onclick = function closeDescEdit(){
        desc_save_button.style.display = "none";
        desc_cancel_button.style.display = "none";
        description_text.style.cssText = "";
        showCarDesc();
    }

    // Saves user input to the "description" variable in the database on click of the "desc_save_button". 
    desc_save_button.onclick = function saveDescEdit(){
        firestore.collection('Cars').doc(car_selector).update({
            description: description_text.innerText,
        });

        // Makes sure the code above executes and then hides the editor menu. 
        firestore.collection('Cars').doc(car_selector).onSnapshot(function(){
            desc_save_button.style.display = "none";
            desc_cancel_button.style.display = "none";
            description_text.style.cssText = "";
        });
    }
}


// Fetches the image corrosponding to the car and displays on the page. 
function renderCarImg(){
    // A variable to be used in the function below. 
    var uploaded_file_name = ""
    var img_url = ""

    // Accesses the specific cars' document field "carID" and appends its' value to the variable "uploaded_file_name". 
    firestore.collection('Cars').doc(localStorage.getItem("car_selector")).get().then(function(doc){
        uploaded_file_name = doc.data().carID;
    });

    // Makes sure that the value of "uploaded_file_name" is updated before executing the rest of the funciton. 
    firestore.collection('Cars').doc(localStorage.getItem("car_selector")).onSnapshot(function(){
        // Creates a referance to a folder in the storage bucket. 
        var storageRef = firebase.storage().ref('bifreidir_myndir/' + uploaded_file_name);
        
        // Creates a referance to the url of the uploaded image. 
        storageRef.getDownloadURL().then(function(url){
            img_url = url;
            var car_logo = document.getElementById("car_logo");
            car_logo.setAttribute("src", url);

        // Catches any errors. 
        }).catch(function(error) {
            console.log("Error getting document:", error);
            });

        // if the car has no associated image a placeholder image will be displayd. 
        if(img_url == ""){
            car_logo.setAttribute("src", "../../../myndir/image-placeholder.jpg");
        }
    });
}


// Displays the div "photo_upload" (a menu to change the cars' image) when the "update_logo_button" button is pressed. 
var update_logo_button = document.getElementById('update_logo_button');
update_logo_button.onclick = updateCarLogo;
function updateCarLogo(){
    var photo_upload = document.getElementById('photo_upload');
    // Displays the "photo_upload" menu if hidden.
    if(photo_upload.style.display == "none"){
        photo_upload.style.display = "flex";
        update_logo_button.setAttribute("src", "../../../myndir/minus.png");
    }

    // Hides the "photo_upload" menu if shown. 
    else{
        photo_upload.style.display = "none";
        update_logo_button.setAttribute("src", "../../../myndir/add.jpg");

    }
}


// Uploads an image supplied by the user to the projects storage bucket. 
var upload_button = document.getElementById('upload_button');
upload_button.addEventListener('change', function(uploadFile) {
    // Receives a file from the user. 
    var file = uploadFile.target.files[0];

    // A variable to be used in the function below. 
    var uploaded_file_name = ""

    // Accesses the specific cars' document field "carID" and appends its' value to the variable "uploaded_file_name". 
    firestore.collection('Cars').doc(localStorage.getItem("car_selector")).get().then(function(doc){
        uploaded_file_name = doc.data().carID;
    });

    // Makes sure that the value of "uploaded_file_name" is updated before executing the rest of the funciton. 
    firestore.collection('Cars').doc(localStorage.getItem("car_selector")).onSnapshot(function(){
        // Creates a referance to a folder in the storage bucket. 
        var storageRef = firebase.storage().ref('bifreidir_myndir/' + uploaded_file_name);

        // Uploads the received file to the storage bucket. 
        var task = storageRef.put(file);

        // Updates the progress bar in real time. 
        task.on('state_changed', 
            
            function progress(snapshot){
                var precentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = precentage;
            },

            // Catches any errors that occur. 
            function error(err){

            },

            // Executes when everything above finishes. 
            function complete(){
                // Executes the funtion "renderCarImg"
                renderCarImg();

                // Hides the "photo_upload" menu after the user updates the "car_logo" by executing the function "updateCarLogo". 
                updateCarLogo();

                // Clears the file display and progress bar. 
                uploader.value = "";
                upload_button.value = "";

            },
        );
    });
});


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
        new_checkup_date.placeholder = "00/00/0000";
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
        if(doc.data().inUseBy == undefined || doc.data().inUseBy == ""){
            alert("ATH: Bifreið ekki skráð á starfsmann. Viðhald verður skráð án viðstadds starfsmanns. ")

        }
        else{
            checkup_staff = doc.data().inUseBy;
        }
    });

    // Runs the funciton "saveCheckupDate" if ENTER is pressed when the "user_name_in" inputfield is selected. 
    document.getElementById("new_checkup_date").addEventListener("keypress", function(e){
        if(e.keyCode == 13){
            saveCheckupDate();
        }
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
        if(doc.data().inUseBy == undefined || doc.data().inUseBy == ""){
            alert("ATH: Bifreið ekki skráð á starfsmann. Viðhald verður skráð án viðstadds starfsmanns. ")
        }
        else{
            oil_change_staff = doc.data().inUseBy;
        }
    });

    // Runs the funciton "saveOilChange" if ENTER is pressed when the "new_oil_change" inputfield is selected. 
    document.getElementById("new_oil_change").addEventListener("keypress", function(e){
        if(e.keyCode == 13){
            saveOilChange();
        }
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

            // Updates the "milage" field of the specific cars' document. 
            firestore.collection('Cars').doc(localStorage.getItem('car_selector')).update({
                milage: new_oil_change.value,
            });

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
        if(doc.data().inUseBy == undefined || doc.data().inUseBy == ""){
            alert("ATH: Bifreið ekki skráð á starfsmann. Viðhald verður skráð án viðstadds starfsmanns. ")
        }
        else{
            tire_change_staff = doc.data().inUseBy;
        }
    });

    // Runs the funciton "saveTireChange" if ENTER is pressed when the "new_tire_change" inputfield is selected. 
    document.getElementById("new_tire_change").addEventListener("keypress", function(e){
        if(e.keyCode == 13){
            saveTireChange();
        }
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


// Runs the funciton "loanCar" if ENTER is pressed when the "user_name_in" inputfield is selected. 
document.getElementById("user_name_in").addEventListener("keypress", function(e){
    if(e.keyCode == 13){
        loanCar();
    }
});

// Runs the function "loanCar" when "save_button" is pressed.
document.getElementById("save_button").onclick = loanCar;
function loanCar(){
    // Fetches input tags from the page and puts them into variables to be used later. 
    var user_name_in = document.querySelector("#user_name_in");

    // Local variables.
    var staff_id = ""

    // Checks if user input matches the name of a document in the database and executes the function "saveData" if it does .
    firestore.collection('Users').where("staffName", "==", user_name_in.value).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            staff_id = doc.data().staffID

            if(staff_id != ""){
                saveData();
            }
            
        });
    });

    // Saves user input to the database. 
    function saveData(){
        firestore.collection('Cars').doc(localStorage.getItem("car_selector")).update({
            inUse: true,
            inUseBy: staff_id,
        });
        
        // Creates an "in_out" subcollection to the firestore document and appends variables intended to store data about the loan of the car. 
        firestore.collection('Cars').doc(localStorage.getItem("car_selector")).collection("in_out").add({
            checkOutDate: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
            checkOutUser: staff_id,
            checkInDate: "",
            checkInUser: "",
        });

        // Resets the input fields. 
        user_name_in.value = "";
    }
}


// Runs the funciton "returnCae" if ENTER is pressed when "return_user_name_in" inputfield is selected. 
document.getElementById("return_user_name_in").addEventListener("keypress", function(e){
    if(e.keyCode == 13){
        returnCar();
    }
});

// Runs the function "returnCar" when "return_button" is pressed.
document.getElementById("return_button").onclick = returnCar;
function returnCar(){
    // Fetches input tags on the html and puts them into variables to be used later. 
    var return_user_name_in = document.querySelector("#return_user_name_in");

    // Local variables.
    var staff_id = ""

    // Checks if user input matches the name of a document in the database and executes the function "saveData" if it does .
    firestore.collection('Users').where("staffName", "==", return_user_name_in.value).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            staff_id = doc.data().staffID

            if(staff_id != ""){
                saveData();
            }
            
        });
    });

    // Saves user input to the database. 
    function saveData(){
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
                            checkInUser: staff_id,
                        });
                    });
                });
    
                // Clears input field. 
                firestore.collection('Cars').doc(localStorage.getItem("car_selector")).collection("in_out").onSnapshot(function(){
                    return_user_name_in.value = "";
                })
            }
        });
    }
}


// Creates a dropdown list with every document in a specific collection.
function dropdownSelect(){
    firestore.collection("Users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let input_field = document.getElementById("staff");
            let option_in_input_field = document.createElement("option");
    
            option_in_input_field.textContent = doc.data().staffName;
            
            input_field.appendChild(option_in_input_field)
        });
    });
}
dropdownSelect();




// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    // If the browser detects that the page is being viewed on a smartphone. 
    if(/Mobi/.test(navigator.userAgent)){
        // Changes the layout of the page to fit the smaller screen of the smartphone. 
        function changeToMobile(){
            document.getElementById("maintenance_info").style.width = "100%";
            document.getElementById("main").insertBefore(document.getElementById("right_description"), document.getElementById("main").firstChild);
            document.getElementById("description").appendChild(document.getElementById("history_button"));
            document.getElementById("description").style.alignItems = "center";
            document.getElementById("description_text").style.width = "70vw";
            document.getElementById("description_text").style.maxWidth = "70vw";
            document.getElementById("right_description").style.maxWidth = "100%";
            document.getElementById("right_description").style.alignItems = "center";
            document.getElementById("right_description").style.paddingLeft = "2.5em";
            document.getElementById("car_description").style.justifyContent = "center";
            document.getElementById("photo_upload").style.alignItems = "center";
            document.getElementById("photo_upload").style.paddingLeft = "2.5em";
            document.getElementById("car_description").style.textAlign = "center";
            document.getElementById("desc_buttons").style.width = "100%";
            document.getElementById("desc_buttons").style.justifyContent = "center";
            document.getElementById("cancel_button").style.maxWidth = "30%";
            
            for(i = 0; i < document.getElementById("maintenance_info").children.length; i++){
                document.getElementById("maintenance_info").children[i].style.width = "10%";
            }

            // Finds every child-input element of a specified parent element and changes its' style attributes. 
            function mobileInputWidth(parent_element){
                // Reads through every child element of the "in_stock" element.
                for(i = 0; i < document.getElementById(parent_element).children.length; i++){
                    // If a child is a "div" element.
                    if(document.getElementById(parent_element).children[i].tagName == "DIV"){
                        // Reads through every child element of the "div" child.
                        for(x = 0; x < document.getElementById(parent_element).children[i].children.length; x++){
                            // If a child is an "input" element.
                            if(document.getElementById(parent_element).children[i].children[x].tagName == "INPUT"){
                                document.getElementById(parent_element).children[i].children[x].style.width = "60%";
                            }
                        }
                    }
                }
            }
            // Executes the functions on specified elements. 
            mobileInputWidth("in_stock");
            mobileInputWidth("out_of_stock");
        }
        changeToMobile();
    
        // Hides the normal navbar and displays the mobile navbar. 
        document.getElementById('navigation').style.display = 'none';     
        document.getElementById('m_navigation').style.display = 'block';

        // Detects if keyboard is being displayed and hides the navbar if it is.
        function hideNavOnKeyboard(){
            if(window.innerWidth + window.innerHeight < original_dimensions - 60){
                document.getElementById("m_navigation").style.display = "none";
            }
            else if(window.innerWidth + window.innerHeight > original_dimensions - 60){
                document.getElementById("m_navigation").style.display = "block";
            }
        }

        // Listens for keyboard popup and runs the "hideNavOnKeyboard" function.
        window.addEventListener("resize", hideNavOnKeyboard);

        
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

