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
            if(doc.data().staffName != undefined){
                staff_info.insertBefore(staff_name , staff_info.firstChild);
            }
            if(doc.data().staffMobile != undefined){
                staff_info.appendChild(staff_mobile);
            }
        
            if(doc.data().staffPhoneNr != undefined){
                staff_info.appendChild(staff_phone);
                console.log(doc.data().staffPhoneNr)
            }
            
            if(doc.data().staffEmail != undefined){
                staff_info.appendChild(staff_email);
            }
            
            if(doc.data().staffPosition != undefined){
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
        
// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'staff_default.html'){
        console.log(user_selector);
        readStaffData();
        }
        
    // Checks if page is being viewed on a smartphone and displays navbar accordinly. 
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

    
