(() => {
  const messages = {
    U01: '电池电量低于 10%，设备即将自动关机。请为设备充电。如果充电后仍无法使用，',
    F02: '电池电压过低，设备已关机。请为设备充电。如果充电后仍无法使用，',
    E05: '电池温度过高。请关闭设备，放在阴凉处冷却。如果冷却后仍无法使用，',
    E11: '设备电机运行异常。请关闭设备，检查泵体和气路是否有异物，清理后重启设备。如果重启后仍无法使用，',
    F12: '设备电机异常。请长按设备的电源键重启。如果重启后仍无法使用，',
    U32: '环境温度过低。请将设备移至室温环境，待设备回温后再使用。如果回温后仍无法使用，',
    U51: '设备按键卡住。请检查按键周围是否有异物，清理后再试。如果按键仍无法使用，',
    F41: '设备存储异常。请长按设备的电源键重启。如果重启后仍无法使用，',
    E42: '设备内部通信异常。请长按设备的电源键重启。如果重启后仍无法使用，',
    E53: '设备未检测到法兰，暂不可加热。请重新安装法兰并卡紧。如果重新安装后仍无法加热，',
  };

  const contact = '请联系客服。';
  const codeLabel = code => `（代码：${code}）`;

  window.V4FaultReview = {
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
    formatMessage(code) {
      return messages[code] + contact + codeLabel(code);
    },
    renderMessage(element, code) {
      const segments = [contact, codeLabel(code)].map(text => {
        const segment = document.createElement('span');
        segment.className = 'fault-copy-fragment';
        segment.textContent = text;
        return segment;
      });
      element.replaceChildren(messages[code], ...segments);
    },
  };
})();
