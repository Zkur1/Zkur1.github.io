// Builds the menu overlay by adding html code to the already created 'menuOverlay' element.
document.querySelector('header').innerHTML += `
    <img id='menuIcon' class='menuIcon' src="/tar.is/pictures/icon/menu.png" onclick='goHome'>
    <img id='logo' class='logo' src="/tar.is/pictures/logo/circular.png">
    <img id='searchIcon' class='searchIcon' src="/tar.is/pictures/icon/search.png"></img>
`
