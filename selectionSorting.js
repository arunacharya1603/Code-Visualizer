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
    selectionSort();
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
    selectionSort();
}

function pause() {
    isPlaying = false;
    playButton.innerText = "Play";
}

async function selectionSort() {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(i, minIndex);
        }
    }
    isPlaying = false;
    playButton.innerText = "Play";
}

async function swap(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    await sleep(delay);
    showBars([i, j]);
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
