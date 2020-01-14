// Builds the menu overlay by adding html code to the already created 'menuOverlay' element.
document.querySelector('footer').innerHTML += `
    <div class='footerInfo'>
        <h2>TAR hugbúnaðarlausnir</h2>
        <div class='footerDetail'>
            <div class='emailPhone'>
                <h3>+354-696-8868</h3>
                <h3>tar@tar.is</h3>
            </div>
            <div class='location'>
                <h3>Reykjavík,</h3>
                <h3>Iceland</h3>
            </div>
        </div>
    </div>
    <h4 id='copyright' class='copyright'></h4>
    
`

document.getElementById('copyright').innerHTML = '© ' + new Date().getFullYear() + ' Tar ehf.'; 
