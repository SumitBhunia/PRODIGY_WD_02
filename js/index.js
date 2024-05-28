let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;

const hourElement = document.querySelector('.hour h1');
const minuteElement = document.querySelector('.min h1');
const secondElement = document.querySelector('.sec h1');
const millisecondElement = document.querySelector('.milsec h1');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const lapButton = document.getElementById('lapBtn');
const resetButton = document.getElementById('resetBtn');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function stop() {
    clearInterval(timerInterval);
    isRunning = false;
}

function lap() {
    const lapTime = elapsedTime;
    lapCount++;
    const lapItem = document.createElement('div');
    lapItem.classList.add('lapRecord');
    lapItem.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
    document.querySelector('.lapContainer').appendChild(lapItem);
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    displayTime(elapsedTime);
    isRunning = false;
    lapCount = 0;

    // Clear lap records without removing the heading
    const lapContainer = document.querySelector('.lapContainer');
    const lapRecords = lapContainer.querySelectorAll('.lapRecord');
    lapRecords.forEach(record => lapContainer.removeChild(record));
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    hourElement.textContent = formatTimeUnit(hours);
    minuteElement.textContent = formatTimeUnit(minutes);
    secondElement.textContent = formatTimeUnit(seconds);
    millisecondElement.textContent = formatTimeUnit(milliseconds);
}

function formatTimeUnit(unit) {
    return unit < 10 ? '0' + unit : unit;
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();

    return `${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}.${formatTimeUnit(milliseconds)}`;
}

