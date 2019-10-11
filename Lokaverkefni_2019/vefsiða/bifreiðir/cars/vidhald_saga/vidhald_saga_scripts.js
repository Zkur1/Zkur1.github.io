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
    
    checkup_date_var.style.fontWeight = "bold";    
    checkup_staff_var.style.fontWeight = "bold";
    
    checkup_date_text.textContent =  "Síðasta skoðun: ";
    checkup_date_var.textContent = doc.data().checkupDate;
    checkup_staff_text.textContent = "Viðstaddur starfsmaður: ";
    checkup_staff_var.textContent = doc.data().checkupStaff;

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
    let oil_change_text = document.createElement('span');
    let oil_change_var = document.createElement('span');
    let oil_change_staff_text = document.createElement('span');
    let oil_change_staff_var = document.createElement('span');
    let oil_change_milage_text = document.createElement('span');
    let oil_change_milage_var = document.createElement('span')
    let condition_check_text = document.createElement('span');
    let condition_check_var = document.createElement('span');
    
    // Sets specific content in id to each element.
    li.setAttribute("id", doc.id);

    oil_change_var.style.fontWeight = "bold";
    oil_change_staff_var.style.fontWeight = "bold";
    oil_change_milage_var.style.fontWeight = "bold";
    condition_check_var.style.fontWeight = "bold";

    oil_change_text.textContent = "Áætlaður km-fjöldi: ";
    oil_change_var.textContent = doc.data().oilChangeKm + " km.";
    oil_change_staff_text.textContent = "Viðstaddur starfsmaður: ";
    oil_change_staff_var.textContent = doc.data().oilChangeStaff;
    oil_change_milage_text.textContent = "Km-fjöldi við smurningu: ";
    oil_change_milage_var.textContent = doc.data().oilChangeMilage + " km.";
    condition_check_text.textContent = "Þjónustuskoðun: ";
    condition_check_var.textContent = doc.data().conditionCheck;

    // Appends content into li.
    li.appendChild(oil_change_text);
    li.appendChild(oil_change_var);
    li.appendChild(oil_change_staff_text);
    li.appendChild(oil_change_staff_var);
    li.appendChild(oil_change_milage_text);
    li.appendChild(oil_change_milage_var);
    li.appendChild(condition_check_text);
    li.appendChild(condition_check_var);

    // Appends li to the tool_list (ul)
    document.getElementById("oil_change_list").appendChild(li);

    // Enables scrolling inside of a spescific div.
    document.addEventListener("touchstart", function(){}, true)
}


// Renders all history data of the tool and displays on the page. 
function renderTireChangeData(doc){
        // Creates elements.
        let li = document.createElement('li');
        let tire_change_text = document.createElement('span');
        let tire_change_var = document.createElement('span');
        let tire_change_staff_text = document.createElement('span');
        let tire_change_staff_var = document.createElement('span');
        let tire_change_milage_text = document.createElement('span');
        let tire_change_milage_var = document.createElement('span')
        let tire_type_text = document.createElement('span');
        let tire_type_var = document.createElement('span');
        
        
        // Sets specific content in id to each element.
        li.setAttribute("id", doc.id);

        tire_change_var.style.fontWeight = "bold";
        tire_change_staff_var.style.fontWeight = "bold";
        tire_change_milage_var.style.fontWeight = "bold";
        tire_type_var.style.fontWeight = "bold";
    
        tire_change_text.textContent = "Síðustu dekkjaskipti: ";
        tire_change_var.textContent = doc.data().tireChangeDate;
        tire_change_staff_text.textContent = "Viðstaddur starfsmaður: ";
        tire_change_staff_var.textContent = doc.data().tireChangeStaff;
        tire_change_milage_text.textContent = "Km-fjöldi við dekkjaskipti: "
        tire_change_milage_var.textContent = doc.data().tireChangeMilage;
        tire_type_text.textContent = "Tegund dekkja: "
        tire_type_var.textContent = doc.data().tireType;
    
        // Appends content into li.
        li.appendChild(tire_change_text);
        li.appendChild(tire_change_var);
        li.appendChild(tire_change_staff_text);
        li.appendChild(tire_change_staff_var);
        li.appendChild(tire_change_milage_text);
        li.appendChild(tire_change_milage_var);
        li.appendChild(tire_type_text);
        li.appendChild(tire_type_var);
    
        // Appends li to the tool_list (ul)
        document.getElementById("tire_change_list").appendChild(li);
    
        // Enables scrolling inside of a spescific div.
        document.addEventListener("touchstart", function(){}, true)
}

// If the browser detects that the page is being viewed on a smartphone. 
function testForMobile(){
    if (/Mobi/.test(navigator.userAgent)) {
        // Changes the layout of the page to fit the smaller screen of the smartphone. 
        function changeToMobile(){
            var scrollbar_style = document.createElement('style');
            scrollbar_style.innerHTML = `
            .main::-webkit-scrollbar{
                display: block;
                width: 2%;
                background-color: #F5F5F5;
                border-radius: 4px;
            }
            
            .main::-webkit-scrollbar-thumb{
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                background-color: #14489f;
                border-radius: 4px;
            }
            `;
            document.head.appendChild(scrollbar_style);
        }
        changeToMobile();

        document.getElementById('navigation').style.display = 'none';     
        document.getElementById('m_navigation').style.display = 'block';
    }
}
// Functions to be run when the webpage is opened.
testForMobile();
