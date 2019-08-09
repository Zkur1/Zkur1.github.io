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
