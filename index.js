let hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0;

let timer = null;
let display = document.getElementById("display");
let lapContainer = document.getElementById("laps");
let lapCount = 1;

function format(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function updateDisplay() {
  display.innerText = `${format(hours)}:${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
}

function start() {
  if (timer) return;
  timer = setInterval(() => {
    milliseconds++;
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 10);
}

function stop() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  stop();
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  updateDisplay();
  lapContainer.innerHTML = "";
  lapCount = 1;
}

function lap() {
  if (!timer) return; // only allow lap if running
  const lapTime = `${format(hours)}:${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapCount++} → ${lapTime}`;
  lapContainer.prepend(lapItem); // newest lap on top
}
