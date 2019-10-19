let back = document.getElementById("back");
back.addEventListener('mouseover', backButton);
back.addEventListener('mouseout', backButton);
function backButton(){
    if(back.getAttribute('src') == "/MySite/pictures/back.png"){
        back.setAttribute("src", "/MySite/pictures/back2.png");
    }
    else{
        back.setAttribute("src", "/MySite/pictures/back.png");
    }
}

back.onclick = backBehavior;
function backBehavior(){
    window.open("/MySite/website/projects/projects.html", "_self");
}


function liveHistoryFeed(){
    firestore.collection("gymTracker").doc("gymTrackerDoc").collection("history").onSnapshot(function(){
        renderHistory();
    });
}
liveHistoryFeed();


function renderHistory(){
    let history_ul = document.getElementById("history_ul");
    let counter = -1;
    firestore.collection("gymTracker").doc("gymTrackerDoc").collection("history").orderBy('date', 'desc').limit(5).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            counter += 1;
            let data = [doc.data().bodyPart, doc.data().date, doc.data().time];
            
            for(i=0; i<history_ul.children[counter].childElementCount; i++){
                history_ul.children[counter].children[i].innerHTML = data[i];
            }
        });
    }).then(function(){
    });
}

renderHistory();


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
            if(main.children[4] != undefined){
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
        if(main.children[4] == undefined){
            let error_msg = document.createElement("h2");
            error_msg.innerText = "Vinsamlegast skráðu í alla reitina hér fyrir neðan. "
            error_msg.setAttribute("class", "error");
            main.insertBefore(error_msg, main.firstChild);
        }
    }
}