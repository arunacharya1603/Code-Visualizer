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
    mergeSort(0, array.length - 1);
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
    mergeSort(0, array.length - 1);
}

function pause() {
    isPlaying = false;
    playButton.innerText = "Play";
}

async function mergeSort(low, high) {
    if (low < high) {
        const mid = Math.floor((low + high) / 2);
        await mergeSort(low, mid);
        await mergeSort(mid + 1, high);
        await merge(low, mid, high);
    }
}

async function merge(low, mid, high) {
    const leftArray = array.slice(low, mid + 1);
    const rightArray = array.slice(mid + 1, high + 1);
    let i = 0, j = 0, k = low;
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k++] = leftArray[i++];
        } else {
            array[k++] = rightArray[j++];
        }
        await sleep(delay);
        showBars([k - 1]);
    }
    while (i < leftArray.length) {
        array[k++] = leftArray[i++];
        await sleep(delay);
        showBars([k - 1]);
    }
    while (j < rightArray.length) {
        array[k++] = rightArray[j++];
        await sleep(delay);
        showBars([k - 1]);
    }
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
