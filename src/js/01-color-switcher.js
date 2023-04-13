const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let Interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};
btnStart.addEventListener('click', () => {
  Interval = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);

  btnStart.setAttribute('disabled', 'disabled');
  btnStop.removeAttribute('disabled');
});

btnStop.addEventListener('click',() => {
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', 'disabled');
  clearInterval(Interval);
});
