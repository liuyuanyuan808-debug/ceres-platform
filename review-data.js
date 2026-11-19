window.REVIEW_DATA = {
  "document": {
    "url": "https://momcozy-in.feishu.cn/wiki/KSrbwkhsTiIHHRkz2pjc3Va3nqb",
    "revision": 900
  },
  "chapters": {
    "7.2.1.1": [
      "设备上报与状态同步",
      "doxcnScFqaH0sQdKkpkaVhV746f"
    ],
    "7.2.1.2.1": [
      "提示组件",
      "doxcnHlDO5vkyYENE6a5WmcafWg"
    ],
    "7.2.1.2.2": [
      "文案与侧别",
      "doxcnQcRyaP7AWdnvHUALte2W9c"
    ],
    "7.2.1.2.3": [
      "控制页故障态",
      "doxcna7gik7hJZhxbNuYpwilsT5"
    ],
    "7.2.1.3.1": [
      "异常发生",
      "doxcnB8qUVmT9OHs48NqJIgDvkX"
    ],
    "7.2.1.3.2": [
      "异常持续",
      "doxcn3An3PoZKztHeHgzBLR6mdd"
    ],
    "7.2.1.3.3": [
      "异常恢复",
      "doxcnLtmHib5k8qCrEmQdyM3DiQ"
    ],
    "7.2.1.3.4": [
      "页面与连接变化",
      "doxcngi9OLe9w83EZFq7uSFjgWg"
    ],
    "7.2.1.4": [
      "各错误码交互需求",
      "doxcnOMGYLNzwPSndGzmeCihHsg"
    ],
    "7.2.2.1.1": [
      "什么时候记录、记录哪些内容",
      "doxcnFsHho1bSnA3XOuoOJ8HPBc"
    ],
    "7.2.2.1.2": [
      "日志对应的账号、设备与侧别",
      "doxcn7COXTuZfy5KXcoOKUurz2f"
    ],
    "7.2.2.1.3": [
      "本地日志的保存与清理",
      "doxcnacF5qw4vKu5H4ByjCyNaSY"
    ],
    "7.2.2.2.1": [
      "入口位置与说明",
      "doxcnU8jWbxCo5uwjowkXMNQqnK"
    ],
    "7.2.2.2.2": [
      "入口状态与提示样式",
      "doxcnCIL6PZa1fbuqYk1RLiV6lh"
    ],
    "7.2.2.3.1": [
      "App 校验并上传日志",
      "doxcnX3P4xIFAA1jL2Zhl6hVmAh"
    ],
    "7.2.2.3.2": [
      "云端保存日志并返回结果",
      "doxcnZfvxmOE0O8NAuR8cTj7yxg"
    ],
    "7.2.2.3.3": [
      "App 显示结果并处理本地日志",
      "doxcnNimEhyuKx94a5FP3pZZBOb"
    ],
    "7.2.2.3.4": [
      "App 手动重试与任务恢复",
      "doxcnWrcFffzds6nk8dxhKcBFZb"
    ],
    "7.2.2.4": [
      "云端提供客服查询",
      "doxcn3VqrCDVP1RJRbn1bkPvkIh"
    ]
  },
  "groups": [
    {
      "id": "faults",
      "number": "01",
      "title": "异常的识别和展示",
      "description": "识别异常、说明限制，并正确处理恢复。"
    },
    {
      "id": "submission",
      "number": "02",
      "title": "问题提交",
      "description": "点击 Tab 切换四个环节，操作状态保留。",
      "presentation": "tabs",
      "navLabel": "问题提交"
    }
  ],
  "definitionFields": [
    [
      "trigger",
      "何时出现"
    ],
    [
      "rules",
      "处理规则"
    ],
    [
      "copy",
      "提示文案"
    ],
    [
      "boundaries",
      "特殊情况"
    ],
    [
      "dependencies",
      "相关操作"
    ],
    [
      "checks",
      "检查重点"
    ]
  ],
  "cases": {
    "E05": {
      "name": "电池温度过高",
      "side": "L",
      "kind": "blocking",
      "message": "电池温度过高，设备暂停使用",
      "marker": "设备暂不可用",
      "warm": "电池温度过高，相关功能不可用，请关闭设备并置于阴凉处，冷却后再使用",
      "remedy": "请关闭设备并置于阴凉处，冷却后再使用",
      "scope": "M5 Ultra：左侧设备受限。"
    },
    "E53": {
      "name": "未检测到法兰",
      "side": "R",
      "kind": "reminder",
      "message": "未检测到法兰，暂不可加热，请重新安装并卡紧",
      "marker": "暂不可加热",
      "warm": "未检测到法兰，相关功能不可用，请重新安装并卡紧",
      "remedy": "请重新安装并卡紧",
      "scope": "跨型号组件样例：适用 M10 / M10Lite。"
    }
  },
  "features": [
    {
      "id": "recognition",
      "number": "1.1",
      "group": "faults",
      "title": "异常识别与故障态",
      "summary": "选择 E05 / E53，点击触发异常，再在手机内确认或关闭。",
      "caseSelectable": true,
      "note": "仅演示 E05 / E53，其他错误码见需求文档。",
      "states": [
        {
          "id": "fault",
          "title": "异常出现 → 确认后",
          "description": "确认 / 关闭提示后，故障标记仍保留，可点击查看。",
          "preset": "normal",
          "extraActions": [
            [
              "repeat",
              "重复上报",
              "has-fault"
            ],
            [
              "new-round",
              "恢复后重新触发",
              "has-fault"
            ]
          ],
          "hint": "点击“触发异常”，在当前手机内查看效果。",
          "targetByCase": {
            "E05": "#confirm-blocking",
            "E53": "#dismiss-event"
          },
          "targetAfterConfirm": "[data-device-note=\"{side}\"]",
          "actions": [
            [
              "trigger-fault",
              "触发 {code} 异常",
              "no-fault"
            ]
          ],
          "tabLabel": "异常提醒"
        }
      ],
      "definitions": {
        "trigger": [
          [
            "设备上报异常时。",
            "7.2.1.3.1"
          ]
        ],
        "rules": [
          [
            "E05 阻断确认；E53 提醒可关闭。",
            "7.2.1.2.1",
            "7.2.1.4"
          ]
        ],
        "copy": [
          [
            "{message}",
            "7.2.1.4"
          ]
        ],
        "boundaries": [
          [
            "确认或关闭提示，不代表故障已恢复。",
            "7.2.1.1"
          ]
        ],
        "dependencies": [
          [
            "点击故障文字，查看温馨提示。",
            "7.2.1.3.2"
          ]
        ],
        "checks": [
          [
            "确认不清除故障，同一轮不重复提示。",
            "7.2.1.2.1",
            "7.2.1.3.1"
          ]
        ]
      },
      "navLabel": "异常识别与故障态",
      "copyKey": "marker",
      "defaultState": "fault"
    },
    {
      "id": "warm-tip",
      "number": "1.2",
      "group": "faults",
      "title": "温馨提示与受限操作",
      "summary": "在当前手机内点击故障文字、调档或 Sync，查看温馨提示。",
      "caseSelectable": true,
      "note": "E53 通过故障文字和 Sync 演示，未新增加热按钮。",
      "states": [
        {
          "id": "operation",
          "title": "故障说明 / 受限操作",
          "description": "点击故障标记；E05 也可尝试调节左侧档位。",
          "preset": "fault-status",
          "extraActions": [],
          "hint": "点击故障文字，显示温馨提示。",
          "target": "[data-device-note=\"{side}\"]",
          "actions": [
            [
              "show-tip",
              "显示温馨提示"
            ]
          ],
          "tabLabel": "温馨提示"
        },
        {
          "id": "sync",
          "title": "尝试开启 Sync",
          "description": "点击 Sync；异常未解除时仍保持关闭。",
          "preset": "fault-status",
          "extraActions": [
            [
              "add-other-code",
              "模拟双侧异常"
            ]
          ],
          "hint": "点击 Sync，查看不能开启的原因。",
          "target": ".sync-control",
          "actions": [
            [
              "try-sync",
              "尝试开启 Sync"
            ]
          ],
          "tabLabel": "Sync 受限"
        }
      ],
      "definitions": {
        "trigger": [
          [
            "查看故障、尝试受限操作或开启 Sync 时。",
            "7.2.1.2.1"
          ]
        ],
        "rules": [
          [
            "受限操作不执行，正常侧仍可操作。",
            "7.2.1.3.2"
          ]
        ],
        "copy": [
          [
            "{warm}",
            "7.2.1.4"
          ]
        ],
        "boundaries": [
          [
            "连续操作只更新一条，不重复弹窗。",
            "7.2.1.2.1"
          ]
        ],
        "dependencies": [
          [
            "异常未解除时，Sync 保持关闭。",
            "7.2.1.3.2"
          ]
        ],
        "checks": [
          [
            "显示温馨提示，故障限制仍保留。",
            "7.2.1.2.1",
            "7.2.1.3.2"
          ]
        ]
      },
      "navLabel": "温馨提示与受限操作",
      "copyKey": "warm"
    },
    {
      "id": "recovery",
      "number": "1.3",
      "group": "faults",
      "title": "多设备、多异常与恢复",
      "summary": "左右设备同时存在 E05 / E53，可查看提示或逐项恢复。",
      "note": "以左右两台设备演示共存与恢复。E53 为跨型号组件样例，不代表 M5 Ultra 实际支持。",
      "states": [
        {
          "id": "notifications",
          "title": "双设备 · 多条提示",
          "description": "左右各有 E05 和 E53，阻断弹窗依次确认，事件提醒独立关闭。",
          "preset": "normal",
          "hint": "点击“触发双侧异常”，查看排队弹窗与独立提醒。",
          "target": "#confirm-blocking",
          "targetAfterQueue": "#dismiss-event",
          "showFaults": true,
          "extraActions": [
            [
              "repeat",
              "重复上报",
              "has-fault"
            ]
          ],
          "actions": [
            [
              "trigger-multiple",
              "触发双侧异常",
              "no-fault"
            ]
          ],
          "tabLabel": "多条提示"
        },
        {
          "id": "multiple",
          "title": "同侧多异常 · 逐项恢复",
          "description": "点击某个恢复按钮，只解除对应设备的这一个异常。",
          "preset": "multi-faults-quiet",
          "hint": "先恢复左 E05，观察故障文字变为“暂不可加热”。",
          "recoverItems": true,
          "showFaults": true,
          "tabLabel": "逐项恢复"
        }
      ],
      "definitions": {
        "trigger": [
          [
            "左右设备同时上报多个异常。",
            "7.2.1.2.1"
          ]
        ],
        "rules": [
          [
            "阻断弹窗依次显示，事件提醒独立保留。",
            "7.2.1.2.1"
          ]
        ],
        "copy": [
          [
            "每侧优先显示影响更大的故障。",
            "7.2.1.2.3"
          ]
        ],
        "boundaries": [
          [
            "确认、关闭或重连，都不代表恢复。",
            "7.2.1.3.2",
            "7.2.1.3.4"
          ]
        ],
        "dependencies": [
          [
            "恢复一项后，按剩余异常更新限制。",
            "7.2.1.3.3"
          ]
        ],
        "checks": [
          [
            "不误清其他异常，不自动启动吸奶或 Sync。",
            "7.2.1.3.3"
          ]
        ]
      },
      "navLabel": "多设备与多异常",
      "multipleCases": true
    },
    {
      "id": "validation",
      "number": "2.1",
      "group": "submission",
      "title": "入口与提交校验",
      "summary": "点击手机内“问题提交”，查看不同校验结果。",
      "note": "账号 / 归属异常的具体提示文案，文档未定义。",
      "states": [
        {
          "id": "entry",
          "title": "正常入口",
          "description": "点击“问题提交”开始本地模拟任务。",
          "preset": "submit-entry",
          "extraActions": [],
          "hint": "点击手机内“问题提交”，查看结果。",
          "target": "#problem-submit",
          "tabLabel": "正常入口"
        },
        {
          "id": "empty",
          "title": "无待提交日志",
          "description": "点击入口，查看无日志反馈。",
          "preset": "submit-empty",
          "extraActions": [],
          "hint": "点击手机内“问题提交”，查看结果。",
          "target": "#problem-submit",
          "tabLabel": "无日志"
        },
        {
          "id": "offline",
          "title": "网络不可用",
          "description": "点击入口，查看断网反馈，不发起任务。",
          "preset": "submit-offline",
          "extraActions": [],
          "hint": "点击手机内“问题提交”，查看结果。",
          "target": "#problem-submit",
          "tabLabel": "断网"
        },
        {
          "id": "bluetooth",
          "title": "蓝牙断开",
          "description": "无需蓝牙连接，仍可主动提交。",
          "preset": "submit-bluetooth",
          "extraActions": [],
          "hint": "点击手机内“问题提交”，查看结果。",
          "target": "#problem-submit",
          "tabLabel": "蓝牙断开"
        }
      ],
      "definitions": {
        "trigger": [
          [
            "在设备设置页点击“问题提交”。",
            "7.2.2.2.1"
          ]
        ],
        "rules": [
          [
            "依次检查日志、网络、账号和日志归属。",
            "7.2.2.3.1",
            "7.2.2.1.2"
          ]
        ],
        "copy": [
          [
            "暂无可提交的问题信息\n网络不可用，请连接网络后重试",
            "7.2.2.2.1",
            "7.2.2.2.2"
          ]
        ],
        "boundaries": [
          [
            "无日志也可点击；不要求蓝牙连接。",
            "7.2.2.3.1"
          ]
        ],
        "dependencies": [
          [
            "只提交当前账号、当前设备的左右侧日志。",
            "7.2.2.1.2"
          ]
        ],
        "checks": [
          [
            "校验失败后，入口仍可点击。",
            "7.2.2.3.1"
          ]
        ]
      },
      "navLabel": "提交校验",
      "tabLabel": "入口校验"
    },
    {
      "id": "submitting",
      "number": "2.2",
      "group": "submission",
      "title": "提交中与防重复",
      "summary": "开始提交后入口禁用，新增日志留到下次提交。",
      "states": [
        {
          "id": "busy",
          "title": "任务执行中",
          "description": "开始演示后查看禁用状态，任务标识保持不变。",
          "preset": "submit-entry",
          "extraActions": [],
          "hint": "开始后，手机内提交入口将变为禁用。",
          "actions": [
            [
              "begin-long",
              "开始提交",
              "fresh"
            ]
          ],
          "tabLabel": "提交中"
        },
        {
          "id": "new-log",
          "title": "提交期间新增日志",
          "description": "成功只清理本次记录，新增的一条仍待提交。",
          "preset": "submit-entry",
          "extraActions": [],
          "hint": "开始后新增一条日志，再确认本次提交。",
          "showCounts": true,
          "actions": [
            [
              "begin-new-log",
              "开始提交",
              "fresh"
            ],
            [
              "finish",
              "确认本次成功",
              "busy"
            ]
          ],
          "tabLabel": "新增日志"
        }
      ],
      "definitions": {
        "trigger": [
          [
            "提交校验通过后。",
            "7.2.2.3.1"
          ]
        ],
        "rules": [
          [
            "只提交本次点击前的当天日志。",
            "7.2.2.3.1"
          ]
        ],
        "copy": [
          [
            "提交中…",
            "7.2.2.2.2"
          ]
        ],
        "boundaries": [
          [
            "重复点击，不会创建新任务。",
            "7.2.2.3.1"
          ]
        ],
        "dependencies": [
          [
            "提交期间新增的日志，下次再提交。",
            "7.2.2.3.1"
          ]
        ],
        "checks": [
          [
            "成功后，新增日志仍保留。",
            "7.2.2.3.1",
            "7.2.2.3.3"
          ]
        ]
      },
      "navLabel": "提交中",
      "tabLabel": "提交中"
    },
    {
      "id": "result",
      "number": "2.3",
      "group": "submission",
      "title": "提交结果与手动重试",
      "summary": "分别演示成功和失败；失败后可在手机内重试。",
      "note": "结果为本地模拟，未连接真实上传和客服服务。",
      "states": [
        {
          "id": "success",
          "title": "提交成功",
          "description": "模拟云端确认，显示成功并清理对应数据。",
          "preset": "submit-entry",
          "extraActions": [],
          "hint": "点击下方按钮，演示一次成功提交。",
          "actions": [
            [
              "success",
              "演示提交成功",
              "fresh"
            ]
          ],
          "tabLabel": "成功"
        },
        {
          "id": "failure",
          "title": "失败与手动重试",
          "description": "失败后日志保留，再点手机入口手动重试。",
          "preset": "submit-entry",
          "extraActions": [],
          "hint": "演示失败后，点击手机内入口重试。",
          "target": "#problem-submit",
          "actions": [
            [
              "failure",
              "演示提交失败",
              "fresh"
            ]
          ],
          "targetWhen": "retry",
          "tabLabel": "失败与重试"
        }
      ],
      "definitions": {
        "trigger": [
          [
            "收到云端保存结果，或提交失败、超时。",
            "7.2.2.3.2",
            "7.2.2.3.3"
          ]
        ],
        "rules": [
          [
            "云端确认保存后，才算提交成功。",
            "7.2.2.3.2"
          ]
        ],
        "copy": [
          [
            "提交成功\n提交失败，请稍后重试",
            "7.2.2.3.3"
          ]
        ],
        "boundaries": [
          [
            "失败保留当日日志，不自动重试。",
            "7.2.2.3.3",
            "7.2.2.3.4"
          ]
        ],
        "dependencies": [
          [
            "提交结果不改变设备故障状态。",
            "7.2.1.3.2",
            "7.2.2.4"
          ]
        ],
        "checks": [
          [
            "成功只清理本次已确认的日志。",
            "7.2.2.3.3",
            "7.2.2.3.4"
          ]
        ]
      },
      "navLabel": "提交结果",
      "tabLabel": "提交结果"
    },
    {
      "id": "task-recovery",
      "number": "2.4",
      "group": "submission",
      "title": "页面返回与中断恢复",
      "summary": "演示返回、中断和跨日，查看任务如何继续。",
      "note": "跨日只调整演示时钟，不改变系统时间。",
      "states": [
        {
          "id": "return",
          "title": "返回 / 重新载入",
          "description": "开始任务，返回再进入，或重新载入此手机。",
          "preset": "submit-entry",
          "extraActions": [
            [
              "reload",
              "验证重新载入后恢复"
            ]
          ],
          "hint": "开始后，点手机返回，再点设置重新进入。",
          "target": "#back",
          "actions": [
            [
              "begin-long",
              "开始提交",
              "fresh"
            ]
          ],
          "targetWhen": "submitting",
          "returnTarget": "#settings",
          "tabLabel": "返回与重进"
        },
        {
          "id": "interrupted",
          "title": "任务中断",
          "description": "中断后恢复入口，再次点击手动重试。",
          "preset": "submit-entry",
          "extraActions": [],
          "hint": "模拟中断后，在手机内手动重试。",
          "actions": [
            [
              "interrupt",
              "模拟提交中断",
              "fresh"
            ]
          ],
          "tabLabel": "任务中断"
        },
        {
          "id": "midnight",
          "title": "跨 UTC 日切",
          "description": "任务跨日后，固定的在途日志仍可确认。",
          "preset": "submit-entry",
          "extraActions": [],
          "hint": "按按钮依次体验：开始提交 → 跨日 → 确认结果。",
          "showCounts": true,
          "actions": [
            [
              "begin-long",
              "开始提交",
              "fresh"
            ],
            [
              "next-day",
              "模拟跨日",
              "before-day"
            ],
            [
              "finish",
              "确认提交成功",
              "after-day"
            ]
          ],
          "tabLabel": "跨日恢复"
        }
      ],
      "definitions": {
        "trigger": [
          [
            "提交期间返回页面、中断或跨日。",
            "7.2.2.3.4"
          ]
        ],
        "rules": [
          [
            "返回后读取原任务，不重复提交。",
            "7.2.2.3.4"
          ]
        ],
        "copy": [
          [
            "提交中… / 问题提交",
            "7.2.2.2.2"
          ]
        ],
        "boundaries": [
          [
            "跨日不清除尚未结束的任务数据。",
            "7.2.2.3.4"
          ]
        ],
        "dependencies": [
          [
            "中断后，需要用户手动重试。",
            "7.2.2.3.4"
          ]
        ],
        "checks": [
          [
            "任务状态准确，不误报成功。",
            "7.2.2.3.4"
          ]
        ]
      },
      "navLabel": "返回与恢复",
      "tabLabel": "返回与恢复"
    }
  ],
  "workspace": {
    "version": "20261119-11",
    "defaultFeature": "recognition",
    "defaultSubmission": "validation"
  }
};
