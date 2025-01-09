// Elements
const output = document.getElementById("output");
const choicesContainer = document.getElementById("choices");
const inventoryList = document.getElementById("inventory-list");

// Game state
let GameState = {
    location: "",
    inventory: []
};

//items of value
const gold = 0;

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
            button.addEventListener("click", () => {
                //disable all buttons after choice is made
                const allButtons = choicesContainer.querySelectorAll("button");
                allButtons.forEach(btn => (btn.disabled = true));

                //execute the associated action
                choice.action();
            }); // Action on click
            choicesContainer.appendChild(button);
        });
    });
}

// Update the inventory display
function updateInventory() {
    inventoryList.innerHTML = ""; // Clear the current inventory list
    GameState.inventory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

// Location handler
function start() {
    GameState.location = "Start";
    GameState.inventory = []; // Reset inventory
    updateInventory();

    updateGame(
        "Welcome to Rotnîr traveller! Where shall your adventures start?",
        [
            {text: "An unknown trader ship to the south", action: () => ShipStart()},
            {text: "A wagon far off to the east", action: () => WagonStart()}
        ]
    );
}

function ShipStart() {
    // GameState.inventory.push("Compass"); // Add compass to inventory
    // updateInventory();
    updateGame(
        "You find yourself on a docked trader ship, no clue where you are. You see a old map on a barrel",
        [
            { text: "Take the map", action: () => takeMap() },
            { text: "Leave it be, and look around", action: () => lookAroundShip()}
        ]
    );
}

function takeMap() {
    GameState.inventory.push("Map"); // Add map to inventory
    updateInventory();
    updateGame(
        "You see the terrain and mountains displayed on the maps surface, but pieces are missing.",
        [
            { text: "Ask for guidance", action: () => MapGuidance() },
            {text: "Follow the maps lead", action: () => MapsLead()}
        ]
    );
}

function WagonStart() {
    updateGame(
        "You find yourself on a wagon on the east border og Eynir. The wagon makes a stop at the entrance of an unknown village",
        [
            {text: "Follow the path into the village", action: () => WagonStartVillage()},
            {text: "Stay in the wagon", action: () => WagonStartStay()}
        ]
    )
}

function WagonStartStay() {
    updateGame(
        "You stay in the wagon until an old man approaches you. *Take this gold*",
        [
            {text: "take gold from the old man", action: () => takeGold()}
        ]
    )
}

function takeGold() {
    GameState.inventory.push("Gold: ", gold + 100);
    updateInventory();
    updateGame(
        "You received 100 gold from the man",
        [
            {text: "Back to start", action: () => start()}
        ]
    )
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
    start(); // Call the start function to initialize the game
});