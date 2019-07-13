// Accessing variables saved locally in other js files.
var tool_selector = localStorage.getItem("tool_selector");
console.log(tool_selector);

// Reads specific document from the "Tool" collection in the firestore database.
var docRef = firestore.collection("Tools").doc(localStorage.getItem("tool_selector"));
function readToolData(){
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
        loanDate: new Date().toDateString(),
    })
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
            console.log(doc.data().inUseBy);;
            console.log(return_user_name_in.value);
            // if "inUseBy" mathces with the user input the menus will switch and variables regarding the loan will change accordingly. 
            firestore.collection('Tools').doc(tool_selector).update({
                inUse: false,
                inUseBy: "",
                projectID: "",
                loanDate: "",
            })
            return_user_name_in.value = "FRS-";
        }
    });
}

// Displays information about who has the tool.
function displayLoanInfo(){
    var inUseBy_text = document.querySelector("#inUseBy_text");
    var projectID_text = document.querySelector("#projectID_text");
    docRef.get().then(function(doc) {
        // If the document is correctly read. 
        if(doc.exists) {
            inUseBy_text.textContent = "Starfsmaður með verkfæri: " + doc.data().inUseBy;
            projectID_text.textContent = "Verkfæri skráð á verknúmer: " + doc.data().projectID;

        }
    });
}

// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'verkfaeri_default.html'){
        readToolData();
        }
}
    
// Functions to be run when the webpage is opened.
testForPage();
showToolStatus();
displayLoanInfo()