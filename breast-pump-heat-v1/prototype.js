const heatSwitch = document.getElementById('heat-switch');
const heatStatus = document.getElementById('heat-status');
const heatTime = document.getElementById('heat-time');
const heatNote = document.getElementById('heat-note');
const pumpButton = document.getElementById('pause-pump');

const heatDuration = 15 * 60_000;
let heatRemaining = 0;
let pumping = true;
let lastUpdate = performance.now();

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
  const status = pumping ? 'Heating' : 'Paused';
  heatSwitch.setAttribute('aria-checked', String(heatEnabled));

  heatStatus.hidden = !heatEnabled;
  heatTime.hidden = !heatEnabled;
  heatNote.hidden = pumping || !heatEnabled;
  heatStatus.dataset.paused = String(!pumping);
  if (heatStatus.textContent !== status) heatStatus.textContent = status;

  heatTime.textContent = 'Remaining ' + formatTime(heatRemaining);
  const pumpAction = pumping ? 'Pause pumping' : 'Resume pumping';
  pumpButton.dataset.paused = String(!pumping);
  pumpButton.setAttribute('aria-label', pumpAction);
  pumpButton.title = pumpAction;
}

heatSwitch.addEventListener('click', () => {
  updateTime();
  heatRemaining = heatRemaining > 0 ? 0 : heatDuration;
  render();
});

pumpButton.addEventListener('click', () => {
  updateTime();
  pumping = !pumping;
  render();
});

render();
window.setInterval(() => {
  updateTime();
  render();
}, 100);
