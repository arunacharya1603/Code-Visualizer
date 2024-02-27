const n = 10;
const array=[];

init();

function init(){
    for(let i=0;i<n;i++){
        array[i]=Math.random();
    }
    showBars();
}


function play(){
  const swaps=  bubbleSort(array);
    showBars();
}

for(let i=0;i<n;i++){
    array[i]=Math.random();
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
    bubbleSort(array);
}

function pause() {
    isPlaying = false;
    playButton.innerText = "Play";
}

function bubbleSort(array) {
    const swaps = [];
    let i = 0;
    let j = 0;

    function innerLoop() {
        if (!isPlaying) {
            return; // Exit if paused
        }
        if (j < array.length - 1 - i) {
            setTimeout(() => {
                showBars([j, j + 1]); // Pass indices of bars being compared
                if (array[j] > array[j + 1]) {
                    swaps.push([j, j + 1]);
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
                j++;
                innerLoop(); // Call innerLoop recursively
            }, delay);
        } else {
            i++;
            j = 0;
            if (i < array.length - 1) {
                // If outer loop not finished, reset j and call innerLoop
                setTimeout(innerLoop, delay);
            } else {
                // Sorting completed
                console.log("Sorting completed");
                isPlaying = false;
                playButton.innerText = "Play";
            }
        }
    }

    innerLoop(); // Initial call to innerLoop
}

document.addEventListener("DOMContentLoaded", function() {
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


