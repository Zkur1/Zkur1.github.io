document.getElementById("logo").onclick = goToSite;
function goToSite(){
    window.open('Lokaverkefni_2019/vefsiða/index.html','_self')
}

document.getElementById("nav_ul").children[3].onclick = goToSmthn;
function goToSmthn(){
    window.open("CBO/website/index.html")
}

// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    // If the browser detects that the page is being viewed on a smartphone. 
    if(/Mobi/.test(navigator.userAgent)){
        // Changes the layout of the page to fit the smaller screen of the smartphone. 
        function changeToMobile(){
            document.getElementById("nav_ul").style.fontSize = "1vw";
            for(i=0; i < document.getElementById("nav_ul").children.length; i++){
                document.getElementById("nav_ul").children[i].style.padding = "2vh 4vw";
            }

        }
        changeToMobile();
    }
}
    
// Functions to be run when the webpage is opened.
testForPage();
