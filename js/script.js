const elementId = "stopwatch-counter";
const stopwatchElement = document.getElementById(elementId);
const refreshInterval = 100;

const stopwatch = {
  isOn: false,
  laps: [],
  startTime: null,
  elapsedTime: null,
};

// Start Stopwatch
const startStopwatch = () => {
  stopwatch.isOn = true;
  stopwatch.startTime = new Date();
};

// Pause Stopwatch
const pauseStopwatch = () => {};

// Restart Stopwatch
const restartStopwatch = () => {};

// Reset Stopwatch
const resetStopwatch = () => {
  // Smooth Reset
};

// Create Lap
const registerLap = () => {
  // Add helper function to create element and append to the list with accordion
};

// Reset Laps
const resetLaps = () => {};

// Update DOM Element
const updateDOM = () => {};

// Initialize Stopwatch
const initializeStopwatch = () => {};

// Save Stopwatch to Local Storage
const saveCurrentState = () => {};

var val = 0;
const obj = {
    isOn: false,
    isReset: true,
    hr: 0,
    min: 0,
    sec: 0,
    ms: 0,
    laps: []
}

const runWatch = () => {
    obj.ms += 10
    if (obj.ms == 1000) {
        obj.sec += 1
        obj.ms = 0
        if (obj.sec == 60) {
            obj.min += 1
            obj.sec = 0
            if (obj.min == 60) {
                obj.hr += 1
                obj.min = 0
            }
        }
    }
    let formattedHr = obj.hr.toString().padStart(2, "0");
    let formattedMin = obj.min.toString().padStart(2, "0");
    let formattedSec = obj.sec.toString().padStart(2, "0");
    let formattedMs = obj.ms.toString().padStart(3, "0");

    stopwatchElement.textContent = `${formattedHr} : ${formattedMin} : ${formattedSec} : ${formattedMs}`;
    
}
var id = null;


const startAndStop = () => {
    if(obj.isReset) {

    }
    console.log("started", obj.isOn)
    const startStopBtn = document.getElementById('start_stop_btn')

    if(!obj.isOn && obj.isReset) {
        startStopBtn.innerText = "Stop";
        obj.isOn = true;
        id = setInterval(() => {
            window.requestAnimationFrame(runWatch)
        }, 10)
    } else {
        clearInterval(id)
        obj.isOn = false
        startStopBtn.innerText = "Start";
        console.log("stopped", obj.isOn)
    }

}


const lap = () => {
    let formattedHr = obj.hr.toString().padStart(2, "0");
    let formattedMin = obj.min.toString().padStart(2, "0");
    let formattedSec = obj.sec.toString().padStart(2, "0");
    let formattedMs = obj.ms.toString().padStart(3, "0");

    let currentLapTime = `${formattedHr} : ${formattedMin} : ${formattedSec} : ${formattedMs}`;
    obj.laps.push(currentLapTime);
    create(currentLapTime)
}

const create = (content) => {
    const ele = document.getElementById('laps_list')
    const li = document.createElement('p')
    li.textContent = content
    ele.appendChild(li)
}

// Accuracy Test Function
const checkLap = () => {
    const btn = document.getElementById('lap_btn')
    setInterval(() => {
        btn.click();
    }, 10)
}

const resetLapss = () => {
    obj.laps = []
    const ele = document.getElementById('laps_list')
    const childNodes = ele.childNodes
    console.log(childNodes)
    while(childNodes.length) {
        childNodes[0].remove()
    }
    console.log(childNodes)
}

const reset = () => {
    if (!obj.isOn) {
        obj.isOn = false;
    } else {
        clearInterval(id)
        obj.isOn = false;
        const startStopBtn = document.getElementById('start_stop_btn')
        startStopBtn.innerText = "Start";
    }
    const msId = setInterval(() => {
        if(obj.ms)
        if (obj.ms - 10 <= 0) {
            clearInterval(msId);
            obj.hr = obj.min = obj.sec = obj.ms = 0;
            stopwatchElement.textContent = "00 : 00 : 00 : 000";
        } else {
            obj.ms -= 10;
            stopwatchElement.textContent = `00 : 00 : 00 : ${obj.ms.toString().padStart(3, "0")}`;
        }

    }, 1)

}