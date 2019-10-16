window.addEventListener('resize', checkForHeight);
function checkForHeight(){
    if(document.documentElement.offsetHeight > document.getElementById("main").offsetHeight){
        document.getElementById("main").style.height = "100%";
        console.log("100% : " + document.getElementById("main").offsetHeight);
    }

    else if(document.documentElement.offsetHeight <= document.getElementById("main").offsetHeight){
        document.getElementById("main").style.height = "fit-content";
        console.log("fit-content : " + document.getElementById("main").offsetHeight);
    }
}
