// Checks if page is being viewed on a smartphone and displays navbar accordinly. 
if (/Mobi/.test(navigator.userAgent)) {
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