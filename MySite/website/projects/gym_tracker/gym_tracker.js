function renderHistory(){
    for(i=0; i<document.getElementById("history_ul").childElementCount; i++){
        let box = document.getElementById("history_ul").children[i];
        for(x=0; x<box.childElementCount; x++){
            let box_p = box.children[x];
            let bodypart;
            let date;
            let time;
            firestore.collection("gymTracker").doc("gymTrackerDoc").collection("history").orderBy('date', 'asc').get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    bodypart = doc.data().bodyPart;
                    date = doc.data().date;
                    time = doc.data().time;
                });
            }).then(function(){
                if(box_p.innerHTML == "Líkamshluti"){
                    box_p.innerHTML = bodypart;
                }

                else if(box_p.innerHTML == "Dags."){
                    box_p.innerHTML = date;
                }

                else if(box_p.innerHTML == "Tími"){
                    box_p.innerHTML = time;
                }
            });
        }
    }   
}


// Saves user input to the database. 
document.getElementById("save_button").onclick = saveGymSession;
function saveGymSession(){
    let main = document.getElementById("main");
    let body_part = document.getElementById("body_part").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    // If all the required fields have been filled. 
    if(body_part != "" && date != ""){
        firestore.collection("gymTracker").doc("gymTrackerDoc").collection("history").add({
            bodyPart: body_part,
            date: date,
            time: time,
        }).then(function(){
            if(main.children[3] != undefined){
                main.firstChild.remove();
                document.getElementById("body_part").value = "";
                document.getElementById("date").value = "";
                document.getElementById("time").value = "";
            }

            else{
                document.getElementById("body_part").value = "";
                document.getElementById("date").value = "";
                document.getElementById("time").value = "";
            }
        })

       
    }
    // If all the required fields have not been filled. 
    else if(body_part == "" || date == ""){
        if(main.children[3] == undefined){
            let error_msg = document.createElement("h2");
            error_msg.innerText = "Vinsamlegast skráðu í alla reitina hér fyrir neðan. "
            error_msg.setAttribute("class", "error");
            main.insertBefore(error_msg, main.firstChild);
        }
    }
}