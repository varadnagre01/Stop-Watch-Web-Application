let timer;  //store interval timer
let running = false;
let startTime;
let lapCount = 1;


function startStop() {
    if (running) {
        clearInterval(timer);  //stop the time
        document.querySelector("#startStopBtn").innerHTML = "Start";
    }
    else {
        startTime = Date.now() - lapCount * 1000;
        timer = setInterval(updateDisplay, 1000);
        document.querySelector("#startStopBtn").innerHTML = "Stop";
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    running = false;
    document.querySelector("#display").innerHTML = "00:00:00";
    document.querySelector("#startStopBtn").innerHTML = "Start";
    document.querySelector("#laps").innerHTML = "";
    lapCount = 1;
}


function lap() {
    if (running) {
        const lapTime = Date.now() - startTime; // Calculate lap time
        const formattedTime = formatTime(lapTime); // Format lap time
        const lapList = document.getElementById("laps");
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${lapCount}: ${formattedTime}`;
        lapList.appendChild(lapItem);
        lapCount++;
    }
}

function updateDisplay() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    document.getElementById("display").innerHTML = formatTime(elapsedTime);
}

function formatTime(time) {
    const totalseconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalseconds / 60);
    const seconds = totalseconds % 60;
    const miliseconds = Math.floor((time % 1000) / 10);
    return `${pad(minutes)}:${pad(seconds)}:${pad(miliseconds)}`;
}

function pad(num) {
    return num.toString().padStart(2,"0");
}