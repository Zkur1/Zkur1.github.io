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
            let user_phone = document.createElement('h2');
            let user_email = document.createElement('h2');

            // Specifies both classes of the elements and their content. 
            user_name.setAttribute("class", 'user_name');
            user_name.textContent = doc.data().firstName + " " +  doc.data().lastName +' :: '+ doc.data().userID;
            
             
            user_phone.setAttribute("class", 'user_phone');
            user_phone.textContent = 'Farsími: ' + doc.data().phoneNr;

            user_email.setAttribute("class", 'user_email')
            user_email.textContent = 'Netfang: ' + doc.data().email;

            // Adds the elements on the page.
            user_info.insertBefore(user_name , user_info.firstChild);
            user_info.appendChild(user_phone);
            user_info.appendChild(user_email);
        
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

    
