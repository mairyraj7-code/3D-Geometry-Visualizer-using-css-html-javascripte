let autoRotate = true;
let rotationSpeed = 0.5;

let zoom = 1;
const pyramid = document.getElementById("pyramid");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

const speed = document.getElementById("speed");
const color = document.getElementById("color");

const faces = document.querySelectorAll(".face");

const xValue = document.getElementById("xValue");
const yValue = document.getElementById("yValue");
const zoomValue = document.getElementById("zoomValue");


// Start Animation

startBtn.addEventListener("click", () => {


    autoRotate = true;

});


// Stop Animation

stopBtn.addEventListener("click", () => {


    autoRotate = false;

});


// Reset

resetBtn.addEventListener("click", () => {

    rotateX = -25;
    rotateY = 0;
    zoom = 1;

});


// Speed Control

speed.addEventListener("input", () => {


     rotationSpeed = speed.value / 20;
     rotationSpeed = Number(speed.value) * 0.15;

});


// Color Picker

color.addEventListener("input", () => {

    faces.forEach(face => {

        face.style.borderBottomColor = color.value;

    });

});


// Mouse Drag Rotation

const scene = document.querySelector(".scene");

let rotateX = -25;
let rotateY = 0;

let isDragging = false;

let startX = 0;
let startY = 0;

scene.addEventListener("mousedown",(e)=>{

    isDragging = true;

    startX = e.clientX;
    startY = e.clientY;

});

window.addEventListener("mouseup",()=>{

    isDragging = false;

});

window.addEventListener("mousemove",(e)=>{

    if(!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    rotateY += dx * 0.5;
    rotateX -= dy * 0.5;

    pyramid.style.transform =
    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    startX = e.clientX;
    startY = e.clientY;

});


function animate() {

    if (autoRotate) {
        rotateY += rotationSpeed;
    }

        pyramid.style.transform = `
        scale(${zoom})
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)`;

    xValue.textContent = rotateX.toFixed(0);

    yValue.textContent = rotateY.toFixed(0);

    zoomValue.textContent = zoom.toFixed(1);

    requestAnimationFrame(animate);
}

animate();

scene.addEventListener("wheel", (e) => {

    e.preventDefault();

    if (e.deltaY > 0) {
        zoom -= 0.1;
    } else {
        zoom += 0.1;
    }

    zoom = Math.min(Math.max(0.5, zoom), 2.5);

});


window.addEventListener("keydown",(e)=>{

switch(e.key){

case "ArrowLeft":

rotateY -= 10;
break;

case "ArrowRight":

rotateY += 10;
break;

case "ArrowUp":

rotateX -= 10;
break;

case "ArrowDown":

rotateX += 10;
break;

case " ":

autoRotate = !autoRotate;
break;

case "r":

case "R":

rotateX = -25;
rotateY = 0;
zoom = 1;

break;

}

});