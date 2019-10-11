// Moves background with mouse movement.
function moveBackground(){
    let background = document.querySelector("#container");

    background.addEventListener("mousemove", (position) => {
        background.style.setProperty('--x', -position.offsetX + "px");
        background.style.setProperty('--y', -postition.offsetY + "px");
    });
}

moveBackground();