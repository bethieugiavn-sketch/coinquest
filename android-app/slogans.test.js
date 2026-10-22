import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOGANS, createSloganRotator } from './slogans.js';

test('80 distinct slogans; no repeats through a full persisted cycle', async () => {
  assert.equal(SLOGANS.length, 80);
  assert.equal(new Set(SLOGANS).size, 80);
  let saved;
  const storage = { async get() { return saved; }, async set(k, v) { saved = v; } };
  const seen = [];
  for (let i = 0; i < 80; i++) {
    // Recreate each time to model closing and reopening the app.
    seen.push(await createSloganRotator(storage).next());
  }
  assert.equal(new Set(seen).size, 80);
  assert.notEqual(await createSloganRotator(storage).next(), seen.at(-1));
});

test('concurrent requests are serialized; corrupted storage recovers', async () => {
  let saved = 'broken JSON';
  const rotator = createSloganRotator({ async get() { return saved; }, async set(k,v) { saved = v; } });
  const phrases = await Promise.all(Array.from({ length: 80 }, () => rotator.next()));
  assert.equal(new Set(phrases).size, 80);
});

test('unavailable storage still avoids repeats in the current session', async () => {
  const rotator = createSloganRotator({ async get() { throw Error('unavailable'); }, async set() { throw Error('full'); } });
  const seen = [];
  for (let i=0;i<80;i++) seen.push(await rotator.next());
  assert.equal(new Set(seen).size, 80);
});
