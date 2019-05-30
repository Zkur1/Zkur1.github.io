// Reads specific document from the "Users" collection in the firestore database.
function readToolData(){
    var docRef = firestore.collection("Tools").doc(localStorage.getItem("tool_selector"));
    docRef.get().then(function(doc) {
        
        // If the document is correctly read. 
        if (doc.exists) {
            // Logs the content of the document to the console. 
            console.log("Document data:", doc.data());
            // Creates elements to be displayed on the page.
            var tool_name = document.createElement('h1');
            var available = document.createElement('h1');

            // Specifies both classes of the elements and their content. 
            tool_name.setAttribute("class", 'tool_name');
            tool_name.textContent = doc.data().toolName + ' :: '+ doc.data().toolID;
            available.setAttribute("class", 'available');
            available.textContent = 'Verkfæri er til á lager';

            tool_info.insertBefore(tool_name , tool_info.firstChild);
            tool_info.appendChild(available);
        
        
        // If the document is not correctly read. 
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

        // BARA FYRIR KYNNINGU!
        document.getElementById('save').onclick = function returnTool(){
            let in_stock = document.getElementById('in_stock');
            let save_button = document.getElementById('save');
            let return_button = document.createElement('button');
            return_button.setAttribute('class', 'return_button');
            return_button.textContent = 'Skrá inn';
            in_stock.appendChild(return_button);
            save_button.remove();
            document.getElementById('return_text').textContent ='Skrá inn á lager: ';
            available.setAttribute("class", 'not_available');
            available.textContent = 'Verkfæri er EKKI til á lager';
    
        }

    // If an error accours when reading the document. 
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
     
}
        

// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'verkfaeri_default.html'){
        readToolData();

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
}
    

testForPage();

    
