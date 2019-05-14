// Reads specific document from the "Users" collection in the firestore database.
function readCarData(){
    var docRef = firestore.collection("Cars").doc(localStorage.getItem("car_selector"));
    docRef.get().then(function(doc) {
        
        // If the document is correctly read. 
        if (doc.exists) {
            // Logs the content of the document to the console. 
            console.log("Document data:", doc.data());
            // Creates elements to be displayed on the page.
            let car_id = document.createElement('h1');
            let car_make = document.createElement('h1');
            let car_checkup_date = document.createElement('h1');
            let description_text = document.createElement('p');
            

            // Specifies both classes of the elements and their content. 
            car_id.setAttribute("class", 'car_id');
            car_id.textContent = "Bílnúmer: " + doc.data().carID;
             
            car_make.setAttribute("class", 'car_make');
            car_make.textContent = 'Tegund: ' + doc.data().carMake;

            car_checkup_date.setAttribute("class", 'car_checkup_date');
            car_checkup_date.textContent = 'Næsta Skoðun: ' + doc.data().checkupDate;

            description_text.setAttribute("class", 'car_id');
            description_text.textContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci incidunt molestiae porro odit illum modi fugit? Nemo, commodi. Atque natus reprehenderit architecto laborum ipsam cumque, facere veniam non possimus error.";

            // Adds the elements on the page.
            car_info.insertBefore(car_id , car_info.firstChild);
            car_info.appendChild(car_make);
            car_info.appendChild(car_checkup_date);
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
        
// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'bifreidir_default.html'){
        readCarData();
        }
}
    

testForPage();

    
