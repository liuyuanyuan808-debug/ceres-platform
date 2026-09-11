    const rows = [
      {
        id: 8, name: '吸乳模式', code: 'SUCTION', status: '发布', currentVersion: 'V2', updater: '刘媛媛', time: '2026-09-03 11:20:00', source: 'Air2直线电机', description: '基于医学输入持续迭代的吸乳模式',
        versions: [
          {
            version: 'V2', status: '发布', current: true, medicalInput: '医学输入方案 B', applicableModels: 'Air 2、新一代机型', changeSummary: '新增频率快、频率中、频率慢三个变频预设', publisher: '刘媛媛', publishTime: '2026-09-03 11:20:00',
            snapshot: { extra: 'Air2直线电机', description: '基于医学输入更新的变频吸乳模式', suction: '10', suctionStep: '1（1倍）', gearCount: '8', frequencyStrategy: '变频', variablePreset: '频率快 / 频率中 / 频率慢', variableFastFrequency: '70', variableMediumFrequency: '60', variableSlowFrequency: '50', durationStrategy: '固定比例', durationRatio: '60% / 40%', pressureTime: '50 ms' }
          },
          {
            version: 'V1', status: '历史版本', current: false, medicalInput: '医学输入方案 A', applicableModels: 'V3、V3 Pro', changeSummary: '首版固定频率吸乳模式', publisher: '陈剑泽', publishTime: '2026-06-18 16:29:10',
            snapshot: { extra: 'Air2直线电机', description: '首版固定频率吸乳模式', suction: '10', suctionStep: '1（1倍）', gearCount: '8', frequencyStrategy: '定频', speedLevels: '', fixedFrequency: '60', durationStrategy: '固定时长', pressureTime: '50 ms' }
          }
        ]
      },
      { id: 7, name: 'Air2直线电机模式单元库', code: '111', status: '停用', updater: '池浩', time: '2026-08-19 11:04:26', source: 'Air2直线电机', description: 'Air2直线电机模式单元库-阿道夫垃圾地方拉近双方了解了福建建瓯放假哦我绿卡就是的老夫就撒了恐惧拉丁教父glad咯就' },
      { id: 6, name: '818模式单元2', code: '8182', status: '停用', updater: '池浩', time: '2026-08-18 19:03:42', source: '818动力源', description: '' },
      { id: 5, name: '818模式单元', code: '818', status: '发布', updater: '陈剑泽', time: '2026-08-18 16:29:10', source: '818动力源', description: '' }
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
      {
        id: 201, name: 'Air2直线电机模式库', code: '154848', source: 'Air2直线电机', modeType: '吸乳模式', status: '停用', updater: '陈剑泽', time: '2026-08-19 10:40:46', description: '',
        modeUnits: [{ modeUnitId: 8, name: '吸乳模式', code: 'SUCTION', version: 'V2', min: '10', max: '24', amount: '3' }]
      },
      {
        id: 202, name: '818模式2', code: '8182', source: '818动力源', modeType: '激活模式', status: '发布', updater: '陈剑泽', time: '2026-08-18 18:33:18', description: '',
        modeUnits: [{ modeUnitId: 5, name: '818模式单元', code: '818', version: 'V1', min: '5.1', max: '15.3', amount: '3' }]
      }
    ];

    const rhythmRows = [
      {
        id: 301, rank: '1', tags: '推荐', name: 'Milk Boost（默认内置）', displayName: '高效泌乳', code: '1', source: 'Air2直线电机', duration: '1200', currentVersion: 'V2', schedule: '20 min：刺激 2min + 吸乳 8min + 刺激 2min + 吸乳 8min', description: '顺利启动泌乳后，适合日常使用', descriptionEn: 'Most suitable for daily use after successful lactation.', status: '发布', updater: '刘媛媛', time: '2026-09-04 10:00:00',
        versions: [
          { version: 'V2', status: '发布', current: true, medicalInput: '韵律设计方案 B', applicableModels: 'Air 2', changeSummary: '增加中段二次刺激，优化日常泌乳节奏', publisher: '刘媛媛', publishTime: '2026-09-04 10:00:00', snapshot: { duration: '1200', schedule: '20 min：刺激 2min + 吸乳 8min + 刺激 2min + 吸乳 8min', description: '顺利启动泌乳后，适合日常使用', descriptionEn: 'Most suitable for daily use after successful lactation.', rhythmModes: [{ name: '刺激模式', code: 'STIMULATION', modeType: '激活模式', amount: '120' }, { name: '吸乳模式', code: 'SUCTION', modeType: '吸乳模式', amount: '480' }, { name: '刺激模式', code: 'STIMULATION', modeType: '激活模式', amount: '120' }, { name: '吸乳模式', code: 'SUCTION', modeType: '吸乳模式', amount: '480' }] } },
          { version: 'V1', status: '历史版本', current: false, medicalInput: '韵律设计方案 A', applicableModels: 'Air 2', changeSummary: '初版高效泌乳韵律', publisher: '陈剑泽', publishTime: '2026-06-18 16:29:10', snapshot: { duration: '1080', schedule: '18 min：刺激 2min + 吸乳 16min', description: '初版日常泌乳韵律', descriptionEn: 'Initial daily milk expression rhythm.', rhythmModes: [{ name: '刺激模式', code: 'STIMULATION', modeType: '激活模式', amount: '120' }, { name: '吸乳模式', code: 'SUCTION', modeType: '吸乳模式', amount: '960' }] } }
        ]
      },
      { id: 302, rank: '2', tags: '推荐', name: 'Quick Relief', displayName: '日间快吸', code: '2', source: '818动力源', duration: '540', currentVersion: 'V1.2', schedule: '9 min：刺激 1min + 吸乳 8min', description: '短时缓解奶涨，避免堵奶和奶量下降', descriptionEn: 'Quick engorgement relief, prevents clogs & supply drop.', status: '发布', updater: '刘媛媛', time: '2026-09-04 10:00:00' },
      { id: 303, rank: '3', tags: '推荐', name: 'Power pumping', displayName: '密集追奶', code: '3', source: 'Air2直线电机', duration: '2700', currentVersion: 'V1.1', schedule: '45 min：刺激 2min + 吸乳 13min + 暂停 5min + 刺激 2min + 吸乳 8min + 暂停 5min + 刺激 2min + 吸乳 8min', description: '当奶量下降时，及时提升；每天不超过 1 次', descriptionEn: 'Increase milk supply, no more than once a day.', status: '发布', updater: '刘媛媛', time: '2026-09-04 10:00:00' },
      { id: 304, rank: '4', tags: '场景', name: 'Before bed', displayName: '睡前场景', code: '4', source: '818动力源', duration: '1200', currentVersion: 'V1', schedule: '20 min：刺激 2min + 吸乳 8min + 刺激 2min + 混合 8min', description: '安静低噪音的柔和吸奶', descriptionEn: 'Gentle, low-noise expression for bedtime comfort.', status: '发布', updater: '刘媛媛', time: '2026-09-04 10:00:00' }
    ];

    const languagePackRows = [
      {
        id: 401, name: 'V3 Pro 中文语言包', code: 'LP-001', language: '简体中文', locale: 'zh-CN', version: 'V1.3.0', models: 'V3 Pro', firmware: 'V3.4.0+', size: '428 KB', status: '发布', updater: '陈剑泽', time: '2026-09-09 17:42:00', note: '更新专家韵律名称及设备提示文案', fileName: 'v3-pro-zh-cn-v1.3.0.zip',
        history: [
          { version: 'V1.3.0', status: '发布', note: '更新专家韵律名称及设备提示文案', updater: '陈剑泽', time: '2026-09-09 17:42:00' },
          { version: 'V1.2.0', status: '停用', note: '补充设备异常提示文案', updater: '池浩', time: '2026-08-20 16:30:00' }
        ],
        updateLogs: [
          { version: 'V1.3.0', type: '全量发布', target: 'V3 Pro · 全部渠道 · 全部设备', result: '发布中', operator: '陈剑泽', time: '2026-09-09 18:10:00' },
          { version: 'V1.3.0', type: '设备更新', target: 'V3P-A8F214', result: '更新成功', operator: '系统', time: '2026-09-10 14:26:00' },
          { version: 'V1.2.0', type: '停止发布', target: 'V3 Pro · 全部渠道', result: '已停止', operator: '池浩', time: '2026-09-07 20:12:00' }
        ]
      },
      {
        id: 402, name: 'V3 Pro English Pack', code: 'LP-002', language: 'English', locale: 'en-US', version: 'V1.2.1', models: 'V3 Pro', firmware: 'V3.4.0+', size: '412 KB', status: '发布', updater: '刘媛媛', time: '2026-09-10 09:45:00', note: 'Fix terminology for expert programs', fileName: 'v3-pro-en-us-v1.2.1.zip',
        history: [{ version: 'V1.2.1', status: '发布', note: 'Fix terminology for expert programs', updater: '刘媛媛', time: '2026-09-10 09:45:00' }],
        updateLogs: [
          { version: 'V1.2.1', type: '灰度发布', target: 'V3 Pro · Amazon US · 20% 设备', result: '发布中', operator: '刘媛媛', time: '2026-09-10 09:45:00' },
          { version: 'V1.2.1', type: '设备更新', target: 'V3P-B19C02', result: '写入失败', operator: '系统', time: '2026-09-10 14:22:00' }
        ]
      },
      {
        id: 403, name: 'V3 Pro Deutsch Pack', code: 'LP-003', language: 'Deutsch', locale: 'de-DE', version: 'V1.0.0', models: 'V3 Pro', firmware: 'V3.5.0+', size: '436 KB', status: '草稿', updater: '刘媛媛', time: '2026-09-10 11:06:00', note: '德语首版，等待测试设备验证', fileName: 'v3-pro-de-de-v1.0.0.zip',
        history: [{ version: 'V1.0.0', status: '草稿', note: '德语首版，等待测试设备验证', updater: '刘媛媛', time: '2026-09-10 11:06:00' }],
        updateLogs: [{ version: 'V1.0.0', type: '上传版本', target: 'V3 Pro · 德语', result: '草稿', operator: '刘媛媛', time: '2026-09-10 11:06:00' }]
      },
      {
        id: 404, name: 'Air 2 中文语言包', code: 'LP-014', language: '简体中文', locale: 'zh-CN', version: 'V1.1.0', models: 'Air 2', firmware: 'V2.8.0+', size: '405 KB', status: '停用', updater: '池浩', time: '2026-08-28 09:30:00', note: '历史版本，已由 V1.1.1 替代', fileName: 'air2-zh-cn-v1.1.0.zip',
        history: [{ version: 'V1.1.0', status: '停用', note: '历史版本，已由 V1.1.1 替代', updater: '池浩', time: '2026-08-28 09:30:00' }],
        updateLogs: [{ version: 'V1.1.0', type: '停止发布', target: 'Air 2 · 全部设备', result: '已停止', operator: '池浩', time: '2026-08-28 09:30:00' }]
      }
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
        columns: [['name', '名称'], ['code', '编码'], ['source', '关联动力源'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间'], ['currentVersion', '版本信息']],
        columnWidths: [190, 130, 170, 90, 110, 180, 130],
        newFeatureKeys: ['source', 'currentVersion']
      },
      'mode-libraries': {
        label: '模式库', title: '模式库列表管理', addLabel: '新增模式库', formTitle: '模式库配置', extraLabel: '关联动力源', extraKey: 'source', rows: modeLibraryRows,
        options: ['Air2直线电机', '818动力源'],
        columns: [['name', '名称'], ['code', '编码'], ['source', '关联动力源'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间']],
        columnWidths: [190, 130, 170, 90, 100, 180],
        newFeatureKeys: ['source']
      },
      'rhythm-libraries': {
        label: '韵律库', title: '韵律库列表管理', addLabel: '新增韵律库', formTitle: '韵律库配置', extraLabel: '关联动力源', extraKey: 'source', rows: rhythmRows,
        options: ['Air2直线电机', '818动力源'],
        columns: [['name', '名称'], ['code', '编码'], ['source', '关联动力源'], ['tags', '标签'], ['duration', '总时长（min）'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间'], ['currentVersion', '版本信息']],
        columnWidths: [180, 100, 160, 150, 110, 90, 100, 170, 130],
        newFeatureKeys: ['source', 'currentVersion']
      },
      'language-packs': {
        label: '语言包管理', title: '语言包列表管理', addLabel: '上传语言包', formTitle: '语言包配置', rows: languagePackRows,
        columns: [['name', '语言包'], ['language', '语种'], ['version', '当前版本'], ['models', '适用机型'], ['size', '大小'], ['status', '状态'], ['updater', '更新人'], ['time', '更新时间']],
        columnWidths: [210, 130, 120, 130, 90, 90, 100, 180]
      }
    };

    const initialSection = sections[window.location.hash.slice(1)] ? window.location.hash.slice(1) : 'mode-units';
    const state = { view: 'list', section: initialSection, collapsed: false, menuExpanded: true, languageMenuExpanded: true, query: '', status: 'all', selected: null, viewVersion: null, ruleStep: 1, resultSpeedTab: 1, generated: false, form: {}, modal: null, versionModal: null, languagePublish: null, exportConfig: null, exportError: '', modeUnits: [], rhythmModes: [], powerImports: { pressure: '', relief: '' }, resultAdjustments: {}, resultValidation: {} };
    const app = document.querySelector('#app');
    const overlay = document.querySelector('#overlay');
    const dialogMessage = document.querySelector('#dialog-message');
    const toast = document.querySelector('#toast');
    let pendingAction = null;

    const chevron = direction => `<svg viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="${direction === 'left' ? 'M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0' : 'M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512 340.864 831.872a30.59 30.59 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z'}"></path></svg>`;

    function sidebar() {
      const navItems = Object.entries(sections).filter(([key]) => key !== 'language-packs').map(([key, section]) =>
        `<a class="sidebar-menu__child${state.section === key ? ' is-active' : ''}" href="#${key}" data-section="${key}"><span class="sidebar-menu__icon sidebar-menu__icon--child"></span><span class="sidebar-menu__label">${section.label}</span></a>`
      ).join('');
      const languageItem = `<a class="sidebar-menu__child${state.section === 'language-packs' ? ' is-active' : ''}" href="#language-packs" data-section="language-packs"><span class="sidebar-menu__icon sidebar-menu__icon--child"></span><span class="sidebar-menu__label">语言包管理</span></a>`;
      return `<aside class="sidebar">
        <div class="brand-row">
          <div class="brand-logo" aria-hidden="true">C</div>
          <div class="brand"><strong>吸奶器管理系统</strong></div>
          <button class="icon-button" id="sidebar-toggle" type="button" aria-label="${state.collapsed ? '展开菜单' : '收起菜单'}">
            <svg class="hamburger" viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4-3.6 8-8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1 298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path></svg>
          </button>
        </div>
        <nav class="sidebar-menu" aria-label="主导航">
          <button class="sidebar-menu__parent${state.section !== 'language-packs' ? ' is-active' : ''}" id="menu-parent" type="button" aria-expanded="${state.menuExpanded}"><span class="sidebar-menu__icon"></span><span class="sidebar-menu__label">吸乳方案配置</span></button>
          <div class="sidebar-menu__children${state.menuExpanded ? '' : ' is-hidden'}">${navItems}</div>
          <button class="sidebar-menu__parent${state.section === 'language-packs' ? ' is-active' : ''}" id="language-menu-parent" type="button" aria-expanded="${state.languageMenuExpanded}"><span class="sidebar-menu__icon"></span><span class="sidebar-menu__label">多语言包</span></button>
          <div class="sidebar-menu__children${state.languageMenuExpanded ? '' : ' is-hidden'}">${languageItem}</div>
        </nav>
        <div class="user-footer"><div class="user-card">
          <img class="avatar-image" src="./assets/ceres-avatar.png" alt="">
          <div class="user-card__info"><span>当前登录</span><strong>刘媛媛</strong></div>
          <button class="icon-button logout-button" type="button" title="退出登录" aria-label="退出登录"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
        </div></div>
      </aside>`;
    }

    function statusTag(status, small = true) {
      const type = ['发布', '更新成功'].includes(status) ? 'success'
        : ['草稿'].includes(status) ? 'warning'
          : ['发布中', '验证中'].includes(status) ? 'primary'
            : ['写入失败', '下载失败'].includes(status) ? 'danger' : 'info';
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
      const versions = versionsFor(row).map(item => {
        const match = item.version.match(/^(V?)(\d+(?:\.\d+)*)$/i);
        return match ? { prefix: match[1], parts: match[2].split('.').map(Number) } : null;
      }).filter(Boolean);
      if (!versions.length) return 'V1';
      versions.sort((left, right) => {
        const length = Math.max(left.parts.length, right.parts.length);
        for (let index = 0; index < length; index += 1) {
          const difference = (right.parts[index] || 0) - (left.parts[index] || 0);
          if (difference) return difference;
        }
        return 0;
      });
      const latest = versions[0];
      const nextParts = [...latest.parts];
      nextParts[nextParts.length - 1] += 1;
      return `${latest.prefix || 'V'}${nextParts.join('.')}`;
    }
    function nextMajorRhythmVersion(row) {
      const draft = versionsFor(row).find(item => item.status === '草稿');
      if (draft) return draft.version;
      const highestMajor = versionsFor(row).reduce((highest, item) => {
        const match = String(item.version).match(/^(?:V)?(\d+)/i);
        return Math.max(highest, match ? Number(match[1]) : 0);
      }, 0);
      return `V${highestMajor + 1}`;
    }

    function nextLanguageVersion(row) {
      const match = String(row?.version || 'V1.0.0').match(/^V?(\d+)\.(\d+)\.(\d+)$/i);
      if (!match) return 'V1.0.0';
      return `V${match[1]}.${match[2]}.${Number(match[3]) + 1}`;
    }


    function versionCell(row) {
      const versions = versionsFor(row);
      const draft = versions.find(item => item.status === '草稿');
      return `<div class="version-cell"><strong>${row.currentVersion || 'V1'}</strong>${draft && draft.version !== row.currentVersion ? `<em>${draft.version} 草稿</em>` : ''}</div>`;
    }

    function listView() {
      const section = sections[state.section];
      const activeRows = section.rows;
      const visible = activeRows.filter(row => {
        const searchable = state.section === 'language-packs'
          ? [row.name, row.code, row.language, row.locale, row.models, row.version].join(' ')
          : [row.name, row.code].join(' ');
        const matchesQuery = !state.query || searchable.toLowerCase().includes(state.query.toLowerCase());
        const matchesStatus = state.status === 'all' || row.status === state.status;
        return matchesQuery && matchesStatus;
      });
      const counts = activeRows.reduce((acc, row) => (acc[row.status]++, acc), { 发布: 0, 草稿: 0, 停用: 0 });
      const versionedSection = state.section === 'mode-units' || state.section === 'rhythm-libraries';
      const isLanguagePack = state.section === 'language-packs';
      const isNewFeatureColumn = key => section.newFeatureKeys?.includes(key);
      const cellValue = (row, key) => {
        if (isLanguagePack && key === 'name') return `<span class="language-package-cell"><strong>${escapeHtml(row.name)}</strong><small>${escapeHtml(row.code)}</small></span>`;
        if (isLanguagePack && key === 'language') return `<span class="language-package-cell"><strong>${escapeHtml(row.language)}</strong><small>${escapeHtml(row.locale)}</small></span>`;
        if (isLanguagePack && key === 'version') return `<strong>${escapeHtml(row.version)}</strong>`;
        if (state.section === 'rhythm-libraries' && key === 'duration') {
          const minutes = Number(row.duration) / 60;
          return Number.isFinite(minutes) ? `${Number(minutes.toFixed(2))} min` : row.duration;
        }
        return row[key] || '';
      };
      const rowActions = row => {
        if (isLanguagePack) {
          return `<button data-action="view">查看</button><button data-action="new-version">新建版本</button><button data-action="publish">发布</button>`;
        }
        return `<button data-action="view">查看</button>${row.status !== '发布' ? '<button data-action="edit">编辑</button><button data-action="publish">发布</button><button class="danger" data-action="delete">删除</button>' : '<button data-action="disable">停用</button>'}`;
      };
      const tableRows = visible.length ? visible.map(row => `<tr data-id="${row.id}">
        ${section.columns.map(([key]) => `<td${(versionedSection && key === 'currentVersion') || isNewFeatureColumn(key) ? ' class="version-feature-cell"' : ''}>${key === 'status' ? statusTag(row.status) : key === 'currentVersion' ? versionCell(row) : `<span class="cell-text">${cellValue(row, key)}</span>`}</td>`).join('')}
        <td class="actions">${rowActions(row)}</td>
      </tr>`).join('') : `<tr class="empty-row"><td colspan="${section.columns.length + 1}">暂无数据</td></tr>`;
      const actionWidth = versionedSection || isLanguagePack ? 240 : 190;
      const columnWidths = section.columnWidths || section.columns.map(() => 128);
      const tableMinWidth = Math.max(830, columnWidths.reduce((sum, width) => sum + width, 0) + actionWidth);
      return `<section class="page-stack">
        <header class="page-header-bar"><h1>${section.title}</h1><div class="page-header-actions"><button class="btn btn--primary" id="add-unit">${section.addLabel}</button></div></header>
        <div class="list-page-body">
          <section class="filter-toolbar">
            <input class="control" id="search" maxlength="50" placeholder="${isLanguagePack ? '请输入语言包名称、编码、语种或版本' : '请输入名称或编码，回车键确认搜索'}" value="${state.query}">
            <div class="select-wrap"><select class="control" id="status-filter"><option value="all">全部状态</option><option value="草稿">草稿</option><option value="发布">发布</option><option value="停用">停用</option></select><svg class="select-caret" viewBox="0 0 1024 1024"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"></path></svg></div>
            <button class="btn btn--outline" id="reset">重置</button>
            <div class="filter-toolbar__counts"><span class="tag tag--success">发布 ${counts.发布}</span><span class="tag tag--warning">草稿 ${counts.草稿}</span><span class="tag tag--info">停用 ${counts.停用}</span></div>
          </section>
          <section class="list-table-card"><div class="table-panel"><div class="table-shell"><div class="data-table-scroll-region">
            <table class="data-table${state.section === 'rhythm-libraries' ? ' rhythm-list-table' : ''}" style="min-width:${tableMinWidth}px"><colgroup>${columnWidths.map(width => `<col style="width:${width}px">`).join('')}<col style="width:${actionWidth}px"></colgroup><thead><tr>${section.columns.map(([key, label]) => `<th${(versionedSection && key === 'currentVersion') || isNewFeatureColumn(key) ? ' class="version-feature-cell"' : ''}>${label}</th>`).join('')}<th>操作</th></tr></thead><tbody>${tableRows}</tbody></table>
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
      let viewSnapshot = null;
      state.form = {
        suction: '', suctionStep: '', gearCount: '', speedStrategy: '按 Speed 档位配置', speedLevels: '', frequencyStrategy: '', variablePreset: '', fixedFrequency: '', variableFastFrequency: '70', variableMediumFrequency: '60', variableSlowFrequency: '50',
        durationStrategy: '', durationRatio: '', workDurationPercent: '', pressureTime: '', holdTime: '', intervalTime: '',
        project: row?.project || '', motorType: '', pumpType: '', valveType: '', pulseCount: '4', frequencyMin: '', frequencyMax: '', holdMin: '', holdMax: '', intervalMin: '', intervalMax: '',
        modeType: row?.modeType || '', source: row?.source || '', tags: row?.tags || '', modalSelection: '', modalVersion: '', modalAmount: '3',
        ...savedConfig,
        editingVersion: '', versionUpdateSummary: '', isRevisionEdit: false,
        name: row?.name || '', code: row?.code || '', rank: row?.rank || '', displayName: row?.displayName || '', schedule: row?.schedule || '', description: row?.description || '', descriptionEn: row?.descriptionEn || '', extra: savedConfig.extra || row?.[section.extraKey] || '',
        locale: row?.locale || 'zh-CN', models: row?.models || 'V3 Pro', version: row?.version || 'V1.0.0', firmware: row?.firmware || '', note: row?.note || '', size: row?.size || '', fileName: row?.fileName || ''
      };
      state.viewVersion = row?.currentVersion || null;
      if (state.section === 'rhythm-libraries' && row) {
        const draftVersion = state.view === 'edit' && row.status === '停用' ? versionsFor(row).find(item => item.status === '草稿') : null;
        const selectedVersion = draftVersion || versionsFor(row).find(item => item.version === state.viewVersion) || versionsFor(row)[0];
        state.viewVersion = selectedVersion?.version || state.viewVersion;
        viewSnapshot = selectedVersion?.snapshot || null;
        if (viewSnapshot) Object.assign(state.form, viewSnapshot);
        if (state.view === 'edit' && row.status === '停用') {
          state.form.isRevisionEdit = true;
          state.form.editingVersion = draftVersion?.version || nextMajorRhythmVersion(row);
          state.form.versionUpdateSummary = draftVersion?.changeSummary || '';
        }
      }
      if (state.section === 'mode-units') {
        const draftVersion = row && state.view === 'edit' ? versionsFor(row).find(item => item.status === '草稿') : null;
        const selectedVersion = row ? draftVersion || versionsFor(row).find(item => item.version === state.viewVersion) || versionsFor(row)[0] : null;
        state.viewVersion = selectedVersion?.version || state.viewVersion;
        viewSnapshot = selectedVersion?.snapshot || null;
        if (viewSnapshot) Object.assign(state.form, viewSnapshot);
        if (state.view !== 'view') {
          state.form.isRevisionEdit = Boolean(row);
          state.form.editingVersion = draftVersion?.version || (row ? nextVersionFor(row) : 'V1');
          state.form.versionUpdateSummary = draftVersion?.changeSummary || '';
        }
      }
      if (state.section === 'language-packs' && state.view === 'new-version') {
        state.form.version = nextLanguageVersion(row);
        state.form.note = '';
        state.form.fileName = '';
      }
      if (!state.form.workDurationPercent && state.form.durationRatio) state.form.workDurationPercent = String(Number.parseFloat(state.form.durationRatio) || 60);
      if (savedConfig.speedEnabled && !savedConfig.speedStrategy) state.form.speedStrategy = '按 Speed 档位配置';
      if (['快', '中', '慢', '快 / 中 / 慢'].includes(state.form.variablePreset)) state.form.variablePreset = '频率快 / 频率中 / 频率慢';
      state.ruleStep = 1;
      state.resultSpeedTab = variableTypesEnabled() ? 2 : 1;
      state.generated = Boolean(row?.generated);
      state.modal = null;
      state.exportConfig = null;
      state.exportError = '';
      state.resultAdjustments = {};
      state.resultValidation = {};
      state.modeUnits = (row?.modeUnits || []).map(item => ({ ...item }));
      state.rhythmModes = (viewSnapshot?.rhythmModes || row?.rhythmModes || []).map(item => ({ ...item }));
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

    function languagePackageHistory(row) {
      const history = row?.history?.length ? row.history : [{
        version: state.form.version,
        status: row?.status || '草稿',
        note: state.form.note || '-',
        updater: row?.updater || '刘媛媛',
        time: row?.time || '-'
      }];
      const body = history.map(item => `<tr><td><strong>${escapeHtml(item.version)}</strong></td><td>${statusTag(item.status)}</td><td>${escapeHtml(item.note)}</td><td>${escapeHtml(item.updater)}<small>${escapeHtml(item.time)}</small></td></tr>`).join('');
      return `<section class="form-card language-history-card"><h2>历史版本</h2><div class="table-shell"><table class="data-table"><thead><tr><th>版本</th><th>状态</th><th>版本说明</th><th>更新信息</th></tr></thead><tbody>${body}</tbody></table></div></section>`;
    }

    function languagePackageUpdateLog(row) {
      const logs = row?.updateLogs || [];
      const body = logs.length ? logs.map(item => `<tr><td><strong>${escapeHtml(item.version)}</strong></td><td>${escapeHtml(item.type)}</td><td><span class="cell-text" title="${escapeHtml(item.target)}">${escapeHtml(item.target)}</span></td><td>${statusTag(item.result)}</td><td>${escapeHtml(item.operator)}</td><td>${escapeHtml(item.time)}</td></tr>`).join('') : '<tr class="empty-row"><td colspan="6">暂无更新记录</td></tr>';
      return `<section class="form-card language-update-log"><div class="form-card__header"><div><h2>更新日志</h2><p>统一记录语言包上传、发布及设备更新结果。</p></div></div><div class="table-shell"><table class="data-table"><thead><tr><th>版本</th><th>更新类型</th><th>发布范围 / 设备</th><th>结果</th><th>操作人</th><th>时间</th></tr></thead><tbody>${body}</tbody></table></div></section>`;
    }

    function languagePackageForm(isView) {
      const row = state.selected;
      if (isView) {
        return `<section class="form-card"><h2>语言包信息</h2><dl class="language-detail-grid">
          <dt>语言包名称</dt><dd>${escapeHtml(row.name)}</dd><dt>语言包编码</dt><dd>${escapeHtml(row.code)}</dd>
          <dt>语种</dt><dd>${escapeHtml(row.language)}（${escapeHtml(row.locale)}）</dd><dt>当前版本</dt><dd><strong>${escapeHtml(row.version)}</strong></dd>
          <dt>适用机型</dt><dd>${escapeHtml(row.models)}</dd><dt>最低固件版本</dt><dd>${escapeHtml(row.firmware)}</dd>
          <dt>文件大小</dt><dd>${escapeHtml(row.size)}</dd><dt>当前状态</dt><dd>${statusTag(row.status)}</dd>
          <dt>语言包文件</dt><dd>${escapeHtml(row.fileName)}</dd><dt>版本说明</dt><dd>${escapeHtml(row.note)}</dd>
        </dl></section>${languagePackageHistory(row)}${languagePackageUpdateLog(row)}`;
      }
      const title = state.view === 'new-version' ? `基于 ${escapeHtml(row.name)} 新建版本` : '上传语言包文件';
      return `<section class="form-card"><h2>${title}</h2><label class="language-file-drop">
        <input id="language-package-file" type="file" accept=".bin,.zip" hidden>
        <strong>${state.form.fileName ? escapeHtml(state.form.fileName) : '点击选择 .bin / .zip 文件'}</strong>
        <span>单个文件不超过 5 MB</span>
      </label></section>
      <section class="form-card"><h2>基础信息配置</h2><div class="form-grid">
        ${textField('语言包名称', 'name', state.form.name)}
        ${textField('语言包编码', 'code', state.form.code)}
        ${selectField('语种', 'locale', ['zh-CN', 'en-US', 'de-DE'], state.form.locale)}
        ${selectField('适用机型', 'models', ['V3 Pro', 'Air 2', '全部机型'], state.form.models)}
        ${textField('版本号', 'version', state.form.version)}
        ${textField('最低固件版本', 'firmware', state.form.firmware)}
        ${textField('版本说明', 'note', state.form.note, true, true)}
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
      return `<div class="curve-preview"><svg viewBox="0 0 900 240" role="img" aria-label="吸力曲线图表"><g class="chart-grid"><line x1="55" y1="25" x2="55" y2="205"></line><line x1="55" y1="205" x2="875" y2="205"></line><line x1="55" y1="160" x2="875" y2="160"></line><line x1="55" y1="115" x2="875" y2="115"></line><line x1="55" y1="70" x2="875" y2="70"></line></g><text x="8" y="25">吸力 kPa</text><text x="26" y="208">0</text><text x="20" y="163">10</text><text x="20" y="118">20</text><text x="20" y="73">30</text><polyline points="55,182 145,172 235,160 325,146 415,132 505,118 595,104 685,91 775,78 875,64"></polyline></svg><div class="preview-legend">${state.modeUnits.map(item => `<button type="button">${item.name} @ ${item.version} * ${item.amount}</button>`).join('')}</div></div>`;
    }

    function modeLibraryForm(isView) {
      const total = state.modeUnits.length;
      const rowsMarkup = total ? state.modeUnits.map((item, index) => `<tr><td>${index + 1}</td><td>${item.name}</td><td>${item.code}</td><td class="version-feature-cell"><div class="version-cell"><strong>${item.version}</strong><span>已锁定</span></div></td><td>${item.min}</td><td>${item.max}</td><td>${item.amount}</td><td>${statusTag('发布')}</td><td class="actions">${isView ? '-' : combinationActions(index, total, 'mode-unit')}</td></tr>`).join('') : '';
      return `<section class="form-card"><h2>基础信息配置</h2><div class="form-grid">
        ${textField('名称', 'name', state.form.name, false, false, isView)}${textField('编码', 'code', state.form.code, false, false, isView)}
        ${selectField('模式类型', 'modeType', ['激活模式', '吸乳模式', '舒缓模式', '混合模式', '特立独行', '其他', '测试', 'test'], state.form.modeType)}
        ${selectField('关联动力源', 'source', ['Air2直线电机', '818动力源'], state.form.source)}
        ${textField('描述', 'description', state.form.description, true, true, isView)}
      </div></section>
      <section class="form-card"><div class="form-card__header"><h2>模式单元组合配置 <span class="new-requirement-tag">锁定引用版本</span></h2>${isView ? '' : '<button class="btn btn--primary" id="add-combination" type="button">添加模式单元</button>'}</div>${total ? `<div class="table-shell combo-table"><table class="data-table" style="min-width:900px"><colgroup><col style="width:55px"><col style="width:135px"><col style="width:90px"><col style="width:115px"><col style="width:85px"><col style="width:85px"><col style="width:85px"><col style="width:75px"><col style="width:150px"></colgroup><thead><tr><th>顺序</th><th>模式单元名称</th><th>模式编码</th><th class="version-feature-cell">引用版本</th><th>最小吸力</th><th>最大吸力</th><th>循环次数</th><th>状态</th><th>操作</th></tr></thead><tbody>${rowsMarkup}</tbody></table></div>` : '<div class="combo-empty">暂无数据，请先添加模式单元</div>'}</section>
      <section class="form-card"><h2>模式库预览</h2>${modeLibraryPreview()}</section>`;
    }

    function rhythmPreview() {
      const total = state.rhythmModes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
      const minutes = Math.floor(total / 60);
      const seconds = total % 60;
      return `<div class="rhythm-preview"><strong>总执行时长 ${minutes}分${seconds}秒</strong>${total ? `<div class="rhythm-stages">${state.rhythmModes.map(item => `<div style="flex:${Math.max(1, Number(item.amount))}" aria-label="${item.name} · ${item.amount}s">${item.name} · ${item.amount}s</div>`).join('')}</div>` : ''}<p>总执行时长限制 1-7200s（当前 ${total}s）</p></div>`;
    }

    function versionSnapshotViewer(entityLabel, ariaLabel) {
      if (state.view !== 'view' || !state.selected) return '';
      const versions = versionsFor(state.selected);
      const active = versions.find(item => item.version === state.viewVersion) || versions[0];
      return `<section class="form-card rhythm-version-viewer new-feature"><div class="form-card__header"><div><h2>${entityLabel}版本查看</h2><p>切换版本可查看当时保存的完整配置，历史版本不会被覆盖。</p></div>${state.section === 'rhythm-libraries' ? '<button class="btn version-primary" id="view-version-log" type="button">版本记录</button>' : ''}</div><div class="rhythm-version-tabs" role="tablist" aria-label="${ariaLabel}">${versions.map(item => `<button class="rhythm-version-tab${item.version === active.version ? ' is-active' : ''}" type="button" role="tab" aria-selected="${item.version === active.version}" data-view-version="${escapeHtml(item.version)}"><strong>${escapeHtml(item.version)}</strong><span>${escapeHtml(item.status)}</span></button>`).join('')}</div><div class="rhythm-version-meta"><span>版本状态：<strong>${escapeHtml(active.status)}</strong></span><span>更新时间：<strong>${escapeHtml(active.publishTime || '未发布')}</strong></span><span>更新人：<strong>${escapeHtml(active.publisher || '-')}</strong></span><p>更新说明：${escapeHtml(active.changeSummary || '-')}</p></div></section>`;
    }

    function modeUnitVersionViewer() {
      return versionSnapshotViewer('模式单元', '模式单元版本');
    }

    function modeUnitVersionFields(isView) {
      if (isView) return '';
      return `<section class="form-card mode-unit-version-card new-feature"><div class="form-card__header"><div><h2>版本信息 <span class="new-requirement-tag">新增需求</span></h2><p>${state.selected ? '编辑内容将保存为新版本，发布后替换当前版本。' : '首个版本默认为 V1，请填写版本说明。'}</p></div></div><div class="form-grid">
        <label class="form-field"><span>版本号<em class="required"> *</em></span><input class="control" value="${escapeHtml(state.form.editingVersion)}" disabled><small>${state.selected ? '停用已发布版本后再编辑，版本号自动加一' : '首个版本默认为 V1'}，不支持修改</small></label>
        <label class="form-field form-field--wide"><span>版本说明<em class="required"> *</em></span><textarea class="control" data-field="versionUpdateSummary" placeholder="请说明本版本的配置内容或修改点">${escapeHtml(state.form.versionUpdateSummary)}</textarea></label>
      </div></section>`;
    }

    function rhythmVersionViewer() {
      return versionSnapshotViewer('韵律方案', '韵律方案版本');
    }

    function rhythmLibraryForm(isView) {
      const total = state.rhythmModes.length;
      const rowsMarkup = total ? state.rhythmModes.map((item, index) => `<tr><td>${index + 1}</td><td>${item.name}</td><td>${item.code}</td><td>${item.modeType}</td><td>${item.amount}</td><td>${statusTag('发布')}</td><td class="actions">${isView ? '-' : combinationActions(index, total, 'rhythm')}</td></tr>`).join('') : '';
      const revisionCard = state.form.isRevisionEdit ? `<section class="form-card rhythm-revision-card new-feature"><div class="form-card__header"><div><h2>版本信息 <span class="new-requirement-tag">自动生成</span></h2><p>本次编辑将保存为新版本，发布后替换当前版本。</p></div></div><div class="form-grid">
        <label class="form-field"><span>版本号<em class="required"> *</em></span><input class="control" value="${escapeHtml(state.form.editingVersion)}" disabled><small>系统自动生成，不支持修改</small></label>
        <label class="form-field form-field--wide"><span>版本更新说明<em class="required"> *</em></span><textarea class="control" data-field="versionUpdateSummary" placeholder="请说明本次修改内容">${escapeHtml(state.form.versionUpdateSummary)}</textarea></label>
      </div></section>` : '';
      return `${rhythmVersionViewer()}${revisionCard}<section class="form-card"><h2>基础信息配置</h2><div class="form-grid">
        ${textField('名称', 'name', state.form.name, false, false, isView)}
        <label class="form-field"><span>韵律 ID<em class="required"> *</em></span><input class="control" data-field="code" type="number" min="1" max="100" step="1" inputmode="numeric" placeholder="请输入 1～100 的整数" value="${escapeHtml(state.form.code || '')}" ${isView ? 'disabled' : ''}><small>韵律 ID 范围：1～100，不可重复</small></label>
        ${selectField('关联动力源', 'source', ['Air2直线电机', '818动力源'], state.form.source)}
        ${selectField('标签', 'tags', ['推荐', '场景'], state.form.tags)}
        ${textField('描述', 'description', state.form.description, true, true, isView)}
      </div></section>
      <section class="form-card"><div class="form-card__header"><h2>模式组合配置</h2>${isView ? '' : '<button class="btn btn--primary" id="add-combination" type="button">添加模式</button>'}</div>${total ? `<div class="table-shell combo-table"><table class="data-table"><colgroup><col style="width:55px"><col style="width:140px"><col style="width:100px"><col style="width:110px"><col style="width:145px"><col style="width:80px"><col style="width:150px"></colgroup><thead><tr><th>顺序</th><th>模式名称</th><th>模式编码</th><th>模式类型</th><th>循环时间（单位：s）</th><th>状态</th><th>操作</th></tr></thead><tbody>${rowsMarkup}</tbody></table></div>` : '<div class="combo-empty">暂无数据，请先添加模式</div>'}</section>
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
      const modeUnitOption = row => `${row.name} / ${row.code}`;
      const options = isModeUnit ? rows.map(modeUnitOption) : ['818模式2 / 8182', 'Air2直线电机模式库 / 154848'];
      const selectedModeUnit = isModeUnit ? rows.find(row => modeUnitOption(row) === state.form.modalSelection) || rows.find(row => row.status === '发布') || rows[0] : null;
      const selectableVersions = selectedModeUnit ? versionsFor(selectedModeUnit).filter(item => item.status !== '草稿') : [];
      const selectedVersion = state.form.modalVersion || selectedModeUnit?.currentVersion || selectableVersions[0]?.version || '';
      const versionField = isModeUnit ? `<label class="form-field form-field--wide new-feature"><span>引用模式单元版本<em class="required"> *</em></span><div class="select-wrap"><select class="control" data-field="modalVersion">${selectableVersions.map(version => `<option value="${escapeHtml(version.version)}"${version.version === selectedVersion ? ' selected' : ''}>${escapeHtml(version.version)}${version.current ? '（当前版本）' : '（历史版本）'}</option>`).join('')}</select><svg class="select-caret" viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"></path></svg></div><small>保存后锁定该版本；模式单元发布新版本时，本模式库不会自动升级。</small></label>` : '';
      return `<div class="form-modal-overlay"><section class="form-modal" role="dialog" aria-modal="true" aria-label="${isModeUnit ? '添加模式单元' : '添加模式'}"><header><div><h2>${isModeUnit ? '添加模式单元' : '添加模式'}</h2><p>${isModeUnit ? '选择模式单元并设置本次组合中的循环次数。' : '选择模式库配置并设置循环时间。'}</p></div><button class="dialog-close" id="modal-close" type="button" aria-label="关闭">×</button></header><div class="form-modal__body">
        ${selectField(isModeUnit ? '选择模式单元' : '选择模式', 'modalSelection', options, state.form.modalSelection || (isModeUnit ? modeUnitOption(selectedModeUnit) : ''), true)}
        ${versionField}
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
        return `<div class="form-modal-overlay version-modal-overlay"><section class="form-modal version-dialog" role="dialog" aria-modal="true" aria-label="附件副本"><header><div><h2>${versionEntityLabel}附件副本 <span class="new-requirement-tag">新增需求</span></h2><p>版本归属：${escapeHtml(versionScope)} · 从已有版本复制配置并创建可编辑副本</p></div>${closeButton}</header><div class="form-modal__body version-form new-feature">
          <label class="form-field"><span>基于版本<em class="required"> *</em></span><div class="select-wrap"><select class="control" id="version-base">${versions.filter(item => item.status !== '草稿').map(item => `<option value="${item.version}">${item.version}${item.current ? '（当前版本）' : ''}</option>`).join('')}</select><svg class="select-caret" viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"></path></svg></div></label>
          <label class="form-field"><span>新版本号<em class="required"> *</em></span><input class="control" id="version-number" value="${nextVersion}" placeholder="例如：1.1、1.2 或 V3"></label>
          <label class="form-field form-field--wide"><span>${versionInputLabel}<em class="required"> *</em></span><input class="control" id="version-medical" placeholder="${versionInputPlaceholder}"></label>
          <label class="form-field form-field--wide"><span>适用机型<em class="required"> *</em></span><input class="control" id="version-models" placeholder="例如：Air 2、新一代机型"></label>
          <label class="form-field form-field--wide"><span>版本变更说明<em class="required"> *</em></span><textarea class="control" id="version-summary" placeholder="说明本次医学参数和策略的变化"></textarea></label>
          <p class="version-rule-note">版本号支持 1.1、1.2、V3 等格式，且同一${versionEntityLabel}内不可重复。副本创建后保存为草稿；验证通过后在“版本记录”中发布，发布时才会替换当前版本。已使用旧版本的方案不会自动升级。</p>
        </div><footer><button class="btn btn--outline" id="version-modal-cancel" type="button">取消</button><button class="btn version-primary" id="version-create-confirm" type="button">创建附件副本</button></footer></section></div>`;
      }
      if (type === 'compare') {
        const target = versions.find(item => item.version === state.versionModal.version) || versions[0];
        const baseline = versions.find(item => item.current && item.version !== target.version) || versions.find(item => item.version !== target.version) || target;
        const compareRow = (label, left, right) => `<div class="version-compare-row"><strong>${label}</strong><span>${escapeHtml(left || '-')}</span><span class="version-change-value">${escapeHtml(right || '-')}</span></div>`;
        return `<div class="form-modal-overlay version-modal-overlay"><section class="form-modal version-dialog version-dialog--wide" role="dialog" aria-modal="true" aria-label="版本对比"><header><div><h2>版本对比 <span class="new-requirement-tag">新增需求</span></h2><p>${escapeHtml(row.name)}：${baseline.version} 与 ${target.version}</p></div>${closeButton}</header><div class="form-modal__body"><div class="version-compare-head"><span>对比项</span><strong>${baseline.version}</strong><strong>${target.version}</strong></div>${compareRow(versionInputLabel, baseline.medicalInput, target.medicalInput)}${compareRow('适用机型', baseline.applicableModels, target.applicableModels)}${compareRow('变更说明', baseline.changeSummary, target.changeSummary)}${compareRow('发布人', baseline.publisher, target.publisher)}</div><footer><button class="btn btn--outline" id="version-modal-cancel" type="button">返回版本记录</button></footer></section></div>`;
      }
      const versionRows = versions.map(item => `<tr><td><strong>${item.version}</strong></td><td>${statusTag(item.status)}</td><td>${escapeHtml(item.medicalInput)}</td><td>${escapeHtml(item.applicableModels)}</td><td>${escapeHtml(item.changeSummary)}</td><td>${escapeHtml(item.publisher)}<small>${escapeHtml(item.publishTime || '未发布')}</small></td><td class="actions"><button class="version-action" data-version-action="compare" data-version="${item.version}">对比</button>${state.section !== 'rhythm-libraries' && item.status === '草稿' ? `<button class="version-action" data-version-action="publish" data-version="${item.version}">发布</button>` : ''}</td></tr>`).join('');
      return `<div class="form-modal-overlay version-modal-overlay"><section class="form-modal version-dialog version-dialog--wide" role="dialog" aria-modal="true" aria-label="版本记录"><header><div><h2>${escapeHtml(row.name)} · 版本记录 <span class="new-requirement-tag">更新日志</span></h2><p>版本归属：${escapeHtml(versionScope)}；记录各版本的变更内容和发布信息。</p></div>${closeButton}</header><div class="form-modal__body"><div class="version-history-toolbar new-feature"><div><strong>当前版本：${row.currentVersion || 'V1'}</strong><span>${state.section === 'rhythm-libraries' ? '停用已发布韵律后，编辑并保存即可生成下一版本。' : '附件副本默认复制当前版本；已使用历史版本的方案不会自动升级。'}</span></div>${state.section === 'rhythm-libraries' ? '' : '<button class="btn version-primary" id="history-new-version" type="button">附件副本</button>'}</div><div class="table-shell version-history-table"><table class="data-table"><thead><tr><th>版本</th><th>状态</th><th>${versionInputLabel}</th><th>适用机型</th><th>更新说明</th><th>发布信息</th><th>操作</th></tr></thead><tbody>${versionRows}</tbody></table></div></div><footer><button class="btn btn--outline" id="version-modal-cancel" type="button">关闭</button></footer></section></div>`;
    }

    function languagePublishModal() {
      const row = state.languagePublish;
      if (!row) return '';
      return `<div class="form-modal-overlay"><section class="form-modal language-publish-dialog" role="dialog" aria-modal="true" aria-label="发布语言包"><header><div><h2>发布语言包</h2><p>${escapeHtml(row.name)} · ${escapeHtml(row.version)}</p></div><button class="dialog-close" id="language-publish-close" type="button" aria-label="关闭">×</button></header>
        <div class="form-modal__body language-publish-form">
          <label class="form-field"><span>发布方式<em class="required"> *</em></span><div class="select-wrap"><select class="control" id="language-release-mode"><option>测试白名单</option><option>灰度发布</option><option>全量发布</option></select><svg class="select-caret" viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"></path></svg></div></label>
          <label class="form-field"><span>渠道<em class="required"> *</em></span><div class="select-wrap"><select class="control" id="language-release-channel"><option>全部渠道</option><option>Amazon US</option><option>EU</option><option>中国大陆</option></select><svg class="select-caret" viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"></path></svg></div></label>
          <label class="form-field"><span>最低固件版本<em class="required"> *</em></span><input class="control" id="language-release-firmware" value="${escapeHtml(row.firmware)}"></label>
          <label class="form-field"><span>设备范围</span><input class="control" id="language-release-scope" placeholder="请输入设备 SN，多个用逗号分隔"></label>
          <label class="form-field form-field--wide"><span>发布说明<em class="required"> *</em></span><textarea class="control" id="language-release-note" placeholder="说明发布目的和验证重点"></textarea></label>
          <p class="language-release-note form-field--wide">停止发布只阻止新设备命中，不会恢复已经完成更新的设备。</p>
          <p class="language-release-error form-field--wide" id="language-release-error"></p>
        </div><footer><button class="btn btn--outline" id="language-publish-cancel" type="button">取消</button><button class="btn btn--primary" id="language-publish-confirm" type="button">确认发布</button></footer>
      </section></div>`;
    }

    function suctionRange() {
      const start = Number(state.form.suction);
      const step = Number.parseFloat(state.form.suctionStep);
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
      const count = Number.parseInt(state.form.speedLevels, 10);
      return isFixedFrequency() && Number.isInteger(count) && count >= 1 && count <= 10;
    }

    function selectedSpeedCount() {
      return speedIsEnabled() ? Number.parseInt(state.form.speedLevels, 10) || 1 : 0;
    }

    const variableTypes = [
      { label: '频率快', key: 'variableFastFrequency', fallback: 70 },
      { label: '频率中', key: 'variableMediumFrequency', fallback: 60 },
      { label: '频率慢', key: 'variableSlowFrequency', fallback: 50 }
    ];

    function variableTypesEnabled() {
      return isVariableFrequency() && state.form.variablePreset === '频率快 / 频率中 / 频率慢';
    }

    function selectedResultTabCount() {
      return selectedSpeedCount() || (variableTypesEnabled() ? variableTypes.length : 0);
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

    function variableTypeTabButtons(activeIndex) {
      return `<div class="speed-tabs" role="tablist" aria-label="变频预设方案">${variableTypes.map((type, index) => {
        const typeIndex = index + 1;
        return `<button class="speed-tab${activeIndex === typeIndex ? ' is-active' : ''}" type="button" role="tab" aria-selected="${activeIndex === typeIndex}" data-result-speed-tab="${typeIndex}">${type.label}</button>`;
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
        if (!variableTypesEnabled()) return '变频，未选择预设方案';
        const type = variableTypes[Math.max(speedIndex - 1, 0)] || variableTypes[0];
        return `${type.label}：${state.form[type.key] || '未填写'} CPM`;
      }
      if (state.form.frequencyStrategy === '手动设置') return '手动设置：生成后逐档填写频率';
      return `${prefix}未选择频率策略`;
    }

    function frequencyAt(rowIndex, speedIndex = 0) {
      const offset = Math.max(speedIndex - 1, 0);
      if (isVariableFrequency()) {
        if (!variableTypesEnabled()) return 60;
        const type = variableTypes[Math.max(speedIndex - 1, 0)] || variableTypes[0];
        return Number.parseInt(state.form[type.key], 10) || type.fallback;
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

    function variableTypeFrequencyMatrix() {
      const rows = variableTypes.map(type => `<strong class="speed-frequency-cell speed-frequency-label">${type.label}</strong><div class="speed-frequency-cell"><input class="control" data-field="${type.key}" type="number" min="1" placeholder="请输入" value="${state.form[type.key] || ''}" aria-label="${type.label}"></div>`).join('');
      return `<div class="new-feature speed-frequency-matrix"><div class="speed-frequency-grid speed-frequency-grid--fixed"><strong class="speed-frequency-cell speed-frequency-head">变频预设方案</strong><strong class="speed-frequency-cell speed-frequency-head">频率 CPM<em class="required"> *</em></strong>${rows}</div></div>`;
    }

    function ruleCard() {
      const is818Source = state.form.extra === '818动力源';
      const suctionOptions = is818Source
        ? Array.from({ length: 9 }, (_, index) => ((index + 1) * 5.1).toFixed(1))
        : Array.from({ length: 15 }, (_, index) => String(index + 10));
      const suctionSteps = is818Source
        ? Array.from({ length: 5 }, (_, index) => `${((index + 1) * 5.1).toFixed(1)}（${index + 1}倍）`)
        : ['1（1倍）', '2（2倍）', '3（3倍）', '4（4倍）', '5（5倍）'];
      const frequencyOptions = ['40 CPM', '45 CPM', '50 CPM', '55 CPM', '60 CPM', '65 CPM', '68 CPM', '70 CPM', '75 CPM', '80 CPM'];
      const pressureTimes = ['30 ms', '40 ms', '50 ms', '60 ms', '70 ms', '80 ms'];
      let fields = '';
      let supplementary = '';
      let action = '';
      if (state.ruleStep === 1) {
        const { start, count, end } = suctionRange();
        const estimate = end ? `${start}-${Number(end.toFixed(1))} kPa / ${count} 档` : '请选择起始吸力、吸力步进和档位数量';
        fields = `${selectField('起始吸力（kPa）', 'suction', suctionOptions, state.form.suction)}${selectField('吸力步进（kPa）', 'suctionStep', suctionSteps, state.form.suctionStep)}${textField('档位数量', 'gearCount', state.form.gearCount, false, false, false, 'number')}`;
        supplementary = `<div class="estimate"><strong>预计生成吸力列表</strong><span>${estimate}</span></div>`;
        action = `<button class="btn btn--primary step-next" type="button" ${end ? '' : 'disabled'}>下一步</button>`;
      } else if (state.ruleStep === 2) {
        const frequencyClass = isFixedFrequency() || isVariableFrequency() ? 'new-feature' : '';
        fields = selectField('频率策略', 'frequencyStrategy', ['手动设置', '定频', '变频'], state.form.frequencyStrategy, false, true, frequencyClass);
        if (isFixedFrequency()) {
          const speedLevelOptions = Array.from({ length: 10 }, (_, index) => `${index + 1}档`);
          fields += selectField('设备 Speed 档位数量', 'speedLevels', speedLevelOptions, state.form.speedLevels, false, true, 'new-feature');
          if (speedIsEnabled()) supplementary = frequencyMatrix(selectedSpeedCount(), frequencyOptions);
        }
        if (isVariableFrequency()) {
          fields += selectField('变频预设方案', 'variablePreset', ['频率快 / 频率中 / 频率慢'], state.form.variablePreset, false, false, 'new-feature');
          supplementary = variableTypesEnabled()
            ? `${variableTypeFrequencyMatrix()}<p class="new-feature strategy-note"><strong>频率快、频率中、频率慢是三个变频预设方案，不是 Speed 档位。</strong>生成结果按三个频率方案 Tab 展示。</p>`
            : '<p class="new-feature strategy-note"><strong>变频预设方案为可选项。</strong>不选择时直接生成结果；选择后同时生成“频率快、频率中、频率慢”三个方案并分别配置频率。</p>';
        }
        if (state.form.frequencyStrategy === '手动设置') {
          supplementary = '<p class="legacy-strategy-note">生成表格后，按每个吸力档位手动填写频率。</p>';
        }
        const frequencyReady = state.form.frequencyStrategy === '手动设置' || isVariableFrequency() || speedIsEnabled();
        action = `<button class="btn btn--primary step-next" type="button" ${frequencyReady ? '' : 'disabled'}>下一步</button>`;
      } else {
        fields = selectField('阶段时长策略', 'durationStrategy', ['手动设置', '固定比例', '固定时长'], state.form.durationStrategy);
        if (state.form.durationStrategy === '固定比例') {
          fields += `<div class="rule-field-row rule-field-row--single">${selectField('工作时长百分比（%）', 'workDurationPercent', ['60 / 40', '70 / 30', '80 / 20', '85 / 15', '90 / 10'], state.form.workDurationPercent)}</div>`;
        }
        if (state.form.durationStrategy === '固定时长') {
          fields += `<div class="rule-field-row">${selectField('建压时间（单位：ms）', 'pressureTime', pressureTimes, state.form.pressureTime)}${textField('保压时间（单位：ms）', 'holdTime', state.form.holdTime, false, false, false, 'number')}<label class="form-field"><span>间歇时间（单位：ms）<em class="required"> *</em></span><input class="control" data-field="intervalTime" type="number" min="150" step="10" placeholder="不低于 150" value="${state.form.intervalTime}"></label></div>`;
        }
        const durationReady = state.form.durationStrategy === '手动设置'
          || (state.form.durationStrategy === '固定比例' && Number.parseFloat(state.form.workDurationPercent) >= 60 && Number.parseFloat(state.form.workDurationPercent) <= 90)
          || (state.form.durationStrategy === '固定时长' && state.form.pressureTime && Number(state.form.holdTime) >= 0 && state.form.holdTime !== '' && Number(state.form.intervalTime) >= 150 && state.form.intervalTime !== '');
        action = `<button class="btn btn--primary" id="generate" type="button" ${durationReady ? '' : 'disabled'}>生成</button>`;
      }
      return `<section class="form-card"><h2>模式单元生成规则</h2><div class="rule-workflow">
        <div class="step-list"><button class="step-button${state.ruleStep === 1 ? ' is-active' : ''}" data-step="1" type="button">步骤1: 吸力档位</button><button class="step-button new-feature-step${state.ruleStep === 2 ? ' is-active' : ''}" data-step="2" type="button">步骤2: 频率策略</button><button class="step-button${state.ruleStep === 3 ? ' is-active' : ''}" data-step="3" type="button">步骤3: 阶段时长</button></div>
        <div class="step-content"><div class="rule-fields">${fields}</div>${supplementary}<div class="next-wrap">${action}</div></div>
      </div></section>`;
    }

    function emptyResults() {
      const { start, count, end } = suctionRange();
      const suctionSummary = end ? `${start}-${end} kPa / ${count} 档，用于生成结果表格的吸力行` : '请选择起始吸力、吸力步进和档位数量，用于生成结果表格的吸力行';
      const speedCount = selectedSpeedCount();
      const typeCount = variableTypesEnabled() ? variableTypes.length : 0;
      const speedSummary = speedCount
        ? `定频，共 ${speedCount} 档 Speed`
        : isVariableFrequency()
          ? `变频，${typeCount ? '已启用频率快 / 频率中 / 频率慢' : '未选择预设方案'}`
          : state.form.frequencyStrategy === '手动设置' ? '手动设置' : '未选择';
      const frequencySummary = speedCount && state.form.frequencyStrategy
        ? Array.from({ length: speedCount }, (_, index) => frequencyConfigText(index + 1)).join('；')
        : typeCount ? variableTypes.map((_, index) => frequencyConfigText(index + 1)).join('；') : frequencyConfigText(0);
      let durationSummary = '未选择阶段时长策略';
      if (state.form.durationStrategy === '手动设置') durationSummary = '手动设置';
      if (state.form.durationStrategy === '固定比例') durationSummary = `固定比例：(A+B)/(C+D) = ${state.form.workDurationPercent || '未选择'}`;
      if (state.form.durationStrategy === '固定时长') durationSummary = `固定时长：建压 ${state.form.pressureTime || '未选择'}，保压 ${state.form.holdTime || '未填写'} ms，间歇 ${state.form.intervalTime || '未填写'} ms`;
      return `<section class="form-card"><h2>生成结果表格，在表格中进行微调</h2><div class="rule-summary">
        <div>1. 吸力档位：${suctionSummary}</div>
        <div>吸力步进：由关联动力源的参数范围提供可选值</div>
        <div class="new-feature-summary">2. 频率策略：${speedSummary}；${frequencySummary}</div>
        <div>3. 阶段时长：${durationSummary}</div>
        <div>最终结果：建压参数和卸压参数由关联动力源映射表带出</div>
      </div><div class="result-layout"><div class="blank-panel">暂无数据，请配置规则后点击「生成」</div><div class="chart-panel"><h3>选中行曲线</h3><div class="blank-panel">暂无曲线数据，请先生成配置</div></div></div><div class="overview-empty"><h2>全档位吸力曲线总览</h2><p>暂无曲线数据，请先生成配置</p></div></section>`;
    }

    function modeUnitPowerSource() {
      const sourceName = state.form.extra || state.form.source;
      return powerSourceRows.find(item => item.name === sourceName) || powerSourceRows[0];
    }

    function nearestMappingRow(mappingRows, suction) {
      return mappingRows.reduce((nearest, row) => Math.abs(Number(row[0]) - suction) < Math.abs(Number(nearest[0]) - suction) ? row : nearest, mappingRows[0]);
    }

    function pressureMappingValue(powerSource, suction, pressureTime) {
      const row = nearestMappingRow(powerSource.pressureRows, suction);
      const mappedTimes = [30, 40, 50, 60];
      const nearestTimeIndex = mappedTimes.reduce((nearest, time, index) => Math.abs(time - pressureTime) < Math.abs(mappedTimes[nearest] - pressureTime) ? index : nearest, 0);
      return row[nearestTimeIndex + 1];
    }

    function reliefMappingValue(powerSource, suction) {
      const baseValue = Number(nearestMappingRow(powerSource.reliefRows, suction)[1]);
      if (powerSource.config.motorType !== '直线电机') return String(baseValue);
      const pulseCount = Math.min(Math.max(Number(powerSource.config.pulseCount) || 4, 1), 5);
      return `[${Array.from({ length: pulseCount }, (_, index) => baseValue + index * 2).join(', ')}]`;
    }

    function resultScopeKey(activeTab) {
      if (selectedSpeedCount()) return `speed-${activeTab}`;
      if (variableTypesEnabled()) return `type-${activeTab}`;
      return "manual";
    }

    function resultRowKey(activeTab, rowIndex) {
      return `${resultScopeKey(activeTab)}-${rowIndex}`;
    }

    function numericBoundary(config, key) {
      const value = Number(config?.[key]);
      return Number.isFinite(value) ? value : null;
    }

    function resultLimitReason(powerSource, values) {
      const config = powerSource.config || {};
      const frequencyMin = numericBoundary(config, "frequencyMin");
      const frequencyMax = numericBoundary(config, "frequencyMax");
      const holdMin = numericBoundary(config, "holdMin");
      const holdMax = numericBoundary(config, "holdMax");
      const intervalMin = Math.max(numericBoundary(config, "intervalMin") ?? 0, 150);
      const intervalMax = numericBoundary(config, "intervalMax");
      const reasons = [];
      if (frequencyMin !== null && values.frequency < frequencyMin) reasons.push(`频率不得低于 ${frequencyMin} CPM`);
      if (frequencyMax !== null && values.frequency > frequencyMax) reasons.push(`频率不得高于 ${frequencyMax} CPM`);
      if (holdMin !== null && values.hold < holdMin) reasons.push(`保压时间不得低于 ${holdMin} ms`);
      if (holdMax !== null && values.hold > holdMax) reasons.push(`保压时间不得高于 ${holdMax} ms`);
      if (values.interval < intervalMin) reasons.push(`间歇时间不得低于 ${intervalMin} ms`);
      if (intervalMax !== null && values.interval > intervalMax) reasons.push(`间歇时间不得高于 ${intervalMax} ms`);
      if (values.actualWorkPercent < 60) reasons.push("工作时长占比不得低于 60%");
      return reasons.join("；");
    }

    function sourceBoundaryPanel(powerSource) {
      const config = powerSource.config || {};
      const range = (minKey, maxKey, unit) => `${config[minKey] || "-"}～${config[maxKey] || "-"} ${unit}`;
      return `<div class="source-boundary-panel">
        <div class="source-boundary-panel__title"><strong>当前动力源参数范围</strong><span>${escapeHtml(powerSource.name)}</span></div>
        <div class="source-boundary-panel__items">
          <span><em>频率</em>${range("frequencyMin", "frequencyMax", "CPM")}</span>
          <span><em>保压时间</em>${range("holdMin", "holdMax", "ms")}</span>
          <span><em>间歇时间</em>${range("intervalMin", "intervalMax", "ms")}</span>
        </div>
        <p>微调需满足动力源范围；间歇时间还需满足系统下限 150 ms。</p>
      </div>`;
    }

    function detailResults(editable = false) {
      const speedCount = selectedSpeedCount();
      const typeCount = variableTypesEnabled() ? variableTypes.length : 0;
      const resultTabCount = speedCount || typeCount;
      const activeSpeed = resultTabCount ? Math.min(Math.max(Number(state.resultSpeedTab) || 1, 1), resultTabCount) : 0;
      state.resultSpeedTab = activeSpeed || 1;
      const strategyLabel = isVariableFrequency()
        ? typeCount ? frequencyConfigText(activeSpeed) : "变频，未选择预设方案"
        : isFixedFrequency() ? `定频 ${frequencyAt(0, activeSpeed)} CPM` : "手动设置";
      const speedBar = resultTabCount
        ? `<div class="result-speed-bar">${speedCount ? speedTabButtons(activeSpeed, speedCount) : variableTypeTabButtons(activeSpeed)}<div class="new-feature result-speed-summary"><strong>${speedCount ? `当前 Speed：Speed ${activeSpeed}` : `当前方案：${variableTypes[activeSpeed - 1].label}`}</strong><span>频率策略：${strategyLabel}</span></div></div>`
        : "";
      const frequencyHeader = resultTabCount
        ? `<th class="new-feature-column">频率 CPM<span class="column-unit">${speedCount ? `Speed ${activeSpeed}` : variableTypes[activeSpeed - 1].label}</span></th>`
        : "<th>频率 CPM</th>";
      const rowCount = Math.min(Math.max(Number(state.form.gearCount) || 8, 1), 15);
      const suctionStart = Number(state.form.suction) || 10;
      const suctionStep = Number.parseFloat(state.form.suctionStep) || 1;
      const powerSource = modeUnitPowerSource();
      const is818Source = powerSource.name === "818动力源";
      const selectableSuctions = is818Source
        ? Array.from({ length: 9 }, (_, index) => Number(((index + 1) * 5.1).toFixed(1)))
        : Array.from({ length: 15 }, (_, index) => index + 10);
      const isLinearMotor = powerSource.config.motorType === "直线电机";
      const pressureParameterHeader = isLinearMotor ? "脉冲频率数组" : "建压占空比 %";
      const reliefParameterHeader = isLinearMotor ? "泄压时间数组 ms" : "泄压时间 ms";
      const targetWorkPercent = Math.min(Math.max(Number.parseFloat(state.form.workDurationPercent) || 60, 60), 90);
      const detailRows = Array.from({ length: rowCount }, (_, rowIndex) => {
        const key = resultRowKey(activeSpeed, rowIndex);
        const saved = state.resultAdjustments[key] || {};
        const suction = Number(saved.suction ?? (suctionStart + rowIndex * suctionStep).toFixed(1));
        const frequency = Math.max(Number(saved.frequency) || frequencyAt(rowIndex, activeSpeed), 1);
        const pressure = Number(saved.pressure ?? (Number.parseInt(state.form.pressureTime, 10) || 50));
        const pressureParameter = pressureMappingValue(powerSource, suction, pressure);
        const reliefParameter = reliefMappingValue(powerSource, suction);
        const relief = Number.parseInt(String(reliefParameter).replace("[", ""), 10) || 24;
        const total = Math.round(60000 / frequency);
        let interval = Math.max(150, total - Math.round(total * targetWorkPercent / 100) - relief);
        let hold = Math.max(total - pressure - relief - interval, 0);
        if (state.form.durationStrategy === "固定时长") {
          interval = Math.max(Number(state.form.intervalTime) || 150, 150);
          hold = Number(state.form.holdTime) || Math.max(total - pressure - relief - interval, 0);
        }
        if (Number.isFinite(Number(saved.hold))) hold = Number(saved.hold);
        if (Number.isFinite(Number(saved.interval))) interval = Number(saved.interval);
        const actualWorkPercent = total > 0 ? Math.round((pressure + hold) / total * 100) : 0;
        const invalidReason = resultLimitReason(powerSource, { frequency, hold, interval, actualWorkPercent });
        state.resultValidation[key] = invalidReason;
        const suctionOptions = selectableSuctions.map(value => `<option${Math.abs(value - suction) < 0.01 ? " selected" : ""}>${value}</option>`).join("");
        const pressureOptions = [30, 40, 50, 60, 70, 80].map(value => `<option${value === pressure ? " selected" : ""}>${value}</option>`).join("");
        const disabled = editable ? "" : "disabled";
        const arrayClass = isLinearMotor ? " mapped-array-value" : "";
        return `<tr data-result-row="${rowIndex}" data-result-key="${key}" class="${invalidReason ? "result-row-invalid" : ""}"><td>${rowIndex + 1}</td><td><select ${disabled} data-result-field="suction">${suctionOptions}</select></td><td><select ${disabled} data-result-field="pressure">${pressureOptions}</select></td><td><input disabled class="${arrayClass}" data-result-mapped-pressure value="${escapeHtml(pressureParameter)}"></td><td><input ${disabled} data-result-field="hold" type="number" min="${powerSource.config.holdMin}" max="${powerSource.config.holdMax}" step="10" value="${hold}"></td><td><input disabled class="${arrayClass}" data-result-relief value="${escapeHtml(reliefParameter)}"></td><td><input ${disabled} data-result-field="interval" type="number" min="${Math.max(Number(powerSource.config.intervalMin) || 0, 150)}" max="${powerSource.config.intervalMax}" step="10" value="${interval}"></td><td class="${resultTabCount ? "new-feature-column" : ""}"><input ${disabled} data-result-field="frequency" type="number" min="${powerSource.config.frequencyMin}" max="${powerSource.config.frequencyMax}" value="${frequency}"></td><td><input disabled data-result-total value="${total}"></td><td class="result-ratio-cell ${invalidReason ? "is-invalid" : ""}" data-result-ratio title="${escapeHtml(invalidReason)}"><strong>${actualWorkPercent} / ${100 - actualWorkPercent}</strong><small>目标 ${targetWorkPercent} / ${100 - targetWorkPercent}</small></td></tr>`;
      }).join("");
      const invalidCount = Object.values(state.resultValidation).filter(Boolean).length;
      return `<section class="form-card"><h2>生成结果表格，在表格中进行微调</h2>${speedBar}${sourceBoundaryPanel(powerSource)}<div class="result-rule-status ${invalidCount ? "is-invalid" : ""}"><span>间歇时间 ≥ 150 ms</span><span>工作时长占比 ≥ 60%</span><strong>${invalidCount ? `${invalidCount} 行不符合策略，暂不可保存` : "当前参数符合策略"}</strong></div><div class="detail-table table-shell"><table class="data-table" style="min-width:${isLinearMotor ? 1320 : 1160}px"><thead><tr><th>档位</th><th>吸力 kPa</th><th>建压时间 ms</th><th>${pressureParameterHeader}</th><th>保压时间 ms</th><th>${reliefParameterHeader}</th><th>间歇时间 ms</th>${frequencyHeader}<th>总时长 ms</th><th>实际比例<span class="column-unit">(A+B)/(C+D)</span></th></tr></thead><tbody>${detailRows}</tbody></table></div></section>`;
    }

    function updateResultRow(control) {
      const row = control.closest("tr[data-result-row]");
      if (!row) return;
      const rowIndex = Number(row.dataset.resultRow);
      const key = row.dataset.resultKey;
      const field = control.dataset.resultField;
      const adjustment = state.resultAdjustments[key] || {};
      adjustment.suction = Number(row.querySelector("[data-result-field=suction]").value);
      adjustment.pressure = Number(row.querySelector("[data-result-field=pressure]").value);
      adjustment.frequency = Math.max(Number(row.querySelector("[data-result-field=frequency]").value) || 1, 1);
      const powerSource = modeUnitPowerSource();
      const mappedPressure = pressureMappingValue(powerSource, adjustment.suction, adjustment.pressure);
      const reliefParameter = reliefMappingValue(powerSource, adjustment.suction);
      const relief = Number.parseInt(String(reliefParameter).replace("[", ""), 10) || 24;
      const total = Math.round(60000 / adjustment.frequency);
      const targetWorkPercent = Math.min(Math.max(Number.parseFloat(state.form.workDurationPercent) || 60, 60), 90);
      let hold = Number(row.querySelector("[data-result-field=hold]").value) || 0;
      let interval = Number(row.querySelector("[data-result-field=interval]").value) || 0;
      if (["frequency", "pressure", "suction"].includes(field)) {
        interval = Math.max(150, total - Math.round(total * targetWorkPercent / 100) - relief);
        hold = Math.max(total - adjustment.pressure - relief - interval, 0);
      } else if (field === "hold") {
        hold = Math.max(Math.round(Number(control.value) / 10) * 10, 0);
        interval = total - adjustment.pressure - relief - hold;
      } else if (field === "interval") {
        interval = Math.round(Number(control.value) / 10) * 10;
        hold = total - adjustment.pressure - relief - interval;
      }
      adjustment.hold = hold;
      adjustment.interval = interval;
      state.resultAdjustments[key] = adjustment;
      if (field === "frequency" && isFixedFrequency()) state.form[frequencyFieldKey("fixedFrequency", state.resultSpeedTab)] = String(adjustment.frequency);
      if (field === "frequency" && variableTypesEnabled()) state.form[variableTypes[state.resultSpeedTab - 1].key] = String(adjustment.frequency);
      const actualWorkPercent = total > 0 ? Math.round((adjustment.pressure + hold) / total * 100) : 0;
      const invalidReason = resultLimitReason(powerSource, {
        frequency: adjustment.frequency,
        hold,
        interval,
        actualWorkPercent
      });
      state.resultValidation[key] = invalidReason;
      row.querySelector("[data-result-mapped-pressure]").value = mappedPressure;
      row.querySelector("[data-result-relief]").value = reliefParameter;
      row.querySelector("[data-result-field=hold]").value = hold;
      row.querySelector("[data-result-field=interval]").value = interval;
      row.querySelector("[data-result-total]").value = total;
      const ratio = row.querySelector("[data-result-ratio]");
      ratio.classList.toggle("is-invalid", Boolean(invalidReason));
      ratio.title = invalidReason;
      ratio.innerHTML = `<strong>${actualWorkPercent} / ${100 - actualWorkPercent}</strong><small>目标 ${targetWorkPercent} / ${100 - targetWorkPercent}</small>`;
      row.classList.toggle("result-row-invalid", Boolean(invalidReason));
      const invalidCount = Object.values(state.resultValidation).filter(Boolean).length;
      const status = document.querySelector(".result-rule-status");
      if (status) {
        status.classList.toggle("is-invalid", invalidCount > 0);
        status.querySelector("strong").textContent = invalidCount ? `${invalidCount} 行不符合策略，暂不可保存` : "当前参数符合策略";
      }
      const save = document.querySelector("#save");
      if (save) save.disabled = invalidCount > 0;
    }

    function formView() {
      const section = sections[state.section];
      const row = state.selected;
      const isView = state.view === 'view';
      let formBody = '';
      if (state.section === 'mode-units') formBody = `${modeUnitVersionViewer()}${modeUnitVersionFields(isView)}${basicForm(row, isView)}${isView ? detailResults(false) : ruleCard() + (state.generated ? detailResults(true) : emptyResults())}`;
      if (state.section === 'power-sources') formBody = powerSourceForm(isView);
      if (state.section === 'mode-libraries') formBody = modeLibraryForm(isView);
      if (state.section === 'rhythm-libraries') formBody = rhythmLibraryForm(isView);
      if (state.section === 'language-packs') formBody = languagePackageForm(isView);
      const hasInvalidResults = state.section === 'mode-units' && state.generated && Object.values(state.resultValidation).some(Boolean);
      const formTitle = state.section === 'language-packs' && state.view === 'new-version' ? '新建语言包版本' : section.formTitle;
      return `<section class="page-stack"><header class="page-header-bar"><div class="page-header-title"><button class="back-button" id="back">${chevron('left')}</button><h1>${formTitle}</h1></div><div class="page-header-actions">${isView ? '<button class="btn btn--outline" id="cancel">返回</button>' : `<button class="btn btn--outline" id="cancel">取消</button><button class="btn btn--primary" id="save" ${hasInvalidResults ? 'disabled' : ''}>保存</button>`}</div></header>
        <div class="form-page">${formBody}</div></section>`;
    }

    function render() {
      app.innerHTML = `<div class="admin-shell${state.collapsed ? ' is-collapsed' : ''}">${sidebar()}<main class="content-shell">${state.view === 'list' ? listView() : formView()}</main></div>${combinationModal()}${exportTemplateModal()}${versionModal()}${languagePublishModal()}`;
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
        showToast('附件副本已创建');
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
          showToast(`${version.version} 已发布并设为当前版本`);
        }
      }));
    }

    function bindLanguagePublishModal() {
      if (!state.languagePublish) return;
      const close = () => { state.languagePublish = null; render(); };
      document.querySelector('#language-publish-close')?.addEventListener('click', close);
      document.querySelector('#language-publish-cancel')?.addEventListener('click', close);
      document.querySelector('#language-publish-confirm')?.addEventListener('click', () => {
        const row = state.languagePublish;
        const mode = document.querySelector('#language-release-mode').value;
        const channel = document.querySelector('#language-release-channel').value;
        const firmware = document.querySelector('#language-release-firmware').value.trim();
        const scope = document.querySelector('#language-release-scope').value.trim();
        const note = document.querySelector('#language-release-note').value.trim();
        const error = document.querySelector('#language-release-error');
        if (!firmware || !note || (mode === '测试白名单' && !scope)) {
          error.textContent = mode === '测试白名单' && !scope ? '测试白名单发布需填写设备 SN。' : '请填写最低固件版本和发布说明。';
          return;
        }
        const now = currentTimestamp();
        row.firmware = firmware;
        row.status = '发布';
        row.updater = '刘媛媛';
        row.time = now;
        const history = row.history?.find(item => item.version === row.version);
        if (history) Object.assign(history, { status: '发布', updater: row.updater, time: now });
        row.updateLogs ||= [];
        row.updateLogs.unshift({
          version: row.version,
          type: mode,
          target: `${row.models} · ${channel} · ${scope || (mode === '灰度发布' ? '20% 设备' : '全部设备')}`,
          result: mode === '测试白名单' ? '验证中' : '发布中',
          operator: row.updater,
          time: now,
          note
        });
        state.languagePublish = null;
        render();
        showToast('发布任务已创建');
      });
    }

    function bindEvents() {
      document.querySelector('#sidebar-toggle').addEventListener('click', () => { state.collapsed = !state.collapsed; render(); });
      document.querySelector('#menu-parent').addEventListener('click', () => { state.menuExpanded = !state.menuExpanded; render(); });
      document.querySelector('#language-menu-parent').addEventListener('click', () => { state.languageMenuExpanded = !state.languageMenuExpanded; render(); });
      bindLanguagePublishModal();
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
          if (action === 'new-version' && state.section === 'language-packs') { openForm('new-version', row); return; }
          if (action === 'publish' && state.section === 'language-packs') { state.languagePublish = row; render(); return; }
          if (action === 'version-history') { state.versionModal = { type: 'history', row }; render(); return; }
          if (action === 'new-version') { state.versionModal = { type: 'create', row }; render(); return; }
          if (action === 'publish' && (state.section === 'rhythm-libraries' || state.section === 'mode-units') && !versionsFor(row).some(item => item.status === '草稿')) {
            showToast('请先编辑并保存新版本');
            return;
          }
          const messages = { publish: '确认执行此操作并切换状态吗？', disable: '确认执行此操作并切换状态吗？', delete: '确认删除吗？' };
          showDialog(messages[action], () => {
            if (action === 'delete') activeRows.splice(activeRows.indexOf(row), 1);
            if (action === 'publish') {
              if (state.section === 'rhythm-libraries') publishRhythmDraft(row);
              else if (state.section === 'mode-units') publishModeUnitDraft(row);
              else if (state.section === 'language-packs') {
                row.status = '发布';
                row.updater = '刘媛媛';
                row.time = currentTimestamp();
                const currentHistory = row.history?.find(item => item.version === row.version);
                if (currentHistory) {
                  currentHistory.status = '发布';
                  currentHistory.updater = row.updater;
                  currentHistory.time = row.time;
                }
                row.updateLogs ||= [];
                row.updateLogs.unshift({ version: row.version, type: '全量发布', target: `${row.models} · 全部渠道 · 全部设备`, result: '发布中', operator: row.updater, time: row.time });
              } else row.status = '发布';
            }
            if (action === 'disable') row.status = '停用';
            showToast('操作成功'); render();
          });
        }));
      } else {
        document.querySelectorAll('[data-view-version]').forEach(button => button.addEventListener('click', () => {
          const version = versionsFor(state.selected).find(item => item.version === button.dataset.viewVersion);
          if (!version) return;
          state.viewVersion = version.version;
          if (version.snapshot) {
            Object.assign(state.form, version.snapshot);
            if (state.section === 'rhythm-libraries') state.rhythmModes = (version.snapshot.rhythmModes || []).map(item => ({ ...item }));
            if (state.section === 'mode-units') state.resultSpeedTab = variableTypesEnabled() ? 2 : 1;
          }
          render();
        }));
        document.querySelector('#view-version-log')?.addEventListener('click', () => {
          state.versionModal = { type: 'history', row: state.selected };
          render();
        });
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
            if (field === 'extra' && state.section === 'mode-units') {
              const is818Source = state.form.extra === '818动力源';
              state.form.suction = is818Source ? '5.1' : '10';
              state.form.suctionStep = is818Source ? '5.1（1倍）' : '1（1倍）';
              state.form.gearCount = is818Source ? '9' : '15';
            }
            if (field === 'frequencyStrategy' && isFixedFrequency() && !speedIsEnabled()) state.form.speedLevels = '3档';
            if (field === 'frequencyStrategy' && isVariableFrequency()) {
              state.form.variablePreset = '频率快 / 频率中 / 频率慢';
              state.form.variableFastFrequency ||= '70';
              state.form.variableMediumFrequency ||= '60';
              state.form.variableSlowFrequency ||= '50';
              state.resultSpeedTab = 2;
            }
            if (field === 'durationStrategy' && state.form.durationStrategy === '固定比例') {
              if (Number.parseFloat(state.form.workDurationPercent) < 60 || Number.parseFloat(state.form.workDurationPercent) > 90 || !state.form.workDurationPercent) state.form.workDurationPercent = '60 / 40';
            }
            if (field === 'modalSelection' && state.modal === 'mode-unit') {
              const selectedModeUnit = rows.find(row => `${row.name} / ${row.code}` === state.form.modalSelection);
              state.form.modalVersion = selectedModeUnit?.currentVersion || versionsFor(selectedModeUnit)[0]?.version || '';
              render();
              return;
            }
            if (['suction', 'suctionStep', 'frequencyStrategy', 'variablePreset', 'speedLevels', 'durationStrategy', 'workDurationPercent', 'pressureTime', 'holdTime', 'intervalTime', 'motorType', 'extra'].includes(field)) render();
          });
        });
        document.querySelector('#language-package-file')?.addEventListener('change', event => {
          const file = event.currentTarget.files?.[0];
          if (!file) return;
          state.form.fileName = file.name;
          state.form.size = `${Math.ceil(file.size / 1024)} KB`;
          const label = event.currentTarget.closest('.language-file-drop');
          label.querySelector('strong').textContent = `${file.name} · ${Math.ceil(file.size / 1024)} KB`;
        });
        document.querySelectorAll('.step-button').forEach(button => button.addEventListener('click', () => { state.ruleStep = Number(button.dataset.step); render(); }));
        document.querySelectorAll('[data-result-speed-tab]').forEach(button => button.addEventListener('click', () => {
          state.resultSpeedTab = Number(button.dataset.resultSpeedTab);
          render();
        }));
        document.querySelectorAll("[data-result-field]").forEach(control => {
          const applyChange = event => {
            const field = event.currentTarget.dataset.resultField;
            updateResultRow(event.currentTarget);
            if (field === "frequency" && (isFixedFrequency() || variableTypesEnabled())) {
              document.querySelectorAll("[data-result-field=frequency]").forEach(input => {
                if (input === event.currentTarget) return;
                input.value = event.currentTarget.value;
                updateResultRow(input);
              });
              const strategySummary = document.querySelector(".result-speed-summary span");
              if (strategySummary) strategySummary.textContent = `频率策略：${isFixedFrequency() ? `定频 ${event.currentTarget.value} CPM` : `${variableTypes[state.resultSpeedTab - 1].label}：${event.currentTarget.value} CPM`}`;
            }
          };
          control.addEventListener(control.tagName === "SELECT" ? "change" : "input", applyChange);
        });
        document.querySelector('.step-next')?.addEventListener('click', () => { state.ruleStep = Math.min(3, state.ruleStep + 1); render(); });
        document.querySelector('#generate')?.addEventListener('click', () => { state.generated = true; state.resultSpeedTab = variableTypesEnabled() ? 2 : 1; state.resultAdjustments = {}; state.resultValidation = {}; render(); showToast('生成成功'); });
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
          const defaultModeUnit = rows.find(row => row.source === state.form.source && row.status === '发布') || rows.find(row => row.status === '发布') || rows[0];
          state.form.modalSelection = state.modal === 'mode-unit' ? `${defaultModeUnit.name} / ${defaultModeUnit.code}` : '';
          state.form.modalVersion = state.modal === 'mode-unit' ? defaultModeUnit.currentVersion || versionsFor(defaultModeUnit)[0]?.version || '' : '';
          state.form.modalAmount = state.modal === 'mode-unit' ? '3' : '60';
          render();
        });
        const closeModal = () => { state.modal = null; render(); };
        document.querySelector('#modal-close')?.addEventListener('click', closeModal);
        document.querySelector('#modal-cancel')?.addEventListener('click', closeModal);
        document.querySelector('.form-modal-overlay:not(.export-dialog-backdrop)')?.addEventListener('click', event => { if (event.target.classList.contains('form-modal-overlay')) closeModal(); });
        document.querySelector('#modal-confirm')?.addEventListener('click', () => {
          if (state.modal === 'mode-unit') {
            const selectedModeUnit = rows.find(row => `${row.name} / ${row.code}` === state.form.modalSelection) || rows[0];
            const range = selectedModeUnit.id === 8 || selectedModeUnit.id === 7 ? { min: '10', max: '24' } : selectedModeUnit.id === 6 ? { min: '8', max: '18' } : { min: '5.1', max: '15.3' };
            state.modeUnits.push({ modeUnitId: selectedModeUnit.id, name: selectedModeUnit.name, code: selectedModeUnit.code, version: state.form.modalVersion || selectedModeUnit.currentVersion || 'V1', ...range, amount: state.form.modalAmount || '3' });
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

    function publishRhythmDraft(row) {
      const draft = versionsFor(row).find(item => item.status === '草稿');
      if (!draft) return false;
      versionsFor(row).forEach(item => {
        if (item.current) {
          item.current = false;
          if (item.status === '发布') item.status = '历史版本';
        }
      });
      draft.current = true;
      draft.status = '发布';
      draft.publisher = '刘媛媛';
      draft.publishTime = currentTimestamp();
      if (draft.snapshot) {
        const { rhythmModes, ...values } = draft.snapshot;
        Object.assign(row, values);
        row.rhythmModes = (rhythmModes || []).map(item => ({ ...item }));
      }
      row.currentVersion = draft.version;
      row.status = '发布';
      row.updater = '刘媛媛';
      row.time = draft.publishTime;
      return true;
    }
    function publishModeUnitDraft(row) {
      const draft = versionsFor(row).find(item => item.status === '草稿');
      if (!draft) return false;
      versionsFor(row).forEach(item => {
        if (item.current) {
          item.current = false;
          if (item.status === '发布') item.status = '历史版本';
        }
      });
      draft.current = true;
      draft.status = '发布';
      draft.publisher = '刘媛媛';
      draft.publishTime = currentTimestamp();
      if (draft.snapshot) {
        const config = { ...draft.snapshot };
        row.name = config.name || row.name;
        row.code = config.code || row.code;
        row.source = config.extra || row.source;
        row.description = config.description || '';
        row.generated = Boolean(config.generated);
        row.config = config;
      }
      row.currentVersion = draft.version;
      row.status = '发布';
      row.updater = '刘媛媛';
      row.time = draft.publishTime;
      return true;
    }

    function saveCurrentForm() {
      if (state.section === 'mode-units') {
        const invalidResult = Object.values(state.resultValidation).find(Boolean);
        if (invalidResult) { showToast(invalidResult); return; }
        const versionNumber = state.form.editingVersion.trim();
        const versionSummary = state.form.versionUpdateSummary.trim();
        if (!/^(?:V)?\d+(?:\.\d+)*$/i.test(versionNumber)) {
          showToast('版本号格式不正确，请输入 V1、V1.1 或 V2');
          return;
        }
        if (!versionSummary) {
          showToast('请填写版本说明');
          return;
        }
        const draft = state.selected ? versionsFor(state.selected).find(item => item.status === '草稿') : null;
        if (state.selected && versionsFor(state.selected).some(item => item !== draft && item.version.toLowerCase() === versionNumber.toLowerCase())) {
          showToast('该版本号已存在，请重新输入');
          return;
        }
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
        const snapshot = { ...state.form, name: values.name, code: values.code, extra: values.source, description: values.description, generated: state.generated };
        const versionRecord = draft || {};
        Object.assign(versionRecord, {
          version: versionNumber,
          baseVersion: state.selected?.currentVersion || '',
          status: '草稿',
          current: false,
          medicalInput: state.selected ? '模式单元编辑' : '模式单元初始配置',
          applicableModels: values.source || '未配置',
          changeSummary: versionSummary,
          publisher: '刘媛媛',
          publishTime: '未发布',
          snapshot
        });
        if (state.selected) {
          if (!state.selected.versions.includes(versionRecord)) state.selected.versions.unshift(versionRecord);
        } else {
          rows.unshift({ id: Math.max(...rows.map(row => row.id)) + 1, status: '草稿', currentVersion: versionNumber, versions: [versionRecord], ...values });
        }
      }
      if (state.section === 'mode-libraries') {
        const values = {
          name: state.form.name || '未命名模式库',
          code: state.form.code || `MODE-${Math.max(...modeLibraryRows.map(row => row.id)) + 1}`,
          modeType: state.form.modeType,
          source: state.form.source,
          description: state.form.description,
          modeUnits: state.modeUnits.map(item => ({ ...item })),
          updater: '刘媛媛',
          time: currentTimestamp()
        };
        if (state.selected) Object.assign(state.selected, values);
        else modeLibraryRows.unshift({ id: Math.max(...modeLibraryRows.map(row => row.id)) + 1, status: '草稿', ...values });
      }
      if (state.section === 'rhythm-libraries') {
        const rhythmId = Number(state.form.code);
        if (!/^\d+$/.test(String(state.form.code).trim()) || !Number.isInteger(rhythmId) || rhythmId < 1 || rhythmId > 100) {
          showToast('韵律 ID 请输入 1～100 的整数');
          return;
        }
        if (rhythmRows.some(row => row !== state.selected && Number(row.code) === rhythmId)) {
          showToast('该韵律 ID 已存在，请重新输入');
          return;
        }
        if (state.form.isRevisionEdit && !state.form.versionUpdateSummary.trim()) {
          showToast('请填写版本更新说明');
          return;
        }
        const values = {
          duration: String(state.rhythmModes.reduce((sum, item) => sum + Number(item.amount || 0), 0)),
          rank: state.form.rank || String(rhythmRows.length + 1),
          tags: state.form.tags || '推荐',
          name: state.form.name || '未命名韵律',
          displayName: state.form.displayName,
          code: String(rhythmId),
          source: state.form.source,
          schedule: state.form.schedule,
          description: state.form.description,
          descriptionEn: state.form.descriptionEn,
          updater: '刘媛媛',
          time: currentTimestamp()
        };
        if (state.selected && state.form.isRevisionEdit) {
          const draft = versionsFor(state.selected).find(item => item.status === '草稿') || {};
          Object.assign(draft, {
            version: state.form.editingVersion,
            baseVersion: state.selected.currentVersion,
            status: '草稿',
            current: false,
            medicalInput: '韵律编辑',
            applicableModels: values.source || '未配置',
            changeSummary: state.form.versionUpdateSummary.trim(),
            publisher: '刘媛媛',
            publishTime: '未发布',
            snapshot: { ...values, rhythmModes: state.rhythmModes.map(item => ({ ...item })) }
          });
          if (!state.selected.versions.includes(draft)) state.selected.versions.unshift(draft);
          rhythmRows.sort((left, right) => Number(left.rank) - Number(right.rank));
          showToast(`${draft.version} 草稿已保存`);
          returnToList();
          return;
        }
        if (state.selected) Object.assign(state.selected, { ...values, rhythmModes: state.rhythmModes.map(item => ({ ...item })) });
        else rhythmRows.push({ id: Math.max(...rhythmRows.map(row => row.id)) + 1, status: '草稿', ...values, rhythmModes: state.rhythmModes.map(item => ({ ...item })) });
        rhythmRows.sort((left, right) => Number(left.rank) - Number(right.rank));
      }
      if (state.section === 'language-packs') {
        const name = state.form.name.trim();
        const code = state.form.code.trim();
        const version = state.form.version.trim();
        const note = state.form.note.trim();
        if (!name || !code || !/^V\d+\.\d+\.\d+$/i.test(version) || !note) {
          showToast('请填写名称、编码、三段式版本号和版本说明');
          return;
        }
        if (languagePackRows.some(row => row !== state.selected && row.locale === state.form.locale && row.models === state.form.models && row.version.toLowerCase() === version.toLowerCase())) {
          showToast('该机型与语种下已存在相同版本');
          return;
        }
        const languageNames = { 'zh-CN': '简体中文', 'en-US': 'English', 'de-DE': 'Deutsch' };
        const now = currentTimestamp();
        const values = {
          name,
          code,
          language: languageNames[state.form.locale] || state.form.locale,
          locale: state.form.locale,
          version,
          models: state.form.models,
          firmware: state.form.firmware || '待发布时配置',
          size: state.form.size || '待上传',
          note,
          fileName: state.form.fileName || '待上传',
          updater: '刘媛媛',
          time: now
        };
        const versionRecord = { version, status: '草稿', note, updater: '刘媛媛', time: now };
        if (state.selected) {
          Object.assign(state.selected, values, { status: '草稿' });
          state.selected.history ||= [];
          const existingVersion = state.selected.history.find(item => item.version.toLowerCase() === version.toLowerCase());
          if (existingVersion) Object.assign(existingVersion, versionRecord);
          else state.selected.history.unshift(versionRecord);
          state.selected.updateLogs ||= [];
          state.selected.updateLogs.unshift({ version, type: '上传版本', target: `${values.models} · ${values.language}`, result: '草稿', operator: '刘媛媛', time: now });
        } else {
          languagePackRows.unshift({
            id: Math.max(...languagePackRows.map(row => row.id)) + 1,
            status: '草稿',
            history: [versionRecord],
            updateLogs: [{ version, type: '上传版本', target: `${values.models} · ${values.language}`, result: '草稿', operator: '刘媛媛', time: now }],
            ...values
          });
        }
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
