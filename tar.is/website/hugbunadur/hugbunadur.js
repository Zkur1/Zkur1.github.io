// Identifies the button and attaches an "onclick" listener to it that runs "s2func" when activated. 
let s2Button = document.getElementsByClassName('s2Button')[0];
if(s2Button != undefined){
    s2Button.onclick = s2func;
}

// Opens a new page in the same tab. 
function s2func(){
    window.open('/tar.is/website/hafaSamband/hafaSamband.html', '_self')
}