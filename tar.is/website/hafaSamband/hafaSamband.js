//window.history.pushState("object or string", "Title", "/Heim ");

// Executes 'showMenu' when the menu icon (hamburger) is clicked.
let menuIcon = document.getElementById('menuIcon');
if(menuIcon != undefined){
    menuIcon.onclick = showMenu;
}

// Hides/Displays the navigation menu onclick of the menu icon. 
function showMenu(){
    let menu = document.getElementById('menuOverlay');
    let body = document.querySelector('body');
    menu.classList.toggle("Visible");   

    // Adds to the z-index value of the menu icon so it shows through the nav menu. 
    if(menuIcon.style.zIndex == 0){
        menuIcon.style.zIndex = 1;
    }

    if(body.style.overflow == 'hidden'){
        body.style.overflow = 'scroll';
    }
    else{
        body.style.overflow = 'hidden';
    }

    
}