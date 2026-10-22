import {test} from 'node:test';
import assert from 'node:assert/strict';
import {FORMS,evolutionAt} from './evolution.js';
test('24 distinct forms unlock only at their milestones',()=>{
  assert.equal(FORMS.length,24);
  assert.equal(new Set(FORMS.map(f=>f.name)).size,24);
  FORMS.forEach((f,i)=>{assert.equal(evolutionAt(f.level).tier,i);if(i)assert.equal(evolutionAt(f.level-1).tier,i-1)});
});
test('progression continues indefinitely after level 700',()=>{
  for(const level of [700,799,800,999,5000,100000]){
    const e=evolutionAt(level);assert.ok(e.next>level);assert.equal(e.tier,23);assert.ok(e.progress>=0&&e.progress<100);
  }
  assert.equal(evolutionAt(800).stars,1);assert.equal(evolutionAt(900).next,1000);
});
