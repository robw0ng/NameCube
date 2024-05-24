const cube = document.querySelector(".cube");

const currCoords = document.querySelector(".coords .current");
const prevCoords = document.querySelector(".coords .previous");

const topFaceText = document.querySelector(".cube-text.top");
const bottomFaceText = document.querySelector(".cube-text.bottom");
const leftFaceText = document.querySelector(".cube-text.left");
const rightFaceText = document.querySelector(".cube-text.right");
const frontFaceText = document.querySelector(".cube-text.front");

topFaceText.style.opacity = 0;
bottomFaceText.style.opacity = 0;
frontFaceText.style.opacity = 1;
rightFaceText.style.opacity = 0;
leftFaceText.style.opacity = 0;

let soundEnabled = true;
const toggleSoundButton = document.getElementById('toggleSound');
toggleSoundButton.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    toggleSoundButton.textContent = soundEnabled ? '🔇' : '🔊';
    playOption();
});

let rotateX = 0;
let rotateY = 0;
let oldRotX = 0;
let oldRotY = 0;
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

let currentAudio = null;
let flip = 0;
var currentFace = "front";

function playOption(){
    if (!soundEnabled) return;
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio('audio/Option Select.wav');
    currentAudio.volume = .1;
    currentAudio.play();
}

function playCenter() {
    if (!soundEnabled) return;
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio('audio/Menu Turn Center.wav');
    currentAudio.volume = .1;
    currentAudio.play();
};

function playSide() {
    if (!soundEnabled) return;
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio('audio/Menu Turn Side.wav');
    currentAudio.volume = .1;
    currentAudio.play();
};

function playSelect() {
    if (!soundEnabled) return;
    currentAudio = new Audio('audio/Menu Select.wav');
    currentAudio.volume = .1;
    currentAudio.play();
}

const handleStart = (event) => {
    isDragging = true;
    if (event.touches) {
        lastMouseX = event.touches[0].clientX;
        lastMouseY = event.touches[0].clientY;
    } else {
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
};

const handleMove = (event) => {
    if (isDragging) {
        let clientX, clientY;
        if (event.touches) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        const deltaX = clientX - lastMouseX;
        const deltaY = clientY - lastMouseY;
        rotateX -= deltaY * 0.25; // Adjust the sensitivity as needed
        rotateY += deltaX * 0.25; // Adjust the sensitivity as needed
        cube.style.transition = 'transform 0.1s ease-out'; // Add a short transition for smoothness
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        lastMouseX = clientX;
        lastMouseY = clientY;
    }
};

const handleEnd = () => {
    isDragging = false;
    snapToFace();
};

function face() {
    topFaceText.style.opacity = 0;
    bottomFaceText.style.opacity = 0;
    frontFaceText.style.opacity = 0;
    rightFaceText.style.opacity = 0;
    leftFaceText.style.opacity = 0;
    switch (rotateY) {
        case -90:
            currentFace = "right";
            rightFaceText.style.opacity = 1;
            break;
        case 0:
            currentFace = "front";
            frontFaceText.style.opacity = 1;
            break;
        case 90:
            currentFace = "left";
            leftFaceText.style.opacity = 1;
            break;
    }
    switch (rotateX) {
        case -90:
            currentFace = "top";
            topFaceText.style.opacity = 1;
            break;
        case 90:
            currentFace = "bottom";
            bottomFaceText.style.opacity = 1;
            break;
    }
}

const snapToFace = () => {
    rotateX = Math.round(rotateX / 90) * 90;
    rotateY = Math.round(rotateY / 90) * 90;
    rotateX = rotateX > 90 ? 90 : rotateX; // prevents bottom going to back
    rotateX = rotateX < -90 ? -90 : rotateX; // prevents top going to back
    rotateY = rotateY > 90 ? 90 : rotateY; // prevents left going to back
    rotateY = rotateY < -90 ? -90 : rotateY; // prevents right going to back

    if(rotateX == 90 || rotateX == -90){
        rotateY = 0;
    }

    face();

    if (rotateX != oldRotX || rotateY != oldRotY) {
        if(flip){
            playSide();
            flip = !flip;
        }
        else{
            playCenter();
            flip = !flip;
        }
    }

    currCoords.innerHTML = `Current:<br> X: ${rotateX}<br> Y: ${rotateY}<br>`;
    prevCoords.innerHTML = `Previous:<br> X: ${oldRotX}<br> Y: ${oldRotY}<br>`;

    oldRotX = rotateX;
    oldRotY = rotateY;

    cube.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Add bounce effect
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    topFaceText.style.transform = `rotateZ(${rotateY}deg)`;
    bottomrot = -rotateY;
    bottomFaceText.style.transform = `rotateZ(${bottomrot}deg)`;
};

// Add event listeners to play click sound
document.querySelectorAll('.cube-text a').forEach(link => {
    link.addEventListener('click', playSelect);
});

window.addEventListener("mousedown", handleStart);
window.addEventListener("mousemove", handleMove);
window.addEventListener("mouseup", handleEnd);

window.addEventListener("touchstart", handleStart);
window.addEventListener("touchmove", handleMove);
window.addEventListener("touchend", handleEnd);
