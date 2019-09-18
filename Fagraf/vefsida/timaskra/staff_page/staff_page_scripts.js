// Global variables. 
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

// Displays all live data (data that can change) on the page and updates said data in real time. 
function displayLiveData(){
    firestore.collection("Users").doc(localStorage.getItem("user_selector")).onSnapshot(function(){
        renderStaffImg();
        renderStaffInfo();
    });
}

function renderStaffInfo(){
    var docRef = firestore.collection("Users").doc(localStorage.getItem("user_selector"));
    docRef.get().then(function(doc) {
        // If the document is correctly read. 
        if(doc.exists){
            document.getElementById("staff_name").innerHTML = doc.data().staffName;
            document.getElementById("staff_id").innerHTML = doc.data().staffIndividualID;
        }
    });
}


// When the "add_time_button" is pressed.
document.getElementById("add_time_button").onclick = goToTimeLogging;
function goToTimeLogging(){
    window.open("time_logging/time_logging.html", "_self");
}


// When the "add_time_button" is pressed.
document.getElementById("logout_button").onclick = goToLogin;
function goToLogin(){
    window.open("../timaskra.html", "_self");
    logoutUser();
}


function dataUpload(){
    var Tools = [];

    Tools.forEach(function(obj) {
        firestore.collection("Tools").add({
            toolID: obj.toolID,
            toolName: obj.toolName,
       
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    });
}


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'staff_page.html'){
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
