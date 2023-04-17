import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const imputDatePickerData = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');

let formatDate = null;
let timerId = null;
let timeDifference = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDifferenceDate(selectedDates[0]);
  },
};

btnStart.disabled = true;
flatpickr(imputDatePickerData, options);
btnStart.addEventListener('click', onBtnStart);

window.addEventListener('keydown', onKeydown => {
  if (onKeydown.code === 'Escape' && timerId) {
    clearInterval(timerId);
    imputDatePickerData.removeAttribute('disabled');
    btnStart.disabled = true;
    secondsData.textContent = '00';
    minutesData.textContent = '00';
    hoursData.textContent = '00';
    daysData.textContent = '00';
  }
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStart.disabled = true;
    return Notiflix.Notify.failure('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  btnStart.removeAttribute('disabled');
}

function startTimer() {
  btnStart.disabled = true;
  imputDatePickerData.setAttribute('disabled', true);

  timeDifference -= 1000;

  if (secondsData.textContent <= 0 && minutesData.textContent <= 0) {
    Notiflix.Notify.success('Time end');
    clearInterval(timerId);
  } 
  else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}

function renderDate(formatDate) {
  secondsData.textContent = formatDate.seconds;
  minutesData.textContent = formatDate.minutes;
  hoursData.textContent = formatDate.hours;
  daysData.textContent = formatDate.days;
}
