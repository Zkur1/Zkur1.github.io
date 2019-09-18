// Displays all live data (data that can change) on the page and updates said data in real time. 
function displayLiveData(){
}


// When the Enter key is pressed in the inputfield.
document.getElementById("staff_id_in").addEventListener("keypress", function(e){
    if(e.keyCode == 13){
        goToStaffPage();
    }
});

// User signup. 
document.getElementById("signup_button").onclick = signup;
function signup(){
    var email = document.getElementById("signup_email").value;
    var password = document.getElementById("signup_password").value;
    var onSignup = new Promise(function(resolve, reject){
        createUser(email, password);
        if(createUser){
            resolve('resolved. ');
        }
        else{
            reject('rejected. ');
        }
    });

    onSignup.then(function resolved() {
        document.getElementById("signup_email").value = "";
        document.getElementById("signup_password").value = "";
      })
      .catch(function rejected(err) {
        console.error(err)
      });
}

// User login
document.getElementById("login_button").onclick = login;
function login(){
    var email = document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;
    var onLogin = new Promise(function(resolve, reject){
        loginUser(email, password);
        if(loginUser){
            resolve('resolved. ');
        }
        else{
            reject('rejected. ');
        }
    });

    onLogin.then(function resolved() {
        document.getElementById("login_email").value = "";
        document.getElementById("login_password").value = "";
    })
    .catch(function rejected(err) {
    console.error(err)
    });
}


// User logout. 
document.getElementById("logout_button").onclick = logoutUser;


// Listens for auth status changes.
auth.onAuthStateChanged(user => {
    // If user is logged in. 
    if(user){
        window.open('staff_page/staff_page.html','_self');
    }

    else{
    }
})


// If "id_login_button" is pressed. 
document.getElementById("id_login_button").onclick = goToStaffPage;
// Checks if the id given by the user matches a user in the database and opens the staff_page of that user if the id's match. 
function goToStaffPage(){
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
            window.open('staff_page/staff_page.html','_self');
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

    
