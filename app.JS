let startTime;
let elapsedTime = 0;
let timerInterval;

function startStop() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    document.getElementById("startStop").textContent = "Pause";
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("startStop").textContent = "Start";
  }
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  document.getElementById("display").textContent = "00:00:00:000";
  document.getElementById("startStop").textContent = "Start";
  document.getElementById("laps").innerHTML = "";
}

function updateTime() {
  const elapsedTimeInMilliseconds = Date.now() - startTime;
  elapsedTime = elapsedTimeInMilliseconds;
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  document.getElementById("display").textContent = formattedTime;
}

function pad(value) {
  return value.toString().padStart(2, '0');
}

function lap() {
  const lapTime = document.createElement("li");
  lapTime.textContent = document.getElementById("display").textContent;
  document.getElementById("laps").appendChild(lapTime);
}

document.getElementById("startStop").addEventListener("click", startStop);
document.getElementById("lapReset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
