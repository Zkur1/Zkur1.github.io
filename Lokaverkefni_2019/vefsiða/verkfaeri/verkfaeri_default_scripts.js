// Accessing variables saved locally in other js files.
var tool_selector = localStorage.getItem("tool_selector");
console.log(tool_selector);


// Reads specific document from the "Users" collection in the firestore database.
function readToolData(){
    var docRef = firestore.collection("Tools").doc(localStorage.getItem("tool_selector"));
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
        
// Runs the function "loanTool" when "save_button" is pressed..
document.getElementById("save_button").onclick = function loanTool(){
    // Fetches input tags on the html and puts them into variables to be used later. 
    var user_name_in = document.querySelector("#user_name_in");
    var project_name_in = document.querySelector("#project_name_in");
    firestore.collection('Tools').doc(tool_selector).update({
        inUse: true,
        inUseBy: user_name_in.value
    })
    user_name_in.value = "FRS-";
    project_name_in.value = "R-";
}


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'verkfaeri_default.html'){
        readToolData();
        }
}
    

testForPage();

    
