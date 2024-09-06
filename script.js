const timerDisplay = document.getElementById('timer');
const timerLabel = document.getElementById('timer-label');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const musicToggleButton = document.getElementById('music-toggle');
const musicPlayer = document.getElementById('music-player');

let workMinutes = 25;
let breakMinutes = 5;
let seconds = 0;
let isWorkTime = true;
let timerInterval;

function updateTimerDisplay() {
  const minutes = String(isWorkTime ? workMinutes : breakMinutes).padStart(2, '0');
  const secondsString = String(seconds).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${secondsString}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if ((isWorkTime && workMinutes === 0) || (!isWorkTime && breakMinutes === 0)) {
        isWorkTime = !isWorkTime;
        timerLabel.textContent = isWorkTime ? 'Work Time Pal' : "It's Break Pal";
        workMinutes = isWorkTime ? 25 : breakMinutes;
        breakMinutes = isWorkTime ? breakMinutes : 5;
        seconds = 59; // Reset seconds to 59 when transitioning between work and break
      } else {
        if (isWorkTime) {
          workMinutes--;
        } else {
          breakMinutes--;
        }
        seconds = 59; // Reset seconds to 59 when decrementing minutes
      }
    } else {
      seconds--;
    }
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

startPauseButton.addEventListener('click', () => {
  if (startPauseButton.textContent === 'Start') {
    startPauseButton.textContent = 'Pause';
    startTimer();
  } else {
    startPauseButton.textContent = 'Start';
    stopTimer();
  }
});

resetButton.addEventListener('click', () => {
  stopTimer();
  workMinutes = 25;
  breakMinutes = 5;
  seconds = 0;
  isWorkTime = true;
  timerLabel.textContent = 'It\'s Work Time Pal';
  updateTimerDisplay();
  startPauseButton.textContent = 'Start';
});

musicToggleButton.addEventListener('click', () => {
  if (musicPlayer.paused) {
    musicPlayer.play();
    musicToggleButton.textContent = 'Pause Music';
  } else {
    musicPlayer.pause();
    musicToggleButton.textContent = 'Play Music';
  }
});

updateTimerDisplay();

const hamburgerMenu = document.querySelector('.hamburger-menu');
const leftPane = document.querySelector('.left-pane');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
  leftPane.classList.toggle('open');
  navLinks.classList.toggle('open');
});