// Global variables. 
var sPath = window.location.pathname;
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);


// When the "logout_button" is pressed.
document.getElementById("logout_button").onclick = logoutUser;


// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    if(sPage.trim() === 'stillingar.html'){
        document.getElementById("navigation").addEventListener("change", lockOutUser);

        // Checks if page is being viewed on a smartphone and displays navbar accordinly. 
        if(/Mobi/.test(navigator.userAgent)){
            document.getElementById('navigation').style.display = 'none';     
            document.getElementById('m_navigation').style.display = 'block';
        }

        // Blocks out user. 
        function lockOutUser(){
            document.getElementById("settings").style.display = "none";
            alert("Síða ekki aðgengileg starfsmönnum.");
            window.open("../index.html", "_self");
        }
        lockOutUser();
    }
}

testForPage();