window.onload = function buildNav(){
    // Builds the menu overlay by adding html code to the already created 'menuOverlay' element.
    document.querySelector("header").innerHTML += `
        <div id='menuOverlay' class='menuOverlay'>
            <a href='/tar.is/website/' class='heim'>Heim</a>
            <a href='/tar.is/website/hugbunadur/hugbunadur.html'>Hugbúnaðarlausnir</a>
            <a href='/tar.is/website/umOkkur/umOkkur.html'>Um okkur</a>
            <a href='/tar.is/website/hafaSamband/hafaSamband.html'>Hafa samband</a>
        </div>
    `

    // Executes 'showMenu' when the menu icon (hamburger) is clicked.
    let menuIcon = document.getElementById('menuIcon');
    if(menuIcon != undefined){
        menuIcon.onclick = showMenu;
    }

    let logo = document.getElementById('logo');
    if(logo != undefined){
    logo.onclick = goHome;
    }

    function goHome(){
        console.log('?')
        window.open('/tar.is/website/index.html', '_self')
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

        // Locks scrolling on the page when the nav menu is open. 
        if(body.style.overflow == 'hidden'){
            body.style.overflow = 'scroll';
        }
        else{
            body.style.overflow = 'hidden';
        }
    }

}