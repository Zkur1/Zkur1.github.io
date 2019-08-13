// Reads through the subcollection "in_out" of the specific tool, snapshots its contents and runs the function "renderCheckInData" for each document.
// Note: function "orderBy()" lists the objects by "checkOutDate in decending order.
// Note: function "slice()" limits the "forEach()" request by a specified amount (in this case it limits it to 10 results). 
firestore.collection('Cars').doc(localStorage.getItem("car_selector")).collection("checkup_history").orderBy('dateCreated', 'desc').get().then((snapshot) => { 
    snapshot.docs.forEach(doc => {
            renderCheckupData(doc);
    });
});

firestore.collection('Cars').doc(localStorage.getItem("car_selector")).collection("oil_change_history").orderBy('dateCreated', 'desc').get().then((snapshot) => { 
    snapshot.docs.forEach(doc => {
            renderOilChangeData(doc);
    });
});

firestore.collection('Cars').doc(localStorage.getItem("car_selector")).collection("tire_change_history").orderBy('dateCreated', 'desc').get().then((snapshot) => { 
    snapshot.docs.forEach(doc => {
            renderTireChangeData(doc);
    });
});


// Renders all history data of the tool and displays on the page. 
function renderCheckupData(doc){
    // Creates elements.
    let li = document.createElement('li');
    let checkup_date_text = document.createElement('span');
    let checkup_date_var = document.createElement('span');
    let checkup_staff_text = document.createElement('span');
    let checkup_staff_var = document.createElement('span');
    
    // Sets specific content in id to each element.
    li.setAttribute("id", doc.id);
    checkup_date_text.setAttribute("id", "checkup_date");
    checkup_date_text.setAttribute("class", "checkup_date");
    checkup_date_var.setAttribute("class", "checkup_bold");  
    checkup_staff_var.setAttribute("class", "checkup_bold"); 
    
    checkup_date_var.style.fontWeight = "bold";    
    checkup_staff_var.style.fontWeight = "bold";
    
    checkup_date_text.textContent =  "Síðasta skoðun: ";
    checkup_date_var.textContent = doc.data().checkupDate + "\n";
    checkup_staff_text.textContent = "Viðstaddur starfsmaður: ";
    checkup_staff_var.textContent = doc.data().checkupStaff + " \n";

    // Appends content into li.
    li.appendChild(checkup_date_text);
    li.appendChild(checkup_date_var);
    li.appendChild(checkup_staff_text);
    li.appendChild(checkup_staff_var);

    // Appends li to the tool_list (ul)
    document.getElementById("checkup_list").appendChild(li);

    // Enables scrolling inside of a spescific div.
    document.addEventListener("touchstart", function(){}, true)
}


// Renders all history data of the tool and displays on the page. 
function renderOilChangeData(doc){
    // Creates elements.
    let li = document.createElement('li');
    let oil_change_km = document.createElement('span');
    let oil_change_staff = document.createElement('span');
    
    // Sets specific content in id to each element.
    li.setAttribute("id", doc.id);
    oil_change_km.setAttribute("id", "oil_change_km");
    oil_change_km.setAttribute("class", "oil_change_km");
    oil_change_staff.setAttribute("id", "oil_change_staff");
    oil_change_staff.setAttribute("class", "oil_change_staff");

    oil_change_km.textContent = doc.data().oilChangeKm + " \n";
    oil_change_staff.textContent = doc.data().dateCreated + " \n";

    // Appends content into li.
    li.appendChild(oil_change_km);
    li.appendChild(oil_change_staff);

    // Appends li to the tool_list (ul)
    document.getElementById("oil_change_list").appendChild(li);

    // Enables scrolling inside of a spescific div.
    document.addEventListener("touchstart", function(){}, true)
}


// Renders all history data of the tool and displays on the page. 
function renderTireChangeData(doc){
    // Creates elements.
    let li = document.createElement('li');
    let tire_change_date = document.createElement('span');
    let tire_change_staff = document.createElement('span');
    
    // Sets specific content in id to each element.
    li.setAttribute("id", doc.id);
    tire_change_date.setAttribute("id", "tire_change_date");
    tire_change_date.setAttribute("class", "tire_change_date");
    tire_change_staff.setAttribute("id", "tire_change_staff");
    tire_change_staff.setAttribute("class", "tire_change_staff");

    tire_change_date.textContent = doc.data().tireChangeDate + " \n";
    tire_change_staff.textContent = doc.data().dateCreated + " \n";

    // Appends content into li.
    li.appendChild(tire_change_date);
    li.appendChild(tire_change_staff);

    // Appends li to the tool_list (ul)
    document.getElementById("tire_change_list").appendChild(li);

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
                window.open("../../../index.html", "_self");
                }
            else if(nav_selector == 'bifreidir' || nav_selector == 'car_icon'){
                window.open('../../bifreidir.html','_self')
                }
            else if(nav_selector == 'starfsmenn' || nav_selector == 'staff_icon'){
                window.open('../../../starfsmenn/starfsmenn.html','_self')
                }
            else if(nav_selector == 'bifreidir' || nav_selector == 'settings_icon'){
                window.open('../../../stillingar/stillingar.html','_self')
                }
            }   
    
        }
}
    
// Functions to be run when the webpage is opened.
testForMobile();
