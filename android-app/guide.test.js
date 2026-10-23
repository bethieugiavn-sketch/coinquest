import test from 'node:test';import assert from 'node:assert/strict';
import {initialGuide,guidePhase,confirmedDaily} from './guide-state.js';
const fresh={history:[],quest:null,rolling:false};
test('onboarding only auto-opens for new installs; old welcome and imported data migrate',()=>{
 assert.equal(initialGuide(null,null).introDone,false);assert.equal(initialGuide(null,'seen').tourDone,true);
 assert.equal(initialGuide(null,null,[{id:'old'}]).introDone,true);
 assert.equal(initialGuide('{bad',null).introDone,false);
 const saved={version:1,introDone:true,tourDone:false,dismissed:true};assert.deepEqual(initialGuide(JSON.stringify(saved),null),saved);
});
test('tour resumes pending quests and never treats rolling or an unconfirmed quest as success',()=>{
 assert.equal(guidePhase(fresh),'spin');assert.equal(guidePhase({...fresh,rolling:true}),'rolling');
 assert.equal(guidePhase({...fresh,quest:{done:false,amount:25000}}),'deposit');
 assert.equal(guidePhase({...fresh,history:[{id:'a',type:'daily',done:true}]}),'complete');
 assert.equal(confirmedDaily({...fresh,history:[{id:'a',type:'daily',done:false}]},'a'),false);
 assert.equal(confirmedDaily({...fresh,history:[{id:'a',type:'extra',done:true}]},'a'),false);
 assert.equal(confirmedDaily({...fresh,history:[{id:'a',type:'daily',done:true}]},'a'),true);
});
