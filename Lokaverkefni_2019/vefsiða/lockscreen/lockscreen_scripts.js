// If "id_login_button" is pressed. 
document.getElementById("id_login_button").onclick = grantAccess;
// Checks if the id given by the user matches a user in the database and opens the staff_page of that user if the id's match. 
function grantAccess(){
    registered_user = false;
    firestore.collection("Users").where("staffIndividualID", "==", document.getElementById("staff_id_in").value).get().then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.data());
            localStorage.setItem("user_selector", doc.data().staffID);
            registered_user = true;
        });
    // Waits for the code above finishes before executing the code below. 
    }).then(() => {
        if(registered_user == true){
            auth.signInWithEmailAndPassword("fagraf@fagraf.is", "fagraf").then(function(){
                var nav_selector = localStorage.getItem("nav_selector");
                if(nav_selector != null){
                    // Goes to different site depending on which button is pressed. 
                    if(nav_selector == 'verkfaeri' || nav_selector == 'tool_icon'){
                        window.open("/Lokaverkefni_2019/vefsiða/index.html", "_self");
                    }
                    else if(nav_selector == 'bifreidir' || nav_selector == 'car_icon'){
                        window.open('/Lokaverkefni_2019/vefsiða/bifreiðir/bifreidir.html','_self');
                    }
                    else if(nav_selector == 'starfsmenn' || nav_selector == 'staff_icon'){
                        window.open('/Lokaverkefni_2019/vefsiða/starfsmenn/starfsmenn.html','_self');
                    }
                    else if(nav_selector == 'stillingar' || nav_selector == 'settings_icon'){
                        window.open('/Lokaverkefni_2019/vefsiða/stillingar/stillingar.html','_self');
                    }
                }

                else{
                    window.open('/vefsiða/index.html','_self')
                }
            });
            firestore.collection("Users").onSnapshot(function(){
                document.getElementById("staff_id_in").value = "";
            });
        }
    
        // Creates and appends an error message to the page. 
        else{
            if(document.getElementById("fault_message") == null){
                var fault_message = document.createElement("h4");

                fault_message.setAttribute("class", "fault_message");
                fault_message.setAttribute("id", "fault_message");
                fault_message.innerHTML = "Notandi finnst ekki í gagnagrunni. "
                
                document.getElementById("main").insertBefore(fault_message, document.getElementById("main").firstChild);
            }
            
            firestore.collection("Users").onSnapshot(function(){
                document.getElementById("staff_id_in").value = "";
            });
        }

    });
}


// When the Enter key is pressed in the inputfield.
document.getElementById("staff_id_in").addEventListener("keypress", function(e){
    if(e.keyCode == 13){
        grantAccess();
    }
});


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'timaskra.html'){
        displayLiveData();
    }
        
    // Checks if page is being viewed on a smartphone and displays navbar accordinly. 
    if (/Mobi/.test(navigator.userAgent)) {
        // Changes the layout of the page to fit the smaller screen of the smartphone. 
        function changeToMobile(){
            
        }
        changeToMobile();

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
        //window.addEventListener("resize", hideNavOnKeyboard);

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

testForPage();

    
