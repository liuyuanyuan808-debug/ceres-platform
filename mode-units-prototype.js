    const rows = [
      { id: 7, name: 'Air2直线电机模式单元库', code: '111', status: '停用', updater: '池浩', time: '2026-08-19 11:04:26', source: 'Air2直线电机', description: 'Air2直线电机模式单元库-阿道夫垃圾地方拉近双方了解了福建建瓯放假哦我绿卡就是的老夫就撒了恐惧拉丁教父glad咯就' },
      { id: 6, name: '818模式单元2', code: '8182', status: '停用', updater: '池浩', time: '2026-08-18 19:03:42', source: 'Air2直线电机', description: '' },
      { id: 5, name: '818模式单元', code: '818', status: '发布', updater: '陈剑泽', time: '2026-08-18 16:29:10', source: 'Air2直线电机', description: '' }
    ];

    const powerSourceRows = [
      { id: 101, name: '818动力源', code: '818', project: 'V3、V3 Pro', status: '发布', updater: '陈剑泽', time: '2026-08-18 16:28:12', description: '' },
      { id: 102, name: 'Air2直线电机', code: '1001', project: 'Air 2', status: '发布', updater: '池浩', time: '2026-08-18 15:37:43', description: '' }
    ];

    const modeLibraryRows = [
      { id: 201, name: 'Air2直线电机模式库', code: '154848', status: '停用', updater: '陈剑泽', time: '2026-08-19 10:40:46', description: '' },
      { id: 202, name: '818模式2', code: '8182', status: '发布', updater: '陈剑泽', time: '2026-08-18 18:33:18', description: '' }
    ];

    const rhythmRows = [
      { id: 301, name: '7', code: '7', tags: '舒缓', duration: '7200', status: '停用', updater: '池浩', time: '2026-08-19 09:59:39', description: '' },
      { id: 302, name: '6', code: '6', tags: '追奶、6、敏感', duration: '60', status: '草稿', updater: '池浩', time: '2026-08-18 22:01:22', description: '' },
      { id: 303, name: '5', code: '5', tags: '追奶', duration: '60', status: '草稿', updater: '池浩', time: '2026-08-18 22:00:29', description: '' },
      { id: 304, name: '2', code: '2', tags: '新手推荐、强劲、高效', duration: '120', status: '草稿', updater: '池浩', time: '2026-08-18 21:59:41', description: '' },
      { id: 305, name: '4', code: '4', tags: '快速', duration: '60', status: '草稿', updater: '池浩', time: '2026-08-18 21:59:18', description: '' },
      { id: 306, name: '3', code: '3', tags: '强劲', duration: '60', status: '草稿', updater: '池浩', time: '2026-08-18 21:57:59', description: '' },
      { id: 307, name: '1', code: '1', tags: '舒缓', duration: '60', status: '草稿', updater: '池浩', time: '2026-08-18 21:56:26', description: '' },
      { id: 308, name: 'Air2韵律库', code: '4341', tags: '强劲、静音、敏感', duration: '905', status: '停用', updater: '池浩', time: '2026-08-18 19:03:28', description: '' }
    ];

    const sections = {
      'power-sources': {
        label: '动力源方案管理', title: '动力源列表管理', addLabel: '新增动力源', formTitle: '项目动力源配置', extraLabel: '关联项目', extraKey: 'project', rows: powerSourceRows,
        options: ['M5 Smart', 'M9', 'M10', 'Air 1', 'M8', 'V3', 'V3 Pro', 'M10 Lite', 'Air 2'],
        columns: [['name', '名称'], ['code', '编码'], ['project', '关联项目'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间']]
      },
      'mode-units': {
        label: '模式单元库', title: '模式单元列表管理', addLabel: '新增模式单元', formTitle: '模式单元配置', extraLabel: '关联动力源', extraKey: 'source', rows,
        options: ['Air2直线电机', '818动力源'],
        columns: [['name', '名称'], ['code', '编码'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间']]
      },
      'mode-libraries': {
        label: '模式库', title: '模式库列表管理', addLabel: '新增模式库', formTitle: '模式库配置', extraLabel: '关联动力源', extraKey: 'source', rows: modeLibraryRows,
        options: ['Air2直线电机', '818动力源'],
        columns: [['name', '名称'], ['code', '编码'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间']]
      },
      'rhythm-libraries': {
        label: '韵律库', title: '韵律库列表管理', addLabel: '新增韵律库', formTitle: '韵律库配置', extraLabel: '关联动力源', extraKey: 'source', rows: rhythmRows,
        options: ['Air2直线电机', '818动力源'],
        columns: [['name', '名称'], ['code', '编码'], ['tags', '标签'], ['duration', '总时长'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间']]
      }
    };

    const initialSection = sections[window.location.hash.slice(1)] ? window.location.hash.slice(1) : 'mode-units';
    const state = { view: 'list', section: initialSection, collapsed: false, menuExpanded: true, query: '', status: 'all', selected: null, ruleStep: 1, resultSpeedTab: 1, generated: false, form: {}, modal: null, modeUnits: [], rhythmModes: [], powerImports: { pressure: '', relief: '' } };
    const app = document.querySelector('#app');
    const overlay = document.querySelector('#overlay');
    const dialogMessage = document.querySelector('#dialog-message');
    const toast = document.querySelector('#toast');
    let pendingAction = null;

    const chevron = direction => `<svg viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="${direction === 'left' ? 'M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0' : 'M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512 340.864 831.872a30.59 30.59 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z'}"></path></svg>`;

    function sidebar() {
      const navItems = Object.entries(sections).map(([key, section]) =>
        `<a class="sidebar-menu__child${state.section === key ? ' is-active' : ''}" href="#${key}" data-section="${key}"><span class="sidebar-menu__icon sidebar-menu__icon--child"></span><span class="sidebar-menu__label">${section.label}</span></a>`
      ).join('');
      return `<aside class="sidebar">
        <div class="brand-row">
          <div class="brand-logo" aria-hidden="true">C</div>
          <div class="brand"><strong>吸奶器管理系统</strong></div>
          <button class="icon-button" id="sidebar-toggle" type="button" aria-label="${state.collapsed ? '展开菜单' : '收起菜单'}">
            <svg class="hamburger" viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4-3.6 8-8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1 298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path></svg>
          </button>
        </div>
        <nav class="sidebar-menu" aria-label="主导航">
          <button class="sidebar-menu__parent is-active" id="menu-parent" type="button" aria-expanded="${state.menuExpanded}"><span class="sidebar-menu__icon"></span><span class="sidebar-menu__label">吸乳方案配置</span></button>
          <div class="sidebar-menu__children${state.menuExpanded ? '' : ' is-hidden'}">${navItems}</div>
        </nav>
        <div class="user-footer"><div class="user-card">
          <img class="avatar-image" src="./assets/ceres-avatar.png" alt="">
          <div class="user-card__info"><span>当前登录</span><strong>刘媛媛</strong></div>
          <button class="icon-button logout-button" type="button" title="退出登录" aria-label="退出登录"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
        </div></div>
      </aside>`;
    }

    function statusTag(status, small = true) {
      const type = status === '发布' ? 'success' : status === '草稿' ? 'warning' : 'info';
      return `<span class="tag tag--${type}${small ? ' tag--small' : ''}">${status}</span>`;
    }

    function listView() {
      const section = sections[state.section];
      const activeRows = section.rows;
      const visible = activeRows.filter(row => {
        const matchesQuery = !state.query || row.name.toLowerCase().includes(state.query.toLowerCase()) || row.code.toLowerCase().includes(state.query.toLowerCase());
        const matchesStatus = state.status === 'all' || row.status === state.status;
        return matchesQuery && matchesStatus;
      });
      const counts = activeRows.reduce((acc, row) => (acc[row.status]++, acc), { 发布: 0, 草稿: 0, 停用: 0 });
      const tableRows = visible.length ? visible.map(row => `<tr data-id="${row.id}">
        ${section.columns.map(([key]) => `<td>${key === 'status' ? statusTag(row.status) : `<span class="cell-text">${row[key] || ''}</span>`}</td>`).join('')}
        <td class="actions"><button data-action="view">查看</button>${row.status !== '发布' ? '<button data-action="edit">编辑</button><button data-action="publish">发布</button><button class="danger" data-action="delete">删除</button>' : '<button data-action="disable">停用</button>'}</td>
      </tr>`).join('') : `<tr class="empty-row"><td colspan="${section.columns.length + 1}">暂无数据</td></tr>`;
      const tableMinWidth = Math.max(830, section.columns.length * 128 + 190);
      return `<section class="page-stack">
        <header class="page-header-bar"><h1>${section.title}</h1><div class="page-header-actions"><button class="btn btn--primary" id="add-unit">${section.addLabel}</button></div></header>
        <div class="list-page-body">
          <section class="filter-toolbar">
            <input class="control" id="search" maxlength="50" placeholder="请输入名称或编码，回车键确认搜索" value="${state.query}">
            <div class="select-wrap"><select class="control" id="status-filter"><option value="all">全部状态</option><option value="草稿">草稿</option><option value="发布">发布</option><option value="停用">停用</option></select><svg class="select-caret" viewBox="0 0 1024 1024"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"></path></svg></div>
            <button class="btn btn--outline" id="reset">重置</button>
            <div class="filter-toolbar__counts"><span class="tag tag--success">发布 ${counts.发布}</span><span class="tag tag--warning">草稿 ${counts.草稿}</span><span class="tag tag--info">停用 ${counts.停用}</span></div>
          </section>
          <section class="list-table-card"><div class="table-panel"><div class="table-shell"><div class="data-table-scroll-region">
            <table class="data-table" style="min-width:${tableMinWidth}px"><colgroup>${section.columns.map(() => '<col style="width:128px">').join('')}<col style="width:190px"></colgroup><thead><tr>${section.columns.map(([, label]) => `<th>${label}</th>`).join('')}<th>操作</th></tr></thead><tbody>${tableRows}</tbody></table>
          </div></div></div><footer class="pagination-bar"><span>共 ${visible.length} 条记录 · 每页 10 条</span><div class="pagination"><button class="page-button" disabled>${chevron('left')}</button><button class="page-button is-active">1</button><button class="page-button" disabled>${chevron('right')}</button></div></footer></section>
        </div>
      </section>`;
    }

    function textField(label, key, value = '', wide = false, textarea = false, disabled = false, type = 'text') {
      const control = textarea ? `<textarea class="control" data-field="${key}" placeholder="请输入" ${disabled ? 'disabled' : ''}>${value}</textarea>` : `<input class="control" data-field="${key}" type="${type}" placeholder="请输入" value="${value}" ${disabled ? 'disabled' : ''}>`;
      return `<label class="form-field${wide ? ' form-field--wide' : ''}"><span>${label}${label !== '描述' ? '<em class="required"> *</em>' : ''}</span>${control}</label>`;
    }

    function optionList(options, selected = '') {
      const values = selected && !options.includes(selected) ? [selected, ...options] : options;
      return `<option value="">请选择</option>${values.map(option => `<option value="${option}"${option === selected ? ' selected' : ''}>${option}</option>`).join('')}`;
    }

    function escapeHtml(value) {
      const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
      return String(value).replace(/[&<>"']/g, character => entities[character]);
    }

    function selectField(label, key, options, selected = '', wide = false, required = true, className = '') {
      return `<label class="form-field${wide ? ' form-field--wide' : ''}${className ? ` ${className}` : ''}"><span>${label}${required ? '<em class="required"> *</em>' : ''}</span><div class="select-wrap"><select class="control" data-field="${key}">${optionList(options, selected)}</select><svg class="select-caret" viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"></path></svg></div></label>`;
    }

    function initializeForm(row = null) {
      const section = sections[state.section];
      const savedConfig = row?.config || {};
      state.form = {
        suction: '', suctionStep: '', gearCount: '', speedStrategy: '不启用 Speed', speedLevels: '', frequencyStrategy: '', fixedFrequency: '', startFrequency: '', frequencyStep: '', minimumFrequency: '',
        durationStrategy: '', pressureTime: '', pressureRatio: '', intervalTime: '',
        project: row?.project || '', motorType: '', pumpType: '', valveType: '', frequencyMin: '', frequencyMax: '', holdMin: '', holdMax: '', intervalMin: '', intervalMax: '',
        modeType: '', source: row?.source || '', tags: row?.tags || '', modalSelection: '', modalAmount: '3',
        ...savedConfig,
        name: row?.name || '', code: row?.code || '', description: row?.description || '', extra: savedConfig.extra || row?.[section.extraKey] || ''
      };
      if (savedConfig.speedEnabled && !savedConfig.speedStrategy) state.form.speedStrategy = '按 Speed 档位配置';
      state.ruleStep = 1;
      state.resultSpeedTab = 1;
      state.generated = Boolean(row?.generated);
      state.modal = null;
      state.modeUnits = [];
      state.rhythmModes = [];
      state.powerImports = { pressure: '', relief: '' };
    }

    function openForm(view, row = null) {
      state.view = view;
      state.selected = row;
      initializeForm(row);
      render();
      window.scrollTo(0, 0);
    }

    function basicForm(row, disabled) {
      const section = sections[state.section];
      return `<section class="form-card"><h2>基础信息配置</h2><div class="form-grid">
        ${textField('名称', 'name', state.form.name, false, false, disabled)}
        ${textField('编码', 'code', state.form.code, false, false, disabled)}
        ${selectField(section.extraLabel, 'extra', section.options, state.form.extra)}
        ${textField('描述', 'description', state.form.description, true, true, disabled)}
      </div></section>`;
    }

    function mappingPanel(type) {
      const isPressure = type === 'pressure';
      const importedFile = state.powerImports[type];
      const imported = Boolean(importedFile);
      const importedName = imported ? escapeHtml(importedFile) : '';
      const title = isPressure ? '导入泵建压映射表' : '导入阀卸压映射表';
      const description = isPressure ? '行是多个吸力值，列是多个时间 ms，中间的值是泵工作的占空比百分比。' : '行表示吸力点，列表示对应卸压时间 ms。';
      const sample = isPressure
        ? `<div class="mapping-table table-shell"><table class="data-table"><thead><tr><th>吸力 kPa</th><th>30 ms</th><th>40 ms</th><th>50 ms</th><th>60 ms</th></tr></thead><tbody><tr><td>10</td><td>42%</td><td>48%</td><td>55%</td><td>62%</td></tr><tr><td>15</td><td>51%</td><td>58%</td><td>64%</td><td>70%</td></tr><tr><td>20</td><td>60%</td><td>67%</td><td>73%</td><td>80%</td></tr></tbody></table></div>`
        : `<div class="mapping-table table-shell"><table class="data-table"><thead><tr><th>吸力 kPa</th><th>卸压时间 ms</th></tr></thead><tbody><tr><td>10</td><td>24</td></tr><tr><td>15</td><td>34</td></tr><tr><td>20</td><td>44</td></tr></tbody></table></div>`;
      return `<section class="form-card mapping-card"><div class="form-card__header"><h2>${title}</h2><div class="card-actions"><button class="btn btn--outline" type="button" data-export="${type}">导出模版</button><button class="btn btn--primary" type="button" data-import="${type}">${imported ? '重新导入' : '导入表格'}</button></div></div><input class="mapping-file-input" type="file" accept=".xlsx,.xls,.csv" data-import-file="${type}" aria-label="${title}"><p class="mapping-description">${description}</p>
        ${imported ? `<div class="mapping-import-status" role="status"><span>导入成功</span><strong title="${importedName}">${importedName}</strong></div>${sample}` : '<div class="mapping-empty">暂无数据，请先导入表格</div>'}
        <div class="mapping-stats"><div class="mapping-stat"><span>吸力范围</span><strong>${imported ? '10-20' : '-'} <em>kPa</em></strong></div><div class="mapping-stat"><span>时间范围</span><strong>${imported ? (isPressure ? '30-60' : '24-44') : '-'} <em>ms</em></strong></div></div>
      </section>`;
    }

    function powerSourceForm(isView) {
      return `${`<section class="form-card"><h2>基础信息配置</h2><div class="form-grid">
        ${textField('动力源名称', 'name', state.form.name, false, false, isView)}
        ${textField('动力源编码', 'code', state.form.code, false, false, isView)}
        ${selectField('关联项目', 'project', sections['power-sources'].options, state.form.project)}
        ${selectField('电机类型', 'motorType', ['直线电机', '无'], state.form.motorType)}
        ${selectField('泵类型', 'pumpType', ['隔膜泵', '压电泵'], state.form.pumpType)}
        ${selectField('阀类型', 'valveType', ['电磁阀'], state.form.valveType)}
        ${textField('描述', 'description', state.form.description, true, true, isView)}
      </div></section>`}${mappingPanel('pressure')}${mappingPanel('relief')}<section class="form-card"><h2>边界配置</h2><div class="boundary-grid">
        <section class="boundary-group"><h3>频率</h3><div class="boundary-fields">${textField('最小值 CPM', 'frequencyMin', state.form.frequencyMin, false, false, isView)}${textField('最大值 CPM', 'frequencyMax', state.form.frequencyMax, false, false, isView)}</div></section>
        <section class="boundary-group"><h3>保压</h3><div class="boundary-fields">${textField('最小值 ms', 'holdMin', state.form.holdMin, false, false, isView)}${textField('最大值 ms', 'holdMax', state.form.holdMax, false, false, isView)}</div></section>
        <section class="boundary-group"><h3>间歇</h3><div class="boundary-fields">${textField('最小值 ms', 'intervalMin', state.form.intervalMin, false, false, isView)}${textField('最大值 ms', 'intervalMax', state.form.intervalMax, false, false, isView)}</div></section>
      </div></section>`;
    }

    function combinationActions(index, total, type) {
      return `<button data-combo-action="up" data-combo-type="${type}" data-index="${index}" ${index === 0 ? 'disabled' : ''}>上移</button><button data-combo-action="down" data-combo-type="${type}" data-index="${index}" ${index === total - 1 ? 'disabled' : ''}>下移</button><button class="danger" data-combo-action="delete" data-combo-type="${type}" data-index="${index}">删除</button>`;
    }

    function modeLibraryPreview() {
      if (!state.modeUnits.length) return '<div class="preview-empty">暂无曲线数据，请先生成配置</div>';
      return `<div class="curve-preview"><svg viewBox="0 0 900 240" role="img" aria-label="吸力曲线图表"><g class="chart-grid"><line x1="55" y1="25" x2="55" y2="205"></line><line x1="55" y1="205" x2="875" y2="205"></line><line x1="55" y1="160" x2="875" y2="160"></line><line x1="55" y1="115" x2="875" y2="115"></line><line x1="55" y1="70" x2="875" y2="70"></line></g><text x="8" y="25">吸力 kPa</text><text x="26" y="208">0</text><text x="20" y="163">10</text><text x="20" y="118">20</text><text x="20" y="73">30</text><polyline points="55,182 145,172 235,160 325,146 415,132 505,118 595,104 685,91 775,78 875,64"></polyline></svg><div class="preview-legend">${state.modeUnits.map(item => `<button type="button">${item.name}*${item.amount}-0</button>`).join('')}</div></div>`;
    }

    function modeLibraryForm(isView) {
      const total = state.modeUnits.length;
      const rowsMarkup = total ? state.modeUnits.map((item, index) => `<tr><td>${index + 1}</td><td>${item.name}</td><td>${item.code}</td><td>${item.min}</td><td>${item.max}</td><td>${item.amount}</td><td>${statusTag('发布')}</td><td class="actions">${combinationActions(index, total, 'mode-unit')}</td></tr>`).join('') : '';
      return `<section class="form-card"><h2>基础信息配置</h2><div class="form-grid">
        ${textField('名称', 'name', state.form.name, false, false, isView)}${textField('编码', 'code', state.form.code, false, false, isView)}
        ${selectField('模式类型', 'modeType', ['激活模式', '吸乳模式', '舒缓模式', '混合模式', '特立独行', '其他', '测试', 'test'], state.form.modeType)}
        ${selectField('关联动力源', 'source', ['Air2直线电机', '818动力源'], state.form.source)}
        ${textField('描述', 'description', state.form.description, true, true, isView)}
      </div></section>
      <section class="form-card"><div class="form-card__header"><h2>模式单元组合配置</h2><button class="btn btn--primary" id="add-combination" type="button">添加模式单元</button></div>${total ? `<div class="table-shell combo-table"><table class="data-table"><colgroup><col style="width:55px"><col style="width:135px"><col style="width:90px"><col style="width:85px"><col style="width:85px"><col style="width:85px"><col style="width:75px"><col style="width:150px"></colgroup><thead><tr><th>顺序</th><th>模式单元名称</th><th>模式编码</th><th>最小吸力</th><th>最大吸力</th><th>循环次数</th><th>状态</th><th>操作</th></tr></thead><tbody>${rowsMarkup}</tbody></table></div>` : '<div class="combo-empty">暂无数据，请先添加模式单元</div>'}</section>
      <section class="form-card"><h2>模式库预览</h2>${modeLibraryPreview()}</section>`;
    }

    function rhythmPreview() {
      const total = state.rhythmModes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
      const minutes = Math.floor(total / 60);
      const seconds = total % 60;
      return `<div class="rhythm-preview"><strong>总执行时长 ${minutes}分${seconds}秒</strong>${total ? `<div class="rhythm-stages">${state.rhythmModes.map(item => `<div style="flex:${Math.max(1, Number(item.amount))}" aria-label="${item.name} · ${item.amount}s">${item.name} · ${item.amount}s</div>`).join('')}</div>` : ''}<p>总执行时长限制 1-7200s（当前 ${total}s）</p></div>`;
    }

    function rhythmLibraryForm(isView) {
      const total = state.rhythmModes.length;
      const rowsMarkup = total ? state.rhythmModes.map((item, index) => `<tr><td>${index + 1}</td><td>${item.name}</td><td>${item.code}</td><td>${item.modeType}</td><td>${item.amount}</td><td>${statusTag('发布')}</td><td class="actions">${combinationActions(index, total, 'rhythm')}</td></tr>`).join('') : '';
      return `<section class="form-card"><h2>基础信息配置</h2><div class="form-grid">
        ${textField('名称', 'name', state.form.name, false, false, isView)}${textField('编码', 'code', state.form.code, false, false, isView)}
        ${selectField('关联动力源', 'source', ['Air2直线电机', '818动力源'], state.form.source)}
        ${selectField('标签', 'tags', ['新手推荐', '舒缓', '强劲', '高效', '夜间', '静音', '快速', '追奶', '敏感用户', '敏感', '6'], state.form.tags)}
        ${textField('描述', 'description', state.form.description, true, true, isView)}
      </div></section>
      <section class="form-card"><div class="form-card__header"><h2>模式组合配置</h2><button class="btn btn--primary" id="add-combination" type="button">添加模式</button></div>${total ? `<div class="table-shell combo-table"><table class="data-table"><colgroup><col style="width:55px"><col style="width:140px"><col style="width:100px"><col style="width:110px"><col style="width:145px"><col style="width:80px"><col style="width:150px"></colgroup><thead><tr><th>顺序</th><th>模式名称</th><th>模式编码</th><th>模式类型</th><th>循环时间（单位：s）</th><th>状态</th><th>操作</th></tr></thead><tbody>${rowsMarkup}</tbody></table></div>` : '<div class="combo-empty">暂无数据，请先添加模式</div>'}</section>
      <section class="form-card"><h2>韵律阶段预览</h2>${rhythmPreview()}</section>`;
    }

    function combinationModal() {
      if (!state.modal) return '';
      const isModeUnit = state.modal === 'mode-unit';
      const options = isModeUnit ? ['818模式单元 / 818', 'Air2直线电机模式单元库 / 111', '818模式单元2 / 8182'] : ['818模式2 / 8182', 'Air2直线电机模式库 / 154848'];
      return `<div class="form-modal-overlay"><section class="form-modal" role="dialog" aria-modal="true" aria-label="${isModeUnit ? '添加模式单元' : '添加模式'}"><header><div><h2>${isModeUnit ? '添加模式单元' : '添加模式'}</h2><p>${isModeUnit ? '选择模式单元并设置本次组合中的循环次数。' : '选择模式库配置并设置循环时间。'}</p></div><button class="dialog-close" id="modal-close" type="button" aria-label="关闭">×</button></header><div class="form-modal__body">
        ${selectField(isModeUnit ? '选择模式单元' : '选择模式', 'modalSelection', options, state.form.modalSelection, true)}
        ${textField(isModeUnit ? '循环次数' : '循环时间（单位：s）', 'modalAmount', state.form.modalAmount, true)}
      </div><footer><button class="btn btn--outline" id="modal-cancel" type="button">取消</button><button class="btn btn--primary" id="modal-confirm" type="button">${isModeUnit ? '确定添加' : '确定'}</button></footer></section></div>`;
    }

    function suctionRange() {
      const start = Number(state.form.suction);
      const step = Number.parseInt(state.form.suctionStep, 10);
      const count = Number(state.form.gearCount);
      const end = start && step && count ? start + step * (count - 1) : 0;
      return { start, count, end };
    }

    function speedIsEnabled() {
      return state.form.speedStrategy === '按 Speed 档位配置';
    }

    function selectedSpeedCount() {
      return speedIsEnabled() ? Number.parseInt(state.form.speedLevels, 10) || 1 : 0;
    }

    function clampSpeedTab(value) {
      return Math.min(Math.max(Number(value) || 1, 1), Math.max(selectedSpeedCount(), 1));
    }

    function frequencyFieldKey(base, speedIndex = 0) {
      return speedIsEnabled() ? `${base}Speed${speedIndex || 1}` : base;
    }

    function speedTabButtons(activeIndex, count) {
      return `<div class="speed-tabs" role="tablist" aria-label="Speed 档位">${Array.from({ length: count }, (_, index) => {
        const speedIndex = index + 1;
        return `<button class="speed-tab${activeIndex === speedIndex ? ' is-active' : ''}" type="button" role="tab" aria-selected="${activeIndex === speedIndex}" data-result-speed-tab="${speedIndex}">Speed ${speedIndex}</button>`;
      }).join('')}</div>`;
    }

    function matrixSelect(key, options, selected, label) {
      return `<div class="select-wrap"><select class="control" data-field="${key}" aria-label="${label}">${optionList(options, selected)}</select><svg class="select-caret" viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"></path></svg></div>`;
    }

    function frequencyConfigText(speedIndex = 0) {
      const prefix = speedIsEnabled() ? `Speed ${speedIndex}：` : '';
      if (state.form.frequencyStrategy === '固定频率') {
        const value = state.form[frequencyFieldKey('fixedFrequency', speedIndex)] || '未填写';
        return `${prefix}固定频率 ${value} CPM`;
      }
      if (state.form.frequencyStrategy === '随吸力递减') {
        const start = state.form[frequencyFieldKey('startFrequency', speedIndex)] || '未选择';
        const step = state.form[frequencyFieldKey('frequencyStep', speedIndex)] || '未选择';
        const minimum = state.form[frequencyFieldKey('minimumFrequency', speedIndex)] || '未选择';
        return `${prefix}随吸力递减，起始 ${start}，步进 ${step}，最低 ${minimum}`;
      }
      return `${prefix}未选择频率策略`;
    }

    function frequencyAt(rowIndex, speedIndex = 0) {
      const offset = Math.max(speedIndex - 1, 0);
      if (state.form.frequencyStrategy === '随吸力递减') {
        const start = Number.parseInt(state.form[frequencyFieldKey('startFrequency', speedIndex)], 10) || 70 + offset * 5;
        const step = Number.parseInt(state.form[frequencyFieldKey('frequencyStep', speedIndex)], 10) || 2;
        const minimum = Number.parseInt(state.form[frequencyFieldKey('minimumFrequency', speedIndex)], 10) || 40 + offset * 5;
        return Math.max(start - rowIndex * step, minimum);
      }
      const fixed = Number.parseInt(state.form[frequencyFieldKey('fixedFrequency', speedIndex)], 10);
      return Number.isFinite(fixed) && fixed > 0 ? fixed : 60 + offset * 5;
    }

    function frequencyMatrix(speedCount, frequencyOptions) {
      if (!state.form.frequencyStrategy) return '';
      const isFixed = state.form.frequencyStrategy === '固定频率';
      const headers = isFixed
        ? ['Speed 档位', '固定频率']
        : ['Speed 档位', '起始频率', '频率步进', '最小频率'];
      const rows = Array.from({ length: speedCount }, (_, index) => {
        const speedIndex = index + 1;
        if (isFixed) {
          const key = frequencyFieldKey('fixedFrequency', speedIndex);
          return `<strong class="speed-frequency-cell speed-frequency-label">Speed ${speedIndex}</strong><div class="speed-frequency-cell"><input class="control" data-field="${key}" type="number" placeholder="请输入" value="${state.form[key] || ''}" aria-label="Speed ${speedIndex} 固定频率"></div>`;
        }
        const startKey = frequencyFieldKey('startFrequency', speedIndex);
        const stepKey = frequencyFieldKey('frequencyStep', speedIndex);
        const minimumKey = frequencyFieldKey('minimumFrequency', speedIndex);
        return `<strong class="speed-frequency-cell speed-frequency-label">Speed ${speedIndex}</strong><div class="speed-frequency-cell">${matrixSelect(startKey, frequencyOptions, state.form[startKey], `Speed ${speedIndex} 起始频率`)}</div><div class="speed-frequency-cell">${matrixSelect(stepKey, ['1 CPM', '2 CPM', '3 CPM', '4 CPM', '5 CPM'], state.form[stepKey], `Speed ${speedIndex} 频率步进`)}</div><div class="speed-frequency-cell">${matrixSelect(minimumKey, frequencyOptions, state.form[minimumKey], `Speed ${speedIndex} 最小频率`)}</div>`;
      }).join('');
      return `<div class="new-feature speed-frequency-matrix"><div class="speed-frequency-grid speed-frequency-grid--${isFixed ? 'fixed' : 'decreasing'}">${headers.map(header => `<strong class="speed-frequency-cell speed-frequency-head">${header}<em class="required"> *</em></strong>`).join('')}${rows}</div></div>`;
    }

    function ruleCard() {
      const suctionOptions = Array.from({ length: 15 }, (_, index) => String(index + 10));
      const suctionSteps = ['1（1倍）', '2（2倍）', '3（3倍）', '4（4倍）', '5（5倍）'];
      const frequencyOptions = ['40 CPM', '45 CPM', '50 CPM', '55 CPM', '60 CPM', '65 CPM', '68 CPM', '70 CPM', '75 CPM', '80 CPM'];
      const pressureTimes = ['30 ms', '40 ms', '50 ms', '60 ms', '70 ms', '80 ms'];
      let fields = '';
      let supplementary = '';
      let action = '';
      if (state.ruleStep === 1) {
        const { start, count, end } = suctionRange();
        const estimate = end ? `${start}-${end} kPa / ${count} 档` : '请选择起始吸力、吸力步进和档位数量';
        fields = `${selectField('起始吸力（kPa）', 'suction', suctionOptions, state.form.suction)}${selectField('吸力步进（kPa）', 'suctionStep', suctionSteps, state.form.suctionStep)}${textField('档位数量', 'gearCount', state.form.gearCount, false, false, false, 'number')}`;
        supplementary = `<div class="estimate"><strong>预计生成吸力列表</strong><span>${estimate}</span></div>`;
        action = '<button class="btn btn--primary step-next" type="button">下一步</button>';
      } else if (state.ruleStep === 2) {
        fields = selectField('Speed 策略', 'speedStrategy', ['不启用 Speed', '按 Speed 档位配置'], state.form.speedStrategy, false, true, 'new-feature');
        if (speedIsEnabled()) fields += selectField('Speed 档位数量', 'speedLevels', ['1档', '2档', '3档', '4档', '5档'], state.form.speedLevels, false, true, 'new-feature');
        action = '<button class="btn btn--primary step-next" type="button">下一步</button>';
      } else if (state.ruleStep === 3) {
        fields = selectField('频率策略', 'frequencyStrategy', ['固定频率', '随吸力递减'], state.form.frequencyStrategy);
        const speedCount = selectedSpeedCount();
        let frequencyFields = '';
        if (!speedCount && state.form.frequencyStrategy === '固定频率') {
          frequencyFields = textField('固定频率（单位：CPM）', 'fixedFrequency', state.form.fixedFrequency, false, false, false, 'number');
        }
        if (!speedCount && state.form.frequencyStrategy === '随吸力递减') {
          frequencyFields = selectField('起始频率', 'startFrequency', frequencyOptions, state.form.startFrequency);
          frequencyFields += selectField('频率步进', 'frequencyStep', ['1 CPM', '2 CPM', '3 CPM', '4 CPM', '5 CPM'], state.form.frequencyStep);
          frequencyFields += selectField('最小频率', 'minimumFrequency', frequencyOptions, state.form.minimumFrequency);
        }
        if (speedCount) supplementary = frequencyMatrix(speedCount, frequencyOptions);
        else fields += frequencyFields;
        action = '<button class="btn btn--primary step-next" type="button">下一步</button>';
      } else {
        fields = selectField('阶段时长策略', 'durationStrategy', ['手动设置', '固定比例', '固定时长'], state.form.durationStrategy);
        if (state.form.durationStrategy === '固定比例') {
          fields += selectField('建压时间（单位：ms）', 'pressureTime', pressureTimes, state.form.pressureTime);
          fields += selectField('保压时间占比', 'pressureRatio', ['50%', '60%', '70%', '75%', '80%', '85%'], state.form.pressureRatio);
          fields += textField('间歇时间（单位：ms）', 'intervalTime', state.form.intervalTime, false, false, false, 'number');
        }
        if (state.form.durationStrategy === '固定时长') {
          fields += selectField('建压时间（单位：ms）', 'pressureTime', pressureTimes, state.form.pressureTime);
          fields += textField('间歇时间（单位：ms）', 'intervalTime', state.form.intervalTime, false, false, false, 'number');
        }
        action = '<button class="btn btn--primary" id="generate" type="button">生成</button>';
      }
      return `<section class="form-card"><h2>模式单元生成规则</h2><div class="rule-workflow">
        <div class="step-list"><button class="step-button${state.ruleStep === 1 ? ' is-active' : ''}" data-step="1" type="button">步骤1: 吸力档位</button><button class="step-button new-feature-step${state.ruleStep === 2 ? ' is-active' : ''}" data-step="2" type="button">步骤2: Speed 策略</button><button class="step-button${state.ruleStep === 3 ? ' is-active' : ''}" data-step="3" type="button">步骤3: 频率策略</button><button class="step-button${state.ruleStep === 4 ? ' is-active' : ''}" data-step="4" type="button">步骤4: 阶段时长</button></div>
        <div class="step-content"><div class="rule-fields">${fields}</div>${supplementary}<div class="next-wrap">${action}</div></div>
      </div></section>`;
    }

    function emptyResults() {
      const { start, count, end } = suctionRange();
      const suctionSummary = end ? `${start}-${end} kPa / ${count} 档，用于生成结果表格的吸力行` : '请选择起始吸力、吸力步进和档位数量，用于生成结果表格的吸力行';
      const speedCount = selectedSpeedCount();
      const speedSummary = speedCount ? `按 Speed 档位配置，共 ${speedCount} 档` : '不启用 Speed，生成单一频率结果表';
      const frequencySummary = speedCount && state.form.frequencyStrategy
        ? Array.from({ length: speedCount }, (_, index) => frequencyConfigText(index + 1)).join('；')
        : frequencyConfigText(0);
      let durationSummary = '未选择阶段时长策略';
      if (state.form.durationStrategy === '手动设置') durationSummary = '手动设置阶段时长';
      if (state.form.durationStrategy === '固定比例') durationSummary = `固定比例：建压 ${state.form.pressureTime || '未选择'}，保压 ${state.form.pressureRatio || '未选择'}，间歇 ${state.form.intervalTime || '未填写'} ms`;
      if (state.form.durationStrategy === '固定时长') durationSummary = `固定时长：建压 ${state.form.pressureTime || '未选择'}，间歇 ${state.form.intervalTime || '未填写'} ms`;
      return `<section class="form-card"><h2>生成结果表格，在表格中进行微调</h2><div class="rule-summary">
        <div>1. 吸力档位：${suctionSummary}</div>
        <div>吸力步进：根据起始吸力与导入建压表中下一个吸力的差值，提供 1 到 5 倍选择</div>
        <div class="new-feature-summary">2. Speed 策略：${speedSummary}</div><div>3. 频率策略：${frequencySummary}</div><div>4. 阶段时长：${durationSummary}</div>
        <div>最终结果：建压时间从关联动力源“${state.form.extra || '未选择'}”的建压表下拉选择，建压占空比按吸力 + 建压时间自动带出</div>
        <div>最终结果：卸压时间不可编辑，按吸力从关联动力源卸压表自动带出；用户仍可在表格中微调未锁定字段</div>
      </div><div class="result-layout"><div class="blank-panel">暂无数据，请配置规则后点击「生成」</div><div class="chart-panel"><h3>选中行曲线</h3><div class="blank-panel">暂无曲线数据，请先生成配置</div></div></div><div class="overview-empty"><h2>全档位吸力曲线总览</h2><p>暂无曲线数据，请先生成配置</p></div></section>`;
    }

    function detailResults(editable = false) {
      const speedCount = selectedSpeedCount();
      const activeSpeed = speedCount ? clampSpeedTab(state.resultSpeedTab) : 0;
      state.resultSpeedTab = activeSpeed || 1;
      const strategyLabel = state.form.frequencyStrategy === '随吸力递减'
        ? '随吸力递减'
        : `固定频率 ${frequencyAt(0, activeSpeed)} CPM`;
      const speedBar = speedCount
        ? `<div class="result-speed-bar">${speedTabButtons(activeSpeed, speedCount)}<div class="new-feature result-speed-summary"><strong>当前 Speed：Speed ${activeSpeed}</strong><span>频率策略：${strategyLabel}</span></div></div>`
        : '';
      const frequencyHeader = speedCount
        ? `<th class="new-feature-column">频率 CPM<span class="column-unit">Speed ${activeSpeed}</span></th>`
        : '<th>频率 CPM</th>';
      const rowCount = Math.min(Math.max(Number(state.form.gearCount) || 8, 1), 15);
      const suctionStart = Number(state.form.suction) || 10;
      const suctionStep = Number.parseInt(state.form.suctionStep, 10) || 1;
      const detailRows = Array.from({ length: rowCount }, (_, i) => {
        const suction = suctionStart + i * suctionStep;
        const frequency = frequencyAt(i, activeSpeed);
        const pressure = 50;
        const relief = 24 + i * 2;
        const interval = Number.parseInt(state.form.intervalTime, 10) || 10;
        const total = Math.round(60000 / frequency);
        const hold = Math.max(total - pressure - relief - interval, 0);
        const suctionOptions = Array.from({ length: 15 }, (_, index) => index + 10).map(value => `<option${value === suction ? ' selected' : ''}>${value}</option>`).join('');
        const pressureOptions = [30, 40, 50, 60, 70, 80].map(value => `<option${value === pressure ? ' selected' : ''}>${value}</option>`).join('');
        const disabled = editable ? '' : 'disabled';
        return `<tr><td>${i + 1}</td><td><select ${disabled}>${suctionOptions}</select></td><td><select ${disabled}>${pressureOptions}</select></td><td><input ${disabled} value="0.${70 + i}"></td><td><input ${disabled} value="${hold}"></td><td><input ${disabled} value="${relief}"></td><td><input ${disabled} value="${interval}"></td><td class="${speedCount ? 'new-feature-column' : ''}"><input ${disabled} value="${frequency}"></td><td><input ${disabled} value="${total}"></td></tr>`;
      }).join('');
      return `<section class="form-card"><h2>生成结果表格，在表格中进行微调</h2>${speedBar}<div class="detail-table table-shell"><table class="data-table" style="min-width:950px"><thead><tr><th>档位</th><th>吸力 kPa</th><th>建压时间 ms</th><th>建压占空比 %</th><th>保压时间 ms</th><th>卸压时间 ms</th><th>间歇时间 ms</th>${frequencyHeader}<th>总时长 ms</th></tr></thead><tbody>${detailRows}</tbody></table></div></section>`;
    }

    function formView() {
      const section = sections[state.section];
      const row = state.selected;
      const isView = state.view === 'view';
      let formBody = '';
      if (state.section === 'mode-units') formBody = `${basicForm(row, isView)}${isView ? detailResults(false) : ruleCard() + (state.generated ? detailResults(true) : emptyResults())}`;
      if (state.section === 'power-sources') formBody = powerSourceForm(isView);
      if (state.section === 'mode-libraries') formBody = modeLibraryForm(isView);
      if (state.section === 'rhythm-libraries') formBody = rhythmLibraryForm(isView);
      return `<section class="page-stack"><header class="page-header-bar"><div class="page-header-title"><button class="back-button" id="back">${chevron('left')}</button><h1>${section.formTitle}</h1></div><div class="page-header-actions">${isView ? '<button class="btn btn--outline" id="cancel">返回</button>' : '<button class="btn btn--outline" id="cancel">取消</button><button class="btn btn--primary" id="save">保存</button>'}</div></header>
        <div class="form-page">${formBody}</div></section>`;
    }

    function render() {
      app.innerHTML = `<div class="admin-shell${state.collapsed ? ' is-collapsed' : ''}">${sidebar()}<main class="content-shell">${state.view === 'list' ? listView() : formView()}</main></div>${combinationModal()}`;
      bindEvents();
    }

    function bindEvents() {
      document.querySelector('#sidebar-toggle').addEventListener('click', () => { state.collapsed = !state.collapsed; render(); });
      document.querySelector('#menu-parent').addEventListener('click', () => { state.menuExpanded = !state.menuExpanded; render(); });
      document.querySelectorAll('.sidebar-menu__child').forEach(link => link.addEventListener('click', event => {
        event.preventDefault();
        const section = event.currentTarget.dataset.section;
        if (!sections[section]) return;
        state.section = section;
        state.view = 'list';
        state.query = '';
        state.status = 'all';
        state.selected = null;
        window.history.replaceState(null, '', `#${section}`);
        render();
        window.scrollTo(0, 0);
      }));
      if (state.view === 'list') {
        const status = document.querySelector('#status-filter');
        status.value = state.status;
        status.addEventListener('change', event => { state.status = event.target.value; render(); });
        document.querySelector('#search').addEventListener('keydown', event => { if (event.key === 'Enter') { state.query = event.target.value.trim(); render(); } });
        document.querySelector('#reset').addEventListener('click', () => { state.query = ''; state.status = 'all'; render(); });
        document.querySelector('#add-unit').addEventListener('click', () => openForm('new'));
        document.querySelectorAll('tbody tr[data-id]').forEach(tr => tr.addEventListener('click', event => {
          const action = event.target.closest('button')?.dataset.action;
          if (!action) return;
          const activeRows = sections[state.section].rows;
          const row = activeRows.find(item => item.id === Number(tr.dataset.id));
          if (action === 'view' || action === 'edit') { openForm(action, row); return; }
          const messages = { publish: '确认执行此操作并切换状态吗？', disable: '确认执行此操作并切换状态吗？', delete: '确认删除吗？' };
          showDialog(messages[action], () => {
            if (action === 'delete') activeRows.splice(activeRows.indexOf(row), 1);
            if (action === 'publish') row.status = '发布';
            if (action === 'disable') row.status = '停用';
            showToast('操作成功'); render();
          });
        }));
      } else {
        document.querySelectorAll('[data-field]').forEach(control => {
          const updateValue = event => {
            const field = event.currentTarget.dataset.field;
            state.form[field] = event.currentTarget.value;
            if (field === 'gearCount') {
              const { start, count, end } = suctionRange();
              const estimate = document.querySelector('.estimate span');
              if (estimate) estimate.textContent = end ? `${start}-${end} kPa / ${count} 档` : '请选择起始吸力、吸力步进和档位数量';
              const summary = document.querySelector('.rule-summary div:first-child');
              if (summary) summary.textContent = `1. 吸力档位：${end ? `${start}-${end} kPa / ${count} 档，用于生成结果表格的吸力行` : '请选择起始吸力、吸力步进和档位数量，用于生成结果表格的吸力行'}`;
            }
          };
          control.addEventListener('input', updateValue);
          control.addEventListener('change', event => {
            updateValue(event);
            const field = event.currentTarget.dataset.field;
            if (field === 'speedStrategy' && speedIsEnabled() && !state.form.speedLevels) state.form.speedLevels = '1档';
            if (['suction', 'suctionStep', 'speedStrategy', 'frequencyStrategy', 'speedLevels', 'durationStrategy'].includes(field)) render();
          });
        });
        document.querySelectorAll('.step-button').forEach(button => button.addEventListener('click', () => { state.ruleStep = Number(button.dataset.step); render(); }));
        document.querySelectorAll('[data-result-speed-tab]').forEach(button => button.addEventListener('click', () => {
          state.resultSpeedTab = Number(button.dataset.resultSpeedTab);
          render();
        }));
        document.querySelector('.step-next')?.addEventListener('click', () => { state.ruleStep = Math.min(4, state.ruleStep + 1); render(); });
        document.querySelector('#generate')?.addEventListener('click', () => { state.generated = true; state.resultSpeedTab = 1; render(); showToast('生成成功'); });
        document.querySelectorAll('[data-export]').forEach(button => button.addEventListener('click', () => {
          const templates = {
            pressure: { href: './assets/templates/pump-pressure-mapping-template.xlsx', filename: '泵建压映射表导入模板.xlsx' },
            relief: { href: './assets/templates/valve-relief-mapping-template.xlsx', filename: '阀卸压映射表导入模板.xlsx' }
          };
          const template = templates[button.dataset.export];
          if (!template) return;
          const link = document.createElement('a');
          link.href = template.href;
          link.download = template.filename;
          document.body.appendChild(link);
          link.click();
          link.remove();
          showToast('模版已导出');
        }));
        document.querySelectorAll('[data-import]').forEach(button => button.addEventListener('click', () => {
          document.querySelector(`[data-import-file="${button.dataset.import}"]`)?.click();
        }));
        document.querySelectorAll('[data-import-file]').forEach(input => input.addEventListener('change', event => {
          const file = event.currentTarget.files?.[0];
          if (!file) return;
          const extension = file.name.split('.').pop()?.toLowerCase();
          if (!['xlsx', 'xls', 'csv'].includes(extension)) {
            event.currentTarget.value = '';
            showToast('仅支持 xlsx、xls 或 csv 文件');
            return;
          }
          state.powerImports[event.currentTarget.dataset.importFile] = file.name;
          render();
          showToast('导入成功');
        }));
        document.querySelector('#add-combination')?.addEventListener('click', () => {
          state.modal = state.section === 'mode-libraries' ? 'mode-unit' : 'rhythm';
          state.form.modalSelection = '';
          state.form.modalAmount = state.modal === 'mode-unit' ? '3' : '60';
          render();
        });
        const closeModal = () => { state.modal = null; render(); };
        document.querySelector('#modal-close')?.addEventListener('click', closeModal);
        document.querySelector('#modal-cancel')?.addEventListener('click', closeModal);
        document.querySelector('.form-modal-overlay')?.addEventListener('click', event => { if (event.target.classList.contains('form-modal-overlay')) closeModal(); });
        document.querySelector('#modal-confirm')?.addEventListener('click', () => {
          if (state.modal === 'mode-unit') {
            const selected = state.form.modalSelection || '818模式单元 / 818';
            const data = selected.includes('Air2') ? { name: 'Air2直线电机模式单元库', code: '111', min: '10', max: '24' } : selected.includes('818模式单元2') ? { name: '818模式单元2', code: '8182', min: '8', max: '18' } : { name: '818模式单元', code: '818', min: '5.1', max: '15.3' };
            state.modeUnits.push({ ...data, amount: state.form.modalAmount || '3' });
          } else {
            const selected = state.form.modalSelection || '818模式2 / 8182';
            const data = selected.includes('Air2') ? { name: 'Air2直线电机模式库', code: '154848', modeType: '吸乳模式' } : { name: '818模式2', code: '8182', modeType: '激活模式' };
            state.rhythmModes.push({ ...data, amount: state.form.modalAmount || '60' });
          }
          state.modal = null;
          render();
          showToast('添加成功');
        });
        document.querySelectorAll('[data-combo-action]').forEach(button => button.addEventListener('click', () => {
          const collection = button.dataset.comboType === 'mode-unit' ? state.modeUnits : state.rhythmModes;
          const index = Number(button.dataset.index);
          if (button.dataset.comboAction === 'delete') collection.splice(index, 1);
          if (button.dataset.comboAction === 'up' && index > 0) [collection[index - 1], collection[index]] = [collection[index], collection[index - 1]];
          if (button.dataset.comboAction === 'down' && index < collection.length - 1) [collection[index], collection[index + 1]] = [collection[index + 1], collection[index]];
          render();
        }));
        document.querySelector('#back').addEventListener('click', returnToList);
        document.querySelector('#cancel').addEventListener('click', returnToList);
        document.querySelector('#save')?.addEventListener('click', saveCurrentForm);
      }
    }

    function currentTimestamp() {
      const now = new Date();
      const part = value => String(value).padStart(2, '0');
      return `${now.getFullYear()}-${part(now.getMonth() + 1)}-${part(now.getDate())} ${part(now.getHours())}:${part(now.getMinutes())}:${part(now.getSeconds())}`;
    }

    function saveCurrentForm() {
      if (state.section === 'mode-units') {
        const values = {
          name: state.form.name || 'Speed 模式单元',
          code: state.form.code || `SPEED-${Math.max(...rows.map(row => row.id)) + 1}`,
          source: state.form.extra,
          description: state.form.description,
          updater: '刘媛媛',
          time: currentTimestamp(),
          config: { ...state.form },
          generated: state.generated
        };
        if (state.selected) Object.assign(state.selected, values);
        else rows.unshift({ id: Math.max(...rows.map(row => row.id)) + 1, status: '草稿', ...values });
      }
      showToast('保存成功');
      returnToList();
    }

    function returnToList() { state.view = 'list'; state.selected = null; state.modal = null; render(); window.scrollTo(0, 0); }
    function showDialog(message, action) { dialogMessage.textContent = message; pendingAction = action; overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden', 'false'); document.querySelector('#dialog-confirm').focus(); }
    function hideDialog() { overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden', 'true'); pendingAction = null; }
    function showToast(message) { toast.textContent = message; toast.classList.add('is-open'); window.setTimeout(() => toast.classList.remove('is-open'), 1800); }
    document.querySelector('#dialog-close').addEventListener('click', hideDialog);
    document.querySelector('#dialog-cancel').addEventListener('click', hideDialog);
    document.querySelector('#dialog-confirm').addEventListener('click', () => { const action = pendingAction; hideDialog(); action?.(); });
    overlay.addEventListener('click', event => { if (event.target === overlay) hideDialog(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') hideDialog(); });
    render();
