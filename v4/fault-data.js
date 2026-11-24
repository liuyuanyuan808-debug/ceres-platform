(() => {
  const messages = {
    U01: ['电量低于 10%，设备即将自动关机。', '请为设备充电。'],
    F02: ['电池电压过低，设备已关机。', '请为设备充电。'],
    E05: ['电池温度过高。', '请关机，放在阴凉处冷却。'],
    E11: ['电机运行异常。', '请关机，清除泵体或气路异物后重启。'],
    F12: ['电机电路异常。', '请长按电源键重启。'],
    U32: ['环境温度过低。', '请将设备移至室温环境回温。'],
    U51: ['设备按键卡住。', '请清除按键周围的异物后再试。', '按键仍卡住'],
    F41: ['设备存储异常。', '请长按电源键重启。'],
    E42: ['设备内部通信异常。', '请长按电源键重启。'],
    E53: ['未检测到法兰，暂不可加热。', '请重新安装并卡紧法兰。', '仍无法加热'],
  };

  function messageParts(code) {
    const [reason, action, condition = '仍无法使用'] = messages[code];
    return [reason, action, `${condition}，`, `请联系客服（代码：${code}）`];
  }

  window.V4FaultReview = {
    reminderQueue: ['U32', 'U51'],
    models: {
      m5: {
        name: 'M5 Ultra',
        codes: [
          ['U01', '电池电量极低', 'reminder', '沿用历史低电提醒；解除后可再次提醒。'],
          ['F02', '电池电压过低关机', 'blocking', '充电达到恢复条件并收到设备解除确认后恢复。'],
          ['E05', '电池温度过高', 'blocking', '冷却到固件恢复条件，设备确认异常解除后恢复。'],
          ['E11', '电机堵转／驱动过流', 'blocking', '排除泵体或气路异物并重启，不自动重启设备。'],
          ['F12', '电机开路', 'blocking', '重新上电检测；必要时联系售后检修。'],
          ['U32', '环境温度过低', 'reminder', '达到固件恢复条件后解除，不新增页面阻断。'],
          ['U51', '按键卡滞', 'reminder', '仅限制实体按键相关控制，保留其他 App 控制。'],
        ],
      },
      v3: {
        name: 'V3',
        codes: [
          ['F41', '存储故障', 'blocking', '执行存储异常限制；检修或更换后由设备确认解除。'],
          ['E42', '通信错误', 'blocking', '指设备内部通信错误，不等同于手机蓝牙断连。'],
          ['U51', '按键卡滞', 'reminder', '仅限制实体按键相关控制，保留其他 App 控制。'],
        ],
      },
    },
    deviceTitle(side) {
      return `${side === 'L' ? '左侧' : '右侧'}设备异常`;
    },
    formatMessage(code) {
      const [reason, action, condition, contact] = messageParts(code);
      return [reason, action, condition + contact].join('\n');
    },
    renderMessage(element, code) {
      const [reason, action, condition, contact] = messageParts(code);
      const lines = [reason, action, condition].map(text => {
        const line = document.createElement('span');
        line.className = 'fault-copy-line';
        line.textContent = text;
        return line;
      });
      const contactText = document.createElement('span');
      contactText.className = 'fault-copy-contact';
      contactText.textContent = contact;
      lines[2].append(contactText);
      element.replaceChildren(...lines);
    },
  };
})();
