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

let submit = document.getElementsByClassName('button')[0];
if(submit != undefined){
    submit.onclick = openEmail;
}

function openEmail(){
    let name = document.getElementsByClassName('nameIn')[0].value;
    let subject = document.getElementsByClassName('subjectIn')[0].value;
    let phone = document.getElementsByClassName('phoneIn')[0].value;
    let text = document.getElementsByClassName('textIn')[0].value;

    var form = document.createElement('form');
	
	//Set the form attributes 
	form.setAttribute('method', 'post');
	form.setAttribute('enctype', 'text/plain');
    form.setAttribute('action', 'mailto:' + encodeURIComponent('tar@tar.is') + '?Subject=' + encodeURIComponent(name + ' - ' + subject)
                      + '&Body=' + encodeURIComponent(text + '   - ' + name + ' - ' + phone));
	form.setAttribute('style', 'display:none');
	
	//Append the form to the body
	document.body.appendChild(form);
 
	//Submit the form
	form.submit();
	
	//Clean up
	document.body.removeChild(form);
}