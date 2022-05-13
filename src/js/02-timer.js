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
  }, 1000);
}
