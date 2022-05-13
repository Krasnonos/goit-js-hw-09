import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dataPicker: document.querySelector('#datetime-picker'),
  submitBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

refs.submitBtn.disabled = true;
refs.submitBtn.addEventListener('click', deadLineTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chekCurrentTime(selectedDates[0]);
  },
};

flatpickr(refs.dataPicker, options);

function chekCurrentTime(selectedDates) {
  const currentTime = Date.now();
  const diference = selectedDates - currentTime;

  if (diference <= 0) {
    refs.submitBtn.disabled = true;
    alert('Please choose a date in the future');
    return;
  }

  refs.submitBtn.disabled = false;
}

function deadLineTimer() {
  let timerMS;
  const chosenTime = refs.dataPicker._flatpickr.latestSelectedDateObj;

  const intervalId = setInterval(() => {
    if (timerMS <= 0) {
      clearInterval(intervalId);
      return;
    }

    const currentTime = Date.now();
    timerMS = chosenTime - currentTime;
    console.log(convertMs(timerMS));
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
