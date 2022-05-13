const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodeEl = document.querySelector('body');

startBtn.addEventListener('click', startChangeBgColor);
stopBtn.addEventListener('click', stopChangeBgColor);

let intervalId = null;

function startChangeBgColor() {
  intervalId = setInterval(() => {
    bodeEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

function stopChangeBgColor() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
