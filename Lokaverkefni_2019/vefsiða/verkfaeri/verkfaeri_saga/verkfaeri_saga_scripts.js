// Reads through the subcollection "in_out" of the specific tool, snapshots its contents and runs the function "renderCheckInData" for each document. 
firestore.collection('Tools').doc(localStorage.getItem("tool_selector")).collection("in_out").get().then((snapshot) => { 
    snapshot.docs.forEach(doc => {
            renderCheckInData(doc);
    })
})


function renderCheckInData(doc){
    // Creates elements.
    let li = document.createElement('li');
    let check_in = document.createElement('span');
    let check_out = document.createElement('span');
    
    // Sets specific content in id to each element.
    li.setAttribute("id", doc.id);
    check_out.setAttribute("id", "check_out");
    check_out.setAttribute("class", "check_out");
    check_in.setAttribute("id", "check_in");
    check_in.setAttribute("class", "check_in");

    check_out.textContent = "Verkfæri skráð út þann: " + doc.data().checkOutDate + " af starfsmanni: " +  doc.data().checkOutUser + " ";
    check_in.textContent = "Verkfæri skráð inn þann: " + doc.data().checkInDate + " af starfsmanni: " +  doc.data().checkInUser + " ";

    // Appends content into li.
    li.appendChild(check_out);
    li.appendChild(check_in);

    // Appends li to the tool_list (ul)
    document.getElementById("check_in_list").appendChild(li);

    // Enables scrolling inside of a spescific div.
    document.addEventListener("touchstart", function(){}, true)
}