export function initialGuide(raw,legacySeen,history=[]){
 try{const s=JSON.parse(raw);if(s?.version===1)return {version:1,introDone:s.introDone===true,tourDone:s.tourDone===true||history.length>0,dismissed:s.dismissed===true};}catch{}
 const existing=legacySeen==='seen'||history.length>0;
 return {version:1,introDone:existing,tourDone:existing,dismissed:false};
}
export function guidePhase(context){
 if(context.rolling)return 'rolling';
 if(context.history.some(h=>h.type==='daily'&&h.done))return 'complete';
 if(context.quest&&!context.quest.done)return 'deposit';
 return 'spin';
}
export function confirmedDaily(context,id){return context.history.some(h=>h.id===id&&h.type==='daily'&&h.done===true);}
