document.getElementById("header").innerHTML += `
<nav id="nav" class="nav">
    <ul class="nav_ul" id="nav_ul">
        <li id="me">Ég</li>
        <li id="why_me">Afhverju ég?</li>
        <li id="cars">Flotinn</li>
        <li id="my_projects">Verkefnin mín</li>
    </ul>
</nav>
<div id="logo_wrapper" class="logo_wrapper">
    <img src="/MySite/pictures/ah_logo.png" class="logo" id="logo"/>
</div>
`

function goToNav(event){
    // Checks which button on the navbar was pressed.
    function getEventTarget(nav_li){
        nav_li = nav_li || window.event;
        return nav_li.target || nav_li.srcElement; 
    }
    // Fetches the id tag for the button that has been pressed.
    var target = getEventTarget(event);
    var nav_selector = target.getAttribute('id');
    console.log(nav_selector);

    // Goes to different site depending on which button is pressed. 
    if(nav_selector == 'me' || nav_selector == 'tool_icon'){
        window.open("/MySite/website/index.html", "_self");
    }
    else if(nav_selector == 'why_me' || nav_selector == 'car_icon'){
        window.open('/MySite/website/index.html','_self')
    }
    else if(nav_selector == 'cars' || nav_selector == 'staff_icon'){
        window.open('/MySite/website/cars/cars.html','_self')
    }
    else if(nav_selector == 'my_projects' || nav_selector == 'settings_icon'){
        window.open('/MySite/website/projects/projects.html','_self')
    }
}

// Runs "goToNav()" when an option in the navbar is pressed. 
var nav_ul = document.getElementsByClassName('nav_ul');
for(i=0; i<nav_ul[0].children.length; i++){
    nav_ul[0].children[i].onclick = goToNav;
}

