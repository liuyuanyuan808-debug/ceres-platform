const DATA={m5:{name:'M5 Ultra',codes:[['U01','电池电量极低','事件提醒','电池电量低于 10%，即将自动关机','沿用历史低电提醒；解除后可再次提醒。'],['F02','电池电压过低关机','阻断式提示','电池电压过低，设备暂停使用','充电达到恢复条件并收到设备解除确认后恢复。'],['E05','电池温度过高','阻断式提示','电池温度过高，设备暂停使用','冷却到固件恢复条件，设备确认异常解除后恢复。'],['E11','电机堵转／驱动过流','阻断式提示','系统异常，请长按电源键重启设备','排除泵体或气路异物并重启，不自动重启设备。'],['F12','电机开路','阻断式提示','系统异常，请长按电源键重启设备','重新上电检测；必要时联系售后检修。'],['U32','环境温度过低','事件提醒','环境温度过低，请在室温下使用','达到固件恢复条件后解除，不新增页面阻断。'],['U51','按键卡滞','事件提醒','按键卡滞，请检查按键后使用','仅限制实体按键相关控制，保留其他 App 控制。']]},v3:{name:'V3',codes:[['F41','存储故障','阻断式提示','系统异常，请长按电源键重启设备','执行存储异常限制；检修或更换后由设备确认解除。'],['E42','通信错误','阻断式提示','系统异常，请长按电源键重启设备','指设备内部通信错误，不等同于手机蓝牙断连。'],['U51','按键卡滞','事件提醒','按键卡滞，请检查按键后使用','仅限制实体按键相关控制，保留其他 App 控制。']]}};
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
    return `<button type="button" class="error-item ${active ? 'active' : ''}" data-code="${code}" aria-pressed="${active}"><span class="code">${code}</span><span><strong>${name}</strong><small>${kind}</small></span></button>`;
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
    const blocking = kind === '阻断式提示';
    params.set('displayCode', code);
    params.set('preset', blocking ? 'blocking-open' : 'event-open');
    params.set('case', blocking ? 'E05' : 'E53');
  }
  $('#phone').innerHTML = `<iframe class="original-app" title="${device.name} 原版控制页" src="../app.html?${params}"></iframe>`;
}

function renderCopy(fault) {
  $('.definition-cell').hidden = !fault;
  if (!fault) return;
  const [code, name, kind, description, rule] = fault;
  const message = kind === '阻断式提示' ? `${description}，或联系客服` : description;
  $('#copy-card').innerHTML = `<div class="copy-box"><div class="code-large">${code} · ${name}</div><p>${message}（${code}）</p></div>`;
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
