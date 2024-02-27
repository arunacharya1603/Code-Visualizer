const n = 10;
const array = [];

init();

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}

function play() {
    insertionSort();
}

let delay = 1000; // Default delay time
let isPlaying = false; // Flag to track the play/pause state
let playButton; // Reference to the play/pause button

function updateSpeed(value) {
    delay = 1000 - value + 1; // Adjust the delay time based on slider value
}

function togglePlay() {
    if (!isPlaying) {
        play();
    } else {
        pause();
    }
}

function play() {
    isPlaying = true;
    playButton.innerText = "Pause";
    insertionSort();
}

function pause() {
    isPlaying = false;
    playButton.innerText = "Play";
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let current = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > current) {
            array[j + 1] = array[j];
            await sleep(delay);
            showBars([j, j + 1]);
            j--;
        }
        array[j + 1] = current;
        await sleep(delay);
        showBars();
    }
    isPlaying = false;
    playButton.innerText = "Play";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", function () {
    playButton = document.getElementById("playButton");
});

function showBars(comparisonIndices) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (comparisonIndices && comparisonIndices.includes(i)) {
            // Apply a different color to bars being compared
            bar.classList.add("compare");
        }
        container.appendChild(bar);
    }
}
