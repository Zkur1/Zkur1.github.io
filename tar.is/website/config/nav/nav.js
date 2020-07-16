window.onload = function buildNav(){
    // Builds the menu overlay by adding html code to the already created 'menuOverlay' element.
    document.querySelector("header").innerHTML += `
        <div id='menuOverlay' class='menuOverlay'>
            <a href='/tar.is/website/' class='heim'>Heim</a>
            <a href='/tar.is/website/hugbunadur/hugbunadur.html' class='hugbunadur'>Hugbúnaðarlausnir</a>
            <a href='/tar.is/website/hafaSamband/hafaSamband.html' class='hafaSamband'>Hafa samband</a>
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

    // Opens the "index.html" page in the current tab. 
    function goHome(){
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

    function navHighlight(){
        let heim = document.getElementsByClassName('heim')[0];
        let hugbunadur = document.getElementsByClassName('hugbunadur')[0];
        let umOkkur = document.getElementsByClassName('umOkkur')[0];
        let hafaSamband = document.getElementsByClassName('hafaSamband')[0];
    
        let url = window.location.href;
        url = url.split(window.location.origin).pop();
    
        if(url == '/tar.is/website/'){
            heim.style.textShadow = '2px 2px black';
        }
        if(url == '/tar.is/website/hugbunadur/hugbunadur.html'){
            hugbunadur.style.textShadow = '2px 2px black';
        }
        if(url == '/tar.is/website/umOkkur/umOkkur.html'){
            umOkkur.style.textShadow = '2px 2px black';
        }
        if(url == '/tar.is/website/hafaSamband/hafaSamband.html'){
            hafaSamband.style.textShadow = '2px 2px black';
        }
    }
    navHighlight();
}