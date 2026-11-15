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
  const dot = '<span class="rm-dot" aria-label="有待完善内容"></span>';
  const label = kind => kind === 'legacy' ? '旧韵律' : '新韵律';
  const tag = (text, tone = 'info') => `<span class="tag tag--${tone}">${esc(text)}</span>`;
  const option = (values, value, placeholder = '') => `${placeholder ? `<option value="">${esc(placeholder)}</option>` : ''}${values.map(item => `<option value="${esc(item)}"${String(item) === String(value) ? ' selected' : ''}>${esc(item)}</option>`).join('')}`;
  const oldModels = ['M5 Ultra', 'M5 Smart', 'M9', 'V3', 'V3 Pro', 'Wellness Warm', 'W1'];
  const newModels = ['Air 2', 'L2'];
  const modeNames = ['刺激', '吸乳', '混合1', '混合2', '休息'];
  const milkBoostTemplate = [{ mode: '刺激', duration: '120' }, { mode: '吸乳', duration: '480' }, { mode: '刺激', duration: '120' }, { mode: '吸乳', duration: '480' }];
  // Explicit prototype mode directory. These snapshots are illustrative, never production mappings.
  const DEMO_MODES = [
    { id: 'DEMO-AIR2-STIM-001', version: 'DEMO-V1', model: 'Air 2', mode: '刺激', sourceId: 102, sourceVersion: 'V1', name: 'Air 2 刺激模式', snapshot: { frequency: '70', suction: '12', gear: '3', pressureTime: '50', intervalTime: '30' } },
    { id: 'DEMO-AIR2-SUCT-001', version: 'DEMO-V1', model: 'Air 2', mode: '吸乳', sourceId: 102, sourceVersion: 'V1', name: 'Air 2 吸乳模式', snapshot: { frequency: '55', suction: '24', gear: '6', pressureTime: '180', intervalTime: '60' } },
    { id: 'DEMO-L2-STIM-001', version: 'DEMO-V1', model: 'L2', mode: '刺激', sourceId: 104, sourceVersion: 'V1', name: 'L2 刺激模式', snapshot: { frequency: '85', suction: '11', gear: '2', pressureTime: '45', intervalTime: '35' } },
    { id: 'DEMO-L2-SUCT-001', version: 'DEMO-V1', model: 'L2', mode: '吸乳', sourceId: 104, sourceVersion: 'V1', name: 'L2 吸乳模式', snapshot: { frequency: '50', suction: '22', gear: '5', pressureTime: '160', intervalTime: '65' } }
  ];
  let catalog = {}, db, kind = 'legacy';
  let host = { render() {}, showToast() {}, showDialog(message, action) { action(); } };
  const state = { expanded: new Set(), perspective: 'rhythm', query: '', model: '', rhythm: '', completeness: '', status: '', view: 'list', configId: '', draft: null, original: '', modal: null, error: '' };
  const parent = id => db.parents.find(item => item.id === id);
  const config = id => db.configs.find(item => item.id === id);
  const versions = item => db.configs.filter(c => c.seriesId === item.seriesId).sort((a, b) => b.versionNumber - a.versionNumber);
  const draftVersion = item => versions(item).find(c => !c.everPublished && c.status === '草稿');
  // Lists count model configurations, never their historical snapshots or pending revisions.
  const currentConfigs = () => db.configs.filter(c => !c.supersededBy && (c.everPublished || !versions(c).some(v => v.everPublished && !v.supersededBy))).sort((a, b) => db.configs.findIndex(c => c.seriesId === a.seriesId) - db.configs.findIndex(c => c.seriesId === b.seriesId));
  const parentConfigs = id => currentConfigs().filter(item => item.parentId === id);
  const versionName = item => `V${item.versionNumber}`;
  const versionState = item => item.supersededBy ? '历史版本' : item.status === '发布' ? '已发布' : item.status;
  const selected = () => config(state.configId);
  const currentParent = () => parent(selected()?.parentId);
  const stage = (mode, duration, frequency = '', gear = '', suction = '', modeRef = '') => ({ mode, duration: String(duration), frequency: String(frequency), gear: String(gear), suction: String(suction), modeRef, modeVersion: 'V1' });
  const schedule = stages => (stages || []).map(s => ({ mode: s.mode, duration: String(s.duration ?? '') }));
  const validSchedule = stages => Array.isArray(stages) && stages.length > 0 && seconds(stages) <= 7200 && stages.every(s => modeNames.includes(s.mode) && Number.isInteger(Number(s.duration)) && Number(s.duration) > 0);
  const scheduleKey = stages => JSON.stringify(schedule(stages));
  function sharedStages(p) {
    if (validSchedule(p.template)) return schedule(p.template);
    const items = parentConfigs(p.id);
    if (!items.length || !items.every(c => validSchedule(c.stages))) return [];
    return items.every(c => scheduleKey(c.stages) === scheduleKey(items[0].stages)) ? schedule(items[0].stages) : [];
  }
  function arrangementText(p) {
    const items = sharedStages(p);
    if (!items.length) return parentConfigs(p.id).some(c => c.stages?.length) ? '编排待确认' : '编排待补充';
    return items.map(stageText).join(' → ');
  }
  const stageText = s => `${s.mode} ${Number(s.duration) % 30 === 0 ? `${Number(s.duration) / 60} 分钟` : time(s.duration).replace(' 分', ' 分钟')}`;
  function arrangementMarkup(p) {
    const items = sharedStages(p);
    return items.length ? items.map((s, i) => `<span class="rm-arrangement-step">${i ? '→ ' : ''}${esc(stageText(s))}</span>`).join(' ') : esc(arrangementText(p));
  }
  function applySchedule(stages, template) {
    const counts = {};
    return template.map(s => {
      const candidates = (stages || []).filter(item => item.mode === s.mode), index = counts[s.mode] || 0;
      counts[s.mode] = index + 1;
      return { ...clone(candidates[index] || candidates[0] || stage(s.mode, s.duration)), mode: s.mode, duration: String(s.duration) };
    });
  }
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
  const emptyPower = () => ({ id: '', name: '', version: '', status: '未关联', sample: false, snapshot: {} });
  const includesModel = (project, model) => String(project || '').split(/[、,，]/).map(s => s.trim()).includes(model);
  function powerChoices(model) {
    return (catalog.powerSources || []).filter(row => row.status === '发布').flatMap(row => (row.versions || [])
      .filter(v => ['发布', '历史版本'].includes(v.status) && includesModel(v.snapshot?.project, model) && v.snapshot?.config && v.snapshot?.pressureRows?.length && v.snapshot?.reliefRows?.length)
      .map(v => ({ id: row.id, name: v.snapshot.name || row.name, version: v.version, status: '发布', sample: false, snapshot: clone(v.snapshot) })));
  }
  const legacyLinked = c => Boolean(c.powerBindingConfirmed && c.power?.id && c.power?.version && !c.power.sample && includesModel(c.power.snapshot?.project, c.model) && c.power.snapshot?.config && c.power.snapshot?.pressureRows?.length && c.power.snapshot?.reliefRows?.length);
  const legacyExecutionStages = c => c.protocolPublishedAt ? clone(c.executionStages || []) : legacyLinked(c) ? resolvedStages(c.model, schedule(c.stages), c.power) : [];
  function publishReady(c) {
    if (!complete(c)) return false;
    if (!c.protocolPublishedAt && !sourceIsReady(c)) return false;
    if (parent(c.parentId)?.kind !== 'legacy') return true;
    const items = legacyExecutionStages(c);
    return validSchedule(items) && items.every(s => s.mode === '休息' || (!s.modeSample && validStage(s, 'new')));
  }
  function validStage(item, itemKind) {
    if (!item.mode || !Number.isInteger(Number(item.duration)) || Number(item.duration) < 1) return false;
    if (item.mode === '休息') return true;
    if (!item.frequency || !item.gear || !Number.isInteger(Number(item.gear)) || Number(item.gear) < 1 || Number(item.gear) > 20) return false;
    return itemKind !== 'new' || Boolean(item.modeRef && item.modeVersion && item.modeSnapshot && Number(item.suction) > 0 && Number(item.frequency) > 0 && Number(item.modeSnapshot.pressureTime) > 0 && Number(item.modeSnapshot.intervalTime) >= 0);
  }
  function complete(item) {
    const p = parent(item.parentId);
    if (p?.kind === 'legacy') return validSchedule(item.stages) && legacyLinked(item);
    return Boolean(item.model && item.power?.name && item.power?.version && item.stages?.length && seconds(item.stages) > 0 && seconds(item.stages) <= 7200 && item.stages.every(s => validStage(s, p?.kind) && (p?.kind !== 'new' || s.mode === '休息' || (String(s.modeSourceId) === String(item.power.id) && s.modeSourceVersion === item.power.version))));
  }
  function resolvedStages(model, template, fixedPower = null) {
    return template.map(item => {
      if (item.mode === '休息') return stage('休息', item.duration);
      const power = fixedPower || powerFor(model);
      // A real published mode may be used only when it explicitly carries this model's complete snapshot.
      const actual = (catalog.modeLibraries || []).find(row => row.status === '发布' && row.source === power.name && row.modelSnapshots?.[model]?.[item.mode]?.powerVersion === power.version);
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
      { id: 'legacy-milk-boost', kind: 'legacy', name: 'Milk Boost', description: '日常泌乳 · 历史官方韵律', outline: '刺激 2 分钟 → 吸乳 8 分钟 → 刺激 2 分钟 → 吸乳 8 分钟', template: clone(milkBoostTemplate), tag: '推荐', time: stamp },
      { id: 'legacy-milk-relief', kind: 'legacy', name: 'Milk Relief', description: '缓解奶涨 · 历史官方韵律', outline: '混合 → 休息 → 吸乳', tag: '场景', time: stamp },
      { id: 'legacy-power-pumping', kind: 'legacy', name: 'Power Pumping', description: '密集追奶 · 历史官方韵律', outline: '刺激、吸乳与休息交替', tag: '推荐', time: stamp },
      { id: 'new-milk-boost', kind: 'new', name: 'Milk Boost', description: '日常泌乳 · 模式组合韵律', outline: '刺激 2 分 → 吸乳 8 分 → 刺激 2 分 → 吸乳 8 分', tag: '推荐', time: stamp },
      { id: 'new-before-bed', kind: 'new', name: 'Before Bed', description: '睡前场景 · 柔和吸乳', outline: '刺激 2 分 → 吸乳 18 分', tag: '场景', time: stamp },
      { id: 'new-quick-relief', kind: 'new', name: 'Quick Relief', description: '日间场景 · 缓解奶涨', outline: '刺激 1 分 → 吸乳 8 分', tag: '推荐', time: stamp },
      { id: 'new-power-pumping', kind: 'new', name: 'Power Pumping', description: '密集追奶 · 分段吸乳与休息', outline: '刺激与吸乳交替，包含休息阶段', tag: '推荐', time: stamp }
    ];
    const configs = [];
    const add = (parentId, model, stages, status, origin, extra = {}) => configs.push({ id: `${parentId}-${model.toLowerCase().replace(/\s/g, '-')}`, parentId, model, stages: clone(stages), baselineStages: status === '发布' ? clone(stages) : null, power: powerFor(model), status, everPublished: status === '发布', origin, time: stamp, updater: '刘媛媛', ...extra });
    add('legacy-milk-boost', 'M5 Ultra', applySchedule([stage('刺激', 120, '低', 3), stage('吸乳', 1080, '中', 7)], milkBoostTemplate), '发布', 'AIoT 历史配置 · 已补录');
    add('legacy-milk-boost', 'V3', [stage('刺激', 120, '中', 1), stage('吸乳', 480, '中', 1), stage('刺激', 120, '中', 1), stage('吸乳', 480, '中', 1)], '发布', 'AIoT 历史配置 · 已补录');
    for (const model of ['Wellness Warm', 'W1', 'M5 Smart']) add('legacy-milk-boost', model, clone(milkBoostTemplate).map(s => stage(s.mode, s.duration)), '发布', 'AIoT 历史导入 · 仅名称及编排');
    add('legacy-milk-relief', 'W1', [stage('混合2', 30), stage('休息', 30), stage('吸乳', 840)], '发布', 'AIoT 历史导入 · 仅名称及编排');
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
        if (!old?.id || !old.model || old.model === 'Air 1' || !Array.isArray(old.stages)) continue;
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
      if ([2, 3].includes(saved?.schema) && Array.isArray(saved.parents) && Array.isArray(saved.configs)) db = saved;
    } catch (_) { /* Fall back to deterministic examples. */ }
    db ||= seed();
    // Upgrade the existing store in place; preserve IDs, parameters and supplementation drafts.
    for (const c of db.configs) {
      c.seriesId ||= c.id;
      c.versionNumber ||= 1;
      c.changeSummary ||= c.everPublished ? '初始已发布配置' : '初始配置草稿';
      if (c.supplementDraft) Object.assign(c.supplementDraft, { seriesId: c.seriesId, versionNumber: c.versionNumber, changeSummary: c.changeSummary });
    }
    db.schema = 3;
    if (!db.migrations?.removedLegacyCopies20261115) {
      // Remove the three obsolete demo copies once, including their model/version records.
      const names = new Set(['Quick Relief 2.0', 'Milk Relief 2.0', 'Milk Boost 2.0']);
      const removed = new Set(db.parents.filter(p => p.kind === 'legacy' && names.has(p.name)).map(p => p.id));
      db.parents = db.parents.filter(p => !removed.has(p.id));
      db.configs = db.configs.filter(c => !removed.has(c.parentId));
      db.migrations = { ...db.migrations, removedLegacyCopies20261115: true };
      try { localStorage.setItem(STORE, JSON.stringify(db)); }
      catch (_) { /* The cleanup stays visible and is retried on the next load. */ }
    }
    const applicable = db.configs.filter(c => c.model !== 'Air 1' || parent(c.parentId)?.kind !== 'legacy');
    if (applicable.length !== db.configs.length || !db.migrations?.removedLegacyAir120261115) {
      // Air 1 is outside the legacy rhythm model range; remove all of its saved revisions.
      db.configs = applicable;
      db.migrations = { ...db.migrations, removedLegacyAir120261115: true };
      try { localStorage.setItem(STORE, JSON.stringify(db)); }
      catch (_) { /* Retry the saved-data cleanup on the next load. */ }
    }
    if (!db.migrations?.sharedRhythmArrangement20261115) {
      for (const p of db.parents) {
        if (p.name === 'Milk Boost') p.template = clone(milkBoostTemplate);
        else if (!validSchedule(p.template)) p.template = sharedStages(p);
        if (validSchedule(p.template)) {
          for (const c of db.configs.filter(item => item.parentId === p.id && !item.supersededBy)) {
            const snapshots = [c.stages, c.baselineStages, c.supplementDraft?.stages, c.supplementDraft?.baselineStages].filter(Boolean);
            if (snapshots.some(items => scheduleKey(items) !== scheduleKey(p.template))) {
              // Keep the former prototype data; published history remains untouched.
              c.previousArrangementSnapshot ||= { stages: clone(c.stages || []), baselineStages: clone(c.baselineStages || null), supplementDraft: clone(c.supplementDraft || null) };
            }
            if (scheduleKey(c.stages) !== scheduleKey(p.template)) {
              c.stages = applySchedule(c.stages, p.template);
            }
            if (c.baselineStages) c.baselineStages = applySchedule(c.baselineStages, p.template);
            if (c.supplementDraft) {
              c.supplementDraft.stages = applySchedule(c.supplementDraft.stages, p.template);
              if (c.supplementDraft.baselineStages) c.supplementDraft.baselineStages = applySchedule(c.supplementDraft.baselineStages, p.template);
            }
          }
        }
        p.outline = arrangementText(p);
      }
      db.migrations = { ...db.migrations, sharedRhythmArrangement20261115: true };
      try { localStorage.setItem(STORE, JSON.stringify(db)); }
      catch (_) { /* Retry on the next load without losing the previous saved data. */ }
    }
    if (!db.migrations?.legacyPowerBinding20261115) {
      for (const c of db.configs.filter(item => parent(item.parentId)?.kind === 'legacy' && !item.supersededBy)) {
        if (!c.powerBindingConfirmed) {
          c.previousPowerReference ||= clone(c.power || emptyPower());
          c.power = emptyPower();
        }
        if (c.supplementDraft) { c.previousStageSupplementDraft = clone(c.supplementDraft); delete c.supplementDraft; }
      }
      db.migrations = { ...db.migrations, legacyPowerBinding20261115: true };
      try { localStorage.setItem(STORE, JSON.stringify(db)); }
      catch (_) { /* Preserve the saved source data and retry on the next load. */ }
    }
  }
  function commit(next) {
    try { localStorage.setItem(STORE, JSON.stringify(next)); db = next; return true; }
    catch (_) { host.showToast('保存失败，未提交本次修改；请检查浏览器存储后重试。'); return false; }
  }
  function resetView() {
    state.view = 'list'; state.configId = ''; state.draft = null; state.original = ''; state.modal = null; state.error = '';
    state.expanded.clear(); state.perspective = 'rhythm';
    state.query = ''; state.model = ''; state.rhythm = ''; state.status = ''; state.completeness = '';
  }
  const dirty = () => state.draft && JSON.stringify(state.draft) !== state.original;
  function confirmExit(action, dialog = host.showDialog) { if (dirty()) dialog('有未保存的修改，确定离开吗？未提交的内容不会保存。', action, '继续编辑', '离开'); else action(); }
  function modelState(item) {
    if (item.supersededBy) return '历史版本';
    if (parent(item.parentId)?.kind === 'legacy' && item.protocolPublishedAt) return item.status === '停用' ? '新协议已停用' : '新协议已发布';
    if (parent(item.parentId)?.kind === 'legacy' && item.everPublished) return item.status === '停用' ? '原系统已停用' : '原系统已发布';
    return item.status === '发布' ? '已发布' : item.status;
  }
  function matchingConfigs(item) {
    return parentConfigs(item.id).filter(c => (!state.model || c.model === state.model) && (!state.status || c.status === state.status || (state.status === '草稿' && draftVersion(c))) && (!state.completeness || (complete(c) ? 'complete' : 'missing') === state.completeness));
  }
  function matchingModelConfigs(model) {
    return currentConfigs().filter(c => parent(c.parentId)?.kind === kind && c.model === model && (!state.rhythm || c.parentId === state.rhythm) && (!state.status || c.status === state.status || (state.status === '草稿' && draftVersion(c))) && (!state.completeness || (complete(c) ? 'complete' : 'missing') === state.completeness));
  }
  function allModelConfigs(model) {
    return currentConfigs().filter(c => parent(c.parentId)?.kind === kind && c.model === model);
  }
  function progress(items) {
    if (!items.length) return '<span class="rm-progress"><strong>—</strong></span>';
    const n = items.filter(complete).length, width = Math.round((n / items.length) * 100);
    return `<span class="rm-progress"><i class="rm-progress-track"><b style="width:${width}%"></b></i><strong>${n} / ${items.length}</strong></span>`;
  }
  function statusSummary(items) {
    if (!items.length) return tag('待关联型号');
    return ['发布', '草稿', '停用'].map(s => { const n = items.filter(c => c.status === s || (s === '草稿' && draftVersion(c) && c.everPublished)).length; return n ? `<span>${tag(s === '发布' ? '已发布' : s, s === '发布' ? 'success' : s === '草稿' ? 'warning' : 'info')} <b>${n}</b></span>` : ''; }).join('');
  }
  function configActions(c) {
    const p = parent(c.parentId), draft = draftVersion(c), legacy = p.kind === 'legacy';
    const edit = legacy ? (!c.protocolPublishedAt ? `<button class="rm-link" data-rm-edit="${esc(c.id)}">${legacyLinked(c) ? '调整动力源' : '关联动力源'}</button>` : '') : !complete(c) ? `<button class="rm-link" data-rm-edit="${esc(c.id)}">补充参数</button>` : !c.everPublished ? `<button class="rm-link" data-rm-edit="${esc(c.id)}">编辑草稿</button>` : '';
    return `<div class="rm-actions"><button class="rm-link" data-rm-view="${esc(c.id)}">查看</button>${edit}${draft && draft.id !== c.id ? `<button class="rm-link" data-rm-edit="${esc(draft.id)}">编辑 ${versionName(draft)} 草稿</button>` : ''}${!c.everPublished && c.status === '草稿' ? `<button class="rm-link" data-rm-publish="${esc(c.id)}"${publishReady(c) ? '' : ' disabled'}>模拟发布</button>` : ''}${c.everPublished ? `<button class="rm-link" data-rm-new-version="${esc(p.id)}" data-rm-version-config="${esc(c.id)}">创建新版本</button>` : ''}${c.status === '发布' ? `<button class="rm-link rm-danger" data-rm-disable="${esc(c.id)}">停用</button>` : ''}</div>${legacy && legacyLinked(c) && !publishReady(c) ? '<small>新协议执行适配待核验</small>' : !legacy && !c.everPublished && !sourceIsReady(c) ? '<small>动力源方案未就绪，暂不可发布</small>' : ''}`;
  }
  function configCells(c) {
    const draft = draftVersion(c), legacy = parent(c.parentId).kind === 'legacy';
    const linked = legacy && legacyLinked(c), power = legacy && !linked ? emptyPower() : c.power;
    return `<td><span class="rm-source-name">${esc(power.name || '未关联')}</span>${power.version ? `<small>${esc(power.version)}${power.sample ? ' · 原型示例' : ''}</small>` : ''}</td><td>${complete(c) ? tag(legacy ? '已关联' : '已完整', 'success') : `<span class="rm-pending">${dot}${legacy ? '待关联动力源' : '待补录'}</span>`}${!legacy && c.supplementDraft ? '<small>有未提交补录草稿</small>' : ''}</td><td>${time(seconds(c.stages))}</td><td>${tag(modelState(c), c.status === '发布' ? 'success' : c.status === '草稿' ? 'warning' : 'info')}<small class="rm-version-caption">韵律 ${versionName(c)}${draft && draft.id !== c.id ? ` · <button class="rm-link" data-rm-view="${esc(draft.id)}">${versionName(draft)} 草稿</button>` : ''}</small></td><td>${configActions(c)}</td>`;
  }
  function childRows(item, items) {
    return `<tr class="rm-expanded-row"><td colspan="6"><section class="rm-model-panel"><div class="rm-expanded-tools"><button class="btn btn--outline" data-rm-associate="${esc(item.id)}">＋ 关联型号</button></div><div class="table-shell"><table class="data-table rm-model-table"><colgroup><col style="width:135px"><col style="width:205px"><col style="width:145px"><col style="width:100px"><col style="width:155px"><col style="width:240px"></colgroup><thead><tr><th>型号</th><th>动力源方案 / 固定版本</th><th>${kind === 'legacy' ? '动力源关联' : '完整参数'}</th><th>执行时长</th><th>发布状态 / 韵律版本</th><th>操作</th></tr></thead><tbody>${items.length ? items.map(c => `<tr><td><strong>${esc(c.model)}</strong></td>${configCells(c)}</tr>`).join('') : '<tr><td colspan="6" class="rm-empty">尚未关联型号，请先添加型号执行配置。</td></tr>'}</tbody></table></div></section></td></tr>`;
  }
  function childRowsByModel(model, items) {
    return `<tr class="rm-expanded-row rm-expanded-row--model"><td colspan="6"><section class="rm-model-panel"><div class="table-shell"><table class="data-table rm-model-table"><colgroup><col style="width:215px"><col style="width:205px"><col style="width:145px"><col style="width:100px"><col style="width:155px"><col style="width:240px"></colgroup><thead><tr><th>韵律名称 / 编排</th><th>动力源方案 / 固定版本</th><th>${kind === 'legacy' ? '动力源关联' : '完整参数'}</th><th>执行时长</th><th>发布状态 / 韵律版本</th><th>操作</th></tr></thead><tbody>${items.length ? items.map(c => { const p = parent(c.parentId); return `<tr><td><strong>${esc(p.name)}</strong><small>${arrangementMarkup(p)}</small></td>${configCells(c)}</tr>`; }).join('') : '<tr><td colspan="6" class="rm-empty">该型号尚未关联韵律。</td></tr>'}</tbody></table></div></section></td></tr>`;
  }
  function listView() {
    const allParents = db.parents.filter(p => p.kind === kind);
    const allConfigs = currentConfigs().filter(c => parent(c.parentId)?.kind === kind);
    const models = [...new Set([...(kind === 'legacy' ? oldModels : newModels), ...allConfigs.map(c => c.model)])];
    const rhythms = allParents.filter(p => parentConfigs(p.id).length);
    const isModel = state.perspective === 'model';
    const search = state.query.trim().toLowerCase();
    const visibleParents = allParents.filter(p => (!search || `${p.name} ${p.description}`.toLowerCase().includes(search)) && (matchingConfigs(p).length || (!parentConfigs(p.id).length && !state.model && !state.status && !state.completeness)));
    const visibleModels = models.filter(model => { const items = allModelConfigs(model); return (!search || `${model} ${items.map(c => c.power.name).join(' ')}`.toLowerCase().includes(search)) && matchingModelConfigs(model).length; });
    const visible = isModel ? visibleModels : visibleParents;
    const count = isModel ? visibleModels.reduce((sum, model) => sum + matchingModelConfigs(model).length, 0) : visibleParents.reduce((sum, p) => sum + matchingConfigs(p).length, 0);
    const rhythmOptions = `<option value="">全部韵律</option>${rhythms.map(p => `<option value="${esc(p.id)}"${state.rhythm === p.id ? ' selected' : ''}>${esc(p.name)}</option>`).join('')}`;
    const modelOptions = option(models, state.model, '全部型号');
    const switcher = `<span class="rm-perspective-label">查看方式</span><div class="rm-perspective-switch" role="group" aria-label="查看方式"><button class="rm-perspective-button${!isModel ? ' is-active' : ''}" data-rm-perspective="rhythm" aria-pressed="${!isModel}">按韵律查看</button><button class="rm-perspective-button${isModel ? ' is-active' : ''}" data-rm-perspective="model" aria-pressed="${isModel}">按型号查看</button></div>`;
    const searchPlaceholder = isModel ? '搜索型号名称，按回车确认' : '搜索韵律名称，按回车确认';
    const primaryHeader = isModel ? `<th>型号 / 动力源</th><th>关联韵律</th><th>${kind === 'legacy' ? '动力源关联度' : '参数完整度'}</th><th>韵律发布概况</th>` : `<th>韵律名称 / 编排</th><th>关联型号</th><th>${kind === 'legacy' ? '动力源关联度' : '参数完整度'}</th><th>型号发布概况</th>`;
    const empty = isModel ? '没有符合条件的型号，请调整筛选条件。' : '没有符合条件的韵律，请调整筛选条件。';
    const rows = isModel ? visibleModels.map(model => {
      const all = allModelConfigs(model), items = matchingModelConfigs(model), pending = !all.length || all.some(c => !complete(c)), expanded = state.expanded.has(`model:${model}`), power = all[0]?.power;
      const related = items.map(c => parent(c.parentId)).filter(Boolean);
      return `<tr class="rm-parent-row${expanded ? ' is-expanded' : ''}"><td><button class="rm-name-button" data-rm-toggle="model:${esc(model)}" aria-expanded="${expanded}"><span class="rm-chevron">${expanded ? '⌄' : '›'}</span><strong>${esc(model)}</strong>${pending ? dot : ''}</button><small class="rm-outline">${kind === 'legacy' ? (all.every(legacyLinked) ? esc(power?.name || '已关联动力源') : '待关联动力源') : `${esc(power?.name || '待绑定动力源')} · ${esc(power?.version || '待核验')}`}</small></td><td><div class="rm-model-tags">${related.map((p, i) => `<button class="rm-model-tag" data-rm-view="${esc(items[i].id)}">${esc(p.name)}${complete(items[i]) ? '' : dot}</button>`).join('') || tag('未关联韵律')}</div>${items.length !== all.length ? `<small>匹配 ${items.length} / 全部 ${all.length} 条韵律</small>` : ''}</td><td>${progress(all)}${pending ? `<small>${all.filter(c => !complete(c)).length} 个${kind === 'legacy' ? '待关联' : '待补录'}</small>` : ''}</td><td><div class="rm-summary">${statusSummary(all)}</div></td><td><span>${esc((all.map(c => c.time).sort().pop() || power?.time || '').slice(0, 16))}</span><small>${esc(all.map(c => c.updater).sort().pop() || '刘媛媛')}</small></td><td><div class="rm-actions"><button class="rm-link" data-rm-toggle="model:${esc(model)}">${expanded ? '收起韵律' : '管理韵律'}</button></div></td></tr>${expanded ? childRowsByModel(model, items) : ''}`;
    }).join('') : visibleParents.map(p => {
      const all = parentConfigs(p.id), items = matchingConfigs(p), pending = !all.length || all.some(c => !complete(c)), expanded = state.expanded.has(p.id);
      return `<tr class="rm-parent-row${expanded ? ' is-expanded' : ''}"><td><button class="rm-name-button" data-rm-toggle="${esc(p.id)}" aria-expanded="${expanded}"><span class="rm-chevron">${expanded ? '⌄' : '›'}</span><strong>${esc(p.name)}</strong>${pending ? dot : ''}</button><small class="rm-outline">${arrangementMarkup(p)}</small></td><td><div class="rm-model-tags">${items.map(c => `<button class="rm-model-tag" data-rm-view="${esc(c.id)}">${esc(c.model)}${complete(c) ? '' : dot}</button>`).join('') || tag('未关联型号')}</div>${items.length !== all.length ? `<small>匹配 ${items.length} / 全部 ${all.length} 个型号</small>` : ''}</td><td>${progress(all)}${pending ? `<small>${all.filter(c => !complete(c)).length} 个${kind === 'legacy' ? '待关联' : '待补录'}</small>` : ''}</td><td><div class="rm-summary">${statusSummary(all)}</div></td><td><span>${esc((all.map(c => c.time).sort().pop() || p.time).slice(0, 16))}</span><small>刘媛媛</small></td><td><div class="rm-actions"><button class="rm-link" data-rm-toggle="${esc(p.id)}">${expanded ? '收起型号' : '管理型号'}</button><button class="rm-link" data-rm-base="${esc(p.id)}">${all.some(c => c.everPublished) ? '查看信息' : '编辑信息'}</button>${all.some(c => c.everPublished) ? `<button class="rm-link" data-rm-new-version="${esc(p.id)}">创建新版本</button>` : ''}</div></td></tr>${expanded ? childRows(p, items) : ''}`;
    }).join('');
    const filterSelect = isModel ? `<select class="control" id="rm-rhythm-filter" aria-label="韵律筛选">${rhythmOptions}</select>` : `<select class="control" id="rm-model-filter" aria-label="型号筛选">${modelOptions}</select>`;
    return `<section class="page-stack rm-page"><header class="page-header-bar"><h1>${label(kind)}库管理</h1><div class="page-header-actions"><button class="btn btn--primary" id="rm-create">新增${label(kind)}</button></div></header><div class="list-page-body"><section class="rm-filter-bar filter-toolbar">${switcher}<input class="control" id="rm-search" type="search" placeholder="${searchPlaceholder}" aria-label="${searchPlaceholder}" value="${esc(state.query)}">${filterSelect}<select class="control" id="rm-complete-filter" aria-label="完整性筛选"><option value="">${kind === 'legacy' ? '全部关联状态' : '全部参数状态'}</option><option value="missing"${state.completeness === 'missing' ? ' selected' : ''}>${kind === 'legacy' ? '待关联动力源' : '待补录'}</option><option value="complete"${state.completeness === 'complete' ? ' selected' : ''}>${kind === 'legacy' ? '已关联动力源' : '已完整'}</option></select><select class="control" id="rm-status-filter" aria-label="发布状态筛选">${option(['发布', '草稿', '停用'], state.status, '全部发布状态')}</select><button class="btn btn--outline" id="rm-reset">重置</button></section><section class="rm-list list-table-card"><div class="table-shell rm-table-shell"><table class="data-table rm-parent-table"><colgroup><col style="width:300px"><col style="width:235px"><col style="width:180px"><col style="width:195px"><col style="width:160px"><col style="width:180px"></colgroup><thead><tr>${primaryHeader}<th>最近更新</th><th>操作</th></tr></thead><tbody>${rows || `<tr><td colspan="6" class="rm-empty">${empty}</td></tr>`}</tbody></table></div><footer class="pagination-bar"><span>匹配 ${visible.length} 条${isModel ? '型号' : '韵律'} · ${count} 份${isModel ? '韵律配置' : '型号配置'}</span><div class="pagination"><button class="page-button is-active" type="button">1</button></div></footer></section></div></section>`;
  }
  function openDetail(id, editing = false) {
    const c = config(id); if (!c) return;
    const p = parent(c.parentId);
    if (editing && (c.supersededBy || (p.kind === 'legacy' ? c.protocolPublishedAt : c.everPublished && complete(c)))) { host.showToast('已发布的完整执行参数只读；如需调整，请创建新版本。'); return; }
    state.view = editing ? 'edit' : 'detail'; state.configId = id;
    state.draft = editing && p.kind !== 'legacy' ? clone(c.supplementDraft || c) : clone(c);
    state.original = JSON.stringify(state.draft); state.error = '';
    kind = p.kind; host.render(); window.scrollTo(0, 0);
  }
  function field(name, content, missing = false, wide = false) { return `<label class="rm-field${missing ? ' rm-missing' : ''}${wide ? ' rm-field--wide' : ''}"><span>${name}</span>${content}</label>`; }
  function lockedStageField(c, index, key) { return (['mode', 'duration'].includes(key) && sharedStages(parent(c.parentId)).length > 0) || (c.everPublished && Boolean(c.baselineStages?.[index]?.[key])); }
  function legacyStage(item, index, editing, c) {
    const disabled = key => !editing || lockedStageField(c, index, key) ? ' disabled' : '';
    const control = (key, html) => `<div class="${!item[key] ? 'rm-missing' : ''}">${html}</div>`;
    return `<div class="rm-stage-card"><div class="rm-stage-heading"><strong>第 ${index + 1} 阶段</strong>${editing && !c.everPublished && !sharedStages(parent(c.parentId)).length ? `<button class="rm-link rm-danger" data-rm-remove-stage="${index}">删除阶段</button>` : ''}</div><div class="rm-stage-fields">${field('吮吸方式', `<select class="control" data-rm-stage="${index}" data-rm-key="mode" aria-label="第${index + 1}阶段吮吸方式"${disabled('mode')}>${option(modeNames, item.mode, '请选择')}</select>`, !item.mode)}${field('时长（秒）', `<input class="control" type="number" min="1" max="7200" step="1" data-rm-stage="${index}" data-rm-key="duration" aria-label="第${index + 1}阶段时长" value="${esc(item.duration)}"${disabled('duration')}>`, !item.duration)}${item.mode === '休息' ? '<div class="rm-field"><span>休息阶段</span><p>仅维护时长，无吸乳参数</p></div>' : `${field('频率', `<select class="control" data-rm-stage="${index}" data-rm-key="frequency" aria-label="第${index + 1}阶段频率"${disabled('frequency')}>${option(['低', '中', '高'], item.frequency, '待补充原频率')}</select>`, !item.frequency)}${field('档位', `<input class="control" type="number" min="1" max="20" step="1" data-rm-stage="${index}" data-rm-key="gear" aria-label="第${index + 1}阶段档位" placeholder="待补充原档位" value="${esc(item.gear)}"${disabled('gear')}>`, !item.gear)}`}</div></div>`;
  }
  function newStage(item, index, editing) {
    const disabled = editing && !sharedStages(currentParent()).length ? '' : ' disabled';
    const controls = [
      field('模式', `<select class="control" data-rm-stage="${index}" data-rm-key="mode" aria-label="第${index + 1}段模式"${disabled}>${option(['刺激', '吸乳', '休息'], item.mode)}</select>`),
      field('执行时长（秒）', `<input class="control" type="number" min="1" max="7200" data-rm-stage="${index}" data-rm-key="duration" value="${esc(item.duration)}" aria-label="第${index + 1}段时长"${disabled}>`)
    ];
    if (item.mode === '休息') controls.push('<div class="rm-field"><span>休息阶段</span><p>不包含动力执行参数</p></div>');
    else {
      controls.push(field('模式 ID / 固定版本', `<div class="rm-fixed-reference"><strong>${esc(item.modeRef || '待解析')}</strong><span>${esc(item.modeVersion || '待核验')}</span></div>`, !item.modeRef));
      for (const [name, value] of [['解析频率（CPM）', item.frequency], ['解析吸力（kPa）', item.suction], ['解析档位', item.gear ? `L${item.gear}` : ''], ['建压时长（ms）', item.modeSnapshot?.pressureTime], ['间歇时长（ms）', item.modeSnapshot?.intervalTime]]) controls.push(field(name, `<input class="control" value="${esc(value || '')}" placeholder="待核验" disabled>`, !value));
    }
    return `<div class="rm-stage-card"><div class="rm-stage-heading"><strong>第 ${index + 1} 段 · ${esc(item.mode)}${item.mode === '休息' ? '' : '模式'}</strong>${editing && !sharedStages(currentParent()).length ? `<button class="rm-link rm-danger" data-rm-remove-stage="${index}">删除模式</button>` : item.modeRef ? '' : '<span class="rm-pending">待核验</span>'}</div><div class="rm-stage-fields">${controls.join('')}</div>${item.mode !== '休息' ? `<p class="rm-stage-source">来源：${esc(item.modeOrigin || '待核验')} · ${esc(item.parameterOrigin || '完整模式快照缺失')}</p>` : ''}</div>`;
  }
  function powerDetails(c) {
    const snap = c.power.snapshot || {}, values = snap.config || {};
    const names = { powerSourceType: '动力源类型', motorType: '电机', pumpType: '泵', valveType: '阀', pulseCount: '脉冲段数', frequencyMin: '频率下限', frequencyMax: '频率上限', holdMin: '建压时长下限', holdMax: '建压时长上限', intervalMin: '间歇下限', intervalMax: '间歇上限' };
    return `<details class="rm-power-details"><summary>查看绑定动力源参数快照</summary>${Object.keys(values).length ? `<div class="rm-meta-grid">${Object.entries(values).filter(([, v]) => v !== '').map(([key, value]) => `<div class="rm-meta-item"><span>${esc(names[key] || key)}</span><strong>${esc(value)}</strong></div>`).join('')}</div>${snap.pressureRows?.length ? `<div class="table-shell"><table class="data-table"><caption>建压映射快照</caption><tbody>${snap.pressureRows.map(row => `<tr>${row.map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}${snap.reliefRows?.length ? `<div class="table-shell"><table class="data-table"><caption>泄压映射快照</caption><tbody>${snap.reliefRows.map(row => `<tr>${row.map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}` : '<p>此型号动力源为原型示例关联；真实参数快照由历史配置对接补齐，不以示例替代正式发布依据。</p>'}</details>`;
  }
  function versionPanel(c, editing) {
    const items = versions(c), draft = draftVersion(c);
    return `<section class="form-card rm-card rm-version-panel"><div class="rm-version-toolbar"><label for="rm-version-select">韵律版本</label><select class="control" id="rm-version-select"${editing ? ' disabled' : ''}>${items.map(v => `<option value="${esc(v.id)}"${v.id === c.id ? ' selected' : ''}>${versionName(v)} · ${versionState(v)}</option>`).join('')}</select>${!editing && draft && draft.id !== c.id ? `<button class="btn btn--outline" data-rm-edit="${esc(draft.id)}">编辑 ${versionName(draft)} 草稿</button>` : ''}${!editing && !c.everPublished ? `<button class="btn btn--primary" data-rm-publish="${esc(c.id)}"${publishReady(c) ? '' : ' disabled'}>发布 ${versionName(c)}</button>` : ''}</div>${editing && !c.everPublished ? field('版本说明 *', `<textarea class="control" id="rm-change-summary" maxlength="1000" rows="2">${esc(state.draft.changeSummary)}</textarea>`, false, true) : `<p class="rm-version-description">${esc(c.changeSummary)}${c.publishedAt ? ` · 发布于 ${esc(c.publishedAt)}` : ''}</p>`}${c.supersededBy ? '<p class="rm-version-description">历史版本只读，执行参数与动力源快照已保留。</p>' : ''}</section>`;
  }
  function legacyDetailView(c, p) {
    const editing = state.view === 'edit', d = state.draft, choices = powerChoices(c.model), linked = legacyLinked(c);
    const sources = [...new Map(choices.map(item => [String(item.id), item])).values()];
    const versionChoices = choices.filter(item => String(item.id) === String(d.power?.id));
    const power = editing ? d.power : linked ? c.power : emptyPower();
    const frozen = Boolean(c.supersededBy || c.protocolPublishedAt);
    const powerForm = editing ? `<div class="rm-form-grid">${field('动力源方案 *', `<select class="control" id="rm-legacy-power"><option value="">${sources.length ? '请选择该型号适用的方案' : '暂无适用的已发布方案'}</option>${sources.map(item => `<option value="${esc(item.id)}"${String(item.id) === String(d.power?.id) ? ' selected' : ''}>${esc(item.name)}</option>`).join('')}</select>`)}${field('固定版本 *', `<select class="control" id="rm-legacy-power-version"${versionChoices.length ? '' : ' disabled'}>${option(versionChoices.map(item => item.version), d.power?.version, '请选择固定版本')}</select>`)}</div>${!sources.length ? '<p class="rm-version-description">请先在动力源方案管理中维护并发布该型号适用的方案。</p><button class="rm-link" id="rm-open-power-sources">前往动力源方案管理</button>' : ''}` : `<div class="rm-meta-grid">${[['动力源方案', power.name || '未关联'], ['固定版本', power.version || '—'], ['新协议适配', !linked ? '待关联动力源' : publishReady(c) ? '执行适配已校验' : '动力源已关联，执行适配待核验']].map(([name, value]) => `<div class="rm-meta-item"><span>${esc(name)}</span><strong>${esc(value)}</strong></div>`).join('')}</div>`;
    return `<section class="page-stack rm-page"><header class="page-header-bar"><div class="page-header-title"><button class="back-button" id="rm-back" aria-label="返回韵律列表">‹</button><h1>${esc(p.name)} <span class="rm-title-divider">/</span> ${esc(c.model)}</h1></div><div class="page-header-actions"><button class="btn btn--outline" id="rm-back-secondary">${editing ? '取消' : '返回列表'}</button>${editing ? `<button class="btn btn--primary" id="rm-save"${choices.length ? '' : ' disabled'}>保存动力源关联</button>` : !frozen ? `<button class="btn btn--primary" data-rm-edit="${esc(c.id)}">${linked ? '调整动力源' : '关联动力源'}</button>` : `<button class="btn btn--primary" data-rm-new-version="${esc(p.id)}" data-rm-version-config="${esc(c.id)}">创建新版本</button>`}</div></header><div class="form-page rm-detail">${versionPanel(c, editing)}<section class="form-card rm-card"><div class="form-card__header rm-detail-header"><h2>动力源适配</h2>${linked ? tag('已关联', 'success') : `<span class="rm-pending">${dot}待关联动力源</span>`}</div>${powerForm}<p class="rm-version-description">编排信息已保留。关联该型号适用的动力源固定版本后，核验新协议的执行适配。</p>${power?.name ? powerDetails({ ...d, power }) : ''}${state.error ? `<div class="rm-error" role="alert">${esc(state.error)}</div>` : ''}</section><section class="form-card rm-card"><div class="form-card__header rm-detail-header"><h2>已有模式编排</h2><strong>总时长 ${time(seconds(c.stages))}</strong></div><p class="rm-shared-arrangement">${arrangementMarkup(c.supersededBy ? { ...p, template: schedule(c.stages) } : p)}</p><div class="rm-meta-grid">${[['所属韵律', p.name], ['当前型号', c.model], ['发布状态', modelState(c)]].map(([name, value]) => `<div class="rm-meta-item"><span>${esc(name)}</span><strong>${esc(value)}</strong></div>`).join('')}</div><details class="rm-power-details"><summary>查看历史设备端档位（只读）</summary><p>历史档位由设备端定义，仅作参考；新协议执行参数需按动力源方案适配。</p><div class="table-shell"><table class="data-table"><thead><tr><th>阶段</th><th>模式</th><th>时长</th><th>历史频率</th><th>设备端档位</th></tr></thead><tbody>${(c.stages || []).map((s, i) => `<tr><td>${i + 1}</td><td>${esc(s.mode)}</td><td>${time(s.duration)}</td><td>${esc(s.frequency || '设备端定义')}</td><td>${esc(s.gear || '设备端定义')}</td></tr>`).join('')}</tbody></table></div></details></section>${editing ? '<p class="rm-detail-footer">本次仅保存动力源关联，编排和历史设备参数保持不变，原系统发布状态保留。</p>' : ''}</div></section>`;
  }
  function saveLegacyPower(c, p, d) {
    if (c.supersededBy || c.protocolPublishedAt) return;
    const choice = powerChoices(c.model).find(item => String(item.id) === String(d.power?.id) && item.version === d.power?.version);
    state.error = !choice ? '请选择当前型号适用的已发布动力源方案及固定版本。' : !validSchedule(c.stages) ? '请先核对已有的模式编排与时长。' : !c.everPublished && !d.changeSummary?.trim() ? '请填写版本说明。' : '';
    if (state.error) { host.render(); return; }
    const next = clone(db), row = next.configs.find(item => item.id === c.id);
    row.power = clone(choice); row.powerBindingConfirmed = true; row.powerLinkedAt = now(); row.time = row.powerLinkedAt; row.updater = '刘媛媛';
    if (!c.everPublished && d.changeSummary?.trim()) row.changeSummary = d.changeSummary.trim();
    if (!commit(next)) return;
    state.view = 'detail'; state.draft = clone(row); state.original = JSON.stringify(state.draft); state.error = '';
    host.render(); host.showToast('动力源关联已保存，已有编排及原系统发布状态保留。');
  }
  function detailView() {
    const c = selected(), p = currentParent(); if (!c || !p) { resetView(); return listView(); }
    if (p.kind === 'legacy') return legacyDetailView(c, p);
    const editing = state.view === 'edit', d = state.draft, supplemental = editing && p.kind === 'legacy' && c.everPublished && !complete(c);
    const editable = !c.supersededBy;
    return `<section class="page-stack rm-page"><header class="page-header-bar"><div class="page-header-title"><button class="back-button" id="rm-back" aria-label="返回韵律列表">‹</button><h1>${esc(p.name)} <span class="rm-title-divider">/</span> ${esc(c.model)}</h1></div><div class="page-header-actions"><button class="btn btn--outline" id="rm-back-secondary">${editing ? '取消' : '返回列表'}</button>${editing ? `${supplemental ? '<button class="btn btn--outline" id="rm-save-draft">保存补录草稿</button>' : ''}<button class="btn btn--primary" id="rm-save">${supplemental ? '提交完整参数' : '保存版本草稿'}</button>` : editable && !complete(c) ? `<button class="btn btn--primary" data-rm-edit="${esc(c.id)}">补充参数</button>` : editable && !c.everPublished ? `<button class="btn btn--primary" data-rm-edit="${esc(c.id)}">编辑草稿</button>` : `<button class="btn btn--primary" data-rm-new-version="${esc(p.id)}" data-rm-version-config="${esc(c.id)}">创建新版本</button>`}</div></header><div class="form-page rm-detail">${versionPanel(c, editing)}<section class="form-card rm-card"><div class="form-card__header rm-detail-header"><div><h2>基础信息</h2></div>${complete(c) ? tag('完整参数已保存', 'success') : `<span class="rm-pending">${dot}完整参数待补录</span>`}</div><div class="rm-meta-grid">${[['所属韵律', p.name], ['当前型号', c.model], ['韵律版本', versionName(c)], ['动力源方案', c.power.name], ['固定方案版本', c.power.version + (c.power.sample ? ' · 原型示例' : '')], ['发布状态', modelState(c)], ['参数来源', c.origin], ['最近更新', c.time]].map(([name, val]) => `<div class="rm-meta-item"><span>${esc(name)}</span><strong>${esc(val)}</strong></div>`).join('')}</div>${powerDetails(c)}</section>${p.kind === 'legacy' ? `<div class="rm-notice${supplemental ? ' rm-notice--warning' : ''}">${supplemental && c.everPublished ? '补录原系统参数，已知字段只读，不改变设备执行内容。可暂存草稿，完整提交后清除红点。' : c.everPublished ? '已发布参数只读；如需调整，请创建新版本。' : '完整参数保存后，可按当前型号独立发布。'}</div>` : c.everPublished ? `<div class="rm-notice">已发布参数只读；模式或动力源变化不覆盖当前快照。如需调整，请创建新版本。</div>` : ''}${state.error ? `<div class="rm-error" role="alert">${esc(state.error)}</div>` : ''}<section class="form-card rm-card"><div class="form-card__header rm-detail-header"><div><h2>${p.kind === 'legacy' ? '阶段编排与完整执行参数' : '模式组合与解析结果'}</h2><p>${p.kind === 'legacy' ? '各型号共用模式顺序与时长，仅补录本型号的执行参数。' : '各型号共用模式顺序与时长，具体执行参数按型号解析。'}</p></div><strong>总时长 <span id="rm-total">${time(seconds(d.stages))}</span></strong></div><div class="rm-stage-stack">${d.stages.map((item, index) => p.kind === 'legacy' ? legacyStage(item, index, editing, c) : newStage(item, index, editing)).join('') || '<div class="rm-empty">尚未配置阶段，请添加。</div>'}</div>${editing && !c.everPublished && !sharedStages(p).length ? `<div class="rm-stage-toolbar"><button class="btn btn--outline" id="rm-add-stage">＋ 添加${p.kind === 'new' ? '模式' : '阶段'}</button>${p.kind === 'new' ? '<span>更换模式后按本型号重新解析参数</span>' : ''}</div>` : ''}${supplemental && c.everPublished ? `<label class="rm-confirm-original"><input type="checkbox" id="rm-original-confirm"${d.originalConfirmed ? ' checked' : ''}><span>我已核对，补录内容与 ${esc(c.model)} 原系统执行参数一致</span></label>` : ''}</section>${editing ? '<p class="rm-detail-footer">仅保存当前型号的版本草稿。</p>' : ''}</div></section>`;
  }
  function modalView() {
    const m = state.modal; if (!m) return '';
    const p = parent(m.parentId), immutable = p && parentConfigs(p.id).some(c => c.everPublished);
    let title = '', body = '', submit = '';
    if (m.type === 'base' || m.type === 'create') {
      title = m.type === 'create' ? `新增${label(kind)}` : `${immutable ? '查看' : '编辑'}韵律基础信息`;
      const disabled = immutable ? ' disabled' : '';
      const template = `<div class="rm-field rm-field--wide"><span>共用模式编排 *</span><div class="rm-stage-stack">${(m.template || []).map((s, i) => `<div class="rm-stage-card"><div class="rm-stage-fields">${field(`第 ${i + 1} 段模式`, `<select class="control" data-rm-template="${i}" data-rm-key="mode"${disabled}>${option(kind === 'legacy' ? modeNames : ['刺激', '吸乳', '休息'], s.mode)}</select>`)}${field('执行时长（秒）', `<input class="control" type="number" min="1" max="7200" step="1" data-rm-template="${i}" data-rm-key="duration" value="${esc(s.duration)}"${disabled}>`)}${immutable ? '' : `<button class="rm-link rm-danger" data-rm-remove-template="${i}">删除</button>`}</div></div>`).join('')}</div>${immutable ? '' : '<button class="btn btn--outline" id="rm-add-template">＋ 添加模式</button>'}<small>各型号共用模式顺序与时长，具体下发参数独立维护。</small></div>`;
      body = `<div class="rm-form-grid">${field('韵律名称 *', `<input class="control" id="rm-base-name" maxlength="60" value="${esc(m.name || '')}"${disabled}>`, false, true)}${field('内容说明 *', `<textarea class="control" id="rm-base-description" rows="3" maxlength="300"${disabled}>${esc(m.description || '')}</textarea>`, false, true)}${template}</div>${immutable ? '<p class="rm-notice">已发布的韵律基础信息只读；型号执行参数可通过“创建新版本”调整。</p>' : ''}`;
      submit = immutable ? '' : '<button class="btn btn--primary" id="rm-modal-submit">保存韵律</button>';
    } else if (m.type === 'associate') {
      title = `${p.name} · 关联型号`;
      const current = parentConfigs(p.id).map(c => c.model), options = (p.kind === 'legacy' ? oldModels : newModels).filter(model => !current.includes(model));
      body = `${field('选择型号 *', `<select class="control" id="rm-associate-model">${option(options, m.model, options.length ? '请选择型号' : '可选型号均已关联')}</select>`, false, true)}<div class="rm-notice" id="rm-source-preview">选择型号后查看动力源关联。</div>${p.kind === 'legacy' ? '<p>沿用已有编排，关联型号后补充该型号的动力源方案。</p>' : '<p>按编排解析参数，核验型号与动力源后发布。</p>'}`;
      submit = `<button class="btn btn--primary" id="rm-modal-submit"${options.length ? '' : ' disabled'}>保存型号关联</button>`;
    } else if (m.type === 'version') {
      const items = parentConfigs(p.id), base = config(m.configId), draft = base && draftVersion(base);
      const number = draft?.versionNumber || (base ? Math.max(...versions(base).map(v => v.versionNumber)) + 1 : '—');
      title = `${p.name} · 创建新版本`;
      body = `<div class="rm-form-grid">${field('目标型号 *', `<select class="control" id="rm-version-model"><option value="">请选择型号</option>${items.map(c => `<option value="${esc(c.id)}"${c.id === m.configId ? ' selected' : ''}>${esc(c.model)} · ${versionName(c)}</option>`).join('')}</select>`)}${field('新版本号', `<input class="control" value="${base ? `V${number}${draft ? ' · 已有草稿' : ''}` : '选择型号后自动生成'}" disabled>`)}${draft ? `<p class="rm-field--wide rm-modal-description">该型号已有 ${versionName(draft)} 草稿，将继续编辑。</p>` : field('版本说明 *', `<textarea class="control" id="rm-version-summary" maxlength="1000" rows="3" placeholder="请说明本次调整内容">${esc(m.changeSummary || '')}</textarea>`, false, true)}</div><p class="rm-modal-hint">版本号按型号自动递增。新草稿沿用该型号的完整配置，已发布版本保留只读。</p>`;
      submit = `<button class="btn btn--primary" id="rm-modal-submit"${base ? '' : ' disabled'}>${draft ? `继续编辑 ${versionName(draft)}` : '创建新版本'}</button>`;
    }
    return `<div class="rm-modal-backdrop"><section class="rm-modal" role="dialog" aria-modal="true" aria-labelledby="rm-modal-title"><header class="rm-modal-header"><h2 id="rm-modal-title">${esc(title)}</h2><button class="dialog-close" id="rm-modal-close" aria-label="关闭">×</button></header><div class="rm-modal-body">${body}${m.error ? `<div class="rm-error" role="alert">${esc(m.error)}</div>` : ''}</div><footer class="rm-modal-footer"><button class="btn btn--outline" id="rm-modal-cancel">${immutable && m.type === 'base' ? '关闭' : '取消'}</button>${submit}</footer></section></div>`;
  }
  function render(value) { kind = value === 'new' ? 'new' : 'legacy'; if (!db) configure({}); return (state.view === 'list' ? listView() : detailView()) + modalView(); }
  function saveDraft() {
    const c = selected(); if (!c || c.supersededBy || !c.everPublished || !state.draft || parent(c.parentId)?.kind !== 'legacy' || complete(c)) return;
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
    if (p.kind === 'legacy') { saveLegacyPower(c, p, d); return; }
    if (c.supersededBy || (c.everPublished && complete(c))) return;
    state.error = validate(d, p.kind);
    if (!state.error && sharedStages(p).length && scheduleKey(d.stages) !== scheduleKey(sharedStages(p))) state.error = '模式顺序与时长由韵律共用编排维护，型号内仅调整执行参数。';
    if (!state.error && !c.everPublished && !d.changeSummary?.trim()) state.error = '请填写版本说明。';
    if (!state.error && c.everPublished && !complete(c) && !d.originalConfirmed) state.error = '请先确认补录参数与原系统执行参数一致；未核对时可保存补录草稿。';
    if (!state.error && c.everPublished) {
      if (d.stages.length !== c.baselineStages.length || c.baselineStages.some((s, i) => Object.entries(s).some(([key, value]) => value && String(d.stages[i]?.[key]) !== String(value)))) state.error = '已知原参数不能修改；如需调整，请创建新版本。';
    }
    if (state.error) { host.render(); document.querySelector('.rm-error')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    const next = clone(db), row = next.configs.find(item => item.id === c.id);
    row.stages = clone(d.stages); row.time = now(); row.updater = '刘媛媛'; delete row.supplementDraft;
    if (!c.everPublished) row.changeSummary = d.changeSummary.trim();
    if (c.everPublished) { row.baselineStages = clone(row.stages); row.origin = 'AIoT 原参数补录 · 已核对'; }
    if (!commit(next)) return;
    state.view = 'detail'; state.draft = clone(row); state.original = JSON.stringify(state.draft); state.error = '';
    host.render(); host.showToast(c.everPublished ? '完整参数已补录，该型号红点已清除；未发布或替换设备配置。' : `${versionName(row)} 版本草稿已保存。`);
  }
  function publish(id) {
    const c = config(id), p = parent(c?.parentId); if (!c || !p || c.everPublished || !complete(c)) { host.showToast('请先补齐并保存完整参数。'); return; }
    if (!publishReady(c)) { host.showToast(p.kind === 'legacy' ? '请先完成动力源关联及新协议执行适配校验；历史设备档位不作为执行参数。' : '绑定动力源方案尚未发布或仅为示例，暂不可发布韵律。'); return; }
    if (sharedStages(p).length && scheduleKey(c.stages) !== scheduleKey(sharedStages(p))) { host.showToast('该草稿与韵律的共用编排不一致，请核对模式顺序与时长后再发布。'); return; }
    if (p.kind === 'new' && !sourceIsReady(c)) { host.showToast('绑定动力源方案尚未发布或仅为示例，暂不可发布韵律。'); return; }
    host.showDialog(`确认演示发布 ${p.name} / ${c.model} 的 ${versionName(c)}？${c.previousId ? '原版本将保留为只读历史。' : ''}本次仅更新本地原型状态，其他型号不受影响。`, () => {
      const next = clone(db), row = next.configs.find(item => item.id === id);
      for (const old of next.configs.filter(item => item.seriesId === row.seriesId && item.everPublished && !item.supersededBy)) old.supersededBy = row.id;
      row.status = '发布'; row.everPublished = true; row.baselineStages = clone(row.stages); row.time = now(); row.publishedAt = row.time;
      if (p.kind === 'legacy') { row.executionStages = legacyExecutionStages(c); row.protocolPublishedAt = row.time; }
      if (commit(next)) { if (state.configId === id) { state.draft = clone(row); state.original = JSON.stringify(state.draft); } host.render(); host.showToast(`${c.model} 的 ${versionName(c)} 已发布，执行内容已冻结。`); }
    }, '取消', '确认发布');
  }
  function disable(id) {
    const c = config(id), p = parent(c?.parentId); if (!c || c.supersededBy || c.status !== '发布') return;
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
      {
        if (!m.template?.length || m.template.some(s => !s.mode || !Number.isInteger(Number(s.duration)) || Number(s.duration) < 1) || seconds(m.template) > 7200) { m.error = '请维护至少一个模式，各段为正整数秒，总时长不超过 120 分钟。'; host.render(); return; }
        m.outline = m.template.map(s => `${s.mode} ${time(s.duration)}`).join(' → ');
      }
      if (!m.name || !m.description || !m.outline) { m.error = '请完整填写韵律名称、内容说明和编排概览。'; host.render(); return; }
      if (db.parents.some(p => p.kind === kind && p.id !== m.parentId && p.name === m.name)) { m.error = '同类韵律名称已存在，请使用可区分的名称。'; host.render(); return; }
      if (m.type === 'base') {
        if (parentConfigs(m.parentId).some(c => c.everPublished)) return;
        Object.assign(next.parents.find(p => p.id === m.parentId), { name: m.name, description: m.description, outline: m.outline, template: clone(m.template || []), time: now() }); focusParent = m.parentId;
        for (const c of next.configs.filter(item => item.parentId === m.parentId)) c.stages = kind === 'new' ? resolvedStages(c.model, m.template) : applySchedule(c.stages, m.template);
      } else { focusParent = uid('rhythm'); next.parents.unshift({ id: focusParent, kind, name: m.name, description: m.description, outline: m.outline, template: clone(m.template || []), tag: '官方', time: now() }); }
    } else if (m.type === 'associate') {
      const model = document.querySelector('#rm-associate-model').value;
      if (!model || parentConfigs(m.parentId).some(c => c.model === model)) { m.error = '请选择尚未关联的型号。'; host.render(); return; }
      const p = parent(m.parentId);
      const template = clone(sharedStages(p));
      if (!validSchedule(template)) { m.error = '请先补充韵律的共用模式编排和时长。'; host.render(); return; }
      const stages = p.kind === 'new' ? resolvedStages(model, template) : template.map(s => stage(s.mode, s.duration));
      const configId = uid('config');
      next.configs.push({ id: configId, seriesId: configId, versionNumber: 1, changeSummary: '初始配置草稿', parentId: p.id, model, power: p.kind === 'legacy' ? emptyPower() : powerFor(model), stages, status: '草稿', everPublished: false, baselineStages: null, origin: p.kind === 'new' ? '原型模式示例目录 · 完整参数快照' : '已有共用编排 · 动力源待关联', time: now(), updater: '刘媛媛' }); focusParent = p.id;
    } else if (m.type === 'version') {
      const base = config(m.configId);
      if (!base || base.parentId !== m.parentId) { m.error = '请选择目标型号。'; host.render(); return; }
      const existing = draftVersion(base);
      if (existing) { state.modal = null; openDetail(existing.id, true); host.showToast(`继续编辑已有 ${versionName(existing)} 草稿。`); return; }
      m.changeSummary = document.querySelector('#rm-version-summary')?.value.trim();
      if (!m.changeSummary) { m.error = '请填写版本说明。'; host.render(); return; }
      const row = { ...clone(base), id: uid('config'), versionNumber: Math.max(...versions(base).map(v => v.versionNumber)) + 1, previousId: base.id, status: '草稿', everPublished: false, baselineStages: null, changeSummary: m.changeSummary, time: now(), updater: '刘媛媛' };
      delete row.supplementDraft; delete row.publishedAt; delete row.protocolPublishedAt; delete row.executionStages; delete row.supersededBy; delete row.originalConfirmed;
      next.configs.push(row);
      if (!commit(next)) return;
      state.modal = null; openDetail(row.id, true); host.showToast(`${base.model} 的 ${versionName(row)} 草稿已创建。`); return;
    }
    if (!commit(next)) return;
    state.modal = null; state.view = 'list'; state.draft = null; state.original = ''; state.expanded.add(focusParent); host.render(); host.showToast(m.type === 'associate' ? '型号已关联，请核验该型号完整参数。' : '韵律基础信息已保存。');
  }
  function bind(value) {
    host = { ...host, ...value };
    const on = (selector, event, action) => document.querySelectorAll(selector).forEach(el => el.addEventListener(event, action));
    on('#rm-search', 'keydown', event => { if (event.key === 'Enter') { state.query = event.target.value; host.render(); } });
    for (const [selector, key] of [['#rm-model-filter', 'model'], ['#rm-rhythm-filter', 'rhythm'], ['#rm-complete-filter', 'completeness'], ['#rm-status-filter', 'status']]) on(selector, 'change', e => { state[key] = e.target.value; host.render(); });
    on('[data-rm-perspective]', 'click', e => { const next = e.currentTarget.dataset.rmPerspective; if (next === state.perspective) return; state.perspective = next; state.expanded.clear(); state.query = ''; state.model = ''; state.rhythm = ''; host.render(); });
    on('#rm-reset', 'click', () => { state.query = ''; state.model = ''; state.rhythm = ''; state.status = ''; state.completeness = ''; host.render(); });
    on('[data-rm-toggle]', 'click', e => { const id = e.currentTarget.dataset.rmToggle; state.expanded.has(id) ? state.expanded.delete(id) : state.expanded.add(id); host.render(); });
    on('[data-rm-view]', 'click', e => openDetail(e.currentTarget.dataset.rmView));
    on('[data-rm-edit]', 'click', e => openDetail(e.currentTarget.dataset.rmEdit, true));
    on('[data-rm-publish]', 'click', e => publish(e.currentTarget.dataset.rmPublish));
    on('[data-rm-disable]', 'click', e => disable(e.currentTarget.dataset.rmDisable));
    on('#rm-create', 'click', () => openModal({ type: 'create', name: '', description: '', outline: '', template: [] }));
    on('[data-rm-base]', 'click', e => { const p = parent(e.currentTarget.dataset.rmBase); openModal({ type: 'base', parentId: p.id, name: p.name, description: p.description, outline: p.outline, template: clone(p.template || parentConfigs(p.id)[0]?.stages.map(s => stage(s.mode, s.duration)) || []) }); });
    on('[data-rm-associate]', 'click', e => openModal({ type: 'associate', parentId: e.currentTarget.dataset.rmAssociate, model: '' }));
    on('[data-rm-new-version]', 'click', e => {
      const id = e.currentTarget.dataset.rmNewVersion, chosen = config(e.currentTarget.dataset.rmVersionConfig);
      confirmExit(() => {
        const items = parentConfigs(id), current = chosen && items.find(c => c.seriesId === chosen.seriesId);
        openModal({ type: 'version', parentId: id, configId: current?.id || (items.length === 1 ? items[0].id : ''), changeSummary: '' });
      });
    });
    on('#rm-version-model', 'change', e => { state.modal.configId = e.currentTarget.value; state.modal.error = ''; host.render(); });
    on('#rm-version-summary', 'input', e => { state.modal.changeSummary = e.currentTarget.value; });
    on('#rm-version-select', 'change', e => openDetail(e.currentTarget.value));
    on('#rm-change-summary', 'input', e => { state.draft.changeSummary = e.currentTarget.value; });
    on('#rm-legacy-power', 'change', e => {
      const choice = powerChoices(selected().model).find(item => String(item.id) === e.currentTarget.value);
      state.draft.power = clone(choice || emptyPower()); state.draft.powerBindingConfirmed = Boolean(choice); state.error = ''; host.render();
    });
    on('#rm-legacy-power-version', 'change', e => {
      const choice = powerChoices(selected().model).find(item => String(item.id) === String(state.draft.power?.id) && item.version === e.currentTarget.value);
      state.draft.power = clone(choice || emptyPower()); state.draft.powerBindingConfirmed = Boolean(choice); state.error = ''; host.render();
    });
    on('#rm-open-power-sources', 'click', () => document.querySelector('[data-section="power-sources"]')?.click());
    on('#rm-modal-close, #rm-modal-cancel', 'click', () => { state.modal = null; host.render(); });
    on('.rm-modal-backdrop', 'click', e => { if (e.target.classList.contains('rm-modal-backdrop')) { state.modal = null; host.render(); } });
    on('#rm-modal-submit', 'click', submitModal);
    for (const [id, key] of [['#rm-base-name', 'name'], ['#rm-base-description', 'description'], ['#rm-base-outline', 'outline']]) on(id, 'input', e => { if (state.modal) state.modal[key] = e.currentTarget.value; });
    on('[data-rm-template]', 'input', e => { state.modal.template[Number(e.currentTarget.dataset.rmTemplate)][e.currentTarget.dataset.rmKey] = e.currentTarget.value; });
    on('#rm-add-template', 'click', () => { state.modal.template.push(stage('刺激', 60)); host.render(); });
    on('[data-rm-remove-template]', 'click', e => { state.modal.template.splice(Number(e.currentTarget.dataset.rmRemoveTemplate), 1); host.render(); });
    on('#rm-associate-model', 'change', e => {
      state.modal.model = e.target.value; const p = e.target.value ? powerFor(e.target.value) : null;
      const el = document.querySelector('#rm-source-preview'); if (el) el.textContent = kind === 'legacy' ? '沿用已有编排，保存型号后关联该型号的动力源方案。' : p ? `${p.name} · ${p.version}${p.sample ? '（原型示例关联，非生产适配依据）' : ` · ${p.status}`}` : '选择型号后查看动力源关联。';
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
