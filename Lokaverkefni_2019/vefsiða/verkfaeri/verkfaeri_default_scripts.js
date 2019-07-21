// Accessing variables saved locally in other js files.
var tool_selector = localStorage.getItem("tool_selector");
console.log(tool_selector);

// Global variables.
var docRef = firestore.collection("Tools").doc(localStorage.getItem("tool_selector"));
var checkOutProject_text = ""

// Displays all live data (data that can change) on the page and updates said data in real time. 
function displayLiveData(){
    docRef.onSnapshot(function(){
        showToolStatus();
        displayLoanInfo();
    });
}


// Creates an h1 element on the page and appends the specific tools name to the element. 
function showToolName(){
    docRef.get().then(function(doc) {
        // If the document is correctly read. 
        if (doc.exists) {
            // Logs the content of the document to the console. 
            console.log("Document data:", doc.data());
            // Creates elements to be displayed on the page.
            let tool_name = document.createElement('h1');

            // Specifies both classes of the elements and their content. 
            tool_name.setAttribute("class", 'tool_name');
            tool_name.textContent = doc.data().toolName + ' :: '+ doc.data().toolID;

            tool_info.insertBefore(tool_name , tool_info.firstChild);
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

// Runs the function "loanTool" when "save_button" is pressed.
document.getElementById("save_button").onclick = function loanTool(){
    // Fetches input tags on the html and puts them into variables to be used later. 
    var user_name_in = document.querySelector("#user_name_in");
    var project_name_in = document.querySelector("#project_name_in");
    firestore.collection('Tools').doc(tool_selector).update({
        inUse: true,
        inUseBy: user_name_in.value,
        projectID: project_name_in.value,
    })

    // Adds "in_out" subcollection to the firestore document and appends variables intended to store data about the loan of the tool. 
    console.log(checkOutProject_text)
    firestore.collection('Tools').doc(tool_selector).collection("in_out").add({
        checkOutDate: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
        checkOutUser: user_name_in.value,
        checkOutProject: project_name_in.value,
        checkInDate: "",
        checkInUser: "",
    })

    // Gives access to the id of the document created above and assigns its value to the global variable "history_in".
    .then(docRef =>{
        localStorage.setItem("history_in", docRef.id);
        console.log(docRef.id)
    });

    // Resets the input fields. 
    user_name_in.value = "FRS-";
    project_name_in.value = "R-"; 
}

// Runs the function "returnTool" when "return_button" is pressed.
document.getElementById("return_button").onclick = function returnTool(){
    // Fetches input tags on the html and puts them into variables to be used later. 
    var return_user_name_in = document.querySelector("#return_user_name_in");
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
            firestore.collection('Tools').doc(tool_selector).collection("in_out").doc(localStorage.getItem("history_in")).update({
                checkInDate: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
                checkInUser: return_user_name_in.value,
            });
            return_user_name_in.value = "FRS-";
        }
    });
}


// Displays information about who has the tool.
function displayLoanInfo(){
    var inUseBy_text = document.querySelector("#inUseBy_text");
    var projectID_text = document.querySelector("#projectID_text");
    var loanDate_text = document.querySelector("#loanDate_text");
    docRef.get().then(function(doc) {
        // If the document is correctly read. 
        if(doc.exists){
            // Reads from the subcollection "in_out" of the tools document and uses the variable "checkOutDate" from the subcollection to display the loan date on the page. 
            firestore.collection('Tools').doc(tool_selector).collection("in_out").doc(localStorage.getItem("history_in")).get().then(function(doc) {
                if(doc.exists) {
                    loanDate_text.textContent = "Verkfæri skráð út: " + doc.data().checkOutDate; 
                } 
                else{
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });     
            inUseBy_text.textContent = "Starfsmaður með verkfæri: " + doc.data().inUseBy;
            projectID_text.textContent = "Verkfæri skráð á verknúmer: " + doc.data().projectID;
        }
    });
}


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'verkfaeri_default.html'){
        displayLiveData();
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
