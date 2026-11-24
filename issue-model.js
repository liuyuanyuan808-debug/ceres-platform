(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.PrototypeIssueModel=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const KEY='video-prototype-issues-v1';
  const definitions={
    E05:{name:'电池温度过高',kind:'blocking',message:'电池温度过高，设备暂停使用',warm:'电池温度过高，相关功能不可用，请关闭设备并置于阴凉处，冷却后再使用',remedy:'请关闭设备并置于阴凉处，冷却后再使用',...globalThis.REVIEW_DATA?.cases?.E05},
    E53:{name:'未检测到法兰',kind:'reminder',message:'未检测到法兰，暂不可加热，请重新安装并卡紧',warm:'未检测到法兰，相关功能不可用，请重新安装并卡紧',remedy:'请重新安装并卡紧',...globalThis.REVIEW_DATA?.cases?.E53}
  };
  function create(options={}){
    const faultDefinitions=options.faultDefinitions?{...definitions,...options.faultDefinitions}:definitions;
    const storage=options.storage,now=options.now||Date.now;
    const schedule=options.schedule||setTimeout,cancel=options.cancel||clearTimeout;
    const fresh=()=>({version:1,sequence:0,pending:[],cloud:[],faults:[],task:null,network:true,accountValid:true,bluetooth:true,nextResult:'success',accountId:'prototype-account',deviceId:'prototype-device'});
    let data=fresh(),timer=null,dayTimer=null;
    const listeners=new Set();
    try{const saved=JSON.parse(storage?.getItem(KEY)||'null');if(saved?.version===1)data={...data,...saved};}catch{}
    const day=value=>new Date(value).toISOString().slice(0,10);
    function prune(){const today=day(now());data.pending=data.pending.filter(row=>day(row.timestamp)===today);}
    function persist(){try{storage?.setItem(KEY,JSON.stringify(data));}catch{}}
    function emit(event={type:'update'}){persist();for(const listener of listeners)listener(event);}
    function id(prefix){data.sequence++;return `${prefix}-${now()}-${data.sequence}`;}
    function append(code,side,faultState='occurred',timestamp=now()){
      const definition=faultDefinitions[code];
      const row={id:id('demo-log'),timestamp:new Date(timestamp).toISOString(),event_id:'prototype_device_fault_received',content:{fault_state:faultState,error_code:code,raw_message:definition.message},device_id:`prototype-${side.toLowerCase()}`,device_group_id:data.deviceId,side,owner:data.accountId};
      data.pending.push(row);prune();return row;
    }
    function receive(code,side){
      if(!Object.hasOwn(faultDefinitions,code)||!['L','R'].includes(side))throw new Error('Unsupported prototype fault');
      append(code,side);
      let fault=data.faults.find(item=>item.code===code&&item.side===side);
      const repeated=Boolean(fault);
      if(!fault){fault={id:id('demo-fault'),code,side,acknowledged:false,dismissed:false,receivedAt:now()};data.faults.push(fault);}
      emit({type:'fault',fault,repeated});return fault;
    }
    function recoverAll(){
      for(const fault of data.faults)append(fault.code,fault.side,'resolved');
      data.faults=[];emit({type:'recovery'});
    }
    function recover(faultId){
      const fault=data.faults.find(f=>f.id===faultId);if(!fault)return;
      append(fault.code,fault.side,'resolved');data.faults=data.faults.filter(f=>f.id!==faultId);emit({type:'recovery'});
    }
    function acknowledge(faultId){const f=data.faults.find(f=>f.id===faultId);if(f)f.acknowledged=true;emit({type:'acknowledged'});}
    function dismiss(faultId){const f=data.faults.find(f=>f.id===faultId);if(f)f.dismissed=true;emit({type:'dismissed'});}
    function finishTask(){
      const task=data.task;if(!task||task.status!=='submitting')return;
      timer=null;prune();
      if(task.result==='success'){
        const archived=new Set(data.cloud.map(row=>row.id));
        for(const row of task.logs)if(!archived.has(row.id)){data.cloud.push(row);archived.add(row.id);}
        const confirmed=new Set(task.logs.map(row=>row.id));
        data.pending=data.pending.filter(row=>!confirmed.has(row.id));
        task.status='success';
      }else task.status=task.result==='interrupted'?'interrupted':'failed';
      task.finishedAt=now();data.nextResult='success';
      emit({type:'task_finished',message:task.status==='success'?'提交成功':'提交失败，请稍后重试'});
    }
    function arm(){
      if(timer!==null)cancel(timer);
      if(data.task?.status==='submitting')timer=schedule(finishTask,Math.max(0,data.task.dueAt-now()));
    }
    function armDayChange(){
      const current=new Date(now());
      const next=Date.UTC(current.getUTCFullYear(),current.getUTCMonth(),current.getUTCDate()+1);
      dayTimer=schedule(()=>{prune();emit({type:'day_check'});armDayChange();},next-now());
    }
    function submit(duration=6000){
      prune();
      if(data.task?.status==='submitting')return {status:'busy'};
      const cutoff=now();
      const eligible=data.pending.filter(row=>row.owner===data.accountId&&(row.device_group_id||'prototype-device')===data.deviceId&&new Date(row.timestamp).getTime()<=cutoff);
      let message='';
      if(!eligible.length)message='暂无可提交的问题信息';
      else if(!data.network)message='网络不可用，请连接网络后重试';
      else if(!data.accountValid)return {status:'account_unconfirmed'};
      if(message){emit({type:'validation_failed',message});return {status:'invalid',message};}
      const logs=eligible.map(row=>JSON.parse(JSON.stringify(row)));
      data.task={id:id('demo-submit'),status:'submitting',accountId:data.accountId,deviceId:data.deviceId,cutoff,dueAt:cutoff+duration,result:data.nextResult,logs};
      emit({type:'task_started'});arm();return {status:'submitting',taskId:data.task.id};
    }
    function interrupt(){
      if(data.task?.status!=='submitting')return;
      if(timer!==null)cancel(timer);timer=null;
      data.task.status='interrupted';data.task.finishedAt=now();data.nextResult='success';
      emit({type:'task_finished',message:'提交失败，请稍后重试'});
    }
    function configure(settings){Object.assign(data,settings);emit({type:'configured'});}
    // These fixtures are used only by the controls outside the phone canvas.
    function prepare({empty=false,network=true,result='success',bluetooth=true,code='E05',side='L'}={}){
      if(data.task?.status==='submitting')return false;
      data.task=null;data.pending=[];data.network=network;data.accountValid=true;data.bluetooth=bluetooth;data.nextResult=result;
      if(!empty)append(code,side);
      emit({type:'prepared'});return true;
    }
    function reset(){if(timer!==null)cancel(timer);timer=null;data=fresh();emit({type:'reset'});}
    prune();persist();arm();armDayChange();
    return {
      get data(){return data;},definitions:faultDefinitions,
      subscribe(listener){listeners.add(listener);return ()=>listeners.delete(listener);},
      receive,recover,recoverAll,acknowledge,dismiss,submit,interrupt,configure,prepare,reset,
      complete(result='success'){if(data.task?.status!=='submitting')return;if(timer!==null)cancel(timer);timer=null;data.task.result=result;finishTask();},
      appendDemoLog(code='E53',side='R',timestamp=now()){const row=append(code,side,'occurred',timestamp);emit({type:'log_received'});return row;},
      prune(){prune();emit({type:'day_check'});},
      blocked(side){return data.faults.some(f=>faultDefinitions[f.code]?.kind==='blocking'&&f.side===side);},
      heatingRestricted(side){return data.faults.some(f=>f.code==='E53'&&f.side===side);},
      dispose(){if(timer!==null)cancel(timer);if(dayTimer!==null)cancel(dayTimer);listeners.clear();}
    };
  }
  return {create,definitions,storageKey:KEY};
});
