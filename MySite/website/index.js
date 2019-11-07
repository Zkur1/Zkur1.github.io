// Makes sure this javascript file is only ran on a specific page.
function testForPage(){
    // If the browser detects that the page is being viewed on a smartphone. 
    if(/Mobi/.test(navigator.userAgent)){
        // Changes the layout of the page to fit the smaller screen of the smartphone. 
        function changeToMobile(){

        }
        changeToMobile();
    }
}
testForPage()