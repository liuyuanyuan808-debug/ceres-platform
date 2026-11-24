const heatSwitch = document.getElementById('heat-switch');
const heatStatus = document.getElementById('heat-status');
const heatTime = document.getElementById('heat-time');
const heatToast = document.getElementById('heat-toast');
const pumpButton = document.getElementById('pause-pump');

const heatDuration = 15 * 60_000;
const heatToastDuration = 2_500;
let heatRemaining = 0;
let pumping = true;
let lastUpdate = performance.now();
let heatToastTimeout;

function formatTime(milliseconds) {
  const totalSeconds = Math.ceil(milliseconds / 1_000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return minutes + ':' + seconds;
}

function updateTime() {
  const now = performance.now();
  if (pumping) heatRemaining = Math.max(0, heatRemaining - (now - lastUpdate));
  lastUpdate = now;
}

function render() {
  const heatEnabled = heatRemaining > 0;
  heatSwitch.setAttribute('aria-checked', String(heatEnabled));

  heatStatus.hidden = !heatEnabled || !pumping;
  heatTime.hidden = !heatEnabled;

  heatTime.textContent = 'Remaining ' + formatTime(heatRemaining);
  const pumpAction = pumping ? 'Pause pumping' : 'Resume pumping';
  pumpButton.dataset.paused = String(!pumping);
  pumpButton.setAttribute('aria-label', pumpAction);
  pumpButton.title = pumpAction;
}

function updateHeatToast() {
  window.clearTimeout(heatToastTimeout);
  const heatPaused = !pumping && heatRemaining > 0;
  heatToast.textContent = heatPaused ? 'Heating paused' : '';

  if (heatPaused) {
    heatToastTimeout = window.setTimeout(() => {
      heatToast.textContent = '';
    }, heatToastDuration);
  }
}

heatSwitch.addEventListener('click', () => {
  updateTime();
  heatRemaining = heatRemaining > 0 ? 0 : heatDuration;
  render();
  updateHeatToast();
});

pumpButton.addEventListener('click', () => {
  updateTime();
  pumping = !pumping;
  render();
  updateHeatToast();
});

render();
window.setInterval(() => {
  updateTime();
  render();
}, 100);
