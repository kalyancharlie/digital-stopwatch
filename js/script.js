// Constants
const elementId = "stopwatch-counter";
const stopwatchElement = document.getElementById(elementId);
const refreshInterval = 100;
const startStopBtn = document.getElementById("start_stop_btn");
const lapBtn = document.getElementById("lap_btn");
const resetLapsBtn = document.getElementById("reset_laps_btn");
const resetCounterBtn = document.getElementById("reset_counter_btn");
const btnInnerElement = startStopBtn.firstElementChild;
const localStorageItemKey = "STOPWATCH_CONFIG";
// Interval ID
var id = null;
// Stopwatch Object
const stopwatch = {
  isOn: false,
  isReset: true,
  hr: 0,
  min: 0,
  sec: 0,
  ms: 0,
  laps: [],
};

// Start & Stop
const startAndStop = () => {
  if (!stopwatch.isOn && stopwatch.isReset) {
    startStopBtn.classList.add("btn-pause");
    startStopBtn.classList.remove("btn-start");
    btnInnerElement.classList.remove("fa-play");
    btnInnerElement.classList.add("fa-pause");
    stopwatch.isOn = true;
    id = setInterval(() => {
      runWatch();
    }, 10);
  } else {
    clearInterval(id);
    stopwatch.isOn = false;
    startStopBtn.classList.add("btn-start");
    startStopBtn.classList.remove("btn-pause");
    btnInnerElement.classList.remove("fa-pause");
    btnInnerElement.classList.add("fa-play");
    saveCurrentState();
  }
};

// Update DOM Element
const updateDOM = () => {
  let formattedHr = stopwatch.hr.toString().padStart(2, "0");
  let formattedMin = stopwatch.min.toString().padStart(2, "0");
  let formattedSec = stopwatch.sec.toString().padStart(2, "0");
  let formattedMs = stopwatch.ms.toString().padStart(3, "0");
  stopwatchElement.textContent = `${formattedHr}:${formattedMin}:${formattedSec}:${formattedMs}`;
};

// Time Calculator
const runWatch = () => {
  stopwatch.ms += 10;
  if (stopwatch.ms == 1000) {
    stopwatch.sec += 1;
    stopwatch.ms = 0;
    if (stopwatch.sec == 60) {
      stopwatch.min += 1;
      stopwatch.sec = 0;
      if (stopwatch.min == 60) {
        stopwatch.hr += 1;
        stopwatch.min = 0;
      }
    }
  }
  updateDOM();
};

// Reset Stopwatch
const resetStopwatch = () => {
  // Smooth Reset
  if (!stopwatch.isOn) {
    stopwatch.isOn = false;
  } else {
    clearInterval(id);
    stopwatch.isOn = false;
    startStopBtn.classList.add("btn-start");
    startStopBtn.classList.remove("btn-pause");
    btnInnerElement.classList.remove("fa-pause");
    btnInnerElement.classList.add("fa-play");
  }
  const msId = setInterval(() => {
    if (stopwatch.ms)
      if (stopwatch.ms - 10 <= 0) {
        clearInterval(msId);
        stopwatch.hr = stopwatch.min = stopwatch.sec = stopwatch.ms = 0;
        stopwatchElement.textContent = "00:00:00:000";
      } else {
        stopwatch.ms -= 10;
        stopwatchElement.textContent = `00:00:00:${stopwatch.ms
          .toString()
          .padStart(3, "0")}`;
      }
  }, 1);
  setTimeout(() => {
    saveCurrentState();
  }, 800);
};

// Create Lap
const registerLap = () => {
  // Add helper function to create element and append to the list with accordion
  let formattedHr = stopwatch.hr.toString().padStart(2, "0");
  let formattedMin = stopwatch.min.toString().padStart(2, "0");
  let formattedSec = stopwatch.sec.toString().padStart(2, "0");
  let formattedMs = stopwatch.ms.toString().padStart(3, "0");

  let currentLapTime = `${formattedHr}:${formattedMin}:${formattedSec}:${formattedMs}`;
  if (stopwatch.laps.length) {
    if (stopwatch.laps[stopwatch.laps.length - 1] == currentLapTime) {
      return;
    }
  }
  stopwatch.laps.push(currentLapTime);
  createLapElement(currentLapTime);
  saveCurrentState();
  toggleLapsHeader();
};

// Create Lap Element
const createLapElement = (content) => {
  const ele = document.getElementById("laps_list");
  const li = document.createElement("p");
  li.textContent = content;
  ele.appendChild(li);
};

// Reset Laps
const resetLaps = () => {
  stopwatch.laps = [];
  const ele = document.getElementById("laps_list");
  const childNodes = ele.childNodes;
  while (childNodes.length) {
    childNodes[0].remove();
  }
  toggleLapsHeader();
  saveCurrentState();
};

// Laps Header Toggler
const toggleLapsHeader = () => {
  const lapsHeaderEle = document.getElementsByClassName("laps-header");
  if (stopwatch.laps.length == 0) {
    lapsHeaderEle[0].style.display = "none";
  } else {
    lapsHeaderEle[0].style.display = "block";
  }
};

// Load Laps from Storage
const loadLapsFromStorage = () => {
  stopwatch.laps.forEach((lap) => createLapElement(lap));
};

// Save Stopwatch to Local Storage
const saveCurrentState = () => {
  localStorage.setItem(localStorageItemKey, JSON.stringify(stopwatch));
};

// Event Listeners
startStopBtn.addEventListener("click", startAndStop);
lapBtn.addEventListener("click", registerLap);
resetLapsBtn.addEventListener("click", resetLaps);
resetCounterBtn.addEventListener("click", resetStopwatch);

// Initialize Stopwatch
const initializeStopwatch = () => {
  const sessionObject = JSON.parse(localStorage.getItem(localStorageItemKey));
  Object.assign(stopwatch, sessionObject);
  toggleLapsHeader();
  updateDOM();
  loadLapsFromStorage();
};

// Accuracy Test Function
const checkLap = () => {
  const btn = document.getElementById("lap_btn");
  setInterval(() => {
    btn.click();
  }, 10);
};

document.addEventListener("DOMContentLoaded", initializeStopwatch);
