/* Ceres phase 3 · Legacy stages with the Ceres rhythm publication lifecycle. */
(() => {
  'use strict';
  const STORE_KEY = 'ceres.v2.1.legacy-rhythms';
  const MODELS = ['M5 Ultra', 'M5 Smart', 'M9', 'Air 1', 'V3 Pro'];
  const MODES = ['刺激', '吸乳', '混合1', '混合2', '休息'];
  const FREQUENCIES = ['低', '中', '高'];
  const clone = value => JSON.parse(JSON.stringify(value));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const timestamp = () => new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Shanghai', hour12: false });
  const stage = (mode = '', frequency = '', gear = '', duration = 30) => ({ mode, frequency, gear: String(gear), duration: String(duration) });
  const snapshot = item => ({ name: String(item.name || ''), model: String(item.model || ''), stages: (item.stages || []).filter(s => s && typeof s === 'object').map(s => stage(String(s.mode || ''), String(s.frequency || ''), s.gear ?? '', s.duration ?? 30)) });
  const duration = stages => stages.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
  const timeLabel = value => { const secs = Number(value) || 0; return secs >= 60 ? `${Math.floor(secs / 60)}分${secs % 60 ? `${secs % 60}秒` : ''}` : `${secs}秒`; };
  const describe = item => item.mode === '休息' ? `休息 · ${timeLabel(item.duration)}` : `${item.mode || '未选择'} / ${item.frequency || '—'} / ${item.gear ? `${item.gear}档` : '—'} · ${timeLabel(item.duration)}`;
  const optionList = (values, selected, placeholder) => `${placeholder ? `<option value="">${esc(placeholder)}</option>` : ''}${values.map(value => `<option value="${esc(value)}"${String(selected) === String(value) ? ' selected' : ''}>${esc(value)}</option>`).join('')}`;
  const statusTag = status => `<span class="tag tag--${status === '发布' ? 'success' : status === '草稿' ? 'warning' : 'info'}">${esc(status)}</span>`;
  const seed = [
    { id: 'legacy-milk-boost', name: 'Milk Boost', model: 'M5 Ultra', stages: [stage('刺激', '低', 3, 120), stage('吸乳', '中', 7, 1080)] },
    { id: 'legacy-power-pumping', name: 'Power Pumping', model: 'M5 Smart', stages: [stage('刺激', '低', 3, 300), stage('吸乳', '中', 5, 900), stage('休息', '', '', 300), stage('混合2', '低', 7, 900), stage('休息', '', '', 300)] },
    { id: 'legacy-quick-relief', name: 'Quick Relief', model: 'M9', stages: [stage('混合2', '低', 7, 30), stage('休息', '', '', 30), stage('吸乳', '中', 5, 480)] }
  ];
  function normalizeRow(item) {
    const base = snapshot(item);
    const status = ['草稿', '发布', '停用'].includes(item.status) ? item.status : '草稿';
    const time = String(item.time || '2026-11-03 10:00:00');
    let versions = Array.isArray(item.versions) ? item.versions.filter(v => v && /^V\d+(?:\.\d+)*$/.test(v.version)).map(v => ({
      version: v.version, status: ['草稿', '发布', '历史版本'].includes(v.status) ? v.status : '草稿', current: Boolean(v.current),
      changeSummary: String(v.changeSummary || '初始旧韵律配置'), publisher: String(v.publisher || '刘媛媛'), publishTime: String(v.publishTime || '未发布'),
      snapshot: snapshot(v.snapshot && Array.isArray(v.snapshot.stages) ? v.snapshot : base)
    })) : [];
    if (!versions.length) versions = [{ version: 'V1', status: status === '草稿' ? '草稿' : '发布', current: status !== '草稿', changeSummary: '初始旧韵律配置', publisher: '刘媛媛', publishTime: status === '草稿' ? '未发布' : time, snapshot: clone(base) }];
    const currentVersion = versions.some(v => v.version === item.currentVersion) ? item.currentVersion : (versions.find(v => v.current) || versions[0]).version;
    return { id: item.id, ...base, status, currentVersion, updater: String(item.updater || '刘媛媛'), time, versions };
  }
  let rows = seed.map(item => normalizeRow({ ...item, status: '发布' }));
  rows[0].currentVersion = 'V2';
  rows[0].versions[0].version = 'V2';
  rows[0].versions[0].changeSummary = '优化日常泌乳的阶段时长';
  rows[0].versions.push({ version: 'V1', status: '历史版本', current: false, changeSummary: '首版官方旧韵律', publisher: '陈剑泽', publishTime: '2026-09-22 14:00:00', snapshot: { name: rows[0].name, model: rows[0].model, stages: [stage('刺激', '低', 3, 120), stage('吸乳', '中', 6, 960)] } });
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (Array.isArray(saved)) rows = saved.filter(item => item && typeof item.id === 'string' && Array.isArray(item.stages)).map(normalizeRow);
  } catch (_) { /* Keep demonstration records when local storage is unavailable. */ }
  const state = { view: 'list', query: '', modelFilter: '', statusFilter: '', selectedId: null, draft: null, original: '', viewVersion: '', history: null, dragIndex: null, formError: '' };
  let host = { render: () => {}, showToast: () => {}, showDialog: (_, action) => action() };
  const selected = () => rows.find(row => row.id === state.selectedId);
  const models = () => [...new Set([...MODELS, ...rows.flatMap(row => [row.model, ...row.versions.map(v => v.snapshot.model)]).filter(Boolean)])];
  const isDirty = () => state.draft && state.view !== 'detail' && JSON.stringify(state.draft) !== state.original;
  const resetView = () => { state.view = 'list'; state.selectedId = null; state.draft = null; state.original = ''; state.viewVersion = ''; state.history = null; state.formError = ''; state.dragIndex = null; };
  const confirmExit = (action, showDialog = host.showDialog) => { if (isDirty()) showDialog('当前有未保存的修改，离开页面后数据将清空，确定要离开吗？', action, '留在此页', '离开'); else action(); };
  function persist(nextRows) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(nextRows)); rows = nextRows; return true; }
    catch (_) { host.showToast('保存失败，请检查浏览器存储后重试。'); return false; }
  }
  function nextVersion(row) { return `V${Math.max(...row.versions.map(v => Number.parseInt(v.version.slice(1), 10))) + 1}`; }
  function openForm(row, view, versionName) {
    if (view === 'edit' && row?.status === '发布') { host.showToast('请先停用已发布韵律后再编辑'); return; }
    const draftVersion = row?.versions.find(v => v.status === '草稿');
    const active = row ? (view === 'edit' && draftVersion) || row.versions.find(v => v.version === (versionName || row.currentVersion)) || row.versions[0] : null;
    const version = view === 'edit' && row.status === '停用' ? draftVersion?.version || nextVersion(row) : active?.version || 'V1';
    state.draft = { ...(active ? clone(active.snapshot) : { name: '', model: '', stages: [] }), version, changeSummary: view === 'edit' && row.status === '停用' && !draftVersion ? '' : active?.changeSummary || '' };
    state.selectedId = row?.id || null; state.viewVersion = active?.version || ''; state.original = JSON.stringify(state.draft); state.view = view; state.formError = ''; state.history = null;
    host.render(); window.scrollTo(0, 0);
  }
  function rowActions(row) {
    return `<button data-legacy-action="detail" data-legacy-id="${esc(row.id)}" type="button">查看</button>${row.status === '发布' ? `<button data-legacy-action="disable" data-legacy-id="${esc(row.id)}" type="button">停用</button>` : `<button data-legacy-action="edit" data-legacy-id="${esc(row.id)}" type="button">编辑</button><button data-legacy-action="publish" data-legacy-id="${esc(row.id)}" type="button">发布</button><button class="danger" data-legacy-action="delete" data-legacy-id="${esc(row.id)}" type="button">删除</button>`}`;
  }
  function listView() {
    const query = state.query.trim().toLowerCase();
    const visible = rows.filter(item => (!state.modelFilter || item.model === state.modelFilter) && (!state.statusFilter || item.status === state.statusFilter) && (!query || item.name.toLowerCase().includes(query)));
    const counts = status => rows.filter(row => row.status === status).length;
    const headers = ['名称', '型号', '总时长（min）', '状态', '更新人', '更新时间', '版本信息', '操作'];
    return `<header class="page-header-bar"><h1>旧韵律库列表管理</h1><div class="page-header-actions"><button class="btn btn--primary" id="legacy-create" type="button">新增旧韵律</button></div></header><div class="list-page-body">
      <section class="filter-toolbar legacy-toolbar"><input class="control" id="legacy-search" type="search" maxlength="100" aria-label="名称" placeholder="请输入名称，回车键确认搜索" value="${esc(state.query)}"><select class="control" id="legacy-model-filter" aria-label="型号">${optionList(models(), state.modelFilter, '全部型号')}</select><select class="control" id="legacy-status-filter" aria-label="状态">${optionList(['草稿', '发布', '停用'], state.statusFilter, '全部状态')}</select><button class="btn btn--outline" id="legacy-reset-filters" type="button">重置</button><div class="filter-toolbar__counts"><span class="tag tag--success">发布 ${counts('发布')}</span><span class="tag tag--warning">草稿 ${counts('草稿')}</span><span class="tag tag--info">停用 ${counts('停用')}</span></div></section>
      <section class="list-table-card"><div class="table-panel"><div class="table-shell legacy-table-scroll"><table class="data-table rhythm-list-table legacy-table"><colgroup>${[180, 120, 115, 90, 100, 190, 100, 205].map(width => `<col style="width:${width}px">`).join('')}</colgroup><thead><tr>${headers.map((label, index) => `<th${index === 7 ? ' class="legacy-action-cell"' : ''}>${label}</th>`).join('')}</tr></thead><tbody>${visible.length ? visible.map(item => {
        const draft = item.versions.find(v => v.status === '草稿');
        return `<tr><td><span class="cell-text">${esc(item.name)}</span></td><td>${esc(item.model)}</td><td>${Number((duration(item.stages) / 60).toFixed(2))} min</td><td>${statusTag(item.status)}</td><td>${esc(item.updater)}</td><td>${esc(item.time)}</td><td><div class="version-cell"><button class="legacy-link" data-legacy-action="history" data-legacy-id="${esc(item.id)}" type="button">${esc(item.currentVersion)}</button>${draft && draft.version !== item.currentVersion ? `<em>${esc(draft.version)} 草稿</em>` : ''}</div></td><td class="actions legacy-action-cell">${rowActions(item)}</td></tr>`;
      }).join('') : '<tr class="empty-row"><td colspan="8">暂无数据</td></tr>'}</tbody></table></div></div><footer class="pagination-bar"><span>共 ${visible.length} 条记录</span><div class="pagination"><button class="page-button" disabled type="button">‹</button><button class="page-button is-active" type="button">1</button><button class="page-button" disabled type="button">›</button></div></footer></section></div>`;
  }
  function stageCard(item, index, isView) {
    const rest = item.mode === '休息'; const disabled = isView ? ' disabled' : '';
    return `<div class="legacy-stage-card${rest ? ' legacy-stage-card--rest' : ''}" data-legacy-stage-drop="${index}"><strong class="legacy-stage-number">第${index + 1}阶段</strong><div class="legacy-stage-fields"><label><span>吮吸方式</span><select class="control" aria-label="第${index + 1}阶段吮吸方式" data-legacy-stage="${index}" data-legacy-stage-field="mode"${disabled}>${optionList(MODES, item.mode, '请选择吮吸方式')}</select></label>${rest ? '' : `<label><span>频率</span><select class="control" aria-label="第${index + 1}阶段频率" data-legacy-stage="${index}" data-legacy-stage-field="frequency"${disabled}>${optionList(FREQUENCIES, item.frequency, '请选择频率')}</select></label><label><span>档位</span><select class="control" aria-label="第${index + 1}阶段档位" data-legacy-stage="${index}" data-legacy-stage-field="gear"${disabled}>${optionList(Array.from({ length: 9 }, (_, i) => i + 1), item.gear, '请选择档位')}</select></label>`}<label class="legacy-duration-field"><span>时长</span><div class="legacy-duration-control"><span aria-hidden="true">◷</span><input class="control" type="number" min="1" max="7200" step="1" value="${esc(item.duration)}" aria-label="第${index + 1}阶段时长（秒）" data-legacy-stage="${index}" data-legacy-stage-field="duration"${disabled}><span>秒</span></div></label>${rest ? '<span class="legacy-rest-hint">休息阶段不配置频率和档位</span>' : ''}</div>${isView ? '' : `<div class="legacy-stage-actions"><button class="legacy-icon-button" type="button" data-legacy-stage-move="${index}" data-legacy-direction="-1" aria-label="上移第${index + 1}阶段"${index === 0 ? ' disabled' : ''}>↑</button><button class="legacy-icon-button" type="button" data-legacy-stage-move="${index}" data-legacy-direction="1" aria-label="下移第${index + 1}阶段"${index === state.draft.stages.length - 1 ? ' disabled' : ''}>↓</button><button class="legacy-icon-button legacy-danger" type="button" data-legacy-stage-remove="${index}" aria-label="删除第${index + 1}阶段">×</button><span class="legacy-drag-handle" draggable="true" data-legacy-drag="${index}" title="拖动调整阶段顺序">⠿</span></div>`}</div>`;
  }
  function timeline() {
    return `<div class="legacy-total"><strong>总执行时长 <span id="legacy-total-duration">${timeLabel(duration(state.draft.stages))}</span></strong><span>共 ${state.draft.stages.length} 个阶段</span></div><div class="legacy-timeline">${state.draft.stages.map((item, index) => `<div class="${item.mode === '休息' ? 'is-rest' : ''}" style="flex:${Math.max(1, Number(item.duration) || 0)}" title="${esc(describe(item))}"><span>${index + 1}. ${esc(item.mode || '待配置')}</span><small>${timeLabel(item.duration)}</small></div>`).join('')}</div>`;
  }
  function versionSwitcher(row) {
    const active = row.versions.find(v => v.version === state.viewVersion) || row.versions[0];
    return `<div class="form-field form-field--wide"><span>版本切换</span><div class="legacy-version-switch"><div class="legacy-version-tabs" role="tablist" aria-label="旧韵律版本">${row.versions.map(v => `<button class="legacy-version-tab${v.version === active.version ? ' is-active' : ''}" type="button" role="tab" aria-selected="${v.version === active.version}" data-legacy-view-version="${esc(v.version)}"><strong>${esc(v.version)}</strong><span>${esc(v.status)}</span></button>`).join('')}</div><button class="btn btn--outline" id="legacy-version-log" type="button">版本记录</button></div><div class="legacy-version-meta"><span>版本状态：${esc(active.status)}</span><span>更新时间：${esc(active.publishTime)}</span><span>更新人：${esc(active.publisher)}</span></div></div>`;
  }
  function formView() {
    const isView = state.view === 'detail'; const draft = state.draft; const row = selected(); const disabled = isView ? ' disabled' : '';
    return `<header class="page-header-bar"><div class="page-header-title"><button class="back-button" id="legacy-back" type="button" aria-label="返回旧韵律列表">‹</button><h1>旧韵律库配置</h1></div><div class="page-header-actions"><button class="btn btn--outline" id="legacy-cancel" type="button">${isView ? '返回' : '取消'}</button>${isView ? '' : '<button class="btn btn--primary" id="legacy-save" type="button">保存</button>'}</div></header><div class="form-page">
      <div class="legacy-error${state.formError ? '' : ' is-hidden'}" id="legacy-form-error" role="alert">${esc(state.formError)}</div><section class="form-card"><h2>基础信息配置</h2><div class="form-grid"><label class="form-field"><span>名称<em class="required"> *</em></span><input class="control" id="legacy-field-name" data-legacy-field="name" maxlength="100" placeholder="请输入名称" value="${esc(draft.name)}"${disabled}></label><label class="form-field"><span>型号<em class="required"> *</em></span><select class="control" id="legacy-field-model" data-legacy-field="model"${disabled}>${optionList(models(), draft.model, '请选择型号')}</select>${isView ? '' : '<small>一次选择一个型号</small>'}</label>${isView && row ? versionSwitcher(row) : ''}<label class="form-field"><span>版本号<em class="required"> *</em></span><input class="control" id="legacy-field-version" value="${esc(draft.version)}" disabled>${isView ? '' : `<small>${row ? '停用已发布版本后编辑，版本号自动加一' : '首个版本默认为 V1'}，不支持修改</small>`}</label><label class="form-field form-field--wide"><span>版本说明<em class="required"> *</em></span><textarea class="control" id="legacy-field-summary" data-legacy-field="changeSummary" maxlength="1000" placeholder="请说明本版本的配置内容或修改点"${disabled}>${esc(draft.changeSummary)}</textarea></label></div></section>
      <section class="form-card"><div class="form-card__header"><h2>组合功能设置</h2><span class="legacy-stage-help">${isView ? '按阶段顺序执行' : '拖动或使用 ↑ ↓ 调整阶段顺序'}</span></div>${draft.model ? `<div class="legacy-stage-stack">${draft.stages.length ? draft.stages.map((item, index) => stageCard(item, index, isView)).join('') : '<div class="legacy-stage-empty">暂无阶段，请新增阶段。</div>'}</div>` : '<div class="legacy-stage-empty">请先选择型号</div>'}${isView ? '' : `<button class="btn btn--outline legacy-add-stage" id="legacy-add-stage" type="button"${draft.model ? '' : ' disabled'}>＋ 新增阶段</button>`}</section><section class="form-card"><h2>韵律阶段预览</h2><div class="legacy-preview">${timeline()}</div>${isView ? '' : '<p class="legacy-stage-help">总执行时长 1～7200 秒；型号及阶段选项为原型演示数据。</p>'}</section></div>`;
  }
  function historyModal() {
    if (!state.history) return '';
    const row = rows.find(item => item.id === state.history.id); if (!row) return '';
    let body;
    const comparison = row.versions.find(v => v.version === state.history.compare);
    if (comparison) {
      const current = row.versions.find(v => v.version === row.currentVersion) || row.versions[0];
      const values = v => [v.snapshot.name, v.snapshot.model, timeLabel(duration(v.snapshot.stages)), v.snapshot.stages.map((s, i) => `第${i + 1}阶段：${describe(s)}`).join('\n'), v.changeSummary];
      const left = values(current), right = values(comparison);
      body = `<p>当前版本 ${esc(current.version)} 与所选版本 ${esc(comparison.version)} 对比</p><div class="table-shell"><table class="data-table legacy-version-comparison"><thead><tr><th>字段</th><th>当前版本 ${esc(current.version)}</th><th>对比版本 ${esc(comparison.version)}</th></tr></thead><tbody>${['名称', '型号', '总时长', '阶段配置', '版本说明'].map((label, index) => `<tr${left[index] !== right[index] ? ' class="legacy-version-difference"' : ''}><td>${label}</td><td>${esc(left[index])}</td><td>${esc(right[index])}</td></tr>`).join('')}</tbody></table></div>`;
    } else body = `<p>停用已发布韵律后，编辑并保存即可生成下一版本。</p><div class="table-shell"><table class="data-table"><thead><tr><th>版本</th><th>状态</th><th>适用型号</th><th>版本说明</th><th>发布信息</th><th>操作</th></tr></thead><tbody>${row.versions.map(v => `<tr><td><strong>${esc(v.version)}</strong></td><td>${statusTag(v.status)}</td><td>${esc(v.snapshot.model)}</td><td>${esc(v.changeSummary)}</td><td>${esc(v.publisher)}<small class="legacy-publish-time">${esc(v.publishTime)}</small></td><td class="actions"><button data-legacy-compare="${esc(v.version)}" type="button">对比</button></td></tr>`).join('')}</tbody></table></div>`;
    return `<div class="legacy-modal-overlay"><section class="legacy-version-modal" role="dialog" aria-modal="true" aria-labelledby="legacy-version-title"><header><h2 id="legacy-version-title">${esc(row.name)} · ${comparison ? '版本对比' : '版本记录'}</h2><button class="dialog-close" id="legacy-history-close" type="button" aria-label="关闭版本记录">×</button></header><div class="legacy-version-body">${body}</div><footer><button class="btn btn--outline" id="legacy-history-back" type="button">${comparison ? '返回版本记录' : '关闭'}</button></footer></section></div>`;
  }
  function render() { return `<section class="page-stack legacy-page">${state.view === 'list' ? listView() : formView()}${historyModal()}</section>`; }
  function clearError() { state.formError = ''; const error = document.querySelector('#legacy-form-error'); if (error) { error.textContent = ''; error.classList.add('is-hidden'); } }
  function fail(message, selector) { state.formError = message; const error = document.querySelector('#legacy-form-error'); if (error) { error.textContent = message; error.classList.remove('is-hidden'); } document.querySelector(selector)?.focus(); error?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
  function conflict(data, id) { return rows.some(row => row.id !== id && [snapshot(row), ...row.versions.filter(v => v.status === '草稿').map(v => v.snapshot)].some(other => other.model === data.model && other.name.trim() === data.name.trim())); }
  function save() {
    const data = state.draft; const row = selected();
    if (!data.name.trim()) { fail('请输入名称。', '#legacy-field-name'); return; }
    if (!models().includes(data.model)) { fail('请选择型号。', '#legacy-field-model'); return; }
    if (!data.changeSummary.trim()) { fail('请填写版本说明。', '#legacy-field-summary'); return; }
    if (conflict(data, row?.id)) { fail('该型号下已存在同名旧韵律。', '#legacy-field-name'); return; }
    if (!data.stages.length) { fail('请至少新增一个阶段。', '#legacy-add-stage'); return; }
    for (let index = 0; index < data.stages.length; index++) {
      const item = data.stages[index]; const selector = field => `[data-legacy-stage="${index}"][data-legacy-stage-field="${field}"]`;
      if (!MODES.includes(item.mode)) { fail(`请选择第 ${index + 1} 阶段的吮吸方式。`, selector('mode')); return; }
      if (item.mode !== '休息' && (!FREQUENCIES.includes(item.frequency) || !/^[1-9]$/.test(String(item.gear)))) { fail(`请完整配置第 ${index + 1} 阶段的频率和档位。`, selector(!item.frequency ? 'frequency' : 'gear')); return; }
      if (!/^\d+$/.test(String(item.duration)) || Number(item.duration) < 1 || Number(item.duration) > 7200) { fail(`第 ${index + 1} 阶段时长请输入 1～7200 的整数秒。`, selector('duration')); return; }
    }
    if (duration(data.stages) > 7200) { fail('总执行时长不能超过 120 分钟。', '#legacy-total-duration'); return; }
    const now = timestamp(); const saved = snapshot({ ...data, name: data.name.trim() }); saved.stages = saved.stages.map(item => item.mode === '休息' ? { ...item, frequency: '', gear: '' } : item);
    const record = { version: data.version, status: '草稿', current: false, changeSummary: data.changeSummary.trim(), publisher: '刘媛媛', publishTime: '未发布', snapshot: saved };
    const next = clone(rows);
    if (row) {
      const target = next.find(item => item.id === row.id);
      target.versions = [record, ...target.versions.filter(v => v.version !== record.version)];
      if (target.status === '草稿') Object.assign(target, saved, { currentVersion: record.version, updater: '刘媛媛', time: now });
    } else next.push({ id: `legacy-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...saved, status: '草稿', currentVersion: 'V1', updater: '刘媛媛', time: now, versions: [record] });
    if (!persist(next)) return;
    resetView(); host.render(); window.scrollTo(0, 0); host.showToast(`${record.version} 草稿已保存`);
  }
  function performAction(action, id) {
    const row = rows.find(item => item.id === id); if (!row) return;
    if (action === 'detail' || action === 'edit') { openForm(row, action); return; }
    if (action === 'history') { state.history = { id }; host.render(); return; }
    if (row.status === '发布' && action !== 'disable') return;
    if (action === 'disable' && row.status !== '发布') return;
    const draft = row.versions.find(v => v.status === '草稿');
    if (action === 'publish' && !draft) { host.showToast('请先编辑并保存新版本'); return; }
    if (action === 'publish' && conflict(draft.snapshot, row.id)) { host.showToast('该型号下已存在同名旧韵律，请先编辑草稿'); return; }
    host.showDialog(action === 'delete' ? '确认删除吗？' : '确认执行此操作并切换状态吗？', () => {
      const next = clone(rows); const target = next.find(item => item.id === id); if (!target) return;
      if (action === 'delete') next.splice(next.indexOf(target), 1);
      if (action === 'disable') target.status = '停用';
      if (action === 'publish') {
        const release = target.versions.find(v => v.status === '草稿'); if (!release) return;
        target.versions.forEach(v => { if (v.current) { v.current = false; if (v.status === '发布') v.status = '历史版本'; } });
        Object.assign(release, { status: '发布', current: true, publisher: '刘媛媛', publishTime: timestamp() });
        Object.assign(target, clone(release.snapshot), { status: '发布', currentVersion: release.version, updater: release.publisher, time: release.publishTime });
      }
      if (persist(next)) { host.render(); host.showToast('操作成功'); }
    });
  }
  function moveStage(from, to) { const stages = state.draft?.stages; if (!stages || from === to || from < 0 || to < 0 || from >= stages.length || to >= stages.length) return; stages.splice(to, 0, stages.splice(from, 1)[0]); clearError(); host.render(); }
  function bind(callbacks) {
    host = { ...host, ...callbacks }; const page = document.querySelector('.legacy-page'); if (!page) return;
    const click = (id, action) => page.querySelector(`#${id}`)?.addEventListener('click', action);
    const leave = () => confirmExit(() => { resetView(); host.render(); window.scrollTo(0, 0); });
    click('legacy-create', () => openForm(null, 'create')); click('legacy-cancel', leave); click('legacy-back', leave); click('legacy-save', save);
    page.querySelector('#legacy-search')?.addEventListener('keydown', event => { if (event.key === 'Enter') { state.query = event.target.value.trim(); host.render(); } });
    page.querySelector('#legacy-model-filter')?.addEventListener('change', event => { state.modelFilter = event.target.value; host.render(); });
    page.querySelector('#legacy-status-filter')?.addEventListener('change', event => { state.statusFilter = event.target.value; host.render(); });
    click('legacy-reset-filters', () => { state.query = ''; state.modelFilter = ''; state.statusFilter = ''; host.render(); });
    page.querySelectorAll('[data-legacy-action]').forEach(button => button.addEventListener('click', () => performAction(button.dataset.legacyAction, button.dataset.legacyId)));
    page.querySelectorAll('[data-legacy-field]').forEach(control => control.addEventListener(control.tagName === 'SELECT' ? 'change' : 'input', event => {
      const key = control.dataset.legacyField; clearError();
      if (key === 'model') {
        const value = event.target.value; if (value === state.draft.model) return;
        const update = () => { state.draft.model = value; state.draft.stages = []; host.render(); };
        if (state.draft.stages.length) { control.value = state.draft.model; host.showDialog('更换型号后，将清空已配置的阶段。确定更换吗？', update, '保留原型号', '更换并清空'); } else update();
      } else state.draft[key] = event.target.value;
    }));
    click('legacy-add-stage', () => { if (!state.draft.model) return; state.draft.stages.push(stage()); clearError(); host.render(); });
    page.querySelectorAll('[data-legacy-stage-field]').forEach(control => control.addEventListener(control.tagName === 'SELECT' ? 'change' : 'input', event => {
      const item = state.draft.stages[Number(control.dataset.legacyStage)]; const field = control.dataset.legacyStageField; if (!item) return;
      item[field] = event.target.value; clearError();
      if (field === 'mode') { if (item.mode === '休息') { item.frequency = ''; item.gear = ''; } host.render(); }
      else { const preview = page.querySelector('.legacy-preview'); if (preview) preview.innerHTML = timeline(); }
    }));
    page.querySelectorAll('[data-legacy-stage-remove]').forEach(button => button.addEventListener('click', () => { state.draft.stages.splice(Number(button.dataset.legacyStageRemove), 1); clearError(); host.render(); }));
    page.querySelectorAll('[data-legacy-stage-move]').forEach(button => button.addEventListener('click', () => { const index = Number(button.dataset.legacyStageMove); moveStage(index, index + Number(button.dataset.legacyDirection)); }));
    page.querySelectorAll('[data-legacy-drag]').forEach(handle => handle.addEventListener('dragstart', event => { state.dragIndex = Number(handle.dataset.legacyDrag); event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', String(state.dragIndex)); }));
    page.querySelectorAll('[data-legacy-stage-drop]').forEach(card => {
      card.addEventListener('dragover', event => { if (state.dragIndex === null) return; event.preventDefault(); card.classList.add('is-drag-over'); });
      card.addEventListener('dragleave', event => { if (!card.contains(event.relatedTarget)) card.classList.remove('is-drag-over'); });
      card.addEventListener('drop', event => { event.preventDefault(); card.classList.remove('is-drag-over'); const from = state.dragIndex; state.dragIndex = null; if (from !== null) moveStage(from, Number(card.dataset.legacyStageDrop)); });
    });
    page.addEventListener('dragend', () => { state.dragIndex = null; page.querySelectorAll('.is-drag-over').forEach(card => card.classList.remove('is-drag-over')); });
    page.querySelectorAll('[data-legacy-view-version]').forEach(button => button.addEventListener('click', () => openForm(selected(), 'detail', button.dataset.legacyViewVersion)));
    click('legacy-version-log', () => { state.history = { id: state.selectedId }; host.render(); });
    click('legacy-history-close', () => { state.history = null; host.render(); });
    click('legacy-history-back', () => { if (state.history?.compare) state.history.compare = null; else state.history = null; host.render(); });
    page.querySelectorAll('[data-legacy-compare]').forEach(button => button.addEventListener('click', () => { state.history.compare = button.dataset.legacyCompare; host.render(); }));
    page.querySelector('.legacy-modal-overlay')?.addEventListener('click', event => { if (event.target.classList.contains('legacy-modal-overlay')) { state.history = null; host.render(); } });
  }
  window.LegacyRhythms = { render, bind, confirmExit, resetView };
})();
