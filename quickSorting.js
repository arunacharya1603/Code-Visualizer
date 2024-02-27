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
    quickSort(0, array.length - 1);
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
    quickSort(0, array.length - 1);
}

function pause() {
    isPlaying = false;
    playButton.innerText = "Play";
}

async function quickSort(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
    isPlaying = false;
    playButton.innerText = "Play";
}

async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            await swap(i, j);
        }
    }
    await swap(i + 1, high);
    return i + 1;
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
