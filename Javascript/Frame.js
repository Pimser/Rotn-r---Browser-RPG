// Elements
const output = document.getElementById("output");
const choicesContainer = document.getElementById("choices");

// Game state
let GameState = {
    location: "",
    inventory: []
};

// Typewriter Effect
function typeWriter(text, i, callback) {
    if (i < text.length) {
        output.textContent += text.charAt(i);
        i++;
        setTimeout(function() {
            typeWriter(text, i, callback);
        }, 50); // Adjust the speed here (milliseconds)
    } else if (callback) {
        callback(); // Once the typing is done, call the callback function (if provided)
    }
}

// Update the game text and choices
function updateGame(newText, newChoices) {
    output.textContent = ""; // Clear previous text
    typeWriter(newText, 0, function() {
        // Once the text has finished typing, display the choices
        choicesContainer.innerHTML = ""; // Clear existing buttons
        newChoices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice.text; // Button label
            button.addEventListener("click", choice.action); // Action on click
            choicesContainer.appendChild(button);
        });
    });
}

// Location handler
function start() {
    GameState.location = "Start";
    GameState.inventory = []; // Reset inventory

    updateGame(
        "Welcome to Rotnîr traveller! Choose wisely.",
        [
            { text: "Take the compass", action: () => takeCompass() },
            { text: "Take map", action: () => takeMap() }
        ]
    );
}

function takeCompass() {
    GameState.inventory.push("Compass"); // Add compass to inventory
    updateGame(
        "You chose to grab the compass.",
        [
            { text: "Go back to the start", action: () => start() }
        ]
    );
}

function takeMap() {
    GameState.inventory.push("Map"); // Add map to inventory
    updateGame(
        "You chose to grab the map.",
        [
            { text: "Go back to the start", action: () => start() }
        ]
    );
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
    start(); // Call the start function to initialize the game
});