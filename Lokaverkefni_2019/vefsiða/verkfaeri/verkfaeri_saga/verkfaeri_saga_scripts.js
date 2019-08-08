// Reads through the subcollection "in_out" of the specific tool, snapshots its contents and runs the function "renderCheckInData" for each document.
// Note: function "orderBy()" lists the objects by "checkOutDate in decending order.
// Note: function "slice()" limits the "forEach()" request by a specified amount (in this case it limits it to 10 results). 
firestore.collection('Tools').doc(localStorage.getItem("tool_selector")).collection("in_out").orderBy('checkOutDate', 'desc').get().then((snapshot) => { 
    snapshot.docs.forEach(doc => {
            renderCheckInData(doc);
    });
});

// Renders all history data of the tool and displays on the page. 
function renderCheckInData(doc){
    // Creates elements.
    let li = document.createElement('li');
    let check_in = document.createElement('span');
    let check_out = document.createElement('span');
    let projectID_out = document.createElement('span');
    
    // Sets specific content in id to each element.
    li.setAttribute("id", doc.id);
    check_out.setAttribute("id", "check_out");
    check_out.setAttribute("class", "check_out");
    check_in.setAttribute("id", "check_in");
    check_in.setAttribute("class", "check_in");
    projectID_out.setAttribute("id", "projectID_out");
    projectID_out.setAttribute("class", "projectID_out");

    check_out.textContent = "Verkfæri skráð út þann: " + doc.data().checkOutDate + " af starfsmanni: " +  doc.data().checkOutUser + " \n";
    check_in.textContent = "Verkfæri skráð inn þann: " + doc.data().checkInDate + " af starfsmanni: " +  doc.data().checkInUser + " \n";
    projectID_out.textContent = "Verkfæri skráð á verknúmer: " + doc.data().checkOutProject;

    // Appends content into li.
    li.appendChild(check_out);
    li.appendChild(check_in);
    li.appendChild(projectID_out);

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
