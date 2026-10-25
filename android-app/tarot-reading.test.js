import test from 'node:test';import assert from 'node:assert/strict';
import {READING_DATA,TOPICS,SPREADS,validateReading,shuffleDeck,interpret,synthesis} from './tarot-reading.js';
import {validateTarotGame,tarotUnlocked} from './tarot-game.js';
test('all 176 topic/orientation readings have distinct practical content and position lenses',()=>{
 assert.equal(READING_DATA.length,22);const messages=new Set();
 for(let id=0;id<22;id++){assert.equal(READING_DATA[id].length,4);for(const topic of Object.keys(TOPICS))for(const reversed of [false,true]){const card={tarotId:id,reversed};for(const size of [1,3,5])for(let i=0;i<size;i++){const r=interpret(card,topic,size,i);assert.equal(r.position,SPREADS[size][i]);assert.ok(r.lens.length>30);assert.ok(r.action.length>30);assert.ok(r.insight.length>30)}messages.add(interpret(card,topic,1,0).insight)}}assert.equal(messages.size,176);
});
test('timed shuffle reproducible for testing, without duplicates and near 80/20 over many seeds',()=>{
 const args={wall:100,start:1.25,end:900.125,entropy:42};assert.deepEqual(shuffleDeck(args),shuffleDeck(args));assert.notDeepEqual(shuffleDeck(args),shuffleDeck({...args,end:901.125}));let reversed=0;
 for(let n=0;n<2000;n++){const deck=shuffleDeck({...args,entropy:n});assert.equal(new Set(deck.map(c=>c.tarotId)).size,22);reversed+=deck.filter(c=>c.reversed).length}const rate=reversed/44000;assert.ok(rate>.185&&rate<.215,rate);
});
test('advanced readings round trip with old backups, unlock every selected card, reject corruption',()=>{
 const reading={topic:'money',size:3,cards:[{tarotId:1,reversed:false},{tarotId:8,reversed:true},{tarotId:21,reversed:false}]},r={id:'new',day:'2026-10-25',tarotId:1,reading},legacy={id:'old',day:'2026-10-24',tarotId:0};assert.deepEqual(validateTarotGame(JSON.parse(JSON.stringify([legacy,r]))),[legacy,r]);assert.deepEqual([...tarotUnlocked({tarotGame:[legacy,r]})],[0,1,8,21]);
 for(const bad of [{...reading,topic:'bogus'},{...reading,size:5},{...reading,size:'3'},{...reading,cards:[reading.cards[0],reading.cards[0],reading.cards[2]]},{...reading,cards:[{tarotId:22,reversed:false},...reading.cards.slice(1)]},{...reading,cards:[{tarotId:1,reversed:'true'},...reading.cards.slice(1)]}])assert.throws(()=>validateReading(bad));assert.throws(()=>validateTarotGame([{...r,tarotId:2}]));
});
test('synthesis uses first/last topic and orientation and produces symbolic number only',()=>{
 const names=Array.from({length:22},(_,i)=>'Card '+i),r={topic:'work',size:3,cards:[{tarotId:0,reversed:false},{tarotId:8,reversed:true},{tarotId:21,reversed:false}]};const result=synthesis(r,names);assert.ok(result.bridge.includes('Card 0')&&result.bridge.includes('Card 21'));assert.equal(result.action,interpret(r.cards[2],'work',3,2).action);assert.notEqual(result.bridge,synthesis({...r,cards:[{tarotId:0,reversed:true},...r.cards.slice(1)]},names).bridge);assert.ok(result.number>=1&&result.number<=99);assert.equal(result.amount,undefined);
});
