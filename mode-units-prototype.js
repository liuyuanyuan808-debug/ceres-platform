    const rows = [
      {
        id: 8, name: '吸乳模式', code: 'SUCTION', status: '发布', currentVersion: 'V2', updater: '刘媛媛', time: '2026-09-03 11:20:00', source: 'Air2直线电机', description: '基于医学输入持续迭代的吸乳模式',
        versions: [
          { version: 'V2', status: '发布', current: true, medicalInput: '医学输入方案 B', applicableModels: 'Air 2、新一代机型', changeSummary: '更新吸乳节律参数与频率区间', publisher: '刘媛媛', publishTime: '2026-09-03 11:20:00' },
          { version: 'V1', status: '历史版本', current: false, medicalInput: '医学输入方案 A', applicableModels: 'V3、V3 Pro', changeSummary: '首版吸乳模式参数', publisher: '陈剑泽', publishTime: '2026-06-18 16:29:10' }
        ]
      },
      { id: 7, name: 'Air2直线电机模式单元库', code: '111', status: '停用', updater: '池浩', time: '2026-08-19 11:04:26', source: 'Air2直线电机', description: 'Air2直线电机模式单元库-阿道夫垃圾地方拉近双方了解了福建建瓯放假哦我绿卡就是的老夫就撒了恐惧拉丁教父glad咯就' },
      { id: 6, name: '818模式单元2', code: '8182', status: '停用', updater: '池浩', time: '2026-08-18 19:03:42', source: 'Air2直线电机', description: '' },
      { id: 5, name: '818模式单元', code: '818', status: '发布', updater: '陈剑泽', time: '2026-08-18 16:29:10', source: 'Air2直线电机', description: '' }
    ];

    const percentagePressureRows = [
      ['10', '42%', '48%', '55%', '62%'],
      ['15', '51%', '58%', '64%', '70%'],
      ['20', '60%', '67%', '73%', '80%']
    ];
    const air2LinearPressureRows = [
      ['10', '[10, 16, 24, 32]', '[12, 19, 27, 36]', '[14, 21, 30, 40]', '[16, 24, 33, 44]'],
      ['15', '[16, 23, 31, 41]', '[18, 26, 35, 46]', '[20, 29, 39, 51]', '[22, 32, 43, 56]'],
      ['20', '[22, 30, 40, 52]', '[24, 33, 44, 57]', '[26, 36, 48, 62]', '[28, 39, 52, 67]']
    ];
    const linearMotorPressureRows = [
      ['10', '[12, 18, 26, 34]', '[14, 21, 29, 38]', '[16, 23, 32, 42]', '[18, 26, 35, 46]'],
      ['15', '[18, 25, 33, 43]', '[20, 28, 37, 48]', '[22, 31, 41, 53]', '[24, 34, 45, 58]'],
      ['20', '[24, 32, 42, 54]', '[26, 35, 46, 59]', '[28, 38, 50, 64]', '[30, 41, 54, 69]']
    ];
    const l2LinearPressureRows = [
      ['10', '[36, 48, 60, 72]', '[40, 52, 64, 76]', '[44, 56, 68, 80]', '[48, 60, 72, 84]'],
      ['15', '[42, 54, 66, 78]', '[46, 58, 70, 82]', '[50, 62, 74, 86]', '[54, 66, 78, 90]'],
      ['20', '[48, 60, 72, 84]', '[52, 64, 76, 88]', '[56, 68, 80, 92]', '[60, 72, 84, 96]']
    ];
    const standardReliefRows = [['10', '24'], ['15', '34'], ['20', '44']];
    const air2ReliefRows = [['10', '22'], ['15', '31'], ['20', '41']];

    const powerSourceRows = [
      {
        id: 101, name: '818动力源', code: '818', project: 'V3、V3 Pro', status: '发布', updater: '陈剑泽', time: '2026-08-18 16:28:12', description: '',
        config: { motorType: '无', pumpType: '隔膜泵', valveType: '电磁阀', frequencyMin: '40', frequencyMax: '80', holdMin: '100', holdMax: '900', intervalMin: '0', intervalMax: '500' },
        pressureRows: percentagePressureRows,
        reliefRows: standardReliefRows,
        powerImports: { pressure: '818-pump-pressure.xlsx', relief: '818-valve-relief.xlsx' }
      },
      {
        id: 102, name: 'Air2直线电机', code: '1001', project: 'Air 2', status: '发布', updater: '池浩', time: '2026-08-18 15:37:43', description: '',
        config: { motorType: '直线电机', pumpType: '隔膜泵', valveType: '电磁阀', pulseCount: '4', frequencyMin: '40', frequencyMax: '80', holdMin: '20', holdMax: '500', intervalMin: '0', intervalMax: '500' },
        pressureRows: air2LinearPressureRows,
        reliefRows: air2ReliefRows,
        powerImports: { pressure: 'air2-linear-pressure.xlsx', relief: 'air2-valve-relief.xlsx' }
      },
      {
        id: 103, name: 'new air2直线电机方案', code: 'NEW-AIR2-LINEAR', project: 'Air 2', status: '草稿', updater: '刘媛媛', time: '2026-09-02 13:50:00', description: '直线电机四段驱动参数方案',
        config: { motorType: '直线电机', pumpType: '隔膜泵', valveType: '电磁阀', pulseCount: '4', frequencyMin: '30', frequencyMax: '120', holdMin: '20', holdMax: '300', intervalMin: '0', intervalMax: '500' },
        pressureRows: linearMotorPressureRows,
        reliefRows: standardReliefRows,
        powerImports: { pressure: 'new-air2-linear-pressure.xlsx', relief: 'new-air2-valve-relief.xlsx' }
      },
      {
        id: 104, name: 'L2直线方案New', code: 'L2-LINEAR-NEW', project: 'L2', status: '草稿', updater: '刘媛媛', time: '2026-09-02 14:20:00', description: 'L2直线电机脉冲频率数组方案',
        config: { motorType: '直线电机', pumpType: '隔膜泵', valveType: '电磁阀', pulseCount: '4', frequencyMin: '35', frequencyMax: '90', holdMin: '20', holdMax: '420', intervalMin: '0', intervalMax: '450' },
        pressureRows: l2LinearPressureRows,
        reliefRows: [['10', '20'], ['15', '29'], ['20', '38']],
        powerImports: { pressure: 'l2-linear-new-pressure.xlsx', relief: 'l2-linear-new-relief.xlsx' }
      }
    ];

    const modeLibraryRows = [
      { id: 201, name: 'Air2直线电机模式库', code: '154848', status: '停用', updater: '陈剑泽', time: '2026-08-19 10:40:46', description: '' },
      { id: 202, name: '818模式2', code: '8182', status: '发布', updater: '陈剑泽', time: '2026-08-18 18:33:18', description: '' }
    ];

    const rhythmRows = [
      { id: 301, rank: '1', tags: '推荐', name: 'Milk Boost（默认内置）', displayName: '高效泌乳', code: 'MILK_BOOST', duration: '1200', schedule: '20 min：刺激 2min + 吸乳 8min + 刺激 2min + 吸乳 8min', description: '顺利启动泌乳后，适合日常使用', descriptionEn: 'Most suitable for daily use after successful lactation.', status: '发布', updater: '刘媛媛', time: '2026-09-04 10:00:00' },
      { id: 302, rank: '2', tags: '推荐', name: 'Quick Relief', displayName: '日间快吸', code: 'QUICK_RELIEF', duration: '540', schedule: '9 min：刺激 1min + 吸乳 8min', description: '短时缓解奶涨，避免堵奶和奶量下降', descriptionEn: 'Quick engorgement relief, prevents clogs & supply drop.', status: '发布', updater: '刘媛媛', time: '2026-09-04 10:00:00' },
      { id: 303, rank: '3', tags: '推荐', name: 'Power pumping', displayName: '密集追奶', code: 'POWER_PUMPING', duration: '2700', schedule: '45 min：刺激 2min + 吸乳 13min + 暂停 5min + 刺激 2min + 吸乳 8min + 暂停 5min + 刺激 2min + 吸乳 8min', description: '当奶量下降时，及时提升；每天不超过 1 次', descriptionEn: 'Increase milk supply, no more than once a day.', status: '发布', updater: '刘媛媛', time: '2026-09-04 10:00:00' },
      { id: 304, rank: '4', tags: '场景', name: 'Before bed', displayName: '睡前场景', code: 'BEFORE_BED', duration: '1200', schedule: '20 min：刺激 2min + 吸乳 8min + 刺激 2min + 混合 8min', description: '安静低噪音的柔和吸奶', descriptionEn: 'Gentle, low-noise expression for bedtime comfort.', status: '发布', updater: '刘媛媛', time: '2026-09-04 10:00:00' }
    ];

    const sections = {
      'power-sources': {
        label: '动力源方案管理', title: '动力源列表管理', addLabel: '新增动力源', formTitle: '项目动力源配置', extraLabel: '关联项目', extraKey: 'project', rows: powerSourceRows,
        options: ['M5 Smart', 'M9', 'M10', 'Air 1', 'M8', 'V3', 'V3 Pro', 'M10 Lite', 'Air 2', 'L2'],
        columns: [['name', '名称'], ['code', '编码'], ['project', '关联项目'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间']]
      },
      'mode-units': {
        label: '模式单元库', title: '模式单元列表管理', addLabel: '新增模式单元', formTitle: '模式单元配置', extraLabel: '关联动力源', extraKey: 'source', rows,
        options: ['Air2直线电机', '818动力源'],
        columns: [['name', '名称'], ['code', '编码'], ['currentVersion', '当前版本'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间']]
      },
      'mode-libraries': {
        label: '模式库', title: '模式库列表管理', addLabel: '新增模式库', formTitle: '模式库配置', extraLabel: '关联动力源', extraKey: 'source', rows: modeLibraryRows,
        options: ['Air2直线电机', '818动力源'],
        columns: [['name', '名称'], ['code', '编码'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间']]
      },
      'rhythm-libraries': {
        label: '韵律库', title: '韵律库列表管理', addLabel: '新增韵律库', formTitle: '韵律库配置', extraLabel: '关联动力源', extraKey: 'source', rows: rhythmRows,
        options: ['Air2直线电机', '818动力源'],
        columns: [['rank', '排序'], ['tags', '标签'], ['name', '韵律名'], ['displayName', '中文名称'], ['currentVersion', '当前版本'], ['schedule', '时长 & 编排'], ['description', '简介'], ['descriptionEn', '英文简介']],
        columnWidths: [64, 76, 190, 100, 120, 360, 230, 330]
      }
    };

    const initialSection = sections[window.location.hash.slice(1)] ? window.location.hash.slice(1) : 'mode-units';
    const state = { view: 'list', section: initialSection, collapsed: false, menuExpanded: true, query: '', status: 'all', selected: null, ruleStep: 1, resultSpeedTab: 1, generated: false, form: {}, modal: null, versionModal: null, exportConfig: null, exportError: '', modeUnits: [], rhythmModes: [], powerImports: { pressure: '', relief: '' } };
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

    function versionsFor(row) {
      if (!row.versions) {
        const version = row.currentVersion || 'V1';
        row.currentVersion = version;
        row.versions = [{ version, status: row.status === '草稿' ? '草稿' : row.status === '发布' ? '发布' : '历史版本', current: row.status === '发布', medicalInput: state.section === 'rhythm-libraries' ? '初始韵律设计输入' : '原始医学输入', applicableModels: row.source || '未配置', changeSummary: '初始版本', publisher: row.updater, publishTime: row.time }];
      }
      return row.versions;
    }

    function nextVersionFor(row) {
      const maximum = versionsFor(row).reduce((value, item) => Math.max(value, Number.parseInt(item.version.replace(/\D/g, ''), 10) || 0), 0);
      return `V${maximum + 1}`;
    }

    function versionCell(row) {
      const versions = versionsFor(row);
      const draft = versions.find(item => item.status === '草稿');
      const current = versions.find(item => item.current);
      const label = current ? '当前推荐' : row.status === '停用' ? '已停用' : '未发布';
      return `<div class="version-cell"><strong>${row.currentVersion || 'V1'}</strong><span>${label}</span>${draft && draft.version !== row.currentVersion ? `<em>${draft.version} 草稿</em>` : ''}</div>`;
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
      const versionedSection = state.section === 'mode-units' || state.section === 'rhythm-libraries';
      const tableRows = visible.length ? visible.map(row => `<tr data-id="${row.id}">
        ${section.columns.map(([key]) => `<td${versionedSection && key === 'currentVersion' ? ' class="version-feature-cell"' : ''}>${key === 'status' ? statusTag(row.status) : key === 'currentVersion' ? versionCell(row) : `<span class="cell-text">${row[key] || ''}</span>`}</td>`).join('')}
        <td class="actions"><button data-action="view">查看</button>${versionedSection ? '<button class="version-action" data-action="version-history">版本记录</button><button class="version-action" data-action="new-version">新建版本</button>' : ''}${row.status !== '发布' ? '<button data-action="edit">编辑</button><button data-action="publish">发布</button><button class="danger" data-action="delete">删除</button>' : '<button data-action="disable">停用</button>'}</td>
      </tr>`).join('') : `<tr class="empty-row"><td colspan="${section.columns.length + 1}">暂无数据</td></tr>`;
      const actionWidth = versionedSection ? 330 : 190;
      const columnWidths = section.columnWidths || section.columns.map(() => 128);
      const tableMinWidth = Math.max(830, columnWidths.reduce((sum, width) => sum + width, 0) + actionWidth);
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
            <table class="data-table${state.section === 'rhythm-libraries' ? ' rhythm-list-table' : ''}" style="min-width:${tableMinWidth}px"><colgroup>${columnWidths.map(width => `<col style="width:${width}px">`).join('')}<col style="width:${actionWidth}px"></colgroup><thead><tr>${section.columns.map(([key, label]) => `<th${versionedSection && key === 'currentVersion' ? ' class="version-feature-cell"' : ''}>${label}</th>`).join('')}<th>操作</th></tr></thead><tbody>${tableRows}</tbody></table>
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
      const disabled = state.view === 'view' ? 'disabled' : '';
      return `<label class="form-field${wide ? ' form-field--wide' : ''}${className ? ` ${className}` : ''}"><span>${label}${required ? '<em class="required"> *</em>' : ''}</span><div class="select-wrap"><select class="control" data-field="${key}" ${disabled}>${optionList(options, selected)}</select><svg class="select-caret" viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"></path></svg></div></label>`;
    }

    function initializeForm(row = null) {
      const section = sections[state.section];
      const savedConfig = row?.config || {};
      state.form = {
        suction: '', suctionStep: '', gearCount: '', speedStrategy: '按 Speed 档位配置', speedLevels: '', frequencyStrategy: '', variablePreset: '快', fixedFrequency: '', startFrequency: '', frequencyStep: '', minimumFrequency: '',
        durationStrategy: '', pressureTime: '', pressureRatio: '', intervalTime: '',
        project: row?.project || '', motorType: '', pumpType: '', valveType: '', pulseCount: '4', frequencyMin: '', frequencyMax: '', holdMin: '', holdMax: '', intervalMin: '', intervalMax: '',
        modeType: '', source: row?.source || '', tags: row?.tags || '', modalSelection: '', modalAmount: '3',
        ...savedConfig,
        name: row?.name || '', code: row?.code || '', rank: row?.rank || '', displayName: row?.displayName || '', schedule: row?.schedule || '', description: row?.description || '', descriptionEn: row?.descriptionEn || '', extra: savedConfig.extra || row?.[section.extraKey] || ''
      };
      if (savedConfig.speedEnabled && !savedConfig.speedStrategy) state.form.speedStrategy = '按 Speed 档位配置';
      state.ruleStep = 1;
      state.resultSpeedTab = 1;
      state.generated = Boolean(row?.generated);
      state.modal = null;
      state.exportConfig = null;
      state.exportError = '';
      state.modeUnits = [];
      state.rhythmModes = [];
      state.powerImports = { pressure: '', relief: '', ...(row?.powerImports || {}) };
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
      const isView = state.view === 'view';
      const isLinearMotorPressure = isPressure && state.form.motorType === '直线电机';
      const importedFile = state.powerImports[type];
      const imported = Boolean(importedFile);
      const importedName = imported ? escapeHtml(importedFile) : '';
      const pulseCount = Math.min(5, Math.max(1, Number.parseInt(state.form.pulseCount, 10) || 4));
      const fitPulseArray = value => {
        const numbers = String(value).match(/-?\d+(?:\.\d+)?/g)?.map(Number) || [];
        while (numbers.length < pulseCount) {
          const last = numbers.at(-1) || 0;
          const previous = numbers.at(-2) ?? last - 8;
          numbers.push(last + Math.max(1, last - previous));
        }
        return `[${numbers.slice(0, pulseCount).join(', ')}]`;
      };
      const sourcePressureRows = state.selected?.pressureRows || (isLinearMotorPressure ? linearMotorPressureRows : percentagePressureRows);
      const pressureRows = isLinearMotorPressure ? sourcePressureRows.map(row => [row[0], ...row.slice(1).map(fitPulseArray)]) : sourcePressureRows;
      const reliefRows = state.selected?.reliefRows || standardReliefRows;
      const activeRows = isPressure ? pressureRows : reliefRows;
      const suctionValues = activeRows.map(row => Number(row[0])).filter(Number.isFinite);
      const secondaryValues = isPressure ? [30, 40, 50, 60] : activeRows.map(row => Number(row[1])).filter(Number.isFinite);
      const rangeText = values => values.length ? `${Math.min(...values)}-${Math.max(...values)}` : '-';
      const title = isPressure ? '导入泵建压映射表' : '导入阀卸压映射表';
      const description = isLinearMotorPressure
        ? `直线电机新增规则：行是多个吸力值，列是多个建压时间 ms；每个映射值为包含 ${pulseCount} 个数的脉冲频率数组，不使用占空比百分比。导出与导入保持相同格式。`
        : isPressure ? '行是多个吸力值，列是多个时间 ms，中间的值是泵工作的占空比百分比。' : '行表示吸力点，列表示对应卸压时间 ms。';
      const pressureBody = pressureRows.map(row => `<tr>${row.map((value, index) => `<td${isLinearMotorPressure && index ? ' class="linear-array-cell"' : ''}>${value}</td>`).join('')}</tr>`).join('');
      const reliefBody = reliefRows.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('');
      const sample = isPressure
        ? `<div class="mapping-table table-shell${isLinearMotorPressure ? ' linear-mapping-table' : ''}"><table class="data-table"><thead><tr><th>吸力 kPa</th><th>30 ms</th><th>40 ms</th><th>50 ms</th><th>60 ms</th></tr></thead><tbody>${pressureBody}</tbody></table></div>`
        : `<div class="mapping-table table-shell"><table class="data-table"><thead><tr><th>吸力 kPa</th><th>卸压时间 ms</th></tr></thead><tbody>${reliefBody}</tbody></table></div>`;
      const actions = isView ? '' : `<div class="card-actions"><button class="btn btn--outline" type="button" data-export="${type}">导出模版</button><button class="btn btn--primary" type="button" data-import="${type}">${imported ? '重新导入' : '导入表格'}</button></div>`;
      const importStatus = imported && !isView ? `<div class="mapping-import-status" role="status"><span>导入成功</span><strong title="${importedName}">${importedName}</strong></div>` : '';
      return `<section class="form-card mapping-card${isLinearMotorPressure ? ' linear-motor-feature' : ''}"><div class="form-card__header"><h2>${title}${isLinearMotorPressure ? `<span class="new-requirement-tag">脉冲频率数组 · ${pulseCount} 组</span>` : ''}</h2>${actions}</div><input class="mapping-file-input" type="file" accept=".xlsx,.xls,.csv" data-import-file="${type}" aria-label="${title}"><p class="mapping-description">${description}</p>
        ${imported ? `${importStatus}${sample}` : '<div class="mapping-empty">暂无数据，请先导入表格</div>'}
        <div class="mapping-stats"><div class="mapping-stat"><span>吸力范围</span><strong>${imported ? rangeText(suctionValues) : '-'} <em>kPa</em></strong></div><div class="mapping-stat"><span>时间范围</span><strong>${imported ? rangeText(secondaryValues) : '-'} <em>ms</em></strong></div></div>
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
        ${textField('排序', 'rank', state.form.rank, false, false, isView, 'number')}${textField('韵律名', 'name', state.form.name, false, false, isView)}${textField('中文名称', 'displayName', state.form.displayName, false, false, isView)}
        ${textField('编码', 'code', state.form.code, false, false, isView)}
        ${selectField('关联动力源', 'source', ['Air2直线电机', '818动力源'], state.form.source)}
        ${selectField('标签', 'tags', ['推荐', '场景'], state.form.tags)}
        ${textField('时长 & 编排', 'schedule', state.form.schedule, true, true, isView)}
        ${textField('简介', 'description', state.form.description, true, true, isView)}
        ${textField('英文简介', 'descriptionEn', state.form.descriptionEn, true, true, isView)}
      </div></section>
      <section class="form-card"><div class="form-card__header"><h2>模式组合配置</h2><button class="btn btn--primary" id="add-combination" type="button">添加模式</button></div>${total ? `<div class="table-shell combo-table"><table class="data-table"><colgroup><col style="width:55px"><col style="width:140px"><col style="width:100px"><col style="width:110px"><col style="width:145px"><col style="width:80px"><col style="width:150px"></colgroup><thead><tr><th>顺序</th><th>模式名称</th><th>模式编码</th><th>模式类型</th><th>循环时间（单位：s）</th><th>状态</th><th>操作</th></tr></thead><tbody>${rowsMarkup}</tbody></table></div>` : '<div class="combo-empty">暂无数据，请先添加模式</div>'}</section>
      <section class="form-card"><h2>韵律阶段预览</h2>${rhythmPreview()}</section>`;
    }

    function exportTemplateModal() {
      if (!state.exportConfig) return '';
      const config = state.exportConfig;
      const isPump = config.type === 'pressure';
      const isLinear = isPump && state.form.motorType === '直线电机';
      const numericInput = (label, key) => `<label><span>${label}</span><input class="control" data-export-config="${key}" type="number" min="${key.endsWith('Count') ? '1' : ''}" step="${key.endsWith('Count') ? '1' : 'any'}" value="${config[key]}"></label>`;
      const pulseOptions = Array.from({ length: 5 }, (_, index) => {
        const count = index + 1;
        return `<button class="pulse-count-option${Number(config.pulseCount) === count ? ' is-active' : ''}" type="button" data-pulse-count="${count}" aria-pressed="${Number(config.pulseCount) === count}"><strong>${count}</strong>${count === 3 || count === 4 ? '<span>推荐</span>' : ''}</button>`;
      }).join('');
      return `<div class="form-modal-overlay export-dialog-backdrop"><section class="form-modal export-template-dialog" role="dialog" aria-modal="true" aria-label="配置导出模版"><header><h2>配置导出模版</h2><button class="dialog-close" id="export-modal-close" type="button" aria-label="关闭" ${config.generating ? 'disabled' : ''}>×</button></header><div class="form-modal__body export-template-form">
        <section class="export-config-group"><header class="export-config-group__header"><h3>吸力 kPa</h3><span>全部为数值输入</span></header><div class="export-config-inputs">${numericInput('起始吸力', 'suctionStart')}${numericInput('步进', 'suctionStep')}${numericInput('数量', 'suctionCount')}</div></section>
        ${isPump ? `<section class="export-config-group"><header class="export-config-group__header"><h3>时间 ms</h3><span>全部为数值输入</span></header><div class="export-config-inputs">${numericInput('起始时间', 'timeStart')}${numericInput('步进时间', 'timeStep')}${numericInput('数量', 'timeCount')}</div></section>` : ''}
        ${isLinear ? `<section class="export-config-group pulse-count-group"><header class="export-config-group__header"><h3>脉冲频率数组</h3><span>可选 1～5，推荐 3 或 4</span></header><div class="pulse-count-options" role="group" aria-label="脉冲频率数组组数">${pulseOptions}</div></section><aside class="export-linear-note">新增需求：直线电机模板中的映射值为 ${config.pulseCount} 个数的脉冲频率数组 [${Array.from({ length: Number(config.pulseCount) || 4 }, (_, index) => String.fromCharCode(97 + index)).join(', ')}]，不使用占空比。</aside>` : ''}
        ${state.exportError ? `<p class="export-dialog-error">${escapeHtml(state.exportError)}</p>` : ''}
      </div><footer><button class="btn btn--outline" id="export-modal-cancel" type="button" ${config.generating ? 'disabled' : ''}>取消</button><button class="btn btn--primary" id="export-download" type="button" ${config.generating ? 'disabled' : ''}>${config.generating ? '生成中...' : '下载'}</button></footer></section></div>`;
    }

    function numericSequence(startValue, stepValue, countValue) {
      const start = Number(startValue);
      const step = Number(stepValue);
      const count = Number(countValue);
      if (!Number.isFinite(start) || !Number.isFinite(step)) throw new Error('起始值和步进必须是有效数字');
      if (!Number.isInteger(count) || count <= 0) throw new Error('数量必须是正整数');
      return Array.from({ length: count }, (_, index) => Number((start + step * index).toFixed(12)));
    }

    function xmlEscape(value) {
      return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[character]));
    }

    function excelColumn(index) {
      let result = '';
      for (let value = index + 1; value > 0; value = Math.floor((value - 1) / 26)) result = String.fromCharCode(65 + ((value - 1) % 26)) + result;
      return result;
    }

    function crc32(bytes) {
      let crc = 0xffffffff;
      for (const byte of bytes) {
        crc ^= byte;
        for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
      }
      return (crc ^ 0xffffffff) >>> 0;
    }

    function zipParts(files) {
      const encoder = new TextEncoder();
      const locals = [];
      const centrals = [];
      let offset = 0;
      let centralSize = 0;
      const join = parts => {
        const total = parts.reduce((sum, part) => sum + part.length, 0);
        const output = new Uint8Array(total);
        let cursor = 0;
        parts.forEach(part => { output.set(part, cursor); cursor += part.length; });
        return output;
      };
      Object.entries(files).forEach(([name, content]) => {
        const nameBytes = encoder.encode(name);
        const data = encoder.encode(content);
        const checksum = crc32(data);
        const localHeader = new Uint8Array(30);
        const localView = new DataView(localHeader.buffer);
        localView.setUint32(0, 0x04034b50, true);
        localView.setUint16(4, 20, true);
        localView.setUint32(14, checksum, true);
        localView.setUint32(18, data.length, true);
        localView.setUint32(22, data.length, true);
        localView.setUint16(26, nameBytes.length, true);
        const local = join([localHeader, nameBytes, data]);
        locals.push(local);
        const centralHeader = new Uint8Array(46);
        const centralView = new DataView(centralHeader.buffer);
        centralView.setUint32(0, 0x02014b50, true);
        centralView.setUint16(4, 20, true);
        centralView.setUint16(6, 20, true);
        centralView.setUint32(16, checksum, true);
        centralView.setUint32(20, data.length, true);
        centralView.setUint32(24, data.length, true);
        centralView.setUint16(28, nameBytes.length, true);
        centralView.setUint32(42, offset, true);
        const central = join([centralHeader, nameBytes]);
        centrals.push(central);
        offset += local.length;
        centralSize += central.length;
      });
      const end = new Uint8Array(22);
      const endView = new DataView(end.buffer);
      endView.setUint32(0, 0x06054b50, true);
      endView.setUint16(8, centrals.length, true);
      endView.setUint16(10, centrals.length, true);
      endView.setUint32(12, centralSize, true);
      endView.setUint32(16, offset, true);
      return join([...locals, ...centrals, end]);
    }

    function mappingWorkbookBlob(type, config) {
      const suctionValues = numericSequence(config.suctionStart, config.suctionStep, config.suctionCount);
      const isPump = type === 'pressure';
      const timeValues = isPump ? numericSequence(config.timeStart, config.timeStep, config.timeCount) : [];
      const isLinear = isPump && state.form.motorType === '直线电机';
      const pulseCount = Math.min(5, Math.max(1, Number.parseInt(config.pulseCount, 10) || 4));
      const emptyPulseArray = `[${Array.from({ length: pulseCount }, () => 0).join(', ')}]`;
      const matrix = isPump
        ? [['吸力 kPa', ...timeValues], ...suctionValues.map(suction => [suction, ...timeValues.map(() => isLinear ? emptyPulseArray : '')])]
        : [['吸力 kPa', '卸压时间'], ...suctionValues.map(suction => [suction, ''])];
      const cells = matrix.map((row, rowIndex) => `<row r="${rowIndex + 1}">${row.map((value, columnIndex) => {
        const reference = `${excelColumn(columnIndex)}${rowIndex + 1}`;
        const style = rowIndex === 0 ? 1 : isLinear && columnIndex > 0 ? 3 : 2;
        if (value === '') return `<c r="${reference}" s="${style}"/>`;
        if (typeof value === 'number') return `<c r="${reference}" s="${style}"><v>${value}</v></c>`;
        return `<c r="${reference}" s="${style}" t="inlineStr"><is><t>${xmlEscape(value)}</t></is></c>`;
      }).join('')}</row>`).join('');
      const lastCell = `${excelColumn(matrix[0].length - 1)}${matrix.length}`;
      const sheetName = isPump ? '泵建压映射表' : '阀卸压映射表';
      const files = {
        '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
        '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
        'xl/workbook.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${sheetName}" sheetId="1" r:id="rId1"/></sheets></workbook>`,
        'xl/_rels/workbook.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
        'xl/styles.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Arial"/></font><font><b/><sz val="11"/><name val="Arial"/></font></fonts><fills count="4"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFE2E8F0"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFF6BF"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border/><border><left style="thin"><color rgb="FFCBD5E1"/></left><right style="thin"><color rgb="FFCBD5E1"/></right><top style="thin"><color rgb="FFCBD5E1"/></top><bottom style="thin"><color rgb="FFCBD5E1"/></bottom></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="4"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="49" fontId="0" fillId="3" borderId="1" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`,
        'xl/worksheets/sheet1.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:${lastCell}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${matrix[0].map((_, index) => `<col min="${index + 1}" max="${index + 1}" width="${index === 0 ? 14 : isLinear ? 22 : 12}" customWidth="1"/>`).join('')}</cols><sheetData>${cells}</sheetData></worksheet>`
      };
      return new Blob([zipParts(files)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    }

    function downloadMappingTemplate(type, config) {
      const blob = mappingWorkbookBlob(type, config);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = type === 'pressure' ? '泵建压映射表模版.xlsx' : '阀卸压映射表模版.xlsx';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
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

    function versionModal() {
      if (!state.versionModal) return '';
      const { type, row } = state.versionModal;
      const versions = versionsFor(row);
      const versionEntityLabel = state.section === 'rhythm-libraries' ? '韵律库' : '模式单元';
      const versionInputLabel = state.section === 'rhythm-libraries' ? '韵律设计输入/依据' : '医学输入/依据';
      const versionInputPlaceholder = state.section === 'rhythm-libraries' ? '例如：韵律设计方案 B' : '例如：医学输入方案 C';
      const versionScope = `${row.source || row.project || '未关联动力源'} / ${row.name}`;
      const closeButton = '<button class="dialog-close" id="version-modal-close" type="button" aria-label="关闭">×</button>';
      if (type === 'create') {
        const nextVersion = nextVersionFor(row);
        return `<div class="form-modal-overlay version-modal-overlay"><section class="form-modal version-dialog" role="dialog" aria-modal="true" aria-label="新建版本"><header><div><h2>新建${versionEntityLabel}版本 <span class="new-requirement-tag">新增需求</span></h2><p>版本归属：${escapeHtml(versionScope)} · 已发布版本不可直接修改</p></div>${closeButton}</header><div class="form-modal__body version-form new-feature">
          <label class="form-field"><span>基于版本<em class="required"> *</em></span><div class="select-wrap"><select class="control" id="version-base">${versions.filter(item => item.status !== '草稿').map(item => `<option value="${item.version}">${item.version}${item.current ? '（当前推荐）' : ''}</option>`).join('')}</select><svg class="select-caret" viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"></path></svg></div></label>
          <label class="form-field"><span>新版本号<em class="required"> *</em></span><input class="control" id="version-number" value="${nextVersion}" placeholder="例如：1.1、1.2 或 V3"></label>
          <label class="form-field form-field--wide"><span>${versionInputLabel}<em class="required"> *</em></span><input class="control" id="version-medical" placeholder="${versionInputPlaceholder}"></label>
          <label class="form-field form-field--wide"><span>适用机型<em class="required"> *</em></span><input class="control" id="version-models" placeholder="例如：Air 2、新一代机型"></label>
          <label class="form-field form-field--wide"><span>版本变更说明<em class="required"> *</em></span><textarea class="control" id="version-summary" placeholder="说明本次医学参数和策略的变化"></textarea></label>
          <p class="version-rule-note">版本号支持 1.1、1.2、V3 等格式，且同一${versionEntityLabel}内不可重复。创建后保存为草稿；验证通过后在“版本记录”中发布，发布时才会替换当前推荐版本。已使用旧版本的方案不会自动升级。</p>
        </div><footer><button class="btn btn--outline" id="version-modal-cancel" type="button">取消</button><button class="btn version-primary" id="version-create-confirm" type="button">创建草稿</button></footer></section></div>`;
      }
      if (type === 'compare') {
        const target = versions.find(item => item.version === state.versionModal.version) || versions[0];
        const baseline = versions.find(item => item.current && item.version !== target.version) || versions.find(item => item.version !== target.version) || target;
        const compareRow = (label, left, right) => `<div class="version-compare-row"><strong>${label}</strong><span>${escapeHtml(left || '-')}</span><span class="version-change-value">${escapeHtml(right || '-')}</span></div>`;
        return `<div class="form-modal-overlay version-modal-overlay"><section class="form-modal version-dialog version-dialog--wide" role="dialog" aria-modal="true" aria-label="版本对比"><header><div><h2>版本对比 <span class="new-requirement-tag">新增需求</span></h2><p>${escapeHtml(row.name)}：${baseline.version} 与 ${target.version}</p></div>${closeButton}</header><div class="form-modal__body"><div class="version-compare-head"><span>对比项</span><strong>${baseline.version}</strong><strong>${target.version}</strong></div>${compareRow(versionInputLabel, baseline.medicalInput, target.medicalInput)}${compareRow('适用机型', baseline.applicableModels, target.applicableModels)}${compareRow('变更说明', baseline.changeSummary, target.changeSummary)}${compareRow('发布人', baseline.publisher, target.publisher)}</div><footer><button class="btn btn--outline" id="version-modal-cancel" type="button">返回版本记录</button></footer></section></div>`;
      }
      const versionRows = versions.map(item => `<tr><td><strong>${item.version}</strong>${item.current ? '<span class="current-version-tag">当前推荐</span>' : ''}</td><td>${statusTag(item.status)}</td><td>${escapeHtml(item.medicalInput)}</td><td>${escapeHtml(item.applicableModels)}</td><td>${escapeHtml(item.changeSummary)}</td><td>${escapeHtml(item.publisher)}<small>${escapeHtml(item.publishTime || '未发布')}</small></td><td class="actions"><button class="version-action" data-version-action="compare" data-version="${item.version}">对比</button>${item.status === '草稿' ? `<button class="version-action" data-version-action="publish" data-version="${item.version}">发布</button>` : ''}</td></tr>`).join('');
      return `<div class="form-modal-overlay version-modal-overlay"><section class="form-modal version-dialog version-dialog--wide" role="dialog" aria-modal="true" aria-label="版本记录"><header><div><h2>${escapeHtml(row.name)} · 版本记录 <span class="new-requirement-tag">新增需求</span></h2><p>版本归属：${escapeHtml(versionScope)}；保留原名称及全部历史版本。</p></div>${closeButton}</header><div class="form-modal__body"><div class="version-history-toolbar new-feature"><div><strong>当前推荐版本：${row.currentVersion || 'V1'}</strong><span>新建版本入口归属于当前动力源/泵型号与模式，新建方案默认使用推荐版本。</span></div><button class="btn version-primary" id="history-new-version" type="button">新建版本</button></div><div class="table-shell version-history-table"><table class="data-table"><thead><tr><th>版本</th><th>状态</th><th>${versionInputLabel}</th><th>适用机型</th><th>变更说明</th><th>发布信息</th><th>操作</th></tr></thead><tbody>${versionRows}</tbody></table></div></div><footer><button class="btn btn--outline" id="version-modal-cancel" type="button">关闭</button></footer></section></div>`;
    }

    function suctionRange() {
      const start = Number(state.form.suction);
      const step = Number.parseInt(state.form.suctionStep, 10);
      const count = Number(state.form.gearCount);
      const end = start && step && count ? start + step * (count - 1) : 0;
      return { start, count, end };
    }

    function isFixedFrequency() {
      return state.form.frequencyStrategy === '定频' || state.form.frequencyStrategy === '固定频率';
    }

    function isVariableFrequency() {
      return state.form.frequencyStrategy === '变频' || state.form.frequencyStrategy === '随吸力递减';
    }

    function speedIsEnabled() {
      return isFixedFrequency() && ['3档', '5档'].includes(state.form.speedLevels);
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
      if (isFixedFrequency()) {
        const value = state.form[frequencyFieldKey('fixedFrequency', speedIndex)] || '未填写';
        return `${prefix}定频 ${value} CPM`;
      }
      if (isVariableFrequency()) {
        const start = state.form.startFrequency || '未选择';
        const step = state.form.frequencyStep || '未选择';
        const minimum = state.form.minimumFrequency || '未选择';
        return `变频预设“${state.form.variablePreset || '快'}”，随吸力递减：起始 ${start}，步进 ${step}，最低 ${minimum}`;
      }
      return `${prefix}未选择频率策略`;
    }

    function frequencyAt(rowIndex, speedIndex = 0) {
      const offset = Math.max(speedIndex - 1, 0);
      if (isVariableFrequency()) {
        const start = Number.parseInt(state.form.startFrequency, 10) || 70;
        const step = Number.parseInt(state.form.frequencyStep, 10) || 2;
        const minimum = Number.parseInt(state.form.minimumFrequency, 10) || 40;
        return Math.max(start - rowIndex * step, minimum);
      }
      const fixed = Number.parseInt(state.form[frequencyFieldKey('fixedFrequency', speedIndex)], 10);
      return Number.isFinite(fixed) && fixed > 0 ? fixed : 60 + offset * 5;
    }

    function frequencyMatrix(speedCount, frequencyOptions) {
      if (!state.form.frequencyStrategy) return '';
      const isFixed = isFixedFrequency();
      const headers = ['Speed 档位', '固定频率'];
      const rows = Array.from({ length: speedCount }, (_, index) => {
        const speedIndex = index + 1;
        if (isFixed) {
          const key = frequencyFieldKey('fixedFrequency', speedIndex);
          return `<strong class="speed-frequency-cell speed-frequency-label">Speed ${speedIndex}</strong><div class="speed-frequency-cell"><input class="control" data-field="${key}" type="number" placeholder="请输入" value="${state.form[key] || ''}" aria-label="Speed ${speedIndex} 固定频率"></div>`;
        }
        return '';
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
        fields = selectField('频率策略', 'frequencyStrategy', ['定频', '变频'], state.form.frequencyStrategy, false, true, 'new-feature');
        if (isFixedFrequency()) {
          fields += selectField('设备 Speed 档位数量', 'speedLevels', ['3档', '5档'], state.form.speedLevels, false, true, 'new-feature');
          if (speedIsEnabled()) supplementary = frequencyMatrix(selectedSpeedCount(), frequencyOptions);
        }
        if (isVariableFrequency()) {
          fields += selectField('变频预设方案', 'variablePreset', ['快', '中', '慢'], state.form.variablePreset, false, true, 'new-feature');
          fields += selectField('起始频率', 'startFrequency', frequencyOptions, state.form.startFrequency);
          fields += selectField('频率步进', 'frequencyStep', ['1 CPM', '2 CPM', '3 CPM', '4 CPM', '5 CPM'], state.form.frequencyStep);
          fields += selectField('最小频率', 'minimumFrequency', frequencyOptions, state.form.minimumFrequency);
          supplementary = '<p class="new-feature strategy-note"><strong>快／中／慢是变频预设方案，不是 Speed 档位。</strong>生成结果直接展示吸力与频率的对应关系，频率随吸力升高而递减。</p>';
        }
        action = '<button class="btn btn--primary step-next" type="button">下一步</button>';
      } else if (state.ruleStep === 3) {
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
        supplementary = '<p class="new-feature strategy-note">系统先根据频率计算单周期总时长，再按所选策略分配建压、保压和间歇时长。</p>';
        action = '<button class="btn btn--primary step-next" type="button">下一步</button>';
      } else {
        const frequencySummary = state.form.frequencyStrategy ? frequencyConfigText(speedIsEnabled() ? 1 : 0) : '未选择频率策略';
        fields = `<div class="new-feature generation-confirm"><strong>配置确认</strong><span>频率：${frequencySummary}</span><span>阶段时长：${state.form.durationStrategy || '未选择'}</span><span>${isFixedFrequency() ? `生成后按 Speed 1～${selectedSpeedCount()} 分页展示` : '生成后直接展示吸力与频率的对应关系'}</span></div>`;
        action = '<button class="btn btn--primary" id="generate" type="button">生成结果</button>';
      }
      return `<section class="form-card"><h2>模式单元生成规则</h2><div class="rule-workflow">
        <div class="step-list"><button class="step-button${state.ruleStep === 1 ? ' is-active' : ''}" data-step="1" type="button">步骤1: 吸力档位</button><button class="step-button new-feature-step${state.ruleStep === 2 ? ' is-active' : ''}" data-step="2" type="button">步骤2: 频率策略</button><button class="step-button new-feature-step${state.ruleStep === 3 ? ' is-active' : ''}" data-step="3" type="button">步骤3: 时长策略</button><button class="step-button new-feature-step${state.ruleStep === 4 ? ' is-active' : ''}" data-step="4" type="button">步骤4: 生成结果</button></div>
        <div class="step-content"><div class="rule-fields">${fields}</div>${supplementary}<div class="next-wrap">${action}</div></div>
      </div></section>`;
    }

    function emptyResults() {
      const { start, count, end } = suctionRange();
      const suctionSummary = end ? `${start}-${end} kPa / ${count} 档，用于生成结果表格的吸力行` : '请选择起始吸力、吸力步进和档位数量，用于生成结果表格的吸力行';
      const speedCount = selectedSpeedCount();
      const speedSummary = speedCount ? `定频，共 ${speedCount} 档 Speed` : isVariableFrequency() ? '变频，不区分 Speed 档位' : '未选择';
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
        <div class="new-feature-summary">2. 频率策略：${speedSummary}；${frequencySummary}</div><div>3. 时长策略：${durationSummary}</div><div class="new-feature-summary">4. 生成结果：${speedCount ? '按 Speed 分页展示' : '直接展示吸力与频率的对应关系'}</div>
        <div>最终结果：建压时间从关联动力源“${state.form.extra || '未选择'}”的建压表下拉选择，建压占空比按吸力 + 建压时间自动带出</div>
        <div>最终结果：卸压时间不可编辑，按吸力从关联动力源卸压表自动带出；用户仍可在表格中微调未锁定字段</div>
      </div><div class="result-layout"><div class="blank-panel">暂无数据，请配置规则后点击「生成」</div><div class="chart-panel"><h3>选中行曲线</h3><div class="blank-panel">暂无曲线数据，请先生成配置</div></div></div><div class="overview-empty"><h2>全档位吸力曲线总览</h2><p>暂无曲线数据，请先生成配置</p></div></section>`;
    }

    function detailResults(editable = false) {
      const speedCount = selectedSpeedCount();
      const activeSpeed = speedCount ? clampSpeedTab(state.resultSpeedTab) : 0;
      state.resultSpeedTab = activeSpeed || 1;
      const strategyLabel = isVariableFrequency()
        ? `${state.form.variablePreset || '快'} · 随吸力递减`
        : `定频 ${frequencyAt(0, activeSpeed)} CPM`;
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
      app.innerHTML = `<div class="admin-shell${state.collapsed ? ' is-collapsed' : ''}">${sidebar()}<main class="content-shell">${state.view === 'list' ? listView() : formView()}</main></div>${combinationModal()}${exportTemplateModal()}${versionModal()}`;
      bindEvents();
    }

    function bindVersionModalEvents() {
      if (!state.versionModal) return;
      const closeVersionModal = () => { state.versionModal = null; render(); };
      document.querySelector('#version-modal-close')?.addEventListener('click', closeVersionModal);
      document.querySelector('#version-modal-cancel')?.addEventListener('click', () => {
        if (state.versionModal?.type === 'compare') state.versionModal = { type: 'history', row: state.versionModal.row };
        else state.versionModal = null;
        render();
      });
      document.querySelector('.version-modal-overlay')?.addEventListener('click', event => { if (event.target.classList.contains('version-modal-overlay')) closeVersionModal(); });
      document.querySelector('#history-new-version')?.addEventListener('click', () => { state.versionModal = { type: 'create', row: state.versionModal.row }; render(); });
      document.querySelector('#version-create-confirm')?.addEventListener('click', () => {
        const row = state.versionModal.row;
        const versionNumber = document.querySelector('#version-number').value.trim();
        const medicalInput = document.querySelector('#version-medical').value.trim();
        const applicableModels = document.querySelector('#version-models').value.trim();
        const changeSummary = document.querySelector('#version-summary').value.trim();
        if (!versionNumber || !medicalInput || !applicableModels || !changeSummary) { showToast('请完整填写版本号、输入依据、适用机型和变更说明'); return; }
        if (!/^(?:V)?\d+(?:\.\d+)*$/i.test(versionNumber)) { showToast('版本号格式不正确，请输入 1.1、1.2 或 V3 等格式'); return; }
        if (versionsFor(row).some(item => item.version.toLowerCase() === versionNumber.toLowerCase())) { showToast('该版本号已存在，请输入新的版本号'); return; }
        versionsFor(row).unshift({ version: versionNumber, baseVersion: document.querySelector('#version-base').value, status: '草稿', current: false, medicalInput, applicableModels, changeSummary, publisher: '刘媛媛', publishTime: '未发布' });
        state.versionModal = { type: 'history', row };
        render();
        showToast('新版本草稿已创建');
      });
      document.querySelectorAll('[data-version-action]').forEach(button => button.addEventListener('click', () => {
        const row = state.versionModal.row;
        const version = versionsFor(row).find(item => item.version === button.dataset.version);
        if (!version) return;
        if (button.dataset.versionAction === 'compare') { state.versionModal = { type: 'compare', row, version: version.version }; render(); return; }
        if (button.dataset.versionAction === 'publish') {
          versionsFor(row).forEach(item => { if (item.current) { item.current = false; if (item.status === '发布') item.status = '历史版本'; } });
          version.current = true;
          version.status = '发布';
          version.publisher = '刘媛媛';
          version.publishTime = currentTimestamp();
          row.currentVersion = version.version;
          row.status = '发布';
          row.updater = '刘媛媛';
          row.time = version.publishTime;
          render();
          showToast(`${version.version} 已发布并设为当前推荐版本`);
        }
      }));
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
          if (action === 'version-history') { state.versionModal = { type: 'history', row }; render(); return; }
          if (action === 'new-version') { state.versionModal = { type: 'create', row }; render(); return; }
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
            if (field === 'frequencyStrategy' && isFixedFrequency() && !['3档', '5档'].includes(state.form.speedLevels)) state.form.speedLevels = '3档';
            if (field === 'frequencyStrategy' && isVariableFrequency()) {
              state.form.variablePreset = state.form.variablePreset || '快';
              if (!state.form.startFrequency || !state.form.frequencyStep || !state.form.minimumFrequency) {
                [state.form.startFrequency, state.form.frequencyStep, state.form.minimumFrequency] = ['70 CPM', '3 CPM', '45 CPM'];
              }
            }
            if (field === 'variablePreset') {
              const preset = { 快: ['70 CPM', '3 CPM', '45 CPM'], 中: ['60 CPM', '2 CPM', '40 CPM'], 慢: ['50 CPM', '1 CPM', '40 CPM'] }[state.form.variablePreset];
              if (preset) [state.form.startFrequency, state.form.frequencyStep, state.form.minimumFrequency] = preset;
            }
            if (['suction', 'suctionStep', 'frequencyStrategy', 'variablePreset', 'speedLevels', 'durationStrategy', 'motorType'].includes(field)) render();
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
          state.exportConfig = {
            type: button.dataset.export,
            suctionStart: 0,
            suctionStep: 1,
            suctionCount: 10,
            timeStart: 0,
            timeStep: 100,
            timeCount: 10,
            pulseCount: Number.parseInt(state.form.pulseCount, 10) || 4,
            generating: false
          };
          state.exportError = '';
          render();
        }));
        document.querySelectorAll('[data-export-config]').forEach(input => input.addEventListener('input', event => {
          if (state.exportConfig) state.exportConfig[event.currentTarget.dataset.exportConfig] = event.currentTarget.value;
        }));
        document.querySelectorAll('[data-pulse-count]').forEach(button => button.addEventListener('click', () => {
          if (!state.exportConfig || state.exportConfig.generating) return;
          state.exportConfig.pulseCount = Number(button.dataset.pulseCount);
          state.exportError = '';
          render();
        }));
        const closeExportModal = () => {
          if (state.exportConfig?.generating) return;
          state.exportConfig = null;
          state.exportError = '';
          render();
        };
        document.querySelector('#export-modal-close')?.addEventListener('click', closeExportModal);
        document.querySelector('#export-modal-cancel')?.addEventListener('click', closeExportModal);
        document.querySelector('.export-dialog-backdrop')?.addEventListener('click', event => {
          if (event.target.classList.contains('export-dialog-backdrop')) closeExportModal();
        });
        document.querySelector('#export-download')?.addEventListener('click', () => {
          const config = { ...state.exportConfig };
          try {
            numericSequence(config.suctionStart, config.suctionStep, config.suctionCount);
            if (config.type === 'pressure') numericSequence(config.timeStart, config.timeStep, config.timeCount);
            if (config.type === 'pressure' && state.form.motorType === '直线电机' && (!Number.isInteger(Number(config.pulseCount)) || Number(config.pulseCount) < 1 || Number(config.pulseCount) > 5)) throw new Error('脉冲频率数组组数必须是 1～5 的整数');
          } catch (error) {
            state.exportError = error.message;
            render();
            return;
          }
          state.exportConfig.generating = true;
          state.exportError = '';
          render();
          window.setTimeout(() => {
            try {
              if (config.type === 'pressure' && state.form.motorType === '直线电机') state.form.pulseCount = String(config.pulseCount);
              downloadMappingTemplate(config.type, config);
              state.exportConfig = null;
              render();
              showToast('模版已导出');
            } catch (error) {
              state.exportConfig = { ...config, generating: false };
              state.exportError = error.message || '模版生成失败，请重试';
              render();
            }
          }, 30);
        });
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
        document.querySelector('.form-modal-overlay:not(.export-dialog-backdrop)')?.addEventListener('click', event => { if (event.target.classList.contains('form-modal-overlay')) closeModal(); });
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
      bindVersionModalEvents();
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
      if (state.section === 'rhythm-libraries') {
        const values = {
          rank: state.form.rank || String(rhythmRows.length + 1),
          tags: state.form.tags || '推荐',
          name: state.form.name || '未命名韵律',
          displayName: state.form.displayName,
          code: state.form.code || `RHYTHM-${Math.max(...rhythmRows.map(row => row.id)) + 1}`,
          source: state.form.source,
          schedule: state.form.schedule,
          description: state.form.description,
          descriptionEn: state.form.descriptionEn,
          updater: '刘媛媛',
          time: currentTimestamp()
        };
        if (state.selected) Object.assign(state.selected, values);
        else rhythmRows.push({ id: Math.max(...rhythmRows.map(row => row.id)) + 1, status: '草稿', duration: '0', ...values });
        rhythmRows.sort((left, right) => Number(left.rank) - Number(right.rank));
      }
      showToast('保存成功');
      returnToList();
    }

    function returnToList() { state.view = 'list'; state.selected = null; state.modal = null; state.exportConfig = null; state.exportError = ''; render(); window.scrollTo(0, 0); }
    function showDialog(message, action) { dialogMessage.textContent = message; pendingAction = action; overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden', 'false'); document.querySelector('#dialog-confirm').focus(); }
    function hideDialog() { overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden', 'true'); pendingAction = null; }
    function showToast(message) { toast.textContent = message; toast.classList.add('is-open'); window.setTimeout(() => toast.classList.remove('is-open'), 1800); }
    document.querySelector('#dialog-close').addEventListener('click', hideDialog);
    document.querySelector('#dialog-cancel').addEventListener('click', hideDialog);
    document.querySelector('#dialog-confirm').addEventListener('click', () => { const action = pendingAction; hideDialog(); action?.(); });
    overlay.addEventListener('click', event => { if (event.target === overlay) hideDialog(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') hideDialog(); });
    render();
