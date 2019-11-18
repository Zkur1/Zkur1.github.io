document.getElementById("nav").innerHTML += `
    <ul class="nav_ul">
        <li id="verkfaeri">
            <a href="/tar/Fagraf/vefsida/index.html">Heim</a>
        </li>
        <li id="bifreidir">
            <a href="/tar/Fagraf/vefsida/bifreidir/bifreidir.html">Hugbúnaðarlausnir</a>
        </li>
        <li id="starfsmenn">
            <a href="/tar/Fagraf/vefsida/starfsmenn/starfsmenn.html">Um okkur</a>
        </li>
        <li id="stillingar">
            <a href="/tar/Fagraf/vefsida/stillingar/stillingar.html">Hafðu samband</a>
        </li>
    </ul>
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
    if(nav_selector == 'verkfaeri' || nav_selector == 'tool_icon'){
        window.open("/tar/Fagraf/vefsida/index.html", "_self");
    }
    else if(nav_selector == 'bifreidir' || nav_selector == 'car_icon'){
        window.open('/tar/Fagraf/vefsida/bifreidir/bifreidir.html','_self')
    }
    else if(nav_selector == 'starfsmenn' || nav_selector == 'staff_icon'){
        window.open('/tar/Fagraf/vefsida/starfsmenn/starfsmenn.html','_self')
    }
    else if(nav_selector == 'stillingar' || nav_selector == 'settings_icon'){
        window.open('/tar/Fagraf/vefsida/stillingar/stillingar.html','_self')
    }
}

// Assigns 'nav_ul' to a varible to be used later.
var nav_ul = document.getElementsByClassName('nav_ul');
// Checks if page is being viewed on a smartphone and selects the . 
if(/Mobi/.test(navigator.userAgent)){
    for(i=0; i<nav_ul[0].children.length; i++){
        nav_ul[1].children[i].onclick = goToNav;
    }
}
else{
    for(i=0; i<nav_ul[0].children.length; i++){
        nav_ul[0].children[i].onclick = goToNav;
    }
}

