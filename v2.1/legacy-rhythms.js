/* Ceres 2.1 · AIoT style legacy official rhythms. */
(() => {
  'use strict';
  const STORE_KEY = 'ceres.v2.1.legacy-rhythms';
  const MODELS = ['M5 Ultra', 'M5 Smart', 'M9', 'Air 1', 'V3 Pro'];
  const MODES = ['刺激', '吸乳', '混合1', '混合2', '休息'];
  const FREQUENCIES = ['低', '中', '高'];
  const clone = value => JSON.parse(JSON.stringify(value));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const stage = (mode, frequency, gear, duration) => ({ mode, frequency, gear: String(gear), duration: String(duration) });
  const seed = [
    { id: 'legacy-milk-boost', model: 'M5 Ultra', name: 'Milk Boost', code: '5', icon: '', image: '', background: '#F0E8E4', rank: '4', description: 'Most suitable for daily use after successful lactation.', stages: [stage('刺激', '低', 3, 120), stage('吸乳', '中', 7, 1080)], translations: { 'zh-CN': { name: '高效泌乳', description: '顺利启动泌乳后，适合日常使用。' }, 'en-US': { name: 'Milk Boost', description: 'Most suitable for daily use after successful lactation.' } } },
    { id: 'legacy-power-pumping', model: 'M5 Smart', name: 'Power Pumping', code: '', icon: '', image: '', background: '#E9E5F3', rank: '1', description: 'Frequent, gentle stimulation to encourage multiple let-downs and support milk supply.', stages: [stage('刺激', '低', 3, 300), stage('吸乳', '中', 5, 900), stage('休息', '', '', 300), stage('混合2', '低', 7, 900), stage('休息', '', '', 300)], translations: { 'zh-CN': { name: '强化泌乳', description: '温和、频繁地刺激，支持多次奶阵。' }, 'en-US': { name: 'Power Pumping', description: 'Frequent, gentle stimulation to encourage multiple let-downs and support milk supply.' } } },
    { id: 'legacy-quick-relief', model: 'M9', name: 'Quick Relief', code: '', icon: '', image: '', background: '#E5F1EB', rank: '1', description: 'Quick engorgement relief, prevents clogs & supply drop.', stages: [stage('混合2', '低', 7, 30), stage('休息', '', '', 30), stage('吸乳', '中', 5, 480)], translations: { 'zh-CN': { name: '快速舒缓', description: '快速缓解胀奶，帮助保持泌乳。' }, 'en-US': { name: 'Quick Relief', description: 'Quick engorgement relief, prevents clogs & supply drop.' } } }
  ];
  let rows = clone(seed);
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (Array.isArray(saved) && saved.every(item => item && typeof item.id === 'string' && Array.isArray(item.stages))) rows = saved;
  } catch (_) { /* Use demonstration records when storage is unavailable. */ }
  const state = { view: 'list', query: '', modelFilter: '', draft: null, original: '', lang: null, dragIndex: null, fileReads: 0, formError: '' };
  let host = { render: () => {}, showToast: () => {}, showDialog: (_, action) => action() };
  const badge = '<span class="legacy-badge">2.1 新增</span>';
  const safeImage = value => /^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(value || '') ? value : '';
  const duration = stages => stages.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
  const timeLabel = value => { const secs = Number(value) || 0; return secs >= 60 ? `${Math.floor(secs / 60)}分${secs % 60 ? `${secs % 60}秒` : ''}` : `${secs}秒`; };
  const describe = item => item.mode === '休息' ? `休息 · ${timeLabel(item.duration)}` : `${item.mode || '未选择'} / ${item.frequency || '—'} / ${item.gear ? `${item.gear}档` : '—'} · ${timeLabel(item.duration)}`;
  const options = (values, selected, placeholder) => `${placeholder ? `<option value="">${esc(placeholder)}</option>` : ''}${values.map(value => `<option value="${esc(value)}"${String(selected) === String(value) ? ' selected' : ''}>${esc(value)}</option>`).join('')}`;
  const isDirty = () => state.fileReads > 0 || (state.lang ? JSON.stringify(state.lang.values) !== state.lang.original : state.draft && state.view !== 'detail' && JSON.stringify(state.draft) !== state.original);
  const resetView = () => { state.view = 'list'; state.draft = null; state.original = ''; state.lang = null; state.formError = ''; state.dragIndex = null; };
  const confirmExit = (action, showDialog = host.showDialog) => {
    if (isDirty()) showDialog('当前有未保存的修改，确定离开吗？', action, '继续编辑', '放弃修改');
    else action();
  };
  function persist(nextRows) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(nextRows)); rows = nextRows; return true; }
    catch (_) { host.showToast('保存失败：浏览器存储空间不足，请缩小上传图片后重试。'); return false; }
  }
  function openForm(row, view) {
    state.draft = row ? clone(row) : { id: '', model: '', name: '', code: '', icon: '', image: '', background: '#F0E8E4', rank: '1', description: '', stages: [], translations: {} };
    state.original = JSON.stringify(state.draft); state.view = view; state.formError = ''; host.render();
  }
  function banner() {
    return `<div class="legacy-change-note"><span class="legacy-note-icon">i</span><div><strong>2.1 需求变更 · 旧韵律</strong><p>将 AIoT 官方韵律的创建方式迁入 Ceres，新增型号选择；蓝底区域标记本次新增内容。</p></div></div>`;
  }
  function thumb(value, label) {
    const src = safeImage(value);
    return src ? `<img class="legacy-thumb" src="${src}" alt="${esc(label)}">` : '<span class="legacy-image-empty">—</span>';
  }
  function listView() {
    const query = state.query.trim().toLowerCase();
    const visible = rows.filter(item => (!state.modelFilter || item.model === state.modelFilter) && (!query || `${item.name} ${item.code}`.toLowerCase().includes(query))).sort((a, b) => Number(a.rank) - Number(b.rank));
    return `<header class="page-header-bar"><div class="page-header-title"><h1>旧韵律</h1>${badge}</div><button class="btn btn--primary" id="legacy-create" type="button">＋ 创建旧韵律</button></header><div class="list-page-body legacy-body">${banner()}
      <div class="legacy-toolbar"><label><span>名称 / 编码</span><input class="control" id="legacy-search" type="search" maxlength="100" placeholder="请输入名称或编码" value="${esc(state.query)}"></label><label class="legacy-model-highlight"><span>型号</span><select class="control" id="legacy-model-filter">${options(MODELS, state.modelFilter, '全部型号')}</select></label><button class="btn btn--outline" id="legacy-search-button" type="button">查询</button><button class="btn btn--outline" id="legacy-reset-filters" type="button">重置</button><span class="legacy-count">共 ${visible.length} 条</span></div>
      <div class="legacy-list-panel"><div class="legacy-panel-heading"><strong>官方韵律列表</strong><span>沿用 AIoT 官方模式配置</span></div><div class="legacy-table-scroll"><table class="legacy-table"><colgroup><col style="width:170px"><col style="width:130px"><col style="width:90px"><col style="width:80px"><col style="width:100px"><col style="width:100px"><col style="width:65px"><col style="width:90px"><col style="width:210px"><col style="width:250px"><col style="width:180px"></colgroup><thead><tr><th>模式名称</th><th class="legacy-model-highlight">型号</th><th>模式编码</th><th>模式图标</th><th>模式主图</th><th>背景色值</th><th>排序</th><th>时长</th><th>详情</th><th>描述</th><th class="legacy-action-cell">操作</th></tr></thead><tbody>${visible.length ? visible.map(item => `<tr><td><button class="legacy-link legacy-name" data-legacy-action="detail" data-legacy-id="${esc(item.id)}" type="button">${esc(item.name)}</button></td><td class="legacy-model-highlight"><strong>${esc(item.model)}</strong></td><td>${esc(item.code || '—')}</td><td>${thumb(item.icon, '模式图标')}</td><td>${thumb(item.image, '模式主图')}</td><td><span class="legacy-color-dot" style="background:${/^#[0-9a-f]{6}$/i.test(item.background) ? item.background : '#ffffff'}"></span><span class="legacy-color-value">${esc(item.background || '—')}</span></td><td>${esc(item.rank)}</td><td>${timeLabel(duration(item.stages))}</td><td><button class="legacy-link legacy-stage-summary" data-legacy-action="detail" data-legacy-id="${esc(item.id)}" type="button" title="${esc(item.stages.map((s, i) => `第${i + 1}阶段：${describe(s)}`).join('\n'))}">第1阶段：${esc(item.stages.length ? describe(item.stages[0]) : '—')}<small>共 ${item.stages.length} 阶段 · 查看详情</small></button></td><td><span class="legacy-description" title="${esc(item.description)}">${esc(item.description || '—')}</span></td><td class="legacy-action-cell"><div class="legacy-row-actions"><button class="legacy-link" data-legacy-action="language" data-legacy-id="${esc(item.id)}" type="button">多语言</button><button class="legacy-link" data-legacy-action="edit" data-legacy-id="${esc(item.id)}" type="button">编辑</button><button class="legacy-link legacy-danger" data-legacy-action="delete" data-legacy-id="${esc(item.id)}" type="button">删除</button></div></td></tr>`).join('') : '<tr><td colspan="11" class="legacy-empty">暂无匹配的旧韵律，请调整筛选条件或创建旧韵律。</td></tr>'}</tbody></table></div><footer class="legacy-list-footer"><span>共 ${visible.length} 条</span><span class="legacy-page-current">1</span><span>每页展示全部</span></footer></div>
      <p class="legacy-demo-note">列表与型号参数为交互演示数据。</p></div>`;
  }
  function uploadField(key, label, isView) {
    const value = safeImage(state.draft[key]);
    return `<div class="legacy-field"><span>${label}</span><div class="legacy-upload-line">${value ? `<img class="legacy-upload-preview" src="${value}" alt="${label}">` : '<span class="legacy-upload-placeholder">暂无图片</span>'}${isView ? '' : `<div><label class="btn btn--outline legacy-upload-button">${value ? '更换图片' : '上传图片'}<input id="legacy-upload-${key}" type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-legacy-upload="${key}" hidden></label>${value ? `<button class="legacy-link legacy-danger" type="button" data-legacy-remove-image="${key}">移除</button>` : ''}<small>PNG / JPG / WebP / GIF，建议 500 KB 内</small></div>`}</div></div>`;
  }
  function field(label, key, required, isView, type = 'text') {
    return `<label class="legacy-field"><span>${required ? '<em>*</em>' : ''}${label}</span><input class="control" id="legacy-field-${key}" data-legacy-field="${key}" type="${type}"${type === 'number' ? ' min="1" max="9999" step="1"' : ' maxlength="100"'} placeholder="请输入${label}" value="${esc(state.draft[key])}"${isView ? ' disabled' : ''}${required ? ' required' : ''}></label>`;
  }
  function stageCard(item, index, isView) {
    const rest = item.mode === '休息';
    const disabled = isView ? ' disabled' : '';
    return `<div class="legacy-stage-card${rest ? ' legacy-stage-card--rest' : ''}" data-legacy-stage-card="${index}" data-legacy-stage-drop="${index}"><strong class="legacy-stage-number">第${index + 1}阶段</strong><div class="legacy-stage-fields"><label><span>吮吸方式</span><select class="control" aria-label="第${index + 1}阶段吮吸方式" data-legacy-stage="${index}" data-legacy-stage-field="mode"${disabled}>${options(MODES, item.mode, '请选择吮吸方式')}</select></label>${rest ? '' : `<label><span>频率</span><select class="control" aria-label="第${index + 1}阶段频率" data-legacy-stage="${index}" data-legacy-stage-field="frequency"${disabled}>${options(FREQUENCIES, item.frequency, '请选择频率')}</select></label><label><span>档位</span><select class="control" aria-label="第${index + 1}阶段档位" data-legacy-stage="${index}" data-legacy-stage-field="gear"${disabled}>${options(Array.from({ length: 9 }, (_, i) => i + 1), item.gear, '请选择档位')}</select></label>`}<label class="legacy-duration-field"><span>时长</span><div class="legacy-duration-control"><span aria-hidden="true">◷</span><input class="control" type="number" min="1" max="7200" step="1" value="${esc(item.duration)}" aria-label="第${index + 1}阶段时长（秒）" data-legacy-stage="${index}" data-legacy-stage-field="duration"${disabled}><span>秒</span></div></label>${rest ? '<span class="legacy-rest-hint">休息阶段不配置频率和档位</span>' : ''}</div>${isView ? '' : `<div class="legacy-stage-actions"><button class="legacy-icon-button" type="button" data-legacy-stage-move="${index}" data-legacy-direction="-1" aria-label="上移第${index + 1}阶段"${index === 0 ? ' disabled' : ''}>↑</button><button class="legacy-icon-button" type="button" data-legacy-stage-move="${index}" data-legacy-direction="1" aria-label="下移第${index + 1}阶段"${index === state.draft.stages.length - 1 ? ' disabled' : ''}>↓</button><button class="legacy-icon-button legacy-danger" type="button" data-legacy-stage-remove="${index}" aria-label="删除第${index + 1}阶段">×</button><span class="legacy-drag-handle" draggable="true" data-legacy-drag="${index}" title="拖动调整阶段顺序" aria-label="拖动调整第${index + 1}阶段顺序">⠿</span></div>`}</div>`;
  }
  function timeline() {
    const total = duration(state.draft.stages);
    return `<div class="legacy-total"><strong>总执行时长 <span id="legacy-total-duration">${timeLabel(total)}</span></strong><span id="legacy-stage-count">共 ${state.draft.stages.length} 个阶段</span></div><div class="legacy-timeline" id="legacy-timeline">${state.draft.stages.map((item, index) => `<div class="${item.mode === '休息' ? 'is-rest' : ''}" style="flex:${Math.max(1, Number(item.duration) || 0)}" title="第${index + 1}阶段：${esc(describe(item))}"><span>${index + 1}. ${esc(item.mode || '待配置')}</span><small>${timeLabel(item.duration)}</small></div>`).join('')}</div>`;
  }
  function formView() {
    const isView = state.view === 'detail';
    const draft = state.draft;
    const title = isView ? '旧韵律详情' : state.view === 'edit' ? '编辑旧韵律' : '创建旧韵律';
    return `<header class="page-header-bar"><div class="page-header-title"><button class="back-button" id="legacy-back" type="button" aria-label="返回旧韵律列表">‹</button><h1>${title}</h1>${badge}</div><div class="page-header-actions"><button class="btn btn--outline" id="legacy-cancel" type="button">${isView ? '返回' : '取消'}</button>${isView ? '<button class="btn btn--primary" id="legacy-edit-detail" type="button">编辑</button>' : '<button class="btn btn--primary" id="legacy-save" type="button">保存</button>'}</div></header><div class="legacy-form-body">${banner()}<div class="legacy-error${state.formError ? '' : ' is-hidden'}" id="legacy-form-error" role="alert">${esc(state.formError)}</div><section class="legacy-form-card"><div class="legacy-card-title"><h2>基础信息</h2><span>AIoT 官方模式字段</span></div><div class="legacy-form-grid"><label class="legacy-field legacy-model-highlight"><span><em>*</em>型号 ${badge}</span><select class="control" id="legacy-field-model" data-legacy-field="model"${isView ? ' disabled' : ''} required>${options(MODELS, draft.model, '请选择型号')}</select><small>全局创建需明确所属型号，一次选择一个型号。</small></label>${field('模式名称', 'name', true, isView)}${field('模式编码', 'code', false, isView)}${field('排序', 'rank', true, isView, 'number')}<label class="legacy-field"><span>背景色值</span><div class="legacy-color-controls"><input type="color" id="legacy-color-picker" aria-label="选择背景色" value="${/^#[0-9a-f]{6}$/i.test(draft.background) ? draft.background : '#F0E8E4'}"${isView ? ' disabled' : ''}><input class="control" id="legacy-field-background" data-legacy-field="background" maxlength="7" placeholder="#F0E8E4" value="${esc(draft.background)}"${isView ? ' disabled' : ''}></div></label><label class="legacy-field legacy-description-field"><span>描述</span><textarea class="control" id="legacy-field-description" data-legacy-field="description" maxlength="1000" rows="3" placeholder="请输入模式描述"${isView ? ' disabled' : ''}>${esc(draft.description)}</textarea></label>${uploadField('icon', '模式图标', isView)}${uploadField('image', '模式主图', isView)}</div></section><section class="legacy-form-card"><div class="legacy-card-title"><h2><em>*</em>组合功能设置</h2><span>${isView ? '按阶段顺序执行' : '拖动或使用 ↑ ↓ 调整阶段顺序'}</span></div><p class="legacy-stage-help">先选择型号，再配置吮吸方式、频率、档位和时长。休息阶段仅设置时长。选项为原型演示。</p>${draft.model ? `<div class="legacy-stage-stack">${draft.stages.length ? draft.stages.map((item, index) => stageCard(item, index, isView)).join('') : '<div class="legacy-stage-empty">暂无阶段，请新增阶段。</div>'}</div>` : '<div class="legacy-stage-empty"><strong>请先选择型号</strong><span>型号确定后，即可配置该型号的旧韵律阶段。</span></div>'}${isView ? '' : `<button class="btn btn--outline legacy-add-stage" id="legacy-add-stage" type="button"${draft.model ? '' : ' disabled'}>＋ 新增阶段</button>`}<div class="legacy-preview">${timeline()}</div></section></div>`;
  }
  function languageModal() {
    if (!state.lang) return '';
    const lang = state.lang;
    return `<div class="legacy-modal-overlay"><section class="legacy-language-modal" role="dialog" aria-modal="true" aria-labelledby="legacy-language-title"><header><div><h2 id="legacy-language-title">多语言配置 ${badge}</h2><p>${esc(lang.name)} · ${esc(lang.model)}</p></div><button class="legacy-icon-button" id="legacy-language-close" type="button" aria-label="关闭多语言配置">×</button></header><div class="legacy-language-body">${[['zh-CN', '简体中文'], ['en-US', 'English']].map(([locale, label]) => `<fieldset><legend>${label}<span>${locale}</span></legend><label class="legacy-field"><span>模式名称</span><input class="control" maxlength="100" aria-label="${label}模式名称" data-legacy-locale="${locale}" data-legacy-translation="name" value="${esc(lang.values[locale]?.name || '')}" placeholder="请输入${label}名称"></label><label class="legacy-field"><span>描述</span><textarea class="control" maxlength="1000" rows="3" aria-label="${label}描述" data-legacy-locale="${locale}" data-legacy-translation="description" placeholder="请输入${label}描述">${esc(lang.values[locale]?.description || '')}</textarea></label></fieldset>`).join('')}</div><footer><button class="btn btn--outline" id="legacy-language-cancel" type="button">取消</button><button class="btn btn--primary" id="legacy-language-save" type="button">保存</button></footer></section></div>`;
  }
  function render() { return `<section class="page-stack legacy-page">${state.view === 'list' ? listView() : formView()}${languageModal()}</section>`; }
  function updateDuration() {
    const target = document.querySelector('.legacy-preview');
    if (target) target.innerHTML = timeline();
  }
  function fail(message, field) {
    state.formError = message;
    const error = document.querySelector('#legacy-form-error');
    if (error) { error.textContent = message; error.classList.remove('is-hidden'); }
    host.showToast(message);
    const control = field && document.querySelector(field);
    control?.focus();
    control?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
  function save() {
    if (state.fileReads) { fail('图片正在读取，请稍后保存。'); return; }
    const draft = state.draft;
    if (!MODELS.includes(draft.model)) { fail('请选择型号。', '#legacy-field-model'); return; }
    if (!draft.name.trim()) { fail('请输入模式名称。', '#legacy-field-name'); return; }
    if (!/^\d+$/.test(String(draft.rank)) || Number(draft.rank) < 1 || Number(draft.rank) > 9999) { fail('排序请输入 1～9999 的整数。', '#legacy-field-rank'); return; }
    if (draft.background && !/^#[0-9a-f]{6}$/i.test(draft.background)) { fail('背景色值请填写 # 开头的 6 位十六进制色值。', '#legacy-field-background'); return; }
    if (rows.some(item => item.id !== draft.id && item.model === draft.model && item.name.trim() === draft.name.trim())) { fail('该型号下已存在同名旧韵律。', '#legacy-field-name'); return; }
    if (draft.code.trim() && rows.some(item => item.id !== draft.id && item.model === draft.model && item.code === draft.code.trim())) { fail('该型号下已存在相同模式编码。', '#legacy-field-code'); return; }
    if (!draft.stages.length) { fail('请至少新增一个阶段。', '#legacy-add-stage'); return; }
    for (let index = 0; index < draft.stages.length; index++) {
      const item = draft.stages[index];
      const selector = key => `[data-legacy-stage="${index}"][data-legacy-stage-field="${key}"]`;
      if (!MODES.includes(item.mode)) { fail(`请选择第 ${index + 1} 阶段的吮吸方式。`, selector('mode')); return; }
      if (item.mode !== '休息' && (!FREQUENCIES.includes(item.frequency) || !/^[1-9]$/.test(String(item.gear)))) { fail(`请完整配置第 ${index + 1} 阶段的频率和档位。`, selector(!item.frequency ? 'frequency' : 'gear')); return; }
      if (!/^\d+$/.test(String(item.duration)) || Number(item.duration) < 1 || Number(item.duration) > 7200) { fail(`第 ${index + 1} 阶段时长请输入 1～7200 的整数秒。`, selector('duration')); return; }
    }
    const saved = { ...clone(draft), id: draft.id || `legacy-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name: draft.name.trim(), code: draft.code.trim(), rank: String(Number(draft.rank)), background: draft.background.toUpperCase(), stages: draft.stages.map(item => item.mode === '休息' ? { ...item, frequency: '', gear: '' } : item) };
    const next = rows.filter(item => item.id !== saved.id).concat(saved);
    if (!persist(next)) return;
    resetView(); host.render(); host.showToast('旧韵律已保存。');
  }
  function moveStage(from, to) {
    const stages = state.draft?.stages;
    if (!stages || from === to || from < 0 || to < 0 || from >= stages.length || to >= stages.length) return;
    stages.splice(to, 0, stages.splice(from, 1)[0]); host.render();
  }
  function bind(callbacks) {
    host = { ...host, ...callbacks };
    const page = document.querySelector('.legacy-page');
    if (!page) return;
    const click = (id, action) => page.querySelector(`#${id}`)?.addEventListener('click', action);
    const leaveForm = () => confirmExit(() => { resetView(); host.render(); });
    click('legacy-create', () => openForm(null, 'create'));
    click('legacy-back', leaveForm); click('legacy-cancel', leaveForm); click('legacy-save', save);
    click('legacy-edit-detail', () => openForm(state.draft, 'edit'));
    click('legacy-search-button', () => { state.query = page.querySelector('#legacy-search').value; host.render(); });
    page.querySelector('#legacy-search')?.addEventListener('keydown', event => { if (event.key === 'Enter') { state.query = event.target.value; host.render(); } });
    page.querySelector('#legacy-search')?.addEventListener('input', event => { state.query = event.target.value; });
    page.querySelector('#legacy-model-filter')?.addEventListener('change', event => { state.modelFilter = event.target.value; host.render(); });
    click('legacy-reset-filters', () => { state.query = ''; state.modelFilter = ''; host.render(); });
    page.querySelectorAll('[data-legacy-action]').forEach(button => button.addEventListener('click', () => {
      const row = rows.find(item => item.id === button.dataset.legacyId);
      if (!row) return;
      const action = button.dataset.legacyAction;
      if (action === 'edit' || action === 'detail') { openForm(row, action); return; }
      if (action === 'delete') host.showDialog(`确定删除 ${row.model} 的“${row.name}”吗？删除后不可恢复。`, () => { if (persist(rows.filter(item => item.id !== row.id))) { host.render(); host.showToast('旧韵律已删除。'); } }, '取消', '删除');
      if (action === 'language') { const values = clone(row.translations || {}); state.lang = { id: row.id, name: row.name, model: row.model, values, original: JSON.stringify(values) }; host.render(); }
    }));
    page.querySelectorAll('[data-legacy-field]').forEach(control => control.addEventListener(control.tagName === 'SELECT' ? 'change' : 'input', event => {
      const key = control.dataset.legacyField;
      if (key === 'model') {
        const value = event.target.value;
        if (value === state.draft.model) return;
        const update = () => { state.draft.model = value; state.draft.stages = []; host.render(); };
        if (state.draft.stages.length) { control.value = state.draft.model; host.showDialog('更换型号后，将清空已配置的阶段。确定更换吗？', update, '保留原型号', '更换并清空'); }
        else update();
      } else {
        state.draft[key] = event.target.value;
        if (key === 'background' && /^#[0-9a-f]{6}$/i.test(event.target.value)) { const picker = page.querySelector('#legacy-color-picker'); if (picker) picker.value = event.target.value; }
      }
    }));
    page.querySelector('#legacy-color-picker')?.addEventListener('input', event => { state.draft.background = event.target.value.toUpperCase(); page.querySelector('#legacy-field-background').value = state.draft.background; });
    page.querySelectorAll('[data-legacy-upload]').forEach(control => control.addEventListener('change', () => {
      const file = control.files?.[0]; if (!file) return;
      if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) { host.showToast('请选择 PNG、JPG、WebP 或 GIF 图片。'); control.value = ''; return; }
      if (file.size > 2 * 1024 * 1024) { host.showToast('图片请小于 2 MB。'); control.value = ''; return; }
      const draft = state.draft; const key = control.dataset.legacyUpload; const reader = new FileReader(); state.fileReads++;
      reader.onload = () => { state.fileReads--; if (state.draft !== draft) return; draft[key] = String(reader.result); host.render(); };
      reader.onerror = () => { state.fileReads--; host.showToast('图片读取失败，请重新选择。'); };
      reader.readAsDataURL(file);
    }));
    page.querySelectorAll('[data-legacy-remove-image]').forEach(button => button.addEventListener('click', () => { state.draft[button.dataset.legacyRemoveImage] = ''; host.render(); }));
    click('legacy-add-stage', () => { if (!state.draft.model) return; state.draft.stages.push(stage('', '', '', 30)); host.render(); });
    page.querySelectorAll('[data-legacy-stage-field]').forEach(control => control.addEventListener(control.tagName === 'SELECT' ? 'change' : 'input', event => {
      const index = Number(control.dataset.legacyStage); const field = control.dataset.legacyStageField; const item = state.draft.stages[index];
      if (!item) return; item[field] = event.target.value;
      if (field === 'mode') { if (item.mode === '休息') { item.frequency = ''; item.gear = ''; } host.render(); }
      else updateDuration();
    }));
    page.querySelectorAll('[data-legacy-stage-remove]').forEach(button => button.addEventListener('click', () => { state.draft.stages.splice(Number(button.dataset.legacyStageRemove), 1); host.render(); }));
    page.querySelectorAll('[data-legacy-stage-move]').forEach(button => button.addEventListener('click', () => { const index = Number(button.dataset.legacyStageMove); moveStage(index, index + Number(button.dataset.legacyDirection)); }));
    page.querySelectorAll('[data-legacy-drag]').forEach(handle => handle.addEventListener('dragstart', event => { state.dragIndex = Number(handle.dataset.legacyDrag); event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', String(state.dragIndex)); }));
    page.querySelectorAll('[data-legacy-stage-drop]').forEach(card => {
      card.addEventListener('dragover', event => { if (state.dragIndex === null) return; event.preventDefault(); event.dataTransfer.dropEffect = 'move'; card.classList.add('is-drag-over'); });
      card.addEventListener('dragleave', event => { if (!card.contains(event.relatedTarget)) card.classList.remove('is-drag-over'); });
      card.addEventListener('drop', event => { event.preventDefault(); card.classList.remove('is-drag-over'); if (state.dragIndex !== null) moveStage(state.dragIndex, Number(card.dataset.legacyStageDrop)); state.dragIndex = null; });
    });
    page.addEventListener('dragend', () => { state.dragIndex = null; page.querySelectorAll('.is-drag-over').forEach(card => card.classList.remove('is-drag-over')); });
    const closeLanguage = () => confirmExit(() => { state.lang = null; host.render(); });
    click('legacy-language-close', closeLanguage); click('legacy-language-cancel', closeLanguage);
    page.querySelectorAll('[data-legacy-translation]').forEach(control => control.addEventListener('input', event => { const locale = control.dataset.legacyLocale; state.lang.values[locale] ||= {}; state.lang.values[locale][control.dataset.legacyTranslation] = event.target.value; }));
    click('legacy-language-save', () => { const next = rows.map(item => item.id === state.lang.id ? { ...item, translations: clone(state.lang.values) } : item); if (persist(next)) { state.lang = null; host.render(); host.showToast('多语言配置已保存。'); } });
    const backdrop = page.querySelector('.legacy-modal-overlay');
    backdrop?.addEventListener('click', event => { if (event.target === backdrop) closeLanguage(); });
    if (state.lang) page.querySelector('[data-legacy-translation]')?.focus();
  }
  window.LegacyRhythms = { render, bind, confirmExit, resetView };
})();
