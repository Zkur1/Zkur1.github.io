document.getElementsByClassName("container")[0].innerHTML += `
<div class="navigation" id="navigation">
    <ul class="nav_ul">
        <li id="verkfaeri">
            <a href="../index.html">Verkfæri</a>
        </li>
        <li id="bifreidir">
            <a href="/Lokaverkefni_2019/vefsiða/bifreiðir/bifreidir.html">Bifreiðir</a>
        </li>
        <li id="starfsmenn">
            <a href="/Lokaverkefni_2019/vefsiða/starfsmenn/starfsmenn.html">Starfsmenn</a>
        </li>
        <li id="stillingar">
            <a href="/Lokaverkefni_2019/vefsiða/stillingar/stillingar.html">Stillingar</a>
        </li>
    </ul>
</div>

<div class="m_navigation" id="m_navigation">
    <ul class="nav_ul">
        <li id="verkfaeri">
            <img class="icon" src="/Lokaverkefni_2019/myndir/tools.png" id="tool_icon">
        </li>
        <li id="bifreidir">
            <img class="icon" src="/Lokaverkefni_2019/myndir/car1.png" id="car_icon">
        </li >
        <li id="starfsmenn">
            <img class="icon" src="/Lokaverkefni_2019/myndir/staff.svg" id="staff_icon">
        </li>
        <li id="stillingar">
            <img class="icon" src="/Lokaverkefni_2019/myndir/settings.png" id="settings_icon">
        </li>
    </ul>
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
    if(nav_selector == 'verkfaeri' || nav_selector == 'tool_icon'){
        window.open("/Lokaverkefni_2019/vefsiða/index.html", "_self");
    }
    else if(nav_selector == 'bifreidir' || nav_selector == 'car_icon'){
        window.open('/Lokaverkefni_2019/vefsiða/bifreiðir/bifreidir.html','_self')
    }
    else if(nav_selector == 'starfsmenn' || nav_selector == 'staff_icon'){
        window.open('/Lokaverkefni_2019/vefsiða/starfsmenn/starfsmenn.html','_self')
    }
    else if(nav_selector == 'stillingar' || nav_selector == 'settings_icon'){
        window.open('/Lokaverkefni_2019/vefsiða/stillingar/stillingar.html','_self')
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

