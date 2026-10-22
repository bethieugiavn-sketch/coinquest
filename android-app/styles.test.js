import {test} from 'node:test';
import assert from 'node:assert/strict';
import {STYLES,styleAt,gearAt} from './evolution.js';
test('five branches unlock only at the required level',()=>{
  assert.equal(new Set(STYLES.map(s=>s.id)).size,5);
  for(const s of STYLES){assert.equal(styleAt(s.id,s.unlock).id,s.id);if(s.unlock>1)assert.equal(styleAt(s.id,s.unlock-1).id,'wood');assert.equal(s.gear.length,4)}
  assert.equal(styleAt('untrusted-id',100).id,'wood');
});
test('four equipment grades unlock at 1, 5, 25 and 100',()=>{
  assert.deepEqual([1,4,5,24,25,99,100,900].map(gearAt),[0,0,1,1,2,2,3,3]);
});
