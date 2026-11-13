/* Ceres · Shared rhythm identity, independent model execution configurations. */
(() => {
  'use strict';
  const STORE = 'ceres.v3.rhythm-management.20261112.v2';
  const clone = value => JSON.parse(JSON.stringify(value));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const now = () => new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Shanghai', hour12: false });
  const uid = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const seconds = stages => (stages || []).reduce((sum, item) => sum + Number(item.duration || 0), 0);
  const time = value => { const n = Number(value) || 0; return `${Math.floor(n / 60)} 分${n % 60 ? ` ${n % 60} 秒` : ''}`; };
  const dot = '<span class="rm-dot" aria-label="完整参数待补录"></span>';
  const label = kind => kind === 'legacy' ? '旧韵律' : '新韵律';
  const tag = (text, tone = 'info') => `<span class="tag tag--${tone}">${esc(text)}</span>`;
  const option = (values, value, placeholder = '') => `${placeholder ? `<option value="">${esc(placeholder)}</option>` : ''}${values.map(item => `<option value="${esc(item)}"${String(item) === String(value) ? ' selected' : ''}>${esc(item)}</option>`).join('')}`;
  const oldModels = ['M5 Ultra', 'M5 Smart', 'M9', 'Air 1', 'V3', 'V3 Pro', 'Wellness Warm', 'W1'];
  const newModels = ['Air 2', 'L2'];
  const modeNames = ['刺激', '吸乳', '混合1', '混合2', '休息'];
  // Explicit prototype mode directory. These snapshots are illustrative, never production mappings.
  const DEMO_MODES = [
    { id: 'DEMO-AIR2-STIM-001', version: 'DEMO-V1', model: 'Air 2', mode: '刺激', sourceId: 102, sourceVersion: 'V1', name: 'Air 2 刺激模式', snapshot: { frequency: '70', suction: '12', gear: '3', pressureTime: '50', intervalTime: '30' } },
    { id: 'DEMO-AIR2-SUCT-001', version: 'DEMO-V1', model: 'Air 2', mode: '吸乳', sourceId: 102, sourceVersion: 'V1', name: 'Air 2 吸乳模式', snapshot: { frequency: '55', suction: '24', gear: '6', pressureTime: '180', intervalTime: '60' } },
    { id: 'DEMO-L2-STIM-001', version: 'DEMO-V1', model: 'L2', mode: '刺激', sourceId: 104, sourceVersion: 'V1', name: 'L2 刺激模式', snapshot: { frequency: '85', suction: '11', gear: '2', pressureTime: '45', intervalTime: '35' } },
    { id: 'DEMO-L2-SUCT-001', version: 'DEMO-V1', model: 'L2', mode: '吸乳', sourceId: 104, sourceVersion: 'V1', name: 'L2 吸乳模式', snapshot: { frequency: '50', suction: '22', gear: '5', pressureTime: '160', intervalTime: '65' } }
  ];
  let catalog = {}, db, kind = 'legacy';
  let host = { render() {}, showToast() {}, showDialog(message, action) { action(); } };
  const state = { expanded: new Set(), query: '', model: '', completeness: '', status: '', view: 'list', configId: '', draft: null, original: '', modal: null, error: '' };
  const parent = id => db.parents.find(item => item.id === id);
  const config = id => db.configs.find(item => item.id === id);
  const parentConfigs = id => db.configs.filter(item => item.parentId === id);
  const selected = () => config(state.configId);
  const currentParent = () => parent(selected()?.parentId);
  const stage = (mode, duration, frequency = '', gear = '', suction = '', modeRef = '') => ({ mode, duration: String(duration), frequency: String(frequency), gear: String(gear), suction: String(suction), modeRef, modeVersion: 'V1' });
  function powerFor(model) {
    const all = (catalog.powerSources || []).filter(item => String(item.project || '').split(/[、,，]/).map(s => s.trim()).includes(model));
    const row = all.find(item => item.status === '发布') || all[0];
    if (row) {
      const version = row.versions?.find(item => item.current && item.status !== '草稿') || row.versions?.find(item => item.version === row.currentVersion) || row.versions?.[0];
      return { id: row.id, name: row.name, version: version?.version || row.currentVersion || 'V1', status: row.status, sample: false, snapshot: clone(version?.snapshot || { config: row.config, pressureRows: row.pressureRows, reliefRows: row.reliefRows }) };
    }
    const archive = (catalog.gearArchives || []).find(item => item.model === model);
    return { id: `example-${model}`, name: archive?.source || `${model} 动力源方案`, version: '示例快照', status: '示例', sample: true, snapshot: {} };
  }
  function sourceIsReady(item) {
    if (item.power?.sample) return false;
    const live = (catalog.powerSources || []).find(row => String(row.id) === String(item.power?.id));
    return live?.status === '发布' && live.versions?.some(v => v.version === item.power.version && v.status !== '草稿');
  }
  function validStage(item, itemKind) {
    if (!item.mode || !Number.isInteger(Number(item.duration)) || Number(item.duration) < 1) return false;
    if (item.mode === '休息') return true;
    if (!item.frequency || !item.gear || !Number.isInteger(Number(item.gear)) || Number(item.gear) < 1 || Number(item.gear) > 20) return false;
    return itemKind !== 'new' || Boolean(item.modeRef && item.modeVersion && item.modeSnapshot && Number(item.suction) > 0 && Number(item.frequency) > 0 && Number(item.modeSnapshot.pressureTime) > 0 && Number(item.modeSnapshot.intervalTime) >= 0);
  }
  function complete(item) {
    const p = parent(item.parentId);
    return Boolean(item.model && item.power?.name && item.power?.version && item.stages?.length && seconds(item.stages) > 0 && seconds(item.stages) <= 7200 && item.stages.every(s => validStage(s, p?.kind) && (p?.kind !== 'new' || s.mode === '休息' || (String(s.modeSourceId) === String(item.power.id) && s.modeSourceVersion === item.power.version))));
  }
  function resolvedStages(model, template) {
    return template.map(item => {
      if (item.mode === '休息') return stage('休息', item.duration);
      const power = powerFor(model);
      // A real published mode may be used only when it explicitly carries this model's complete snapshot.
      const actual = (catalog.modeLibraries || []).find(row => row.status === '发布' && row.source === power.name && row.modelSnapshots?.[model]?.[item.mode]);
      const candidate = actual?.modelSnapshots?.[model]?.[item.mode];
      const real = candidate?.powerVersion === power.version ? candidate : null;
      const demo = DEMO_MODES.find(row => row.model === model && row.mode === item.mode && String(row.sourceId) === String(power.id) && row.sourceVersion === power.version);
      const source = real || demo?.snapshot;
      if (!source) return { ...stage(item.mode, item.duration), modeOrigin: '未找到适用的完整模式快照', parameterOrigin: '待核验 · 不生成默认执行值' };
      const result = stage(item.mode, item.duration, source.frequency, source.gear, source.suction, real ? actual.id : demo.id);
      result.modeVersion = real ? real.version : demo.version;
      result.modeSourceId = power.id;
      result.modeSourceVersion = power.version;
      result.modeName = real ? actual.name : demo.name;
      result.modeOrigin = real ? '已发布模式库快照' : '原型模式示例目录';
      result.parameterOrigin = real ? '按型号固定版本解析' : '固定示例快照 · 非生产参数';
      result.modeSample = !real;
      result.modeSnapshot = clone(source);
      return result;
    });
  }
  function seed() {
    const stamp = '2026-11-12 14:30:00';
    const parents = [
      { id: 'legacy-milk-boost', kind: 'legacy', name: 'Milk Boost', description: '日常泌乳 · 历史官方韵律', outline: '刺激 → 吸乳；具体阶段与时长按型号维护', tag: '推荐', time: stamp },
      { id: 'legacy-milk-relief', kind: 'legacy', name: 'Milk Relief', description: '缓解奶涨 · 历史官方韵律', outline: '混合 → 休息 → 吸乳', tag: '场景', time: stamp },
      { id: 'legacy-power-pumping', kind: 'legacy', name: 'Power Pumping', description: '密集追奶 · 历史官方韵律', outline: '刺激、吸乳与休息交替', tag: '推荐', time: stamp },
      { id: 'new-milk-boost', kind: 'new', name: 'Milk Boost', description: '日常泌乳 · 模式组合韵律', outline: '刺激 2 分 → 吸乳 8 分 → 刺激 2 分 → 吸乳 8 分', tag: '推荐', time: stamp },
      { id: 'new-before-bed', kind: 'new', name: 'Before Bed', description: '睡前场景 · 柔和吸乳', outline: '刺激 2 分 → 吸乳 18 分', tag: '场景', time: stamp },
      { id: 'new-quick-relief', kind: 'new', name: 'Quick Relief', description: '日间场景 · 缓解奶涨', outline: '刺激 1 分 → 吸乳 8 分', tag: '推荐', time: stamp },
      { id: 'new-power-pumping', kind: 'new', name: 'Power Pumping', description: '密集追奶 · 分段吸乳与休息', outline: '刺激与吸乳交替，包含休息阶段', tag: '推荐', time: stamp }
    ];
    const configs = [];
    const add = (parentId, model, stages, status, origin, extra = {}) => configs.push({ id: `${parentId}-${model.toLowerCase().replace(/\s/g, '-')}`, parentId, model, stages: clone(stages), baselineStages: status === '发布' ? clone(stages) : null, power: powerFor(model), status, everPublished: status === '发布', origin, time: stamp, updater: '刘媛媛', ...extra });
    add('legacy-milk-boost', 'M5 Ultra', [stage('刺激', 120, '低', 3), stage('吸乳', 1080, '中', 7)], '发布', 'AIoT 历史配置 · 已补录');
    add('legacy-milk-boost', 'V3', [stage('刺激', 120, '中', 1), stage('吸乳', 480, '中', 1), stage('刺激', 120, '中', 1), stage('吸乳', 480, '中', 1)], '发布', 'AIoT 历史配置 · 已补录');
    for (const model of ['Air 1', 'Wellness Warm', 'W1', 'M5 Smart']) add('legacy-milk-boost', model, [stage('刺激', 120), stage('吸乳', 1680)], '发布', 'AIoT 历史导入 · 仅名称及编排');
    for (const model of ['Air 1', 'W1']) add('legacy-milk-relief', model, [stage('混合2', 30), stage('休息', 30), stage('吸乳', 840)], '发布', 'AIoT 历史导入 · 仅名称及编排');
    add('legacy-power-pumping', 'M5 Smart', [stage('刺激', 300, '低', 3), stage('吸乳', 900, '中', 5), stage('休息', 300), stage('混合2', 900, '低', 7), stage('休息', 300)], '发布', 'AIoT 历史配置 · 已补录');
    const template = [stage('刺激', 120), stage('吸乳', 480), stage('刺激', 120), stage('吸乳', 480)];
    add('new-milk-boost', 'Air 2', resolvedStages('Air 2', template), '发布', '原型模式示例目录 · 完整参数快照');
    add('new-milk-boost', 'L2', resolvedStages('L2', template), '草稿', '原型模式示例目录 · 完整参数快照');
    add('new-before-bed', 'Air 2', resolvedStages('Air 2', [stage('刺激', 120), stage('吸乳', 1080)]), '草稿', '原型模式示例目录 · 完整参数快照');
    add('new-quick-relief', 'Air 2', resolvedStages('Air 2', [stage('刺激', 60), stage('吸乳', 480)]), '发布', '原型模式示例目录 · 完整参数快照');
    add('new-power-pumping', 'Air 2', resolvedStages('Air 2', [stage('刺激', 120), stage('吸乳', 780), stage('休息', 300), stage('刺激', 120), stage('吸乳', 480), stage('休息', 300), stage('刺激', 120), stage('吸乳', 480)]), '发布', '原型模式示例目录 · 完整参数快照');
    for (const p of parents.filter(p => p.kind === 'new')) p.template = configs.find(c => c.parentId === p.id)?.stages.map(s => stage(s.mode, s.duration)) || [];
    // Preserve historical saved records. Only known demonstration IDs share known parent IDs.
    try {
      const saved = JSON.parse(localStorage.getItem('ceres.v2.1.legacy-rhythms'));
      const map = { 'legacy-milk-boost': 'legacy-milk-boost', 'legacy-v3-milk-boost': 'legacy-milk-boost', 'legacy-air1-milk-boost': 'legacy-milk-boost', 'legacy-wellness-warm-milk-boost': 'legacy-milk-boost', 'legacy-w1-milk-boost': 'legacy-milk-boost', 'legacy-air1-milk-relief': 'legacy-milk-relief', 'legacy-wellness-warm-milk-relief': 'legacy-milk-relief', 'legacy-w1-milk-relief': 'legacy-milk-relief', 'legacy-power-pumping': 'legacy-power-pumping', 'legacy-m5-ultra-power-pumping': 'legacy-power-pumping' };
      if (Array.isArray(saved)) for (const old of saved) {
        if (!old?.id || !old.model || !Array.isArray(old.stages)) continue;
        const pid = map[old.id] || `migrated-${old.id}`;
        if (!parents.some(p => p.id === pid)) parents.push({ id: pid, kind: 'legacy', name: String(old.name || '历史韵律'), description: '保留原型中已保存的型号配置', outline: '按型号查看具体编排', tag: '历史导入', time: old.time || stamp });
        const existing = configs.find(c => c.parentId === pid && c.model === old.model);
        const record = { id: existing?.id || `import-${old.id}`, parentId: pid, model: old.model, power: powerFor(old.model), stages: old.stages.map(s => stage(s.mode, s.duration, s.frequency, s.gear)), status: ['发布', '草稿', '停用'].includes(old.status) ? old.status : '草稿', everPublished: old.status !== '草稿', origin: '先前原型已保存的参数', time: old.time || stamp, updater: old.updater || '刘媛媛' };
        record.baselineStages = record.everPublished ? clone(record.stages) : null;
        if (existing) Object.assign(existing, record); else configs.push(record);
      }
    } catch (_) { /* Existing data remains untouched in its original store. */ }
    return { schema: 2, parents, configs };
  }
  function configure(value) {
    catalog = value || {};
    if (db) return;
    try {
      const saved = JSON.parse(localStorage.getItem(STORE));
      if (saved?.schema === 2 && Array.isArray(saved.parents) && Array.isArray(saved.configs)) db = saved;
    } catch (_) { /* Fall back to deterministic examples. */ }
    db ||= seed();
  }
  function commit(next) {
    try { localStorage.setItem(STORE, JSON.stringify(next)); db = next; return true; }
    catch (_) { host.showToast('保存失败，未提交本次修改；请检查浏览器存储后重试。'); return false; }
  }
  function resetView() {
    state.view = 'list'; state.configId = ''; state.draft = null; state.original = ''; state.modal = null; state.error = '';
    state.query = ''; state.model = ''; state.status = ''; state.completeness = '';
  }
  const dirty = () => state.draft && JSON.stringify(state.draft) !== state.original;
  function confirmExit(action, dialog = host.showDialog) { if (dirty()) dialog('有未保存的参数修改，确定离开吗？未提交的内容不会清除待补录红点。', action, '继续编辑', '离开'); else action(); }
  function modelState(item) {
    if (parent(item.parentId)?.kind === 'legacy' && item.everPublished) return item.status === '停用' ? '原系统已停用' : '原系统已发布';
    return item.status === '发布' ? '已发布' : item.status;
  }
  function matchingConfigs(item) {
    return parentConfigs(item.id).filter(c => (!state.model || c.model === state.model) && (!state.status || c.status === state.status) && (!state.completeness || (complete(c) ? 'complete' : 'missing') === state.completeness));
  }
  function progress(items) { const n = items.filter(complete).length; return `<span class="rm-progress"><strong>${n}</strong> / ${items.length} 个型号参数完整</span>`; }
  function statusSummary(items) {
    if (!items.length) return tag('待关联型号');
    return ['发布', '草稿', '停用'].map(s => { const n = items.filter(c => c.status === s).length; return n ? `<span>${tag(s === '发布' ? '已发布' : s, s === '发布' ? 'success' : s === '草稿' ? 'warning' : 'info')} <b>${n}</b></span>` : ''; }).join('');
  }
  function childRows(item, items) {
    const hasFilters = state.model || state.status || state.completeness;
    return `<tr class="rm-expanded-row"><td colspan="6"><section class="rm-model-panel"><header><div><h3>型号执行配置</h3><p>每个型号独立绑定动力源、参数与发布状态${hasFilters ? ' · 仅展示匹配筛选的型号' : ''}</p></div><button class="btn btn--outline" data-rm-associate="${esc(item.id)}">＋ 关联型号</button></header><div class="table-shell"><table class="data-table rm-model-table"><colgroup><col style="width:135px"><col style="width:205px"><col style="width:145px"><col style="width:100px"><col style="width:135px"><col style="width:260px"></colgroup><thead><tr><th>型号</th><th>动力源方案 / 固定版本</th><th>完整参数</th><th>执行时长</th><th>发布状态</th><th>操作</th></tr></thead><tbody>${items.length ? items.map(c => `<tr><td><strong>${esc(c.model)}</strong></td><td><span class="rm-source-name">${esc(c.power.name)}</span><small>${esc(c.power.version)}${c.power.sample ? ' · 原型示例' : ''}</small></td><td>${complete(c) ? tag('已完整', 'success') : `<span class="rm-pending">${dot}待补录</span>`}${c.supplementDraft ? '<small>有未提交补录草稿</small>' : ''}</td><td>${time(seconds(c.stages))}</td><td>${tag(modelState(c), c.status === '发布' ? 'success' : c.status === '草稿' ? 'warning' : 'info')}</td><td><div class="rm-actions"><button class="rm-link" data-rm-view="${esc(c.id)}">查看</button>${!complete(c) ? `<button class="rm-link" data-rm-edit="${esc(c.id)}">补充参数</button>` : !c.everPublished ? `<button class="rm-link" data-rm-edit="${esc(c.id)}">编辑草稿</button>` : ''}${!c.everPublished && c.status === '草稿' ? `<button class="rm-link" data-rm-publish="${esc(c.id)}"${complete(c) && (item.kind === 'legacy' || sourceIsReady(c)) ? '' : ' disabled'}>${item.kind === 'new' ? '模拟发布' : '发布'}</button>` : ''}${c.status === '发布' ? `<button class="rm-link rm-danger" data-rm-disable="${esc(c.id)}">停用</button>` : ''}</div>${!c.everPublished && item.kind === 'new' && !sourceIsReady(c) ? '<small>动力源方案未就绪，暂不可发布</small>' : ''}</td></tr>`).join('') : '<tr><td colspan="6" class="rm-empty">尚未关联型号，请先添加型号执行配置。</td></tr>'}</tbody></table></div></section></td></tr>`;
  }
  function listView() {
    const allParents = db.parents.filter(p => p.kind === kind);
    const allConfigs = db.configs.filter(c => parent(c.parentId)?.kind === kind);
    const visible = allParents.filter(p => (!state.query.trim() || `${p.name} ${p.description}`.toLowerCase().includes(state.query.trim().toLowerCase())) && (matchingConfigs(p).length || (!parentConfigs(p.id).length && !state.model && !state.status && !state.completeness)));
    const count = visible.reduce((sum, p) => sum + matchingConfigs(p).length, 0);
    const models = [...new Set([...(kind === 'legacy' ? oldModels : newModels), ...allConfigs.map(c => c.model)])];
    return `<section class="page-stack rm-page"><header class="page-header-bar"><h1>${label(kind)}库管理</h1><div class="page-header-actions"><span class="rm-change-legend"><i></i>绿色框为本次调整</span><button class="btn btn--primary" id="rm-create">新增${label(kind)}</button></div></header><div class="list-page-body"><section class="rm-overview rm-change"><span class="rm-change-label">本次调整 · 展示层级</span><div><h2>一条韵律，管理多个型号</h2><p>韵律统一管理名称与编排；展开型号，分别查看动力源、完整参数与发布状态。</p></div><div class="rm-overview-stat"><strong>${allParents.length}</strong><span>条韵律</span><strong>${allConfigs.length}</strong><span>份型号配置</span></div></section><section class="rm-filter-bar filter-toolbar"><input class="control" id="rm-search" type="search" placeholder="搜索韵律名称，按回车确认" aria-label="搜索韵律名称" value="${esc(state.query)}"><select class="control" id="rm-model-filter" aria-label="型号筛选">${option(models, state.model, '全部型号')}</select><select class="control" id="rm-complete-filter" aria-label="完整参数筛选"><option value="">全部参数状态</option><option value="missing"${state.completeness === 'missing' ? ' selected' : ''}>待补录</option><option value="complete"${state.completeness === 'complete' ? ' selected' : ''}>已完整</option></select><select class="control" id="rm-status-filter" aria-label="发布状态筛选">${option(['发布', '草稿', '停用'], state.status, '全部发布状态')}</select><button class="btn btn--outline" id="rm-reset">重置</button></section><section class="rm-list list-table-card rm-change"><span class="rm-change-label">本次调整 · 主列表 / 型号明细</span><div class="rm-list-hint">${kind === 'legacy' ? `${dot}<span>红点表示该型号完整参数待补录；已有名称与编排可先展示，原系统发布状态单独保留。</span>` : '<span>新韵律随模式组合带出完整参数；按型号解析，分别绑定动力源版本。</span>'}</div><div class="table-shell rm-table-shell"><table class="data-table rm-parent-table"><colgroup><col style="width:300px"><col style="width:235px"><col style="width:180px"><col style="width:195px"><col style="width:160px"><col style="width:180px"></colgroup><thead><tr><th>韵律名称 / 编排</th><th>关联型号</th><th>完整参数进度</th><th>型号发布概况</th><th>最近更新</th><th>操作</th></tr></thead><tbody>${visible.length ? visible.map(p => {
      const items = parentConfigs(p.id), matching = matchingConfigs(p), pending = !items.length || items.some(c => !complete(c));
      const expanded = state.expanded.has(p.id);
      return `<tr class="rm-parent-row${expanded ? ' is-expanded' : ''}"><td><button class="rm-name-button" data-rm-toggle="${esc(p.id)}" aria-expanded="${expanded}"><span class="rm-chevron">${expanded ? '⌄' : '›'}</span><strong>${esc(p.name)}</strong>${pending ? dot : ''}</button><p class="rm-description">${esc(p.description)}</p><small class="rm-outline">${esc(p.outline)}</small></td><td><div class="rm-model-tags">${matching.map(c => `<button class="rm-model-tag" data-rm-view="${esc(c.id)}">${esc(c.model)}${complete(c) ? '' : dot}</button>`).join('') || tag('未关联型号')}</div>${matching.length !== items.length ? `<small>匹配 ${matching.length} / 全部 ${items.length} 个型号</small>` : ''}</td><td>${progress(items)}${pending ? `<small>${items.length ? items.filter(c => !complete(c)).length + ' 个待补录' : '先关联型号，再维护参数'}</small>` : '<small>各型号参数独立保存</small>'}</td><td><div class="rm-summary">${statusSummary(items)}</div></td><td><span>${esc((items.map(c => c.time).sort().pop() || p.time).slice(0, 16))}</span><small>刘媛媛</small></td><td><div class="rm-actions"><button class="rm-link" data-rm-toggle="${esc(p.id)}">${expanded ? '收起型号' : '管理型号'}</button><button class="rm-link" data-rm-base="${esc(p.id)}">${items.some(c => c.everPublished) ? '查看信息' : '编辑信息'}</button>${items.some(c => c.everPublished) ? `<button class="rm-link" data-rm-copy="${esc(p.id)}">创建 2.0</button>` : ''}</div></td></tr>${expanded ? childRows(p, matching) : ''}`;
    }).join('') : '<tr><td colspan="6" class="rm-empty">没有符合条件的韵律，请调整筛选条件。</td></tr>'}</tbody></table></div><footer class="pagination-bar"><span>匹配 ${visible.length} 条韵律 · ${count} 份型号配置${state.model || state.status || state.completeness ? '；主行进度及发布概况统计全部关联型号' : ''}</span><div class="pagination"><button class="page-button is-active" type="button">1</button></div></footer></section></div></section>`;
  }
  function openDetail(id, editing = false) {
    const c = config(id); if (!c) return;
    const p = parent(c.parentId);
    if (editing && c.everPublished && complete(c)) { host.showToast('已发布的完整执行参数只读；调整内容请创建独立 2.0。'); return; }
    state.view = editing ? 'edit' : 'detail'; state.configId = id;
    state.draft = editing ? clone(c.supplementDraft || c) : clone(c);
    state.original = JSON.stringify(state.draft); state.error = '';
    kind = p.kind; host.render(); window.scrollTo(0, 0);
  }
  function field(name, content, missing = false, wide = false) { return `<label class="rm-field${missing ? ' rm-missing' : ''}${wide ? ' rm-field--wide' : ''}"><span>${name}</span>${content}</label>`; }
  function lockedStageField(c, index, key) { return c.everPublished && Boolean(c.baselineStages?.[index]?.[key]); }
  function legacyStage(item, index, editing, c) {
    const disabled = key => !editing || lockedStageField(c, index, key) ? ' disabled' : '';
    const control = (key, html) => `<div class="${!item[key] ? 'rm-missing' : ''}">${html}</div>`;
    return `<div class="rm-stage-card"><div class="rm-stage-heading"><strong>第 ${index + 1} 阶段</strong>${editing && !c.everPublished ? `<button class="rm-link rm-danger" data-rm-remove-stage="${index}">删除阶段</button>` : ''}</div><div class="rm-stage-fields">${field('吮吸方式', `<select class="control" data-rm-stage="${index}" data-rm-key="mode" aria-label="第${index + 1}阶段吮吸方式"${disabled('mode')}>${option(modeNames, item.mode, '请选择')}</select>`, !item.mode)}${field('时长（秒）', `<input class="control" type="number" min="1" max="7200" step="1" data-rm-stage="${index}" data-rm-key="duration" aria-label="第${index + 1}阶段时长" value="${esc(item.duration)}"${disabled('duration')}>`, !item.duration)}${item.mode === '休息' ? '<div class="rm-field"><span>休息阶段</span><p>仅维护时长，无吸乳参数</p></div>' : `${field('频率', `<select class="control" data-rm-stage="${index}" data-rm-key="frequency" aria-label="第${index + 1}阶段频率"${disabled('frequency')}>${option(['低', '中', '高'], item.frequency, '待补充原频率')}</select>`, !item.frequency)}${field('档位', `<input class="control" type="number" min="1" max="20" step="1" data-rm-stage="${index}" data-rm-key="gear" aria-label="第${index + 1}阶段档位" placeholder="待补充原档位" value="${esc(item.gear)}"${disabled('gear')}>`, !item.gear)}`}</div></div>`;
  }
  function newStage(item, index, editing) {
    const disabled = editing ? '' : ' disabled';
    const controls = [
      field('模式', `<select class="control" data-rm-stage="${index}" data-rm-key="mode" aria-label="第${index + 1}段模式"${disabled}>${option(['刺激', '吸乳', '休息'], item.mode)}</select>`),
      field('执行时长（秒）', `<input class="control" type="number" min="1" max="7200" data-rm-stage="${index}" data-rm-key="duration" value="${esc(item.duration)}" aria-label="第${index + 1}段时长"${disabled}>`)
    ];
    if (item.mode === '休息') controls.push('<div class="rm-field"><span>休息阶段</span><p>不包含动力执行参数</p></div>');
    else {
      controls.push(field('模式 ID / 固定版本', `<div class="rm-fixed-reference"><strong>${esc(item.modeRef || '待解析')}</strong><span>${esc(item.modeVersion || '待核验')}</span></div>`, !item.modeRef));
      for (const [name, value] of [['解析频率（CPM）', item.frequency], ['解析吸力（kPa）', item.suction], ['解析档位', item.gear ? `L${item.gear}` : ''], ['建压时长（ms）', item.modeSnapshot?.pressureTime], ['间歇时长（ms）', item.modeSnapshot?.intervalTime]]) controls.push(field(name, `<input class="control" value="${esc(value || '')}" placeholder="待核验" disabled>`, !value));
    }
    return `<div class="rm-stage-card"><div class="rm-stage-heading"><strong>第 ${index + 1} 段 · ${esc(item.mode)}${item.mode === '休息' ? '' : '模式'}</strong>${editing ? `<button class="rm-link rm-danger" data-rm-remove-stage="${index}">删除模式</button>` : tag(item.modeSample ? '原型模式示例' : item.modeRef ? '组合解析' : '待核验', item.modeRef ? 'success' : 'warning')}</div><div class="rm-stage-fields">${controls.join('')}</div>${item.mode !== '休息' ? `<p class="rm-stage-source">来源：${esc(item.modeOrigin || '待核验')} · ${esc(item.parameterOrigin || '完整模式快照缺失')}</p>` : ''}</div>`;
  }
  function powerDetails(c) {
    const snap = c.power.snapshot || {}, values = snap.config || {};
    const names = { powerSourceType: '动力源类型', motorType: '电机', pumpType: '泵', valveType: '阀', pulseCount: '脉冲段数', frequencyMin: '频率下限', frequencyMax: '频率上限', holdMin: '建压时长下限', holdMax: '建压时长上限', intervalMin: '间歇下限', intervalMax: '间歇上限' };
    return `<details class="rm-power-details"><summary>查看绑定动力源参数快照</summary>${Object.keys(values).length ? `<div class="rm-meta-grid">${Object.entries(values).filter(([, v]) => v !== '').map(([key, value]) => `<div class="rm-meta-item"><span>${esc(names[key] || key)}</span><strong>${esc(value)}</strong></div>`).join('')}</div>${snap.pressureRows?.length ? `<div class="table-shell"><table class="data-table"><caption>建压映射快照</caption><tbody>${snap.pressureRows.map(row => `<tr>${row.map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}${snap.reliefRows?.length ? `<div class="table-shell"><table class="data-table"><caption>泄压映射快照</caption><tbody>${snap.reliefRows.map(row => `<tr>${row.map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}` : '<p>此型号动力源为原型示例关联；真实参数快照由历史配置对接补齐，不以示例替代正式发布依据。</p>'}</details>`;
  }
  function detailView() {
    const c = selected(), p = currentParent(); if (!c || !p) { resetView(); return listView(); }
    const editing = state.view === 'edit', d = state.draft, supplemental = editing && p.kind === 'legacy' && !complete(c);
    return `<section class="page-stack rm-page"><header class="page-header-bar"><div class="page-header-title"><button class="back-button" id="rm-back" aria-label="返回韵律列表">‹</button><h1>${esc(p.name)} <span class="rm-title-divider">/</span> ${esc(c.model)}</h1></div><div class="page-header-actions"><button class="btn btn--outline" id="rm-back-secondary">${editing ? '取消' : '返回列表'}</button>${editing ? `${supplemental ? '<button class="btn btn--outline" id="rm-save-draft">保存补录草稿</button>' : ''}<button class="btn btn--primary" id="rm-save">${supplemental ? '提交完整参数' : '保存型号配置'}</button>` : !complete(c) ? `<button class="btn btn--primary" data-rm-edit="${esc(c.id)}">补充参数</button>` : !c.everPublished ? `<button class="btn btn--primary" data-rm-edit="${esc(c.id)}">编辑草稿</button>` : `<button class="btn btn--primary" data-rm-copy="${esc(p.id)}">创建独立 2.0</button>`}</div></header><div class="form-page rm-detail"><section class="rm-card rm-change"><span class="rm-change-label">本次调整 · 型号独立配置</span><div class="rm-detail-header"><div><h2>型号与执行配置</h2><p>本页仅操作 ${esc(c.model)}，其他型号配置保持独立。</p></div>${complete(c) ? tag('完整参数已保存', 'success') : `<span class="rm-pending">${dot}完整参数待补录</span>`}</div><div class="rm-meta-grid">${[['所属韵律', p.name], ['当前型号', c.model], ['配置 ID', c.id], ['动力源方案', c.power.name], ['固定方案版本', c.power.version + (c.power.sample ? ' · 原型示例' : '')], ['发布状态', modelState(c)], ['参数来源', c.origin], ['最近更新', c.time]].map(([name, val]) => `<div class="rm-meta-item"><span>${esc(name)}</span><strong>${esc(val)}</strong></div>`).join('')}</div>${powerDetails(c)}</section>${p.kind === 'legacy' ? `<div class="rm-notice${supplemental ? ' rm-notice--warning' : ''}">${supplemental && c.everPublished ? '仅补录原系统正在使用的原始参数；已知字段已锁定。补录不会发布或替换设备配置。可暂存草稿，完整校验并提交后才清除该型号红点。' : c.everPublished ? '原系统发布状态与本平台参数完整性分别展示。已发布执行内容保持不变，调整参数请创建独立 2.0。' : '此配置尚未发布；完整参数校验通过后，可按型号独立发布。'}</div>` : `<div class="rm-notice">参数随模式组合按当前型号解析，包含模式引用及固定版本、频率、吸力、档位。已发布内容只读；共享模式或动力源后续变化不覆盖本快照。</div>`}${state.error ? `<div class="rm-error" role="alert">${esc(state.error)}</div>` : ''}<section class="rm-card rm-change"><span class="rm-change-label">本次调整 · ${p.kind === 'legacy' ? '完整参数补录' : '模式组合与完整参数'}</span><div class="rm-detail-header"><div><h2>${p.kind === 'legacy' ? '阶段编排与完整执行参数' : '模式组合与解析结果'}</h2><p>${p.kind === 'legacy' ? '高亮字段为当前缺失的参数；空值不代表 0 或默认档位。' : '基于共性编排，最终参数按型号与绑定动力源分别解析。原型数值仅用于交互演示。'}</p></div><strong>总时长 <span id="rm-total">${time(seconds(d.stages))}</span></strong></div><div class="rm-stage-stack">${d.stages.map((item, index) => p.kind === 'legacy' ? legacyStage(item, index, editing, c) : newStage(item, index, editing)).join('') || '<div class="rm-empty">尚未配置阶段，请添加。</div>'}</div>${editing && !c.everPublished ? `<div class="rm-stage-toolbar"><button class="btn btn--outline" id="rm-add-stage">＋ 添加${p.kind === 'new' ? '模式' : '阶段'}</button>${p.kind === 'new' ? '<span>更换模式后按本型号重新解析参数</span>' : ''}</div>` : ''}${supplemental && c.everPublished ? `<label class="rm-confirm-original"><input type="checkbox" id="rm-original-confirm"${d.originalConfirmed ? ' checked' : ''}><span>我已核对，补录内容与 ${esc(c.model)} 原系统执行参数一致</span></label>` : ''}</section><div class="rm-detail-footer">${editing ? '保存仅影响当前型号；其他型号与既有执行记录不会改变。' : c.everPublished ? '当前执行内容已冻结 · 内容调整另建独立条目' : '当前为未发布型号配置'}</div></div></section>`;
  }
  function modalView() {
    const m = state.modal; if (!m) return '';
    const p = parent(m.parentId), immutable = p && parentConfigs(p.id).some(c => c.everPublished);
    let title = '', body = '', submit = '';
    if (m.type === 'base' || m.type === 'create') {
      title = m.type === 'create' ? `新增${label(kind)}` : `${immutable ? '查看' : '编辑'}韵律基础信息`;
      const disabled = immutable ? ' disabled' : '';
      const template = kind === 'new' ? `<div class="rm-field rm-field--wide"><span>共性模式编排 *</span><div class="rm-stage-stack">${(m.template || []).map((s, i) => `<div class="rm-stage-card"><div class="rm-stage-fields">${field(`第 ${i + 1} 段模式`, `<select class="control" data-rm-template="${i}" data-rm-key="mode"${disabled}>${option(['刺激', '吸乳', '休息'], s.mode)}</select>`)}${field('执行时长（秒）', `<input class="control" type="number" min="1" max="7200" step="1" data-rm-template="${i}" data-rm-key="duration" value="${esc(s.duration)}"${disabled}>`)}${immutable ? '' : `<button class="rm-link rm-danger" data-rm-remove-template="${i}">删除</button>`}</div></div>`).join('')}</div>${immutable ? '' : '<button class="btn btn--outline" id="rm-add-template">＋ 添加模式</button>'}<small>只定义共性模式顺序和时长；频率、吸力等完整参数在关联型号后解析。</small></div>` : field('编排概览 *', `<textarea class="control" id="rm-base-outline" rows="3" maxlength="300"${disabled}>${esc(m.outline || '')}</textarea>`, false, true);
      body = `<p class="rm-modal-description">先维护韵律名称与共性编排，再关联型号，分别维护完整执行参数。</p><div class="rm-form-grid">${field('韵律名称 *', `<input class="control" id="rm-base-name" maxlength="60" value="${esc(m.name || '')}"${disabled}>`, false, true)}${field('内容说明 *', `<textarea class="control" id="rm-base-description" rows="3" maxlength="300"${disabled}>${esc(m.description || '')}</textarea>`, false, true)}${template}</div>${immutable ? '<p class="rm-notice">该韵律已有已发布型号，基础内容保持稳定；如需调整请创建独立 2.0。</p>' : ''}`;
      submit = immutable ? '' : '<button class="btn btn--primary" id="rm-modal-submit">保存韵律</button>';
    } else if (m.type === 'associate') {
      title = `${p.name} · 关联型号`;
      const current = parentConfigs(p.id).map(c => c.model), options = (p.kind === 'legacy' ? oldModels : newModels).filter(model => !current.includes(model));
      body = `<p class="rm-modal-description">每个型号创建独立配置，动力源按型号带出并固定版本。</p>${field('选择型号 *', `<select class="control" id="rm-associate-model">${option(options, m.model, options.length ? '请选择型号' : '可选型号均已关联')}</select>`, false, true)}<div class="rm-notice" id="rm-source-preview">选择型号后查看动力源关联。</div>${p.kind === 'legacy' ? '<p>历史参数尚未录入时可先保存型号关联，红点保留；后续再补充完整参数。</p>' : '<p>新型号将按韵律编排生成模式组合参数草稿，核验完整参数及动力源状态后独立发布。</p>'}`;
      submit = `<button class="btn btn--primary" id="rm-modal-submit"${options.length ? '' : ' disabled'}>保存型号关联</button>`;
    } else if (m.type === 'copy') {
      title = `${p.name} · 创建独立条目`;
      body = `<p class="rm-modal-description">复制基础内容和型号参数形成独立草稿；不会修改、停用或替换原条目。</p>${field('新韵律名称 *', `<input class="control" id="rm-copy-name" maxlength="60" value="${esc(m.name)}">`, false, true)}<p class="rm-notice">复制后可调整新条目的编排与各型号执行参数，逐型号校验、发布。未补录参数继续保留红点。</p>`;
      submit = '<button class="btn btn--primary" id="rm-modal-submit">创建独立草稿</button>';
    }
    return `<div class="rm-modal-backdrop"><section class="rm-modal rm-change" role="dialog" aria-modal="true" aria-labelledby="rm-modal-title"><header class="rm-modal-header"><h2 id="rm-modal-title">${esc(title)}</h2><button class="dialog-close" id="rm-modal-close" aria-label="关闭">×</button></header><div class="rm-modal-body">${body}${m.error ? `<div class="rm-error" role="alert">${esc(m.error)}</div>` : ''}</div><footer class="rm-modal-footer"><button class="btn btn--outline" id="rm-modal-cancel">${immutable && m.type === 'base' ? '关闭' : '取消'}</button>${submit}</footer></section></div>`;
  }
  function render(value) { kind = value === 'new' ? 'new' : 'legacy'; if (!db) configure({}); return (state.view === 'list' ? listView() : detailView()) + modalView(); }
  function saveDraft() {
    const c = selected(); if (!c || !state.draft || parent(c.parentId)?.kind !== 'legacy' || complete(c)) return;
    const next = clone(db), row = next.configs.find(item => item.id === c.id);
    row.supplementDraft = clone(state.draft); row.time = now();
    if (!commit(next)) return;
    state.original = JSON.stringify(state.draft); host.showToast('补录草稿已暂存，原参数记录与红点保持不变。');
  }
  function validate(item, itemKind) {
    if (!item.stages?.length) return '请至少添加一个阶段。';
    const total = seconds(item.stages); if (!total || total > 7200) return '总时长必须大于 0 且不超过 120 分钟。';
    const index = item.stages.findIndex(s => !validStage(s, itemKind));
    if (index >= 0) return `第 ${index + 1} 阶段的完整参数尚未填写或格式不正确，请检查模式、正整数秒数、频率及 1～20 的整数档位。`;
    return '';
  }
  function saveConfig() {
    const c = selected(), p = currentParent(), d = state.draft; if (!c || !p || !d) return;
    state.error = validate(d, p.kind);
    if (!state.error && c.everPublished && !complete(c) && !d.originalConfirmed) state.error = '请先确认补录参数与原系统执行参数一致；未核对时可保存补录草稿。';
    if (!state.error && c.everPublished) {
      if (d.stages.length !== c.baselineStages.length || c.baselineStages.some((s, i) => Object.entries(s).some(([key, value]) => value && String(d.stages[i]?.[key]) !== String(value)))) state.error = '已知原参数不能修改；调整执行内容请创建独立条目。';
    }
    if (state.error) { host.render(); document.querySelector('.rm-error')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    const next = clone(db), row = next.configs.find(item => item.id === c.id);
    row.stages = clone(d.stages); row.time = now(); row.updater = '刘媛媛'; delete row.supplementDraft;
    if (c.everPublished) { row.baselineStages = clone(row.stages); row.origin = 'AIoT 原参数补录 · 已核对'; }
    if (!commit(next)) return;
    state.view = 'detail'; state.draft = clone(row); state.original = JSON.stringify(state.draft); state.error = '';
    host.render(); host.showToast(c.everPublished ? '完整参数已补录，该型号红点已清除；未发布或替换设备配置。' : '型号配置草稿已保存。');
  }
  function publish(id) {
    const c = config(id), p = parent(c?.parentId); if (!c || !p || c.everPublished || !complete(c)) { host.showToast('请先补齐并保存完整参数。'); return; }
    if (p.kind === 'new' && !sourceIsReady(c)) { host.showToast('绑定动力源方案尚未发布或仅为示例，暂不可发布韵律。'); return; }
    host.showDialog(`确认演示发布 ${p.name} 的 ${c.model} 型号配置？本次仅更新本地原型状态，不向真实设备下发。固定模式示例仅用于交互演示；其他型号和原条目保持不变。`, () => {
      const next = clone(db), row = next.configs.find(item => item.id === id);
      row.status = '发布'; row.everPublished = true; row.baselineStages = clone(row.stages); row.time = now(); row.publishedAt = row.time;
      if (commit(next)) { host.render(); host.showToast(`${c.model} 型号配置已发布，执行内容已冻结。`); }
    }, '取消', '确认发布');
  }
  function disable(id) {
    const c = config(id), p = parent(c?.parentId); if (!c || c.status !== '发布') return;
    host.showDialog(`确认停用 ${p.name} 的 ${c.model} 型号配置？仅该型号停止提供，不影响其他型号；已发布参数仍保持只读。`, () => {
      const next = clone(db), row = next.configs.find(item => item.id === id); row.status = '停用'; row.time = now();
      if (commit(next)) { host.render(); host.showToast(`已停用 ${c.model}，其他型号未受影响。`); }
    }, '取消', '确认停用');
  }
  function openModal(value) { state.modal = value; host.render(); document.querySelector('.rm-modal input, .rm-modal select, #rm-modal-close')?.focus(); }
  function submitModal() {
    const m = state.modal; if (!m) return;
    const next = clone(db); let focusParent = '';
    if (m.type === 'create' || m.type === 'base') {
      m.name = document.querySelector('#rm-base-name').value.trim(); m.description = document.querySelector('#rm-base-description').value.trim();
      if (kind === 'new') {
        if (!m.template?.length || m.template.some(s => !s.mode || !Number.isInteger(Number(s.duration)) || Number(s.duration) < 1) || seconds(m.template) > 7200) { m.error = '请维护至少一个模式，各段为正整数秒，总时长不超过 120 分钟。'; host.render(); return; }
        m.outline = m.template.map(s => `${s.mode} ${time(s.duration)}`).join(' → ');
      } else m.outline = document.querySelector('#rm-base-outline').value.trim();
      if (!m.name || !m.description || !m.outline) { m.error = '请完整填写韵律名称、内容说明和编排概览。'; host.render(); return; }
      if (db.parents.some(p => p.kind === kind && p.id !== m.parentId && p.name === m.name)) { m.error = '同类韵律名称已存在，请使用可区分的名称。'; host.render(); return; }
      if (m.type === 'base') {
        if (parentConfigs(m.parentId).some(c => c.everPublished)) return;
        Object.assign(next.parents.find(p => p.id === m.parentId), { name: m.name, description: m.description, outline: m.outline, template: clone(m.template || []), time: now() }); focusParent = m.parentId;
      } else { focusParent = uid('rhythm'); next.parents.unshift({ id: focusParent, kind, name: m.name, description: m.description, outline: m.outline, template: clone(m.template || []), tag: '官方', time: now() }); }
    } else if (m.type === 'associate') {
      const model = document.querySelector('#rm-associate-model').value;
      if (!model || parentConfigs(m.parentId).some(c => c.model === model)) { m.error = '请选择尚未关联的型号。'; host.render(); return; }
      const p = parent(m.parentId), existing = parentConfigs(p.id)[0];
      const template = p.kind === 'new' ? clone(p.template || []) : existing ? existing.stages.map(s => stage(s.mode, s.duration)) : [];
      const stages = p.kind === 'new' ? resolvedStages(model, template) : template;
      next.configs.push({ id: uid('config'), parentId: p.id, model, power: powerFor(model), stages, status: '草稿', everPublished: false, baselineStages: null, origin: p.kind === 'new' ? '原型模式示例目录 · 完整参数快照' : '新关联型号 · 完整参数待补录', time: now(), updater: '刘媛媛' }); focusParent = p.id;
    } else if (m.type === 'copy') {
      m.name = document.querySelector('#rm-copy-name').value.trim();
      if (!m.name || db.parents.some(p => p.kind === kind && p.name === m.name)) { m.error = '请输入与现有条目不同的新韵律名称。'; host.render(); return; }
      const original = parent(m.parentId); focusParent = uid('rhythm');
      next.parents.unshift({ ...clone(original), id: focusParent, name: m.name, clonedFrom: original.id, time: now() });
      for (const c of parentConfigs(original.id)) {
        const row = { ...clone(c), id: uid('config'), parentId: focusParent, status: '草稿', everPublished: false, baselineStages: null, origin: `复制自 ${original.name} · 独立草稿`, time: now() };
        delete row.supplementDraft; delete row.publishedAt; next.configs.push(row);
      }
    }
    if (!commit(next)) return;
    state.modal = null; state.view = 'list'; state.draft = null; state.original = ''; state.expanded.add(focusParent); host.render(); host.showToast(m.type === 'copy' ? '独立草稿已创建，原条目保持不变。' : m.type === 'associate' ? '型号已关联，请核验该型号完整参数。' : '韵律基础信息已保存。');
  }
  function bind(value) {
    host = { ...host, ...value };
    const on = (selector, event, action) => document.querySelectorAll(selector).forEach(el => el.addEventListener(event, action));
    on('#rm-search', 'keydown', event => { if (event.key === 'Enter') { state.query = event.target.value; host.render(); } });
    for (const [selector, key] of [['#rm-model-filter', 'model'], ['#rm-complete-filter', 'completeness'], ['#rm-status-filter', 'status']]) on(selector, 'change', e => { state[key] = e.target.value; host.render(); });
    on('#rm-reset', 'click', () => { state.query = ''; state.model = ''; state.status = ''; state.completeness = ''; host.render(); });
    on('[data-rm-toggle]', 'click', e => { const id = e.currentTarget.dataset.rmToggle; state.expanded.has(id) ? state.expanded.delete(id) : state.expanded.add(id); host.render(); });
    on('[data-rm-view]', 'click', e => openDetail(e.currentTarget.dataset.rmView));
    on('[data-rm-edit]', 'click', e => openDetail(e.currentTarget.dataset.rmEdit, true));
    on('[data-rm-publish]', 'click', e => publish(e.currentTarget.dataset.rmPublish));
    on('[data-rm-disable]', 'click', e => disable(e.currentTarget.dataset.rmDisable));
    on('#rm-create', 'click', () => openModal({ type: 'create', name: '', description: '', outline: '', template: [] }));
    on('[data-rm-base]', 'click', e => { const p = parent(e.currentTarget.dataset.rmBase); openModal({ type: 'base', parentId: p.id, name: p.name, description: p.description, outline: p.outline, template: clone(p.template || parentConfigs(p.id)[0]?.stages.map(s => stage(s.mode, s.duration)) || []) }); });
    on('[data-rm-associate]', 'click', e => openModal({ type: 'associate', parentId: e.currentTarget.dataset.rmAssociate, model: '' }));
    on('[data-rm-copy]', 'click', e => { const p = parent(e.currentTarget.dataset.rmCopy); openModal({ type: 'copy', parentId: p.id, name: /2\.0$/.test(p.name) ? p.name.replace(/2\.0$/, '3.0') : `${p.name} 2.0` }); });
    on('#rm-modal-close, #rm-modal-cancel', 'click', () => { state.modal = null; host.render(); });
    on('.rm-modal-backdrop', 'click', e => { if (e.target.classList.contains('rm-modal-backdrop')) { state.modal = null; host.render(); } });
    on('#rm-modal-submit', 'click', submitModal);
    for (const [id, key] of [['#rm-base-name', 'name'], ['#rm-base-description', 'description'], ['#rm-base-outline', 'outline']]) on(id, 'input', e => { if (state.modal) state.modal[key] = e.currentTarget.value; });
    on('[data-rm-template]', 'input', e => { state.modal.template[Number(e.currentTarget.dataset.rmTemplate)][e.currentTarget.dataset.rmKey] = e.currentTarget.value; });
    on('#rm-add-template', 'click', () => { state.modal.template.push(stage('刺激', 60)); host.render(); });
    on('[data-rm-remove-template]', 'click', e => { state.modal.template.splice(Number(e.currentTarget.dataset.rmRemoveTemplate), 1); host.render(); });
    on('#rm-associate-model', 'change', e => {
      state.modal.model = e.target.value; const p = e.target.value ? powerFor(e.target.value) : null;
      const el = document.querySelector('#rm-source-preview'); if (el) el.textContent = p ? `${p.name} · ${p.version}${p.sample ? '（原型示例关联，非生产适配依据）' : ` · ${p.status}`}` : '选择型号后查看动力源关联。';
    });
    const back = () => confirmExit(() => { state.view = 'list'; state.draft = null; state.original = ''; state.error = ''; host.render(); });
    on('#rm-back, #rm-back-secondary', 'click', back);
    on('#rm-save', 'click', saveConfig); on('#rm-save-draft', 'click', saveDraft);
    on('#rm-original-confirm', 'change', e => { state.draft.originalConfirmed = e.target.checked; });
    on('[data-rm-stage]', 'input', e => {
      const el = e.currentTarget, index = Number(el.dataset.rmStage), key = el.dataset.rmKey;
      state.draft.stages[index][key] = el.value;
      el.closest('.rm-field')?.classList.toggle('rm-missing', !el.value);
      const total = document.querySelector('#rm-total'); if (total) total.textContent = time(seconds(state.draft.stages));
    });
    on('[data-rm-stage][data-rm-key="mode"]', 'change', e => {
      const index = Number(e.currentTarget.dataset.rmStage); state.draft.stages[index].mode = e.currentTarget.value;
      if (currentParent().kind === 'new') state.draft.stages = resolvedStages(selected().model, state.draft.stages);
      host.render();
    });
    on('#rm-add-stage', 'click', () => { state.draft.stages.push(stage('刺激', 60)); if (currentParent().kind === 'new') state.draft.stages = resolvedStages(selected().model, state.draft.stages); host.render(); });
    on('[data-rm-remove-stage]', 'click', e => { state.draft.stages.splice(Number(e.currentTarget.dataset.rmRemoveStage), 1); host.render(); });
  }
  document.addEventListener('keydown', event => {
    if (!state.modal) return;
    if (event.key === 'Escape') { event.preventDefault(); state.modal = null; host.render(); return; }
    if (event.key !== 'Tab') return;
    const elements = [...document.querySelectorAll('.rm-modal button:not(:disabled), .rm-modal input:not(:disabled), .rm-modal select:not(:disabled), .rm-modal textarea:not(:disabled)')];
    if (!elements.length) return;
    const first = elements[0], last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.RhythmManagement = { configure, render, bind, resetView, confirmExit };
})();
