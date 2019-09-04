// Accessing variables saved locally in other js files.
var tool_selector = localStorage.getItem("tool_selector");

// Global variables.
var docRef = firestore.collection("Tools").doc(tool_selector);
var original_dimensions = window.innerWidth + window.innerHeight;

// Displays all live data (data that can change) on the page and updates said data in real time. 
function displayLiveData(){
    docRef.onSnapshot(function(){
        showToolStatus();
        displayLoanInfo();
        showToolDesc();
        renderToolImg();
    });
}


// Creates an h1 element on the page and appends the specific tools name to the element. 
function showToolName(){
    docRef.get().then(function(doc) {
        // If the document is correctly read. 
        if(doc.exists){
            // Logs the content of the document to the console. 
            console.log("Document data:", doc.data());
            // Creates elements to be displayed on the page.
            let tool_name = document.createElement('h1');

            // Specifies both classes of the elements and their content. 
            tool_name.setAttribute("class", 'tool_name');
            tool_name.textContent = doc.data().toolName + ' :: '+ doc.data().toolID;

            tool_info.insertBefore(tool_name , tool_info.firstChild);
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


// Reads from the database and shows up do date description of the tool. 
function showToolDesc(){
    docRef.get().then(function(doc) {
        // If the document is correctly read. 
        if(doc.exists){
            var description_text = document.getElementById("description_text");
            var inner_text = ""

            // Reads the "description" variable of the tool from the database and appends its content to the local variable "inner_text".
            firestore.collection('Tools').doc(tool_selector).get().then(function(doc){
                inner_text = doc.data().description;
            });

            // Makes sure the code above has excuted an then appends the content of the "inner_text" variable to the element "description_text". 
            firestore.collection('Tools').doc(tool_selector).onSnapshot(function(){
                description_text.innerText = inner_text;

                if(description_text.innerHTML == "undefined" || description_text.innerHTML == ""){
                    description_text.innerHTML = "Ýttu til að bæta við lýsingu. ";
                }
            });
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
        showToolDesc();
    }

    // Saves user input to the "description" variable in the database on click of the "desc_save_button". 
    desc_save_button.onclick = function saveDescEdit(){
        firestore.collection('Tools').doc(tool_selector).update({
            description: description_text.innerText,
        });

        // Makes sure the code above executes and then hides the editor menu. 
        firestore.collection('Tools').doc(tool_selector).onSnapshot(function(){
            desc_save_button.style.display = "none";
            desc_cancel_button.style.display = "none";
            description_text.style.cssText = "";
        });
    }
}


// Fetches the image corrosponding to the tool and displays on the page. 
function renderToolImg(){
    // A variable to be used in the function below. 
    var uploaded_file_name = ""
    var img_url = ""

    // Accesses the specific cars' document field "toolID" and appends its' value to the variable "uploaded_file_name". 
    firestore.collection('Tools').doc(tool_selector).get().then(function(doc){
        uploaded_file_name = doc.data().toolID;
    });

    // Makes sure that the value of "uploaded_file_name" is updated before executing the rest of the funciton. 
    firestore.collection('Tools').doc(tool_selector).onSnapshot(function(){
        // Creates a referance to a folder in the storage bucket. 
        var storageRef = firebase.storage().ref('verkfaeri_myndir/' + uploaded_file_name);
        
        // Creates a referance to the url of the uploaded image. 
        storageRef.getDownloadURL().then(function(url){
            img_url = url;
            var tool_logo = document.getElementById("tool_logo");
            tool_logo.setAttribute("src", url);

        // Catches any errors.             
        }).catch(function(error) {
            console.log("Error getting document:", error);
            });

        // if the car has no associated image a placeholder image will be displayd. 
        if(img_url == ""){
            tool_logo.setAttribute("src", "../../myndir/image-placeholder.jpg");
        }
    });
}


// Displays the div "photo_upload" (a menu to change the tools' image) when the "update_logo_button" button is pressed. 
var update_logo_button = document.getElementById('update_logo_button');
update_logo_button.onclick = updateToolLogo;
function updateToolLogo(){
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

    // Accesses the specific cars' document field "toolID" and appends its' value to the variable "uploaded_file_name". 
    firestore.collection('Tools').doc(tool_selector).get().then(function(doc){
        uploaded_file_name = doc.data().toolID;
    });

    // Makes sure that the value of "uploaded_file_name" is updated before executing the rest of the funciton. 
    firestore.collection('Tools').doc(tool_selector).onSnapshot(function(){
        // Creates a referance to a folder in the storage bucket. 
        var storageRef = firebase.storage().ref('verkfaeri_myndir/' + uploaded_file_name);

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
                // Updates the "tool_logo" by executing the function "renderToolImg". 
                renderToolImg();

                // Hides the "photo_upload" menu after the user updates the "tool_logo" by executing the function "updateToolLogo". 
                updateToolLogo();

                 // Clears the file display and progress bar. 
                 uploader.value = "";
                 upload_button.value = "";
 
            },
        );
    });
});


// When the "history_button" is pressed a new history page opens. 
document.getElementById("history_button").onclick = function openHistoryPage(){
    window.open("verkfaeri_saga/verkfaeri_saga.html", "_self");
}


// Displays a menu to loan a tool if its "inUse" varible is false and a menu to return the tool if the variable is true.
function showToolStatus(){
    var x = document.getElementById('in_stock');
    var i = document.getElementById('out_of_stock');
    // References the variable "docRef" made previously to communicate with firestore.
    docRef.get().then(function(doc) {
        // If the document is correctly read. 
        if(doc.exists) {
            // if "inUse" is true the menu for returning the tool will be displayed.
            if(doc.data().inUse == true){
                x.style.display = "none";
                i.style.display = "block";
            }
            // if "inUse" is false the menu for loaning the tool will be displayed.
            else{
                x.style.display = "block";
                i.style.display = "none";
            }
        }
    });
}


// Runs the funciton "loanTool" if ENTER is pressed when the "project_name_in" inputfield is selected. 
document.getElementById("user_name_in").addEventListener("keypress", function(e){
    console.log(e.keyCode)
    if(e.keyCode == 13){
        document.getElementById("project_name_in").focus();
    }
});

// Runs the funciton "loanTool" if ENTER is pressed when the "project_name_in" inputfield is selected. 
document.getElementById("project_name_in").addEventListener("keypress", function(e){
    if(e.keyCode == 13){
        loanTool();
    }
});

// Runs the function "loanTool" when "save_button" is pressed.
document.getElementById("save_button").onclick = loanTool;
function loanTool(){
    // Fetches input tags on the html and puts them into variables to be used later. 
    var user_name_in = document.querySelector("#user_name_in");
    var project_name_in = document.querySelector("#project_name_in");

    // Local variables.
    var staff_id = ""
    var staff_name = ""

    // Checks if user input matches the name of a document in the database and executes the function "saveData" if it does .
    firestore.collection('Users').where("staffName", "==", user_name_in.value).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            staff_id = doc.data().staffID;
            staff_name = doc.data().staffName;

            if(staff_id != ""){
                saveData();
            }
        });
    });

    // Saves user input to the database. 
    function saveData(){
        console.log("worked! ")
        firestore.collection('Tools').doc(tool_selector).update({
            inUse: true,
            inUseBy: staff_id,
            projectID: project_name_in.value,
        });

        // Adds "in_out" subcollection to the firestore document and appends variables intended to store data about the loan of the tool. 
        firestore.collection('Tools').doc(tool_selector).collection("in_out").add({
            checkOutDate: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
            checkOutUser: staff_id,
            checkOutUserName: staff_name,
            checkOutProject: project_name_in.value,
            checkInDate: "",
            checkInUser: "",
        });

        // Resets the input fields. 
        user_name_in.value = "";
        project_name_in.value = "R-"; 
    }
}


// Runs the funciton "returnTool" if ENTER is pressed when "return_user_name_in" inputfield is selected. 
document.getElementById("return_user_name_in").addEventListener("keypress", function(e){
    if(e.keyCode == 13){
        returnTool();
    }
});

// Runs the function "returnTool" when "return_button" is pressed.
document.getElementById("return_button").onclick = returnTool;
function returnTool(){
    // Fetches input tags on the html and puts them into variables to be used later. 
    var return_user_name_in = document.querySelector("#return_user_name_in");

    // Local variables.
    var staff_id = ""
    var staff_name = ""

    // Checks if user input matches the name of a document in the database and executes the function "saveData" if it does .
    firestore.collection('Users').where("staffName", "==", return_user_name_in.value).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            staff_id = doc.data().staffID;
            staff_name = doc.data().staffName;

            if(staff_id != ""){
                saveData();
            }
        });
    });

    // Saves user input to the database. 
    function saveData(){
        docRef.get().then(function(doc) {
            // If the document is correctly read. 
            if(doc.exists) {
                // if "inUseBy" mathces with the user input the menus will switch and variables regarding the loan will change accordingly. 
                firestore.collection('Tools').doc(tool_selector).update({
                    inUse: false,
                    inUseBy: "",
                    projectID: "",
                });
    
                // Logs who returns the tool and when and logs it to variables stored in the subcollection "in_out".
                firestore.collection('Tools').doc(tool_selector).collection("in_out").orderBy("checkOutDate", "desc").limit(1).get().then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        firestore.collection('Tools').doc(tool_selector).collection("in_out").doc(doc.id).update({
                            checkInDate: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
                            checkInUser: staff_id,
                            checkInUserName: staff_name,
                        });
                        
                        // Clears input field. 
                        firestore.collection('Tools').doc(tool_selector).collection("in_out").orderBy("checkOutDate", "desc").limit(1).onSnapshot(function(){
                            return_user_name_in.value = "";
                        });
                    });
                });
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
            
            input_field.appendChild(option_in_input_field);
        });
    });
}
dropdownSelect();


// Displays information about who has the tool.
function displayLoanInfo(){
    var inUseBy_text = document.querySelector("#inUseBy_text");
    var projectID_text = document.querySelector("#projectID_text");
    var loanDate_text = document.querySelector("#loanDate_text");
    docRef.onSnapshot(function(doc) {
        // If the document is correctly read. 
        if(doc.exists){
            // Reads from the subcollection "in_out" of the tools document and uses the variable "checkOutDate" from the subcollection to display the loan date on the page. 
            firestore.collection('Tools').doc(tool_selector).collection("in_out").orderBy("checkOutDate", "desc").limit(1).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    loanDate_text.textContent = "Verkfæri skráð út: " + doc.data().checkOutDate; 
                });
            });

            // Reads from the "Users" subcollection and appends staffName to the "inUseBy_text".
            firestore.collection('Users').where("staffID", "==", doc.data().inUseBy).limit(1).get().then((snapshot) =>{
                snapshot.docs.forEach(doc => {
                    inUseBy_text.textContent = "Starfsmaður með verkfæri: " + doc.data().staffID + " / " + doc.data().staffName;
                });
            });

            projectID_text.textContent = "Verkfæri skráð á verknúmer: " + doc.data().projectID;
        }
    });
}


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    // If the browser detects that the page is being viewed on a smartphone. 
    if(/Mobi/.test(navigator.userAgent)){
        // Changes the layout of the page to fit the smaller screen of the smartphone. 
        function changeToMobile(){
            document.getElementById("main").insertBefore(document.getElementById("right_description"), document.getElementById("main").firstChild);
            document.getElementById("right_description").style.paddingLeft = "2.5em";
            document.getElementById("right_description").style.maxWidth = "100%";
            document.getElementById("right_description").style.alignItems = "center";
            document.getElementById("photo_upload").style.alignItems = "center";
            document.getElementById("photo_upload").style.paddingLeft = "2.5em";
            document.getElementById("description").appendChild(document.getElementById("history_button"));
            document.getElementById("description").style.alignItems = "center";
            document.getElementById("description_text").style.width = "70vw";
            document.getElementById("description_text").style.maxWidth = "70vw";
            document.getElementById("history_button").style.padding = "2em";
            document.getElementById("history_button").style.marginBottom = "2em";
            document.getElementById("history_button").style.width = "60%";
            document.getElementById("history_button").style.float = "none";
            document.getElementById("tool_description").style.textAlign = "center";
            document.getElementById("desc_buttons").style.width = "100%";
            document.getElementById("desc_buttons").style.justifyContent = "center";
            document.getElementById("return_user_name_in").style.width = "60%";

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
                                console.log(document.getElementById(parent_element).children[i].children[x]);
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
    
// Functions to be run when the webpage is opened.
testForPage();
showToolName();
displayLiveData();
