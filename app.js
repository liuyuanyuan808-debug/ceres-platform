(() => {
  'use strict';
  const reviewParams=new URLSearchParams(location.search),embedded=reviewParams.get('embed')==='1',v3Model=reviewParams.get('model')==='v3',hideSync=reviewParams.get('hideSync')==='1';
  if(embedded)document.documentElement.classList.add('embedded');
  const reviewPrefix=`pump-review:${reviewParams.get('instance')||'standalone'}:`;
  const appStorage=embedded?{getItem:key=>sessionStorage.getItem(reviewPrefix+key),setItem:(key,value)=>sessionStorage.setItem(reviewPrefix+key,value),removeItem:key=>sessionStorage.removeItem(reviewPrefix+key)}:localStorage;
  const reviewSignature=[reviewParams.get('preset'),reviewParams.get('case')].join('|');
  const reviewReset=reviewParams.get('reset');
  const freshReview=embedded&&(appStorage.getItem('signature')!==reviewSignature||(reviewReset&&appStorage.getItem('lastReset')!==reviewReset));
  if(freshReview){appStorage.removeItem(window.PrototypeIssueModel.storageKey);appStorage.removeItem('review-ui');appStorage.setItem('clockOffset','0');}
  let reviewClockOffset=Number(appStorage.getItem('clockOffset')||0);
  const reviewNow=()=>Date.now()+reviewClockOffset;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const phone = $('#phone'), content = $('#page-content'), actions = $('#pumping-actions'), modal = $('#modal-layer');
  const state = {page:'control',mode:'stimulation',levels:{L:1,R:1},night:true,nightPreference:false,brightness:50,autoNight:true,running:false,startedAt:0,elapsed:0,activeSides:{L:false,R:false},elapsedSides:{L:0,R:0},sideStartedAt:{L:0,R:0},hold:null,record:null,dialog:null,checks:{L:true,R:true},saving:false};
  let restoredReviewUI=false;
  const reviewUIKeys=['page','mode','levels','night','nightPreference','brightness','autoNight','running','startedAt','elapsed','activeSides','elapsedSides','sideStartedAt','checks'];
  if(embedded&&!freshReview)try{const saved=JSON.parse(appStorage.getItem('review-ui')||'null');if(saved){for(const key of reviewUIKeys)if(key in saved)state[key]=saved[key];restoredReviewUI=true;}}catch{}
  if(embedded)addEventListener('pagehide',()=>{const saved=Object.fromEntries(reviewUIKeys.map(key=>[key,state[key]]));saved.scrollTop=content.scrollTop;appStorage.setItem('review-ui',JSON.stringify(saved));});
  const issues=window.PrototypeIssueModel.create({storage:appStorage,now:reviewNow});
  const svg = (body, cls='', box='0 0 24 24') => `<svg class="${cls}" viewBox="${box}" aria-hidden="true">${body}</svg>`;
  const icons = {
    back:svg('<path d="m14 4-8 8 8 8"/>'),
    settings:svg('<path d="m7 3-5 9 5 9h10l5-9-5-9Z"/><circle cx="12" cy="12" r="3"/>'),
    link:svg('<path d="m9 14 6-6M8 16l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0M13 8l1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"/>','','0 0 22 24'),
    both:svg('<path d="M8 8H6a4 4 0 0 0 0 8h2m8-8h2a4 4 0 0 1 0 8h-2M8 12h8"/>'),
    modes:svg('<rect x="2" y="2" width="7" height="7" rx="2"/><path d="m17 1 5 5-5 5-5-5Z"/><rect x="2" y="14" width="7" height="8" rx="2"/><rect x="14" y="14" width="8" height="8" rx="2"/>'),
    level:svg('<circle cx="12" cy="12" r="10"/><path d="M6 13v-2a6 6 0 0 1 12 0v2M12 7v6"/><circle cx="12" cy="15" r="2"/>'),
    light:svg('<path d="M8 17c0-3-4-4-4-9a8 8 0 0 1 16 0c0 5-4 6-4 9ZM8 20h8m-6 3h4M9 17h6"/>','','0 0 24 26'),
    chevron:svg('<path d="m8 4 8 8-8 8"/>','chevron'),
    close:svg('<path d="m5 5 14 14M19 5 5 19"/>'),
    double:svg('<path d="m6 8 6-6 6 6M6 16l6 6 6-6"/>','double-chevron'),
    swap:svg('<path d="M4 8h15l-4-4M20 16H5l4 4"/>'),
    edit:svg('<path d="m5 15 10-11 5 5-11 10H4Zm9-10 5 5M11 21h10"/>'),
    copy:svg('<path d="M8 5V2h12v16h-3M4 6h12v16H4Z"/>'),
    check:svg('<path d="m3 6 3 3 6-6"/>','','0 0 15 12'),
  };
  $('#back').innerHTML = icons.back; $('#settings').innerHTML = icons.settings;

  const clamp = (n,min,max) => Math.max(min,Math.min(max,n));
  const formatTime = seconds => `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
  const withErrorCode = (text, code) => { const value=String(text||''); return value.endsWith('。') ? `${value.slice(0,-1)}（${code}）。` : `${value}（${code}）`; };
  const toggle = (id, value, label) => `<button id="${id}" class="toggle" role="switch" aria-label="${label}" aria-checked="${value}"></button>`;
  const battery = side => `<span class="device-battery ${side==='R'?'right':''}" aria-hidden="true"></span>`;
  function resize(){
    if(embedded)return;
    const sideTools=innerWidth>=720;
    const availableWidth=innerWidth-(sideTools?216:0);
    const topSpace=sideTools?0:Math.min($('#demo-controls').getBoundingClientRect().height+24,204);
    phone.style.setProperty('--app-scale',Math.min((availableWidth-24)/402,(innerHeight-topSpace-24)/874));
    phone.style.left=`${availableWidth/2}px`;
    phone.style.top=`${topSpace+(innerHeight-topSpace)/2}px`;
  }
  addEventListener('resize',resize); resize();
  const eventReminder=$('#event-reminder'),eventBlocker=$('#event-blocker');
  const warmTip=$('#warm-tip'),defaultWarmTip=$('p',warmTip).innerHTML;
  let blockingFocus=null,blockingInert=[],toastTimer=null,warmTipTimer=null;
  function showFeedback(message){
    if(state.page==='control'){showWarmTip(message);return;}
    const toast=$('#issue-toast');clearTimeout(toastTimer);toast.textContent=message;toast.hidden=false;toastTimer=setTimeout(()=>toast.hidden=true,3400);
  }
  function resetWarmTip(){clearTimeout(warmTipTimer);$('p',warmTip).innerHTML=defaultWarmTip;phone.classList.remove('has-operation-tip');}
  function positionWarmTip(){if(!phone.classList.contains('has-operation-tip')||eventReminder.hidden)return;const bottom=eventReminder.offsetTop+eventReminder.offsetHeight+(eventReminder.classList.contains('has-next')?7:0);phone.style.setProperty('--operation-tip-top',`${Math.max(112,bottom+4)}px`);}
  function faultWarmFor(side){return issues.data.faults.filter(f=>!side||f.side===side).map(f=>`${f.side==='L'?'左侧':'右侧'}设备：${withErrorCode(issues.definitions[f.code].warm,f.code)}`).join('\n');}
  function trySync(){if(issues.data.faults.length)showWarmTip(['L','R'].map(side=>{const faults=issues.data.faults.filter(f=>f.side===side);return faults.length?`${side==='L'?'左侧':'右侧'}设备存在异常，暂不可开启 Sync。${faults.map(f=>withErrorCode(issues.definitions[f.code].remedy,f.code)).join('；')}`:'';}).filter(Boolean).join('\n'));}
  function showWarmTip(message){
    clearTimeout(warmTipTimer);clearTimeout(toastTimer);$('#issue-toast').hidden=true;
    $('p',warmTip).textContent=`“ ${message} ”`;phone.classList.add('has-operation-tip');positionWarmTip();
    warmTipTimer=setTimeout(resetWarmTip,3400);
  }
  function hideEvent(){eventReminder.hidden=true;eventReminder.classList.remove('has-next');eventReminder.dataset.reminderCount='0';phone.classList.remove('event-reminder-open','has-queued-events');$('#demo-event').setAttribute('aria-pressed','false');}
  function closeEvent(){const id=eventReminder.dataset.faultId;if(id)issues.dismiss(id);else hideEvent();}
  function setEventExpanded(expanded){
    eventReminder.classList.toggle('collapsed',!expanded);
    phone.classList.toggle('event-reminder-collapsed',!expanded);
    $('#event-reminder-toggle').setAttribute('aria-expanded',String(expanded));
    $('#event-reminder-description').hidden=!expanded;
    positionWarmTip();
  }
  function hideBlocking(){
    if(eventBlocker.hidden)return;
    eventBlocker.hidden=true;phone.classList.remove('blocking-open');
    for(const [element,inert] of blockingInert)element.inert=inert;
    blockingInert=[];$('#demo-blocking').setAttribute('aria-pressed','false');
    if(blockingFocus?.isConnected)blockingFocus.focus({preventScroll:true});
    blockingFocus=null;
  }
  function syncFaultNotifications(){
    const reminders=issues.data.faults.filter(f=>f.code==='E53'&&!f.dismissed),reminder=reminders[0];
    if(state.page==='control'&&reminder){
      if(eventReminder.dataset.faultId!==reminder.id){eventReminder.dataset.faultId=reminder.id;setEventExpanded(true);}
      const queued=reminders.length>1,badge=$('.event-symbol',eventReminder);
      badge.textContent=queued?String(reminders.length):'!';badge.classList.toggle('has-count',queued);
      eventReminder.dataset.reminderCount=String(reminders.length);eventReminder.classList.toggle('has-next',queued);phone.classList.toggle('has-queued-events',queued);
      eventReminder.setAttribute('aria-description',queued?`共 ${reminders.length} 条事件提醒，关闭当前提醒后显示下一条。`:'1 条事件提醒。');
      $('#event-reminder-title').textContent=`${reminder.side==='L'?'左侧':'右侧'}设备异常`;
      $('#event-reminder-description').textContent=withErrorCode(issues.definitions.E53.message,'E53');
      $('#dismiss-event').setAttribute('aria-label',`关闭${reminder.side==='L'?'左侧':'右侧'}事件提醒`);
      eventReminder.hidden=false;phone.classList.add('event-reminder-open');$('#demo-event').setAttribute('aria-pressed','true');
    }else hideEvent();
    positionWarmTip();
    const next=issues.data.faults.find(f=>f.code==='E05'&&!f.acknowledged);
    if(state.page!=='control'||!next){hideBlocking();return;}
    if(!eventBlocker.hidden&&eventBlocker.dataset.faultId===next.id)return;
    hideBlocking();cancelHold();blockingFocus=document.activeElement;
    eventBlocker.dataset.faultId=next.id;
    $('#blocking-title').textContent=`${next.side==='L'?'左侧':'右侧'}设备异常`;
    $('#blocking-description').textContent=withErrorCode(issues.definitions.E05.message,'E05');
    blockingInert=[...phone.children].filter(el=>el!==eventBlocker&&el.id!=='issue-toast').map(el=>[el,el.inert]);
    for(const [element] of blockingInert)element.inert=true;
    eventBlocker.hidden=false;phone.classList.add('blocking-open');$('#demo-blocking').setAttribute('aria-pressed','true');$('#close-blocking').focus({preventScroll:true});
  }
  function updateFaultControls(){
    for(const side of ['L','R']){
      const blocked=issues.blocked(side),rail=$(`[data-level="${side}"]`);
      if(rail){rail.setAttribute('aria-disabled',String(blocked));rail.tabIndex=0;rail.classList.toggle('restricted',blocked);}
      const note=$(`[data-device-note="${side}"]`);
      if(note){note.textContent=blocked?`${withErrorCode(issues.definitions.E05.marker||'设备暂不可用','E05')} ›`:issues.heatingRestricted(side)?`${withErrorCode(issues.definitions.E53.marker||'暂不可加热','E53')} ›`:'';note.disabled=!note.textContent;}
    }
  }
  function submissionMarkup(){const busy=issues.data.task?.status==='submitting';return `<span class="problem-copy"><span class="problem-title">${busy?'提交中…':'问题提交'}</span><span class="problem-subtitle">提交设备问题信息，供客服排查</span></span>${busy?'<span class="submit-spinner" aria-hidden="true"></span>':icons.chevron}`;}
  function updateSubmissionRow(){const row=$('#problem-submit');if(!row)return;row.disabled=issues.data.task?.status==='submitting';row.setAttribute('aria-busy',String(row.disabled));row.innerHTML=submissionMarkup();}
  function updateDemoSummary(){const data=issues.data,busy=data.task?.status==='submitting';$('#demo-task-status').textContent=`待提交 ${data.pending.length} 条 · 已确认 ${data.cloud.length} 条\n${busy?'任务提交中':data.network?'网络可用':'模拟断网'}${data.bluetooth?'':' · 蓝牙断开'}`;$('#demo-case').disabled=busy;}
  function syncIssueUI(event={}){
    if(event.type==='reset'||event.type==='recovery')resetWarmTip();
    if(event.type==='task_started'||event.type==='prepared'){clearTimeout(toastTimer);$('#issue-toast').hidden=true;}
    let stopped=false;
    for(const side of ['L','R'])if(issues.blocked(side)&&state.activeSides[side]){state.elapsedSides[side]=Math.floor((Date.now()-state.sideStartedAt[side])/1000);state.activeSides[side]=false;stopped=true;}
    if(stopped){state.running=Object.values(state.activeSides).some(Boolean);if($('.night-card'))updateNight();renderActions();updateTimers();}
    updateFaultControls();updateSubmissionRow();updateDemoSummary();syncFaultNotifications();
    if(event.message)showFeedback(event.message);
    postReviewSnapshot();
  }
  function submitProblem(duration){const result=issues.submit(duration);if(result.status==='account_unconfirmed')$('#demo-task-status').textContent+='\n账号／归属反馈沿用现有规则，待提供样例';}
  function openSubmissionPage(){if(state.saving)return false;if(state.dialog)closeModal();showPage('manage');requestAnimationFrame(()=>{content.scrollTop=content.scrollHeight;});return true;}
  const submissionGroups={
    validation:[['entry','正常入口','点击手机中的“问题提交”，直接校验并提交。'],['empty','无待提交日志','演示校验反馈；入口保持可点击，不开始提交。'],['offline','网络不可用','演示断网反馈；保留日志，不开始提交。'],['bluetooth','蓝牙断开','蓝牙断开不影响提交；点击手机中的“问题提交”查看。']],
    submitting:[['newlog','提交中与防重复','入口显示“提交中…”并禁用；期间新增 1 条日志，本次成功后仍保留。']],
    result:[['success','提交成功','约 6 秒后模拟云端确认，显示“提交成功”并恢复入口。'],['failure','失败后手动重试','约 6 秒后失败，保留日志；再次点击手机中的“问题提交”手动重试。']],
    recovery:[['return','页面返回与重进','任务约 14 秒。点击手机返回键，再点设置，查看同一任务的实际状态；刷新也可恢复。'],['interrupted','任务中断与恢复','任务开始后模拟中断；保留日志并恢复入口，再次点击“问题提交”手动重试。']]
  };
  function updateSubmissionContext(group,kind){
    const cases=submissionGroups[group],select=$('#demo-case');
    $('#demo-context').hidden=false;
    $$('[data-submission-group]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.submissionGroup===group)));
    select.innerHTML=cases.map(([value,label])=>`<option value="${value}">${label}</option>`).join('');select.value=kind;
    select.hidden=$('#demo-case-label').hidden=cases.length===1;
    $('#demo-context-hint').textContent=cases.find(item=>item[0]===kind)[2];
    resize();
  }
  function selectSubmissionGroup(group,kind=submissionGroups[group][0][0]){
    if(state.saving)return;
    if(issues.data.task?.status==='submitting'){openSubmissionPage();return;}
    updateSubmissionContext(group,kind);runSubmissionDemo(kind);
  }
  function runSubmissionDemo(kind){
    if(kind==='reset'){
      if(state.saving)return;
      if(state.dialog)closeModal();state.running=false;state.activeSides={L:false,R:false};state.elapsedSides={L:0,R:0};state.elapsed=0;state.levels={L:1,R:1};state.mode='stimulation';
      issues.reset();$('#issue-toast').hidden=true;$('#demo-context').hidden=true;
      $$('[data-submission-group]').forEach(button=>button.setAttribute('aria-pressed','false'));
      showPage('control');resize();return;
    }
    if(!openSubmissionPage())return;
    if(issues.data.task?.status==='submitting')return;
    issues.prepare({empty:kind==='empty',network:kind!=='offline',result:kind==='failure'?'failure':'success',bluetooth:kind!=='bluetooth'});
    if(kind==='entry'||kind==='bluetooth')return;
    submitProblem(kind==='return'?14000:kind==='interrupted'?30000:kind==='newlog'?9000:6000);
    const taskId=issues.data.task?.id;
    if(kind==='newlog')setTimeout(()=>{if(issues.data.task?.id===taskId&&issues.data.task.status==='submitting')issues.appendDemoLog();},1300);
    if(kind==='interrupted')setTimeout(()=>{if(issues.data.task?.id===taskId&&issues.data.task.status==='submitting')issues.interrupt();},1300);
  }
  $('#demo-event').setAttribute('aria-pressed','false');
  $('#demo-blocking').setAttribute('aria-pressed','false');
  function injectFault(code,side){if(state.page!=='control')showPage('control');issues.receive(code,side);}
  $('#demo-event').addEventListener('click',()=>injectFault('E53','R'));
  $('#event-reminder-toggle').addEventListener('click',()=>setEventExpanded($('#event-reminder-toggle').getAttribute('aria-expanded')!=='true'));
  $('#dismiss-event').addEventListener('click',()=>{closeEvent();if(!eventReminder.hidden)$('#dismiss-event').focus({preventScroll:true});else if(!embedded)$('#demo-event').focus({preventScroll:true});});
  $('#demo-blocking').addEventListener('click',()=>injectFault('E05','L'));
  $('#close-blocking').addEventListener('click',hideBlocking);
  $('#contact-blocking').addEventListener('click',()=>{const id=eventBlocker.dataset.faultId;if(id)issues.acknowledge(id);showPage('contact');});
  $('#demo-recover').addEventListener('click',()=>issues.recoverAll());
  $$('[data-submission-group]').forEach(button=>button.addEventListener('click',()=>selectSubmissionGroup(button.dataset.submissionGroup)));
  $('#demo-case').addEventListener('change',event=>{const group=$('[data-submission-group][aria-pressed="true"]').dataset.submissionGroup;selectSubmissionGroup(group,event.target.value);});
  $$('[data-scenario]').forEach(button=>button.addEventListener('click',()=>runSubmissionDemo(button.dataset.scenario)));
  issues.subscribe(syncIssueUI);
  setInterval(()=>issues.prune(),30000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)issues.prune();});
  function updateHeader(){
    phone.dataset.page=state.page;
    const showTip=state.page==='control';
    if(!showTip)resetWarmTip();
    phone.classList.toggle('has-warm-tip',showTip);
    $('#warm-tip').hidden=!showTip;
    $('#warm-tip-glow').hidden=!showTip;
    if(showTip&&!$('#issue-toast').hidden)showWarmTip($('#issue-toast').textContent);
    if(state.page==='contact')$('#page-title').innerHTML='<span class="contact-header-date">Started Nov 20 at 2:05 PM</span><span class="contact-header-subtitle">Contact us</span>';else $('#page-title').textContent=state.page==='control'?'Breast Pump Control':'Manage Devices';
    $('#settings').hidden=state.page!=='control';
    $('#back').setAttribute('aria-disabled',String(state.page==='control'));
  }
  function hero(){return `<section class="hero ${v3Model?'v3-model':''}" aria-label="Connected breast pumps">
    ${v3Model?'<img class="v3-device" src="assets/v3-device.png" alt="V3 大主机">':'<img class="hero-pump left" src="assets/pump-left.png" alt="Left M5 Ultra breast pump"><img class="hero-pump right" src="assets/pump-right.png" alt="Right M5 Ultra breast pump">'}

    ${hideSync?'': '<button class=\"sync-control\" aria-label=\"Sync\" aria-disabled=\"true\"><span class=\"sync-icon\"><img src=\"assets/icon-sync.png\" alt=\"\"></span><span>Sync</span></button>'}
    ${['L','R'].map(s=>`<div class="device-state ${s==='L'?'left':'right'}"><div class="battery-row">${s}${battery(s)}</div><div class="timer" data-timer="${s}">${formatTime(state.elapsedSides[s])}</div><button class="device-note" data-device-note="${s}" aria-label="查看${s==='L'?'左侧':'右侧'}设备故障说明"></button></div>`).join('')}</section>`;}
  function modeCard(){return `<section class="card mode-card" aria-label="Pumping mode"><div class="mode-heading">${icons.modes}<span>Manual</span><span style="margin-left:auto">${icons.chevron}</span></div><div class="mode-switch">${['stimulation','expression','mixed'].map(m=>`<button class="mode-option ${state.mode===m?'active':''}" data-mode="${m}" aria-pressed="${state.mode===m}"><img src="assets/mode-${m}.png" alt=""><span>${m[0].toUpperCase()+m.slice(1)}</span></button>`).join('')}</div></section>`;}
  function levelColumn(side){const value=state.levels[side];return `<div class="level-column"><div class="level-caption">${side}</div><div class="level-rail" data-level="${side}" role="slider" tabindex="0" aria-label="${side==='L'?'Left':'Right'} suction level" aria-valuemin="1" aria-valuemax="9" aria-valuenow="${value}">${levelTicks(value)}<div class="level-thumb" style="top:${(9-value)/8*184}px">${levelText(value)}</div><div class="drag-bubble" hidden>${value}</div></div></div>`;}
  function levelText(value){return `${value}${value===9?'<span class="max">max</span>':''}`;}
  function levelTicks(value){return Array.from({length:9},(_,i)=>{const n=9-i;return `<i class="tick ${i%2?'minor':''} ${n<value?'used':''}" style="top:${i/8*100}%" aria-hidden="true"></i>`;}).join('');}
  function levelCard(){return `<section class="card level-card" aria-label="Suction level"><div class="card-heading">${icons.level}<span>Level</span><span class="range-hint">1~9</span></div><div class="level-columns">${levelColumn('L')}<div class="level-column both-column"><div class="level-caption both-caption">${icons.both}Both</div><div class="both-rail" role="slider" tabindex="0" aria-label="Both suction levels" aria-valuemin="1" aria-valuemax="9" aria-valuenow="${state.levels.L}">${Array.from({length:7},(_,i)=>`<i class="tick" style="top:${22+i*24}px;width:${32-i*4}px"></i>`).join('')}<div class="both-thumb">${icons.double}</div></div></div>${levelColumn('R')}</div></section>`;}
  function isNightOn(){return state.nightPreference&&!state.running;}
  function nightCard(){const on=isNightOn();return `<section class="card night-card ${on?'on':''}" aria-label="Night light"><div class="night-heading">${icons.light}<span>Night Light</span><span class="auto">Auto</span>${toggle('night-toggle',on,'Night light')}</div><div class="brightness" ${on?'':'hidden'}><div class="brightness-rail"><div class="brightness-fill" style="clip-path:inset(0 ${100-state.brightness}% 0 0)"></div></div><div class="brightness-dots">${[0,25,50,75,100].map(n=>`<i class="${n<=state.brightness?'active':''}"></i>`).join('')}</div><output class="brightness-value" style="left:${state.brightness}%">${state.brightness}%</output><input id="brightness-range" aria-label="Night light brightness" type="range" min="0" max="100" step="25" value="${state.brightness}"></div></section>`;}
  function renderControl(resetScroll=true){
    const scroll=content.scrollTop;
    content.innerHTML=`<div class="control-page">${hero()}${modeCard()}${levelCard()}${nightCard()}</div>`;
    if(!resetScroll)content.scrollTop=scroll;
    bindControl(); renderActions();
  }
  function bindControl(){
    if(!hideSync)$('.sync-control',content).addEventListener('click',trySync);
    $$('[data-device-note]',content).forEach(note=>note.addEventListener('click',()=>showWarmTip(faultWarmFor(note.dataset.deviceNote))));
    $$('.mode-option',content).forEach(btn=>btn.addEventListener('click',()=>{
      if(state.mode===btn.dataset.mode)return;
      if(['L','R'].every(side=>issues.blocked(side)))return;
      state.mode=btn.dataset.mode;for(const side of ['L','R'])if(!issues.blocked(side))state.levels[side]=1;
      $$('.mode-option',content).forEach(b=>{b.classList.toggle('active',b.dataset.mode===state.mode);b.setAttribute('aria-pressed',String(b.dataset.mode===state.mode));});updateLevel('L');updateLevel('R');
    }));
    $$('.level-rail',content).forEach(bindLevel);
    bindBoth($('.both-rail',content));
    $('#night-toggle').addEventListener('click',()=>{if(state.running)return;state.nightPreference=!state.nightPreference;updateNight();});
    bindBrightness();
  }
  function updateNight(){const old=$('.night-card');old.outerHTML=nightCard();$('#night-toggle').addEventListener('click',()=>{if(state.running)return;state.nightPreference=!state.nightPreference;updateNight();});bindBrightness();}
  function bindBrightness(){const range=$('#brightness-range');range.addEventListener('input',()=>{state.brightness=Number(range.value);$('.brightness-fill').style.clipPath=`inset(0 ${100-state.brightness}% 0 0)`;const label=$('.brightness-value');label.style.left=`${state.brightness}%`;label.textContent=`${state.brightness}%`;$$('.brightness-dots i').forEach((dot,i)=>dot.classList.toggle('active',i*25<=state.brightness));});}
  function updateLevel(side){const rail=$(`[data-level="${side}"]`);if(!rail)return;const value=state.levels[side];rail.setAttribute('aria-valuenow',value);const thumb=$('.level-thumb',rail);thumb.style.top=`${(9-value)/8*184}px`;thumb.innerHTML=levelText(value);const bubble=$('.drag-bubble',rail);bubble.style.top=thumb.style.top;bubble.textContent=value;$$('.tick',rail).forEach((tick,i)=>tick.classList.toggle('used',9-i<value));}
  function bindLevel(rail){
    const side=rail.dataset.level;
    const setFromPointer=e=>{const r=rail.getBoundingClientRect();state.levels[side]=clamp(Math.round(9-(e.clientY-r.top)/r.height*8),1,9);updateLevel(side);};
    rail.addEventListener('pointerdown',e=>{e.preventDefault();if(issues.blocked(side)){showWarmTip(faultWarmFor(side));return;}rail.setPointerCapture(e.pointerId);rail.classList.add('dragging');$('.drag-bubble',rail).hidden=false;setFromPointer(e);});
    rail.addEventListener('pointermove',e=>{if(rail.hasPointerCapture(e.pointerId))setFromPointer(e);});
    const finish=()=>{rail.classList.remove('dragging');$('.drag-bubble',rail).hidden=true;};
    rail.addEventListener('pointerup',finish);rail.addEventListener('pointercancel',finish);
    rail.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();if(issues.blocked(side)){showWarmTip(faultWarmFor(side));return;}state.levels[side]=e.key==='Home'?1:e.key==='End'?9:clamp(state.levels[side]+(e.key==='ArrowUp'?1:-1),1,9);updateLevel(side);});
  }
  function bindBoth(rail){
    let startY, startL, startR;
    rail.addEventListener('pointerdown',e=>{e.preventDefault();rail.setPointerCapture(e.pointerId);startY=e.clientY;startL=state.levels.L;startR=state.levels.R;});
    rail.addEventListener('pointermove',e=>{if(!rail.hasPointerCapture(e.pointerId))return;const scale=phone.getBoundingClientRect().width/402;const dy=(startY-e.clientY)/scale;const delta=Math.round(dy/17);if(!issues.blocked('L'))state.levels.L=clamp(startL+delta,1,9);if(!issues.blocked('R'))state.levels.R=clamp(startR+delta,1,9);rail.setAttribute('aria-valuenow',issues.blocked('L')?state.levels.R:state.levels.L);$('.both-thumb',rail).style.transform=`translateY(${clamp(-dy,-73,73)}px)`;updateLevel('L');updateLevel('R');});
    const notifyAdjustment=()=>{const blocked=['L','R'].filter(side=>issues.blocked(side));if(blocked.length)showWarmTip(blocked.map(faultWarmFor).join('\n'));};
    const finish=()=>{$('.both-thumb',rail).style.transform='';notifyAdjustment();};rail.addEventListener('pointerup',finish);rail.addEventListener('pointercancel',finish);
    rail.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();for(const side of ['L','R']){if(issues.blocked(side))continue;state.levels[side]=clamp(state.levels[side]+(e.key==='ArrowUp'?1:-1),1,9);updateLevel(side);}rail.setAttribute('aria-valuenow',issues.blocked('L')?state.levels.R:state.levels.L);notifyAdjustment();});
  }
  function renderActions(){
    actions.hidden=state.page!=='control';if(state.page!=='control')return;
    if(!state.running){actions.innerHTML='<button class="primary-button start-pumping">Start Pumping</button>';$('.start-pumping').addEventListener('click',startPumping);}
    else{actions.innerHTML='<div class="running-actions"><button class="hold-end" aria-label="Hold to end pumping"><span class="hold-fill"></span><span class="hold-label"><i class="stop-square"></i>Hold To End</span></button><button class="pause" aria-label="Pause pumping" aria-disabled="true"><i></i><i></i></button></div>';const button=$('.hold-end');button.addEventListener('pointerdown',e=>{e.preventDefault();button.setPointerCapture(e.pointerId);beginHold();});button.addEventListener('pointerup',cancelHold);button.addEventListener('pointercancel',cancelHold);button.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();beginHold();}});button.addEventListener('keyup',cancelHold);button.addEventListener('blur',cancelHold);}
  }
  function startPumping(){
    if(['L','R'].every(side=>issues.blocked(side))){showWarmTip(faultWarmFor());return;}
    state.running=true;state.elapsed=0;state.startedAt=Date.now();
    for(const side of ['L','R']){state.activeSides[side]=!issues.blocked(side);state.elapsedSides[side]=0;state.sideStartedAt[side]=state.startedAt;}
    const blocked=['L','R'].filter(side=>issues.blocked(side));if(blocked.length)showWarmTip(blocked.map(faultWarmFor).join('\n'));
    updateNight();renderActions();updateTimers();
  }
  function updateTimers(){for(const side of ['L','R'])if(state.activeSides[side])state.elapsedSides[side]=Math.floor((Date.now()-state.sideStartedAt[side])/1000);state.elapsed=Math.max(state.elapsedSides.L,state.elapsedSides.R);$$('[data-timer]').forEach(t=>t.textContent=formatTime(state.elapsedSides[t.dataset.timer]));}
  setInterval(updateTimers,200);
  function beginHold(){if(state.hold||!state.running)return;const started=performance.now();state.hold={started};const animate=now=>{if(!state.hold)return;const progress=clamp((now-started)/2000,0,1);const fill=$('.hold-fill');if(fill)fill.style.width=`${progress*100}%`;if(progress>=1){state.hold=null;endPumping();}else requestAnimationFrame(animate);};requestAnimationFrame(animate);}
  function cancelHold(){state.hold=null;const fill=$('.hold-fill');if(fill)fill.style.width='0';}
  function endPumping(){const duration=Math.max(1,Math.floor((Date.now()-state.startedAt)/1000));state.running=false;state.activeSides={L:false,R:false};state.elapsedSides={L:0,R:0};state.elapsed=0;cancelHold();renderControl();updateFaultControls();content.scrollTop=0;state.record={L:0,R:0,seconds:duration,expanded:false};setTimeout(openRecord,200);}
  function renderContact(){content.innerHTML=`<div class="contact-page"><p class="contact-time">${new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}</p><div class="contact-agent"><img src="assets/ceres-avatar.png" alt="Momcozy"><div><strong>Momcozy</strong><span>Contact us</span></div></div><div class="contact-bubble">Hello, welcome to Momcozy. Please select the type of support you need.</div><div class="contact-options"><button>IBCLC (Lactation Consultation and Maternal & Infant Health Care)</button><button>Babymonitor (BM03/BM04) firmware update</button><button>Product and event consultation</button><button>Order status and logistics issues</button><div class="contact-row"><button>After-sales service</button><button>Other inquiries</button></div><button>Baby monitor firmware upgrade and Survey</button><button>Power Adapter Warning for MW05 Portable Bottle Warmer</button></div><div class="contact-composer"><span class="clip">⌕</span><span>Type a message</span></div></div>`;}
  function showPage(page){state.page=page;updateHeader();content.scrollTop=0;if(page==='control')renderControl();else if(page==='manage')renderManage();else if(page==='contact')renderContact();else renderDetail();renderActions();syncIssueUI();}
  $('#settings').addEventListener('click',()=>showPage('manage'));
  $('#back').addEventListener('click',()=>{if(state.page==='contact')showPage('control');else if(state.page==='detail')showPage('manage');else if(state.page==='manage')showPage('control');});
  function renderManage(){
    content.innerHTML=`<div class="manage-page"><button class="device-row" id="device-details"><img class="device-mini" src="assets/pump-left.png" alt=""><img class="device-mini" src="assets/pump-right.png" alt=""><span class="device-summary"><strong>M5 Ultra</strong><span class="mini-batteries"><span>L${battery('L')}</span><span>R${battery('R')}</span></span></span>${icons.chevron}</button><h2 class="section-label">Device Features</h2><section class="features-card"><div class="feature-intro ${state.autoNight?'':'only'}"><strong>Auto-On Night Light</strong><p>The night light is turned on automatically when pumping is paused.</p>${toggle('auto-night-toggle',state.autoNight,'Auto-on night light')}</div><div class="feature-duration" ${state.autoNight?'':'hidden'}><div class="duration-label">Duration</div><div class="duration-options"><button class="duration-option active" aria-pressed="true">10 s</button><button class="duration-option" aria-disabled="true">20 s</button><button class="duration-option" aria-disabled="true">30 s</button><button class="duration-option" aria-disabled="true">Custom</button></div></div></section><h2 class="section-label">General Settings</h2><section class="general-settings"><button class="settings-row" data-dialog="firmware">Firmware Update<span class="right-value">Update Available<i class="update-dot"></i></span>${icons.chevron}</button><button class="settings-row" data-dialog="factory">Restore Factory${icons.chevron}</button><button class="settings-row" data-dialog="power">Power Off Device${icons.chevron}</button></section><h2 class="section-label">帮助与支持</h2><section class="support-settings"><button class="problem-submit" id="problem-submit">${submissionMarkup()}</button></section><button class="delete-device" aria-disabled="true">Delete</button></div>`;
    $('#problem-submit').addEventListener('click',()=>submitProblem());updateSubmissionRow();
    $('#device-details').addEventListener('click',()=>showPage('detail'));
    $('#auto-night-toggle').addEventListener('click',()=>{state.autoNight=!state.autoNight;const scroll=content.scrollTop;renderManage();content.scrollTop=scroll;});
    $$('[data-dialog]',content).forEach(btn=>btn.addEventListener('click',()=>openOperation(btn.dataset.dialog)));
  }
  function renderDetail(){content.innerHTML=`<div class="device-detail"><section class="detail-hero"><img class="detail-pump left" src="assets/pump-left.png" alt="Left M5 Ultra breast pump"><img class="detail-pump right" src="assets/pump-pink.png" alt="Right M5 Ultra breast pump"><span class="detail-lr left">L</span><span class="detail-lr right">R</span><button class="swap-button" aria-disabled="true"><span>${icons.swap}</span>Swap</button><div class="device-name">M5 Ultra 0D<button class="edit-name" aria-label="Edit device name" aria-disabled="true">${icons.edit}</button></div></section><section class="detail-table"><div class="detail-row"><span>Model</span><span class="detail-value">M5 Ultra</span></div><div class="detail-row"><span>SN</span><span class="detail-value"><span class="ellipsis">M800BBBBRB1DCC400000D0D0E6731N1...</span><button class="copy-button" aria-label="Copy serial number" aria-disabled="true">${icons.copy}</button></span></div><div class="detail-row"><span>MAC</span><span class="detail-value">DC:C4:00:00:0D:0D<button class="copy-button" aria-label="Copy MAC address" aria-disabled="true">${icons.copy}</button></span></div><div class="detail-row"><span>Firmware Version</span><span class="detail-value">2.24</span></div></section></div>`;}
  const operations={factory:{title:'Factory Reset',copy:'Restore factory settings?',center:true},power:{title:'Power Off Device',copy:'Power off the device? This will end the ongoing pumping session.'},firmware:{title:'Firmware Update',copy:'A new version(V 2.25) is ready. Make sure the pump has sufficient battery, and keep your phone near the pump during the update.'}};
  function openOperation(kind){
    content.inert=true;$('#navigation').inert=true;actions.inert=true;state.dialog=kind;state.checks={L:true,R:kind!=='firmware'};const op=operations[kind];modal.classList.add('active');
    modal.innerHTML=`<div class="modal-backdrop"></div><section class="operation-sheet" role="dialog" aria-modal="true" aria-labelledby="operation-title"><button class="sheet-close" aria-label="Close dialog">${icons.close}</button><h2 class="operation-title" id="operation-title">${op.title}</h2><p class="operation-copy ${op.center?'center':''}">${op.copy}</p><div class="operation-devices">${['L','R'].map(s=>`<div class="operation-device"><img src="assets/pump-left.png" alt="${s==='L'?'Left':'Right'} pump"><div class="firmware-version">(V 2.24)</div><button class="device-check" data-check="${s}" role="checkbox" aria-label="${s==='L'?'Left':'Right'} device" aria-checked="${state.checks[s]}">${s}<span class="check-square">${state.checks[s]?icons.check:''}</span></button></div>`).join('')}</div><button class="primary-button confirm-operation" aria-disabled="true">Confirm</button></section>`;
    $('.sheet-close',modal).addEventListener('click',closeModal);$('.modal-backdrop',modal).addEventListener('click',closeModal);
    $$('[data-check]',modal).forEach(btn=>btn.addEventListener('click',()=>{const s=btn.dataset.check;state.checks[s]=!state.checks[s];btn.setAttribute('aria-checked',state.checks[s]);$('.check-square',btn).innerHTML=state.checks[s]?icons.check:'';}));
    $('.sheet-close',modal).focus({preventScroll:true});
  }
  function closeModal(){if(state.saving)return;modal.classList.remove('active');modal.innerHTML='';state.dialog=null;state.record=null;content.inert=false;$('#navigation').inert=false;actions.inert=false;}
  function egg(side,value){const water=144*(1-value/300);const shape='M64 0C27 0 0 38 0 82C0 120 27 144 64 144S128 120 128 82C128 38 102 0 64 0Z';return `<svg class="egg-svg" viewBox="-2.5 -2.5 133 149" aria-hidden="true"><defs><linearGradient id="pink-${side}" x1="0" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#ff99b0"/><stop offset=".55" stop-color="#ffa6bb"/><stop offset="1" stop-color="#f7c2d1"/></linearGradient><radialGradient id="shine-${side}"><stop stop-color="#ffdae1" stop-opacity=".75"/><stop offset="1" stop-color="#ffd9e2" stop-opacity="0"/></radialGradient><clipPath id="eggclip-${side}"><path d="${shape}"/></clipPath></defs><path d="${shape}" fill="url(#pink-${side})"/><ellipse cx="61" cy="15" rx="25" ry="14" fill="url(#shine-${side})"/><g clip-path="url(#eggclip-${side})"><path class="milk-fill" d="M5 ${water}Q32 ${water+5} 64 ${water+1}T123 ${water+2}V150H5Z" fill="#fff" ${value===0?'opacity="0"':''}/></g><path d="${shape}" fill="none" stroke="#ffa5bc" stroke-width="5"/><text class="egg-letter" x="64" y="85" text-anchor="middle" opacity="${value>0?0:.6}">${side}</text></svg>`;}
  function milkControl(side){const value=state.record[side];return `<div class="milk-control" data-volume="${side}" role="slider" tabindex="0" aria-label="${side==='L'?'Left':'Right'} milk volume" aria-valuemin="0" aria-valuemax="300" aria-valuenow="${value}">${egg(side,value)}<div class="milk-handle" style="top:${144*(1-value/300)}px">${icons.double}</div><div class="volume-pill ${value===0?'zero':''}"><span class="volume-number">${value}</span><span class="volume-unit">ml</span></div></div>`;}
  function milkAxis(){return `<div class="milk-axis"><div class="axis-line">${Array.from({length:31},(_,i)=>`<i class="axis-tick ${i%15===0?'major':''}" style="top:${i/30*100}%"></i>`).join('')}</div>${[300,150,0].map((n,i)=>`<span class="axis-value" style="top:${i*50}%">${n}</span>`).join('')}</div>`;}
  function openRecord(){
    if(!state.record)return;state.dialog='record';modal.classList.add('active');content.inert=true;$('#navigation').inert=true;actions.inert=true;
    modal.innerHTML=`<div class="modal-backdrop record-backdrop"></div><section class="record-sheet" role="dialog" aria-modal="true" aria-labelledby="record-title"><button class="sheet-close" aria-label="Close pumping log">${icons.close}</button><h2 class="record-title" id="record-title">Log Pumping</h2><button class="record-date" aria-disabled="true">Nov 17, 5:43 PM${icons.chevron}</button><div class="milk-controls">${milkControl('L')}${milkAxis()}${milkControl('R')}</div><section class="log-duration"><button class="log-duration-heading" aria-expanded="false"><span>Duration</span><span class="log-duration-value">${state.record.seconds}s</span>${svg('<path d="m4 8 8 8 8-8"/>')}</button><div class="wheel-panel" hidden><div class="wheel-selection"></div><div class="wheel-column" data-wheel="minutes" role="listbox" aria-label="Minutes"></div><div class="wheel-column" data-wheel="seconds" role="listbox" aria-label="Seconds"></div></div></section><button class="save-record">Save</button></section>`;
    $('.sheet-close',modal).addEventListener('click',closeModal);
    $$('.milk-control',modal).forEach(bindMilk);
    $('.log-duration-heading',modal).addEventListener('click',toggleDuration);
    $('.save-record',modal).addEventListener('click',saveRecord);
    $('.sheet-close',modal).focus({preventScroll:true});
  }
  function updateMilk(side){const control=$(`[data-volume="${side}"]`,modal),value=state.record[side];control.setAttribute('aria-valuenow',value);$('.egg-svg',control).outerHTML=egg(side,value);$('.milk-handle',control).style.top=`${144*(1-value/300)}px`;$('.volume-number',control).textContent=value;$('.volume-pill',control).classList.toggle('zero',value===0);}
  function bindMilk(control){const side=control.dataset.volume;const fromPointer=e=>{const r=control.getBoundingClientRect();state.record[side]=clamp(Math.round((1-(e.clientY-r.top)/r.height)*300),0,300);updateMilk(side);};control.addEventListener('pointerdown',e=>{if(state.saving)return;e.preventDefault();control.setPointerCapture(e.pointerId);fromPointer(e);});control.addEventListener('pointermove',e=>{if(control.hasPointerCapture(e.pointerId)&&!state.saving)fromPointer(e);});control.addEventListener('keydown',e=>{if(state.saving||!['ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();state.record[side]=e.key==='Home'?0:e.key==='End'?300:clamp(state.record[side]+(e.key==='ArrowUp'?1:-1),0,300);updateMilk(side);});}
  function toggleDuration(){if(state.saving)return;state.record.expanded=!state.record.expanded;const expanded=state.record.expanded;$('.record-sheet',modal).classList.toggle('expanded',expanded);$('.log-duration-heading',modal).setAttribute('aria-expanded',expanded);$('.log-duration-heading>svg',modal).innerHTML=expanded?'<path d="m4 16 8-8 8 8"/>':'<path d="m4 8 8 8 8-8"/>';$('.wheel-panel',modal).hidden=!expanded;if(expanded)setupWheels();}
  function setupWheels(){
    const minute=Math.floor(state.record.seconds/60),second=state.record.seconds%60;
    $$('.wheel-column',modal).forEach(col=>{
      const kind=col.dataset.wheel,chosen=kind==='minutes'?minute:second;
      const values=kind==='minutes'?Array.from({length:Math.max(3,minute+1)},(_,i)=>i):Array.from({length:Math.max(10,second+1)},(_,i)=>i);
      col.innerHTML=values.map(n=>`<button class="wheel-option ${n===chosen?'selected':''}" role="option" aria-selected="${n===chosen}" data-number="${n}">${String(n).padStart(2,'0')}${n===chosen?`<span class="wheel-unit">${kind==='minutes'?'m':'s'}</span>`:''}</button>`).join('');
      col.scrollTop=chosen*40;
      let scrollTimer;
      const select=number=>{if(!state.record||state.saving)return;const other=kind==='minutes'?state.record.seconds%60:Math.floor(state.record.seconds/60);state.record.seconds=kind==='minutes'?number*60+other:other*60+number;$('.log-duration-value',modal).textContent=`${state.record.seconds}s`;$$('.wheel-option',col).forEach(b=>{const active=Number(b.dataset.number)===number;b.classList.toggle('selected',active);b.setAttribute('aria-selected',active);b.innerHTML=String(b.dataset.number).padStart(2,'0')+(active?`<span class="wheel-unit">${kind==='minutes'?'m':'s'}</span>`:'');});};
      col.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>select(clamp(Math.round(col.scrollTop/40),0,values.length-1)),90);});
      $$('.wheel-option',col).forEach(b=>b.addEventListener('click',()=>{if(state.saving)return;const n=Number(b.dataset.number);select(n);col.scrollTo({top:n*40,behavior:'smooth'});}));
      let drag=null;
      col.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||state.saving)return;drag={y:e.clientY,top:col.scrollTop,moved:false};});
      col.addEventListener('pointermove',e=>{if(!drag)return;const dy=(drag.y-e.clientY)/(phone.getBoundingClientRect().width/402);if(Math.abs(dy)>3){drag.moved=true;col.setPointerCapture(e.pointerId);col.scrollTop=drag.top+dy;}});
      col.addEventListener('pointerup',()=>{if(!drag)return;if(drag.moved){const n=clamp(Math.round(col.scrollTop/40),0,values.length-1);select(n);col.scrollTo({top:n*40,behavior:'smooth'});}drag=null;});
    });
  }
  function saveRecord(){
    if(state.saving||!state.record)return;state.saving=true;$('.save-record',modal).setAttribute('aria-label','Saving pumping log');$('.save-record',modal).innerHTML='<span class="loading-dots" role="status" aria-label="Saving"><i></i><i></i><i></i></span>';$('.sheet-close',modal).disabled=true;
    const record={leftMl:state.record.L,rightMl:state.record.R,durationSeconds:state.record.seconds};
    setTimeout(()=>{try{const records=JSON.parse(appStorage.getItem('video-pumping-records')||'[]');records.push({...record,savedAt:new Date().toISOString()});appStorage.setItem('video-pumping-records',JSON.stringify(records));}catch{}state.saving=false;closeModal();showSuccess();},7800);
  }
  function showSuccess(){const layer=$('#success-layer');layer.hidden=false;layer.innerHTML='<img class="success-bunny" src="assets/bunny.webp" alt="Pink rabbit holding flowers"><div class="logged-label">Logged</div><img class="logged-underline" src="assets/logged-underline.png" alt="">';setTimeout(()=>{layer.hidden=true;layer.innerHTML='';showPage('control');},1800);}
  document.addEventListener('keydown',e=>{
    if(!eventBlocker.hidden){
      if(e.key==='Tab'){e.preventDefault();const focusables=[$('#contact-blocking'),$('#close-blocking')].filter(Boolean);const index=focusables.indexOf(document.activeElement);focusables[(index+1)%focusables.length]?.focus();}
      if(e.key==='Escape')e.preventDefault();
      return;
    }
    if(e.key==='Escape'&&state.dialog&&!state.saving)closeModal();
    if(e.key==='Tab'&&modal.classList.contains('active')){const focusable=$$('button:not(:disabled):not([aria-disabled="true"]),[tabindex="0"]',modal);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}
  });
  function reviewCode(){return reviewParams.get('case')==='E53'?'E53':'E05';}
  function reviewSide(){return reviewCode()==='E53'?'R':'L';}
  function reviewSnapshot(){return {instance:reviewParams.get('instance'),page:state.page,code:reviewCode(),faults:issues.data.faults.length,faultItems:issues.data.faults.map(f=>({code:f.code,side:f.side,acknowledged:f.acknowledged,dismissed:f.dismissed})),pending:issues.data.pending.length,cloud:issues.data.cloud.length,taskStatus:issues.data.task?.status||null,taskId:issues.data.task?.id||null,inflight:issues.data.task?.status==='submitting'?issues.data.task.logs.length:0,dayAdvanced:reviewClockOffset>0};}
  function postReviewSnapshot(){if(embedded&&parent!==window)parent.postMessage({type:'review-state',snapshot:reviewSnapshot()},location.origin);}
  function quietFault(code,side){const fault=issues.receive(code,side);if(code==='E05')issues.acknowledge(fault.id);else issues.dismiss(fault.id);}
  function prepareReviewSubmission(options={}){if(issues.data.task?.status==='submitting')return;issues.prepare({code:'E05',side:'L',...options});openSubmissionPage();}
  function applyReviewPreset(){
    const preset=reviewParams.get('preset')||'normal',code=reviewCode(),side=reviewSide();
    if(preset.startsWith('submit-'))prepareReviewSubmission({empty:preset==='submit-empty',network:preset!=='submit-offline',bluetooth:preset!=='submit-bluetooth'});
    else if(preset==='fault-status')quietFault(code,side);
    else if(preset==='fault-open')issues.receive(code,side);
    else if(preset==='event-open'||preset==='event-collapsed'){issues.receive('E53','R');if(preset==='event-collapsed')setEventExpanded(false);}
    else if(preset==='event-closed')quietFault('E53','R');
    else if(preset==='blocking-open')issues.receive('E05','L');
    else if(preset==='blocking-queue'){issues.receive('E05','L');issues.receive('E05','R');}
    else if(preset==='mixed-faults'){quietFault('E05','L');quietFault('E53','R');}
    else if(preset==='multi-faults-open'||preset==='multi-faults-quiet'){
      for(const [faultCode,faultSide] of [['E05','L'],['E05','R'],['E53','L'],['E53','R']]){
        if(preset==='multi-faults-quiet')quietFault(faultCode,faultSide);else issues.receive(faultCode,faultSide);
      }
    }
    appStorage.setItem('signature',reviewSignature);if(reviewReset)appStorage.setItem('lastReset',reviewReset);postReviewSnapshot();
  }
  function runReviewAction(action){
    const code=reviewCode(),side=reviewSide();
    if(action==='trigger-fault'||action==='repeat')issues.receive(code,side);
    else if(action==='trigger-multiple')for(const [faultCode,faultSide] of [['E05','L'],['E05','R'],['E53','L'],['E53','R']])issues.receive(faultCode,faultSide);
    else if(action==='trigger-same-side')for(const faultCode of ['E05','E53'])issues.receive(faultCode,'L');
    else if(action==='recover'){const f=issues.data.faults.find(f=>f.code===code&&f.side===side);if(f)issues.recover(f.id);}
    else if(/^recover:(L|R):(E05|E53)$/.test(action)){
      const [,faultSide,faultCode]=action.split(':'),fault=issues.data.faults.find(f=>f.code===faultCode&&f.side===faultSide);
      if(fault)issues.recover(fault.id);
    }
    else if(action==='recover-all')issues.recoverAll();
    else if(action==='new-round'){const f=issues.data.faults.find(f=>f.code===code&&f.side===side);if(f)issues.recover(f.id);issues.receive(code,side);}
    else if(action==='add-peer')issues.receive(code,side==='L'?'R':'L');
    else if(action==='add-other-code')quietFault(code==='E05'?'E53':'E05',code==='E05'?'R':'L');
    else if(action==='show-tip')showWarmTip(faultWarmFor(side));
    else if(action==='try-sync')trySync();
    else if(action==='to-settings')openSubmissionPage();
    else if(action==='to-control')showPage('control');
    else if(action==='begin-long'||action==='begin-new-log'){
      if(issues.data.task?.status!=='submitting'){if(!issues.data.pending.length)prepareReviewSubmission();else openSubmissionPage();submitProblem(60000);if(action==='begin-new-log')issues.appendDemoLog('E05','L');}
    }
    else if(action==='success'||action==='failure'){
      if(issues.data.task?.status!=='submitting'){prepareReviewSubmission({result:action==='failure'?'failure':'success'});submitProblem(1100);}
    }
    else if(action==='finish')issues.complete('success');
    else if(action==='interrupt'){
      if(issues.data.task?.status!=='submitting'){prepareReviewSubmission();submitProblem(60000);}issues.interrupt();
    }
    else if(action==='next-day'){
      const now=new Date(reviewNow()),next=Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()+1,0,0,1);reviewClockOffset+=next-reviewNow();appStorage.setItem('clockOffset',String(reviewClockOffset));issues.prune();
    }
    postReviewSnapshot();return reviewSnapshot();
  }
  showPage(embedded&&restoredReviewUI?state.page:'control');
  if(embedded){
    window.PrototypeReview={run:runReviewAction,snapshot:reviewSnapshot};
    addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='review-command')return;runReviewAction(event.data.action);});
    if(freshReview)applyReviewPreset();else {if(!restoredReviewUI&&reviewParams.get('preset')?.startsWith('submit-'))openSubmissionPage();if(restoredReviewUI)requestAnimationFrame(()=>{try{content.scrollTop=JSON.parse(appStorage.getItem('review-ui')).scrollTop||0;}catch{}});postReviewSnapshot();}
  }
  setTimeout(()=>$('.home-indicator').classList.add('fade'),3000);
  setTimeout(()=>$('.status-time').textContent='17:43',20000);
})();
