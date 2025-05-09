const punchLines = [
    "Find jobs that fit your skills",
    "Build job winning resumes",
    "Swipe, match, and generate your perfect career fit"
];


const typeSpeed = 55; //speed per letter in milliseconds
const pauseTime = 1500; //in seconds 1 second = 1000 milliseconds

let currentLine = 0;
let currentChar = 0;

function typeWriterAnimation() {
    const line = punchLines[currentLine];
    const typeTarget = document.querySelector('.typewriter-text');

    if (currentChar < line.length) {
        typeTarget.textContent += line.charAt(currentChar); // Append the next character
        currentChar++; // Move to the next character
        setTimeout(typeWriterAnimation, typeSpeed);// Call the function again after a delay
    } else {
    // If the current line is finished, wait for a while before starting the next line
    if (currentLine < punchLines.length - 1) {
        setTimeout(() => {
            currentLine++; // Move to the next line
            currentChar = 0; // Reset character index
            typeTarget.textContent = ''; // Clear the text
            typeWriterAnimation(); // Start typing the next line
        }, pauseTime);
    } else {
        setTimeout(() => {
            const intro = document.querySelector('.intro-wrapper');
            intro.style.display = 'none'; // remove the punchlines
          
            const home = document.getElementById('homeContent');
            home.classList.add('visible'); // slide homepage up
          }, 1000);
    }

    }
}

window.onload = typeWriterAnimation

// console.log("Landing page script loaded");