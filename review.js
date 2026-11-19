(() => {
  'use strict';
  const data=window.REVIEW_DATA,$=(selector,root=document)=>root.querySelector(selector),$$=(selector,root=document)=>[...root.querySelectorAll(selector)];
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const features=new Map(data.features.map(feature=>[feature.id,feature]));
  const scenes=new Map(data.features.map(feature=>[feature.id,feature.defaultState||feature.states[0].id]));
  const cases=new Map(data.features.map(feature=>[feature.id,feature.fixedCase||'E05']));
  const frame=$('#app-demo'),marker=$('#interaction-marker'),workspace=$('#review-workspace');
  let current=null;
  const lastByGroup=new Map(data.groups.map(group=>[group.id,group.defaultFeature]));
  const sources=keys=>keys.map(key=>{const chapter=data.chapters[key];return chapter?`<a href="${data.document.url}#${chapter[1]}" target="_blank" rel="noopener" title="${key} ${escape(chapter[0])}">${escape(chapter[0])} ↗</a>`:'';}).join('');
  const fill=(text,feature)=>String(text).replace(/\{(code|message|warm|marker|side)\}/g,(_,key)=>key==='code'?cases.get(feature.id):key==='side'?(data.cases[cases.get(feature.id)].side==='L'?'左侧':'右侧'):data.cases[cases.get(feature.id)][key]);

  $('#document-link').href=data.document.url;
  $('#feature-navigation').innerHTML=data.groups.map(group=>`<div class="index-group"><a class="index-module" href="#${group.id}" data-index="${group.id}"><span>${group.number}</span>${escape(group.title)}</a></div>`).join('');

  function definitionBody(feature){
    const code=cases.get(feature.id),item=data.cases[code],scene=current?.scene;
    const definitions={...feature.definitions,...scene?.definitions};
    const example=feature.multipleCases?`<div class="case-definition"><h3><span>E05 + E53</span>${escape(scene.caseLabel)}</h3><p>E53 为跨型号组件演示样例。</p></div>`:feature.group==='faults'?`<div class="case-definition"><h3><span>${code}</span>${escape(item.name)}</h3>${code==='E53'?`<p>${escape(item.scope)}</p>`:''}</div>`:'';
    return example+data.definitionFields.map(([key,label])=>`<section class="definition-field ${key==='copy'?'copy-field':''}"><h3>${escape(label)}</h3>${definitions[key]?.length?definitions[key].map(([text,...refs])=>`<div class="definition-item"><p>${escape(fill(text,feature))}</p><div class="source-links">${sources(refs)}</div></div>`).join(''):'<p class="undefined">文档未定义</p>'}</section>`).join('');
  }

  function renderControls(){
    const {feature,scene}=current;
    $$('[data-index]').forEach(link=>{const active=link.dataset.index===feature.group;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    $('#feature-number').textContent=feature.number;
    $('#feature-title').textContent=feature.title;
    $('#feature-summary').textContent=feature.summary;
    const featureTabs=$('#feature-tabs');
    featureTabs.setAttribute('aria-label',`${data.groups.find(group=>group.id===feature.group).title}分类`);
    featureTabs.innerHTML=data.features.filter(item=>item.group===feature.group).map(item=>`<button role="tab" id="feature-tab-${item.id}" data-feature-tab="${item.id}" aria-selected="${feature.id===item.id}" aria-controls="demo-scene" tabindex="${feature.id===item.id?0:-1}"><span>${item.number}</span>${escape(item.tabLabel)}</button>`).join('');
    $('#scene-picker').hidden=feature.states.length<2;
    $('#scene-select').innerHTML=feature.states.map(item=>`<option value="${item.id}" ${scene.id===item.id?'selected':''}>${escape(item.tabLabel||item.title)}</option>`).join('');
    $('#demo-scene').setAttribute('aria-labelledby',`feature-tab-${feature.id}`);
    $('#demo-scene').dataset.feature=feature.id;$('#demo-scene').dataset.state=scene.id;
    const picker=$('#case-picker');picker.hidden=!feature.caseSelectable;
    picker.innerHTML=feature.caseSelectable?`<span class="control-label">演示案例</span>${Object.entries(data.cases).map(([code,item])=>`<button data-case-button="${code}" aria-pressed="${cases.get(feature.id)===code}"><strong>${code}</strong>${escape(item.name)}</button>`).join('')}`:'';
    $('#scene-title').textContent=scene.title;
    $('#definition-context').textContent=feature.number;
    $('#definition-body').innerHTML=definitionBody(feature);
    const note=$('#case-note');note.hidden=!feature.note;$('p',note).textContent=feature.note||'';
    $('#phone-stage').dataset.loading='true';
    $('#reset-scene').disabled=true;
    marker.hidden=true;
    updateScene();
  }

  function chooseFeature(id,{sceneId,code,updateHash=true,reset=false}={}){
    const requestedId=id,alias=data.workspace.aliases?.[id];
    if(alias){const target=alias.scenes?.[sceneId];id=target?.feature||alias.byCase?.[code||'E05']||alias.feature;sceneId=target?.scene||alias.scene||sceneId;}
    if(lastByGroup.has(id))id=lastByGroup.get(id);
    const feature=features.get(id)||features.get(data.workspace.defaultFeature);
    if(feature.fixedCase)cases.set(feature.id,feature.fixedCase);
    else if(feature.caseSelectable&&code&&data.cases[code])cases.set(feature.id,code);
    if(sceneId&&feature.states.some(scene=>scene.id===sceneId))scenes.set(feature.id,sceneId);
    const scene=feature.states.find(item=>item.id===scenes.get(feature.id))||feature.states[0];
    const instance=`${data.workspace.instancePrefix}-${feature.id}-${scene.id}-${cases.get(feature.id)}`;
    lastByGroup.set(feature.group,feature.id);
    if(updateHash||requestedId!==feature.id||sceneId&&sceneId!==scene.id||code&&code!==cases.get(feature.id))history.replaceState(null,'',`#${feature.id}/${scene.id}/${cases.get(feature.id)}`);
    if(current?.instance===instance&&!reset)return;
    current={feature,scene,instance,ready:false,snapshot:null,touched:false,markerSelector:null};
    renderControls();
    const params=new URLSearchParams({embed:'1',instance,preset:scene.preset,case:cases.get(feature.id),version:data.workspace.version});
    if(reset)params.set('reset',String(Date.now()));
    frame.title=`${feature.title}：${scene.title}`;
    frame.src='app.html?'+params;
  }

  function actionAllowed(when,snapshot){
    const busy=snapshot?.taskStatus==='submitting';
    const code=cases.get(current.feature.id),item=snapshot?.faultItems?.find(item=>item.code===code&&item.side===data.cases[code].side);
    return !when||when==='fresh'&&!snapshot?.taskStatus||when==='idle'&&!busy||when==='busy'&&busy||when==='before-day'&&busy&&!snapshot.dayAdvanced||when==='after-day'&&busy&&snapshot.dayAdvanced||when==='no-fault'&&!snapshot?.faults||when==='has-fault'&&snapshot?.faults>0||when==='confirmed'&&(item?.acknowledged||item?.dismissed);
  }

  function updateScene(){
    if(!current)return;
    const {feature,scene,ready}=current,snapshot=current.snapshot||{};
    const buttons=(scene.actions||[]).filter(([, ,when])=>actionAllowed(when,snapshot));
    const extras=(scene.extraActions||[]).filter(([, ,when])=>actionAllowed(when,snapshot));
    const resolved=snapshot.faultItems&&!snapshot.faultItems.some(item=>item.code===cases.get(feature.id)&&item.side===data.cases[cases.get(feature.id)].side);
    const primary=buttons.map(([action,label])=>`<button class="primary-demo" data-command="${action}" ${!ready||action==='recover'&&resolved?'disabled':''}>${escape(fill(label,feature))}</button>`).join('');
    const more=extras.length?`<details class="more-tests"><summary>更多事件</summary><div>${extras.map(([action,label])=>`<button data-command="${action}" ${!ready?'disabled':''}>${escape(fill(label,feature))}</button>`).join('')}</div></details>`:'';
    const targets=scene.recoveryTargets||[];
    const recovery=scene.recoverItems&&(snapshot.faults||snapshot.pending>0)?`<div class="fault-recovery" aria-label="模拟设备逐项恢复">${[...new Set(targets.map(([side])=>side))].map(side=>`<section><h3>${side==='L'?'左侧设备':'右侧设备'}</h3>${targets.filter(([targetSide])=>targetSide===side).map(([,code])=>{const resolved=!snapshot.faultItems.some(fault=>fault.code===code&&fault.side===side);return `<button data-command="recover:${side}:${code}" ${!ready||resolved?'disabled':''} title="${escape(data.cases[code].name)}：模拟设备确认恢复">${resolved?'✓ 已恢复':'恢复'} ${code}</button>`;}).join('')}</section>`).join('')}</div>`:'';
    const eventActions=$('#event-actions'),moreOpened=$('.more-tests',eventActions)?.open;
    eventActions.innerHTML=primary+recovery+more;if(moreOpened&&$('.more-tests',eventActions))$('.more-tests',eventActions).open=true;
    let hint=scene.hint||scene.description;
    if(snapshot.taskStatus==='submitting')hint=scene.showCounts?(snapshot.dayAdvanced?'已跨日，在途数据仍保留；现在可以确认结果。':'本次数据已固定，新增日志留到下次提交。'):'正在提交，手机内入口已禁用。';
    if(scene.returnTarget&&snapshot.taskStatus==='submitting')hint=snapshot.page==='control'?'点击右上角设置，回到原来的提交任务。':'点击左上角返回，再从设置重新进入。';
    if(['failed','interrupted'].includes(snapshot.taskStatus))hint='点击手机内“问题提交”，手动重试。';
    if(snapshot.taskStatus==='success')hint=scene.showCounts&&snapshot.pending?'本次已成功，新增日志仍待提交。':'提交成功，手机内入口已恢复。';
    if(scene.flow==='single-fault'){const item=snapshot.faultItems?.find(fault=>fault.code===cases.get(feature.id)&&fault.side===data.cases[cases.get(feature.id)].side);hint=scene.hints[item?(item.acknowledged||item.dismissed?'confirmed':'active'):snapshot.pending>0?'recovered':'idle'];}
    if(scene.flow==='multiple-faults'){const blocking=snapshot.faultItems?.some(item=>item.code==='E05'&&!item.acknowledged),reminders=snapshot.faultItems?.some(item=>item.code==='E53'&&!item.dismissed);hint=scene.hints[!snapshot.faults?(snapshot.pending>0?'recovered':'idle'):blocking?'blocking':reminders?'reminders':'retained'];}
    $('#interaction-guide').textContent=hint;
    let status=ready?'':'场景载入中…';
    if(snapshot.taskStatus==='submitting')status='● 提交中';
    else if(snapshot.taskStatus==='success')status='✓ 提交成功';
    else if(snapshot.taskStatus==='failed')status='提交失败，可重试';
    else if(snapshot.taskStatus==='interrupted')status='已中断，可重试';
    else if(ready&&feature.group==='faults')status=snapshot.faults?(scene.showFaults?[...new Set(targets.map(([side])=>side))].map(side=>`${side==='L'?'左侧':'右侧'}：${snapshot.faultItems.filter(item=>item.side===side).map(item=>item.code).join(' + ')||'已恢复'}`).join('\n'):'异常仍保留'):'当前无异常';
    if(scene.showCounts&&ready)status+=`${status?'\n':''}待提交 ${snapshot.pending} 条${snapshot.inflight?` · 本次 ${snapshot.inflight} 条`:''}`;
    $('#frame-status').textContent=status;$('#frame-status').dataset.status=snapshot.taskStatus||'';
    $('#reset-scene').disabled=!ready;
    requestAnimationFrame(updateMarker);
  }

  function updateMarker(){
    marker.hidden=true;if(!current?.ready)return;
    const {scene,feature,snapshot}=current,code=cases.get(feature.id),side=data.cases[code].side;
    let selector=scene.targetByCase?.[code]||scene.target;
    if(scene.targetByCase&&!snapshot.faults)return;
    if(scene.targetAfterConfirm){const item=snapshot.faultItems.find(item=>item.code===code&&item.side===side);if(item&&(item.acknowledged||item.dismissed))selector=scene.targetAfterConfirm;}
    if(scene.targetAfterQueue){if(!snapshot.faults)return;if(!snapshot.faultItems.some(item=>item.code==='E05'&&!item.acknowledged))selector=scene.targetAfterQueue;}
    if(!selector)return;
    if(scene.targetWhen==='retry'&&!['failed','interrupted'].includes(snapshot.taskStatus))return;
    if(scene.targetWhen==='submitting'&&snapshot.taskStatus!=='submitting')return;
    if(scene.returnTarget&&snapshot.page==='control')selector=scene.returnTarget;
    if(current.markerSelector!==selector){current.touched=false;current.markerSelector=selector;}
    if(current.touched)return;
    try{const target=frame.contentDocument.querySelector(selector.replace(/\{side\}/g,side));if(!target||target.hidden||target.disabled)return;
      const rect=target.getBoundingClientRect(),style=frame.contentWindow.getComputedStyle(target);if(!rect.width||!rect.height||rect.top<0||rect.bottom>848||style.visibility==='hidden')return;
      marker.style.cssText=`left:${rect.left+4}px;top:${rect.top+4}px;width:${rect.width+6}px;height:${rect.height+6}px`;$('span',marker).textContent=scene.targetLabel||'点击';marker.hidden=false;
    }catch{}
  }

  function receive(snapshot){
    if(!snapshot||snapshot.instance!==current?.instance)return;
    current.snapshot=snapshot;current.ready=true;$('#phone-stage').dataset.loading='false';updateScene();
  }
  frame.addEventListener('load',()=>{
    try{const snapshot=frame.contentWindow.PrototypeReview?.snapshot();if(snapshot?.instance!==current?.instance)return;receive(snapshot);const instance=current.instance;
      frame.contentDocument.addEventListener('click',()=>{if(current?.instance!==instance)return;current.touched=true;marker.hidden=true;},true);
      frame.contentDocument.querySelector('#page-content')?.addEventListener('scroll',updateMarker,{passive:true});
      requestAnimationFrame(updateMarker);
    }catch{}
  });
  addEventListener('message',event=>{if(event.origin===location.origin&&event.source===frame.contentWindow&&event.data?.type==='review-state')receive(event.data.snapshot);});

  function command(action){
    if(!current?.ready)return;
    if(action==='reload'){current.ready=false;$('#phone-stage').dataset.loading='true';updateScene();frame.contentWindow.location.reload();return;}
    frame.contentWindow.postMessage({type:'review-command',action},location.origin);
  }
  $('#feature-navigation').addEventListener('click',event=>{const link=event.target.closest('[data-index]');if(!link)return;event.preventDefault();chooseFeature(link.dataset.index);});
  $('#scene-select').addEventListener('change',event=>chooseFeature(current.feature.id,{sceneId:event.target.value}));
  workspace.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;
    if(button.dataset.featureTab)chooseFeature(button.dataset.featureTab);
    else if(button.dataset.caseButton)chooseFeature(current.feature.id,{code:button.dataset.caseButton});
    else if(button.dataset.command)command(button.dataset.command);
    else if(button.id==='reset-scene')chooseFeature(current.feature.id,{reset:true});
  });
  workspace.addEventListener('keydown',event=>{const tab=event.target.closest('[role="tab"]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();const tabs=$$('[role="tab"]',tab.parentElement),index=tabs.indexOf(tab),next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
    const feature=tabs[next].dataset.featureTab;chooseFeature(feature);$(`[data-feature-tab="${feature}"]`).focus({preventScroll:true});
  });
  $('#toggle-definitions').addEventListener('click',event=>{const closed=workspace.classList.toggle('definitions-collapsed');event.currentTarget.setAttribute('aria-pressed',String(closed));event.currentTarget.textContent=closed?'展开定义':'收起定义';});
  const compactDefinitions=matchMedia('(max-width:950px)');
  function foldCompactDefinitions(){if(!compactDefinitions.matches)return;workspace.classList.add('definitions-collapsed');$('#toggle-definitions').setAttribute('aria-pressed','true');$('#toggle-definitions').textContent='展开定义';}
  compactDefinitions.addEventListener('change',foldCompactDefinitions);foldCompactDefinitions();

  function sizePhone(){const stage=$('#phone-stage'),width=stage.clientWidth,height=stage.clientHeight;if(!width||!height)return;const scale=Math.max(.1,Math.min(1,(width-8)/404,(height-8)/862));$('#phone-viewport').style.width=`${404*scale}px`;$('#phone-viewport').style.height=`${862*scale}px`;$('#review-phone').style.transform=`scale(${scale})`;}
  new ResizeObserver(sizePhone).observe($('#phone-stage'));
  function openHash(){const [id,sceneId,code]=location.hash.slice(1).split('/');chooseFeature(id||data.workspace.defaultFeature,{sceneId,code,updateHash:false});}
  addEventListener('hashchange',openHash);openHash();
})();
