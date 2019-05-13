// Reads specific document from the "Users" collection in the firestore database.
function readUserData(){
    var docRef = firestore.collection("Users").doc(localStorage.getItem("user_selector"));
    docRef.get().then(function(doc) {
        
        // If the document is correctly read. 
        if (doc.exists) {
            // Logs the content of the document to the console. 
            console.log("Document data:", doc.data());
            // Creates elements to be displayed on the page.
            let user_name = document.createElement('h1');
            let user_phone = document.createElement('h2')

            // Specifies both classes of the elements and their content. 
            user_name.setAttribute("class", 'user_name');
            user_name.textContent = doc.data().firstName + " " +  doc.data().lastName +' :: '+ doc.data().userID;
             
            user_phone.setAttribute("class", 'user_phone');
            user_phone.textContent = 'Farsími: ' + doc.data().phoneNr;

            // Adds the elements on the page.
            user_info.insertBefore(user_name , user_info.firstChild);
            user_info.appendChild(user_phone);
        
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
        
// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'staff_default.html'){
        console.log(user_selector);
        readUserData();
        }
}
    

testForPage();

    
