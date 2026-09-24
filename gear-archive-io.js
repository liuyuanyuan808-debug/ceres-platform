(function (root) {
  'use strict';
  const headers = ['型号', '模式名称', '模式类型', '档位', '吸力(kPa)', '频率策略', '频率方案', 'Speed', '频率(CPM)', '关联动力源', '动力源类型'];
  const clean = value => String(value ?? '').trim();
  const key = row => JSON.stringify([row.model, row.mode, row.gear, row.frequencyStrategy, row.plan, row.speed]);
  const baseKey = row => JSON.stringify([row.model, row.mode, row.gear]);
  const positive = value => /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(value) && Number.isFinite(Number(value)) && Number(value) > 0;

  function parseCSV(text) {
    text = text.replace(/^\uFEFF/, '');
    const rows = []; let row = [], value = '', quoted = false, closed = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (quoted) {
        if (c === '"' && text[i + 1] === '"') { value += '"'; i++; }
        else if (c === '"') { quoted = false; closed = true; }
        else value += c;
      } else if (c === '"') {
        if (value || closed) throw new Error('CSV 引号格式错误，请重新保存文件');
        quoted = true;
      } else if (c === ',' || c === '\n' || c === '\r') {
        row.push(value); value = ''; closed = false;
        if (c !== ',') { rows.push(row); row = []; if (c === '\r' && text[i + 1] === '\n') i++; }
      } else {
        if (closed) throw new Error('CSV 引号后存在无效字符');
        value += c;
      }
    }
    if (quoted) throw new Error('CSV 引号未闭合');
    if (value || row.length || closed) { row.push(value); rows.push(row); }
    return rows;
  }

  function expand(rows, profiles = {}) {
    return rows.flatMap(row => {
      const frequencyStrategy = row.frequencyStrategy || profiles[row.model]?.frequencyStrategy || '定频';
      const common = { ...row, frequencyStrategy, plan: '', speed: '' };
      if (frequencyStrategy === '变频') return [['快', 'frequencyFast'], ['中', 'frequencyMedium'], ['慢', 'frequencySlow']].map(([plan, field]) => ({ ...common, plan, frequency: clean(row[field]) }));
      if (row.speedFrequencies || ['V3', 'V3 Pro'].includes(row.model)) {
        const defaults = /刺激|按摩/.test(row.mode) ? [70, 80, 90, 100, 105] : [38, 42, 46, 50, 54];
        const levels = row.speedFrequencies || Object.fromEntries(defaults.map((v, i) => [i + 1, v]));
        const speeds = [...new Set([...Object.keys(levels), ...(['V3', 'V3 Pro'].includes(row.model) ? ['1', '2', '3', '4', '5'] : [])])];
        return speeds.sort((a, b) => Number(a) - Number(b)).map(speed => ({ ...common, speed, frequency: clean(levels[speed]) }));
      }
      return [{ ...common, frequency: clean(row.frequency) }];
    });
  }

  function validate(sheets, existing = [], profiles = {}) {
    const rows = [], errors = [], seen = new Map(), bases = new Map(), models = new Map();
    const old = expand(existing, profiles), oldKeys = new Set(old.map(key));
    const oldBases = new Set(old.map(baseKey));
    const requiredValues = ['model', 'mode', 'modeType', 'gear', 'suction', 'frequencyStrategy', 'source', 'sourceType'];
    const fields = ['model', 'mode', 'modeType', 'gear', 'suction', 'frequencyStrategy', 'plan', 'speed', 'frequency', 'source', 'sourceType'];
    for (const sheet of sheets) {
      if (!sheet.rows.some(cells => cells.some(v => clean(v)))) continue;
      const names = (sheet.rows[0] || []).map(v => clean(v).replaceAll('（', '(').replaceAll('）', ')'));
      const missing = headers.filter(h => !names.includes(h));
      if (missing.length || new Set(names.filter(Boolean)).size !== names.filter(Boolean).length) {
        errors.push({ sheet: sheet.name, line: 1, reason: missing.length ? '缺少列：' + missing.join('、') : '表头重复，请按模板修正' }); continue;
      }
      sheet.rows.slice(1).forEach((cells, index) => {
        if (!cells.some(v => clean(v))) return;
        const row = Object.fromEntries(fields.map((f, i) => [f, clean(cells[names.indexOf(headers[i])])]));
        row.sheet = sheet.name; row.line = index + 2; row.issues = [];
        const add = reason => { row.issues.push(reason); errors.push({ sheet: row.sheet, line: row.line, reason }); };
        requiredValues.forEach(f => { if (!row[f]) add(headers[fields.indexOf(f)] + '不能为空'); });
        const gear = row.gear.match(/^(?:L)?([1-9]\d*)$/i);
        if (!gear || !Number.isSafeInteger(Number(gear[1]))) add('档位须为正整数或 L1 格式'); else row.gear = 'L' + Number(gear[1]);
        if (!positive(row.suction)) add('吸力须为大于 0 的数值');
        else row.suction = String(Number(row.suction));
        if (row.frequency && !positive(row.frequency)) add('频率须为大于 0 的数值，缺失时留空');
        else if (row.frequency) row.frequency = String(Number(row.frequency));
        if (!['直线电机类', '隔膜泵类'].includes(row.sourceType)) add('动力源类型须为直线电机类或隔膜泵类');
        if (!['定频', '变频'].includes(row.frequencyStrategy)) add('频率策略须为定频或变频');
        if (row.frequencyStrategy === '变频') {
          if (!['快', '中', '慢'].includes(row.plan)) add('变频的频率方案须为快、中或慢');
          if (row.speed) add('变频不填写 Speed');
        } else if (row.frequencyStrategy === '定频') {
          if (row.plan) add('定频不填写快、中、慢方案');
          if (row.speed && !/^(?:[1-9]|10)$/.test(row.speed)) add('Speed 须为 1～10 的整数，不支持时留空');
        }
        const identity = key(row);
        if (seen.has(identity)) add('与本文件 ' + seen.get(identity) + ' 重复');
        else seen.set(identity, sheet.name + ' 第 ' + row.line + ' 行');
        if (oldKeys.has(identity)) add('与已有档案重复，不可覆盖');
        else if (oldBases.has(baseKey(row))) add('同一档位已有配置，请核对频率方案或 Speed，不可直接覆盖');
        const base = baseKey(row), details = JSON.stringify([row.suction, row.modeType, row.source, row.sourceType, row.frequencyStrategy, !!row.speed]);
        if (bases.has(base) && bases.get(base) !== details) add('同一档位的吸力、模式类型或频率配置不一致');
        bases.set(base, details);
        const info = JSON.stringify([row.source, row.sourceType, row.frequencyStrategy, !!row.speed]);
        const existingModel = old.find(item => item.model === row.model);
        const expected = existingModel && JSON.stringify([existingModel.source, existingModel.sourceType, existingModel.frequencyStrategy, !!existingModel.speed]);
        if ((models.has(row.model) && models.get(row.model) !== info) || (expected && expected !== info)) add('型号的动力源、类型或频率策略与已有配置不一致');
        models.set(row.model, info);
        rows.push(row);
      });
    }
    if (!rows.length && !errors.length) errors.push({ sheet: '', line: '', reason: '无有效数据，请填写模板后重新上传' });
    return { rows, errors };
  }

  function collapse(rows) {
    const grouped = new Map();
    for (const row of rows) {
      const id = baseKey(row);
      if (!grouped.has(id)) grouped.set(id, { model: row.model, mode: row.mode, modeType: row.modeType, gear: row.gear, suction: row.suction, source: row.source, sourceType: row.sourceType, frequencyStrategy: row.frequencyStrategy, origin: '手动导入', frequency: '', ...(row.speed ? { speedFrequencies: {} } : {}) });
      const entry = grouped.get(id);
      if (row.frequencyStrategy === '变频') entry[{ 快: 'frequencyFast', 中: 'frequencyMedium', 慢: 'frequencySlow' }[row.plan]] = row.frequency;
      else if (row.speed) entry.speedFrequencies[row.speed] = row.frequency;
      else entry.frequency = row.frequency;
    }
    return [...grouped.values()];
  }

  function csv(rows) {
    const values = row => [row.model, row.mode, row.modeType, row.gear, row.suction, row.frequencyStrategy, row.plan, row.speed, row.frequency, row.source, row.sourceType, row.origin || '系统生成'];
    return '\uFEFF' + [[...headers, '来源'], ...rows.map(values)].map(cells => cells.map(v => '"' + clean(v).replace(/^[=+@-]/, "'$&").replaceAll('"', '""') + '"').join(',')).join('\r\n');
  }
  const api = { headers, parseCSV, expand, validate, collapse, csv };
  if (typeof module !== 'undefined') module.exports = api;
  else root.GearArchiveIO = api;
})(typeof window !== 'undefined' ? window : globalThis);
