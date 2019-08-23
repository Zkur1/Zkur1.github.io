// Reads through the subcollection "in_out" of the specific tool, snapshots its contents and runs the function "renderCheckInData" for each document.
// Note: function ".orderBy()" lists the objects by "checkOutDate in decending order.
// Note: function ".limit()" limits the "forEach()" request by a specified amount (in this case it limits it to 10 results). 
firestore.collection('Tools').doc(localStorage.getItem("tool_selector")).collection("in_out").orderBy('checkOutDate', 'desc').limit(5).get().then((snapshot) => { 
    snapshot.docs.forEach(doc => {
            renderCheckInData(doc);
    });
});

// Renders all history data of the tool and displays on the page. 
function renderCheckInData(doc){
    // Creates elements.
    let li = document.createElement('li');

    let check_out_date_text = document.createElement('span');
    let check_out_date_var = document.createElement('span');

    let check_out_staff_text = document.createElement('span');
    let check_out_staff_var = document.createElement('span');

    let check_in_date_text = document.createElement('span');
    let check_in_date_var = document.createElement('span');

    let check_in_staff_text = document.createElement('span');
    let check_in_staff_var = document.createElement('span');

    let projectID_out_text = document.createElement('span');
    let projectID_out_var = document.createElement('span');
    
    // Sets specific content in id to each element.
    li.setAttribute("id", doc.id);
    
    check_out_date_text.setAttribute("id", "check_out_date_text");
    check_out_date_text.setAttribute("class", "check_out_date_text");

    check_out_date_var.setAttribute("id", "check_out_date_var");
    check_out_date_var.setAttribute("class", "history_bold");

    check_out_staff_text.setAttribute("id", "check_out_staff_text");
    check_out_staff_text.setAttribute("class", "check_out_staff_text");

    check_out_staff_var.setAttribute("id", "check_out_staff_var");
    check_out_staff_var.setAttribute("class", "history_bold");

    check_in_date_text.setAttribute("id", "check_in_date_text");
    check_in_date_text.setAttribute("class", "check_in_date_text");

    check_in_date_var.setAttribute("id", "check_in_date_var");
    check_in_date_var.setAttribute("class", "history_bold");

    check_in_staff_text.setAttribute("id", "check_in_staff_text");
    check_in_staff_text.setAttribute("class", "check_in_staff_text");

    check_in_staff_var.setAttribute("id", "check_in_staff_var");
    check_in_staff_var.setAttribute("class", "history_bold");

    projectID_out_text.setAttribute("id", "projectID_out_text");
    projectID_out_text.setAttribute("class", "projectID_out_text");

    projectID_out_var.setAttribute("id", "projectID_out_var");
    projectID_out_var.setAttribute("class", "history_bold");


    check_out_date_text.textContent = "Verkfæri skráð út þann: ";
    check_out_date_var.textContent = doc.data().checkOutDate;
    check_out_staff_text.textContent = " af starfsmanni: ";
    check_out_staff_var.textContent = doc.data().checkOutUserName + " / " + doc.data().checkOutUser;

    check_in_date_text.textContent = "Verkfæri skráð inn þann: ";
    check_in_date_var.textContent = doc.data().checkInDate;
    check_in_staff_text.textContent = " af starfsmanni: ";
    check_in_staff_var.textContent = doc.data().checkInUserName + " / " + doc.data().checkInUser;

    projectID_out_text.textContent = "Verkfæri skráð á verknúmer: ";
    projectID_out_var.textContent = doc.data().checkOutProject;

    // Appends content into li.
    li.appendChild(check_out_date_text);
    li.appendChild(check_out_date_var);
    li.appendChild(check_out_staff_text);
    li.appendChild(check_out_staff_var);
    li.appendChild(check_in_date_text);
    li.appendChild(check_in_date_var);
    li.appendChild(check_in_staff_text);
    li.appendChild(check_in_staff_var);
    li.appendChild(projectID_out_text);
    li.appendChild(projectID_out_var);

    // Appends li to the tool_list (ul)
    document.getElementById("check_in_list").appendChild(li);

    // Enables scrolling inside of a spescific div.
    document.addEventListener("touchstart", function(){}, true)
}

// Makes sure this javascript file is only ran on a specific page.
function testForMobile(){
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
                window.open("../../index.html", "_self");
                }
            else if(nav_selector == 'bifreidir' || nav_selector == 'car_icon'){
                window.open('../../bifreiðir/bifreidir.html','_self')
                }
            else if(nav_selector == 'starfsmenn' || nav_selector == 'staff_icon'){
                window.open('../../starfsmenn/starfsmenn.html','_self')
                }
            else if(nav_selector == 'bifreidir' || nav_selector == 'settings_icon'){
                window.open('../../stillingar/stillingar.html','_self')
                }
            }   
    
        }
}
    
// Functions to be run when the webpage is opened.
testForMobile();
