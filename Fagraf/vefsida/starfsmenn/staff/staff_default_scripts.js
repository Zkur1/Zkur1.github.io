// Global variables. 
var user_selector = localStorage.getItem("user_selector");
var original_dimensions = window.innerWidth + window.innerHeight;

// Displays all live data (data that can change) on the page and updates said data in real time. 
function displayLiveData(){
    firestore.collection("Users").doc(localStorage.getItem("user_selector")).onSnapshot(function(){
        showStaffDesc();
        renderStaffImg();
    });
}


// Reads specific document from the "Users" collection in the firestore database.
function readStaffData(){
    var docRef = firestore.collection("Users").doc(localStorage.getItem("user_selector"));
    docRef.get().then(function(doc) {
        // If the document is correctly read. 
        if (doc.exists) {
            // Logs the content of the document to the console. 
            console.log("Document data:", doc.data());
            // Creates elements to be displayed on the page.
            let staff_name = document.createElement('h1');
            let staff_mobile = document.createElement('h2');
            let staff_email = document.createElement('h2');
            let staff_position = document.createElement('h2');
            let staff_phone = document.createElement('h2');

            // Specifies both classes of the elements and their content. 
            staff_name.setAttribute("class", 'staff_name');
            staff_name.textContent = doc.data().staffName + ' :: ' + doc.data().staffID;
             
            staff_mobile.setAttribute("class", 'staff_mobile');
            staff_mobile.textContent = 'Farsími: ' + doc.data().staffMobile;

            staff_phone.setAttribute("class", 'staff_phone')
            staff_phone.textContent = 'Sími: ' + doc.data().staffPhoneNr;

            staff_email.setAttribute("class", 'staff_email')
            staff_email.textContent = 'Netfang: ' + doc.data().staffEmail;

            staff_position.setAttribute("class", 'staff_position')
            staff_position.textContent = 'Starfstitill: ' + doc.data().staffPosition;

            // Adds the elements on the page if the specific information is available in the database.
            if(doc.data().staffName != ""){
                staff_info.insertBefore(staff_name , staff_info.firstChild);
            }
            else{
                staff_name.textContent += " Óskráð. ";
                staff_info.insertBefore(staff_name , staff_info.firstChild);
            }

            if(doc.data().staffMobile != ""){
                staff_info.appendChild(staff_mobile);
            }
            else{
                staff_mobile.textContent += " Óskráð. ";
                staff_info.appendChild(staff_mobile);
            }
        
            if(doc.data().staffPhoneNr != ""){
                staff_info.appendChild(staff_phone);
            }
            else{
                staff_phone.textContent += " Óskráð. ";
                staff_info.appendChild(staff_phone);
            }
            
            if(doc.data().staffEmail != ""){
                staff_info.appendChild(staff_email);
            }
            else{
                staff_email.textContent += " Óskráð. ";
                staff_info.appendChild(staff_email);
            }
            
            if(doc.data().staffPosition != ""){
                staff_info.appendChild(staff_position);
            }
            else{
                staff_position.textContent += " Óskráð. ";
                staff_info.appendChild(staff_position);
            }
            
        
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
        

// Reads from the database and shows up do date description of the staff. 
function showStaffDesc(){
    firestore.collection("Users").doc(localStorage.getItem("user_selector")).get().then(function(doc) {
        // If the document is correctly read. 
        if(doc.exists){
            var description_text = document.getElementById("description_text");
            var inner_text = ""

            // Reads the "description" variable of the staff from the database and appends its content to the local variable "inner_text".
            firestore.collection('Users').doc(user_selector).get().then(function(doc){
                inner_text = doc.data().description;
            });

            // Makes sure the code above has excuted an then appends the content of the "inner_text" variable to the element "description_text". 
            firestore.collection('Users').doc(user_selector).onSnapshot(function(){
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
        showStaffDesc();
    }

    // Saves user input to the "description" variable in the database on click of the "desc_save_button". 
    desc_save_button.onclick = function saveDescEdit(){
        firestore.collection('Users').doc(user_selector).update({
            description: description_text.innerText,
        });

        // Makes sure the code above executes and then hides the editor menu. 
        firestore.collection('Users').doc(user_selector).onSnapshot(function(){
            desc_save_button.style.display = "none";
            desc_cancel_button.style.display = "none";
            description_text.style.cssText = "";
        });
    }
}


// Fetches the image corrosponding to the staff and displays on the page. 
function renderStaffImg(){
    // A variable to be used in the function below. 
    var uploaded_file_name = ""
    var img_url = ""
    var staff_logo = document.getElementById("staff_logo")

    // Accesses the specific staffs' document field "staffID" and appends its' value to the variable "uploaded_file_name". 
    firestore.collection('Users').doc(localStorage.getItem("user_selector")).get().then(function(doc){
        uploaded_file_name = doc.data().staffID;
    });

    // Makes sure that the value of "uploaded_file_name" is updated before executing the rest of the funciton. 
    firestore.collection('Users').doc(localStorage.getItem("user_selector")).onSnapshot(function(){
        // Creates a referance to a folder in the storage bucket. 
        var storageRef = firebase.storage().ref('starfsmenn_myndir/' + uploaded_file_name);
        
        // Creates a referance to the url of the uploaded image. 
        storageRef.getDownloadURL().then(function(url){
            img_url = url;
            var staff_logo = document.getElementById("staff_logo");
            staff_logo.setAttribute("src", url);

        // Catches any errors. 
        }).catch(function(error) {
            console.log("Error getting document:", error);
            });

        // if the staff has no associated image a placeholder image will be displayd. 
        if(img_url == ""){
            staff_logo.setAttribute("src", "../../../myndir/image-placeholder.jpg");
        }
    });
}


// Displays the div "photo_upload" (a menu to change the staffs' image) when the "update_logo_button" button is pressed. 
var update_logo_button = document.getElementById('update_logo_button');
update_logo_button.onclick = updateStaffLogo;
function updateStaffLogo(){
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

    // Accesses the specific staffs' document field "staffID" and appends its' value to the variable "uploaded_file_name". 
    firestore.collection('Users').doc(localStorage.getItem("user_selector")).get().then(function(doc){
        uploaded_file_name = doc.data().staffID;
    });

    // Makes sure that the value of "uploaded_file_name" is updated before executing the rest of the funciton. 
    firestore.collection('Users').doc(localStorage.getItem("user_selector")).onSnapshot(function(){
        // Creates a referance to a folder in the storage bucket. 
        var storageRef = firebase.storage().ref('starfsmenn_myndir/' + uploaded_file_name);

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
                // Executes the funtion "renderStaffImg"
                renderStaffImg();
                // Hides the "photo_upload" menu after the user updates the "Staff_logo" by executing the function "updateStaffLogo". 
                updateStaffLogo();
                // Clears the file display and progress bar. 
                uploader.value = "";
                upload_button.value = "";

            },
        );
    });
});


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'staff_default.html'){
        console.log(user_selector);
        readStaffData();
        displayLiveData();
        }
        
    // Checks if page is being viewed on a smartphone and displays navbar accordinly. 
    if (/Mobi/.test(navigator.userAgent)) {
        // Changes the layout of the page to fit the smaller screen of the smartphone. 
        function changeToMobile(){
            document.getElementById("staff_description").style.flexFlow = "column";
            document.getElementById("staff_description").style.alignItems = "center";      
            document.getElementById("staff_description").style.textAlign = "center";
            document.getElementById("desc_buttons").style.width = "100%";
            document.getElementById("desc_buttons").style.justifyContent = "center";      
        }
        changeToMobile();

        // Detects if keyboard is being displayed and hides the navbar if it is.
        function hideNavOnKeyboard(){
            console.log("gang")
            if(window.innerWidth + window.innerHeight < original_dimensions - 60){
                document.getElementById("m_navigation").style.display = "none";
            }
            else if(window.innerWidth + window.innerHeight > original_dimensions - 60){
                document.getElementById("m_navigation").style.display = "block";
            }
        }
        // Listens for keyboard popup and runs the "hideNavOnKeyboard" function.
        window.addEventListener("resize", hideNavOnKeyboard);

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
                window.open('../../bifreidir/bifreidir.html','_self')
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

    
