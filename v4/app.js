const { models: DATA, renderMessage } = window.V4FaultReview;
let model = 'm5';
let selected = null;
const $ = selector => document.querySelector(selector);

function renderList() {
  const device = DATA[model];
  const fault = device.codes.find(([code]) => code === selected);
  $('#summary').textContent = `${device.name} · 选择正常状态或错误码，点击设备上的叹号可查看异常提示。`;
  $('#count').textContent = `${device.codes.length} 个`;
  $('#normal-state').setAttribute('aria-pressed', String(!fault));
  $('#error-list').innerHTML = device.codes.map(([code, name, kind]) => {
    const active = code === selected;
    const kindLabel = kind === 'blocking' ? '阻断式提示' : '事件提醒';
    return `<button type="button" class="error-item ${active ? 'active' : ''}" data-code="${code}" aria-pressed="${active}"><span class="code">${code}</span><span><strong>${name}</strong><small>${kindLabel}</small></span></button>`;
  }).join('');
  renderPhone(device, fault);
  renderCopy(fault);
}

function renderPhone(device, fault) {
  const params = new URLSearchParams({
    embed: '1',
    instance: `${model}-device-${selected || 'normal'}-${Date.now()}`,
    preset: 'normal',
    hideSync: '1',
    deviceFaultReview: '1',
  });
  if (model === 'v3') params.set('model', 'v3');
  if (fault) {
    const [code, , kind] = fault;
    const blocking = kind === 'blocking';
    params.set('displayCode', code);
    params.set('preset', blocking ? 'blocking-open' : 'event-open');
    params.set('case', blocking ? 'E05' : 'E53');
  }
  $('#phone').innerHTML = `<iframe class="original-app" title="${device.name} 原版控制页" src="../app.html?${params}"></iframe>`;
}

function renderCopy(fault) {
  $('.definition-cell').hidden = !fault;
  if (!fault) return;
  const [code, name, , rule] = fault;
  $('#copy-card').innerHTML = `<div class="copy-box"><div class="code-large">${code} · ${name}</div><p></p></div>`;
  renderMessage($('#copy-card p'), code);
  $('#rule-card').innerHTML = `<div class="rule-box"><p>${rule}</p></div>`;
}

$('#normal-state').addEventListener('click', () => {
  selected = null;
  renderList();
});
$('#error-list').addEventListener('click', event => {
  const item = event.target.closest('[data-code]');
  if (!item) return;
  selected = item.dataset.code;
  renderList();
  $(`[data-code="${selected}"]`).focus({preventScroll: true});
});
$('.model-tabs').addEventListener('click', event => {
  const tab = event.target.closest('[data-model]');
  if (!tab || tab.dataset.model === model) return;
  model = tab.dataset.model;
  selected = null;
  document.querySelectorAll('.model-tab').forEach(button => {
    const active = button === tab;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  renderList();
});
renderList();

function fitPrototypePhone(){const stage=document.querySelector('.phone-stage'),shell=document.querySelector('.phone-shell');if(!stage||!shell)return;const scale=Math.min(1,Math.max(.72,(stage.clientHeight-8)/862,(stage.clientWidth-8)/404));shell.style.transform=`scale(${scale})`;stage.style.height=`${862*scale}px`;}
window.addEventListener('resize',fitPrototypePhone);requestAnimationFrame(fitPrototypePhone);
