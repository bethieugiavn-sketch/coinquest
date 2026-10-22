import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from './storage.js';

test('native snapshot survives a fresh store and keeps writes ordered', async () => {
  const disk = new Map();
  const calls = [];
  const preferences = {
    async get({ key }) { return { value: disk.get(key) ?? null }; },
    async set({ key, value }) {
      await new Promise(resolve => setTimeout(resolve, 2));
      calls.push(JSON.parse(value).total);
      disk.set(key, value);
    },
  };
  const store = createStore(preferences, 'coinquest.v1', value => value);
  const first = { total: 25000, level: 1 };
  const a = store.save(first);
  first.total = 999999;
  const b = store.save({ total: 500000, level: 2 });
  await Promise.all([a, b]);
  assert.deepEqual(calls, [25000, 500000]);
  const restarted = createStore(preferences, 'coinquest.v1', value => value);
  assert.deepEqual(JSON.parse(await restarted.raw()), { total: 500000, level: 2 });
});

test('failed native write is surfaced and a retry can succeed', async () => {
  let fail = true, saved;
  const store = createStore({
    async get() { return { value: saved ?? null }; },
    async set({ value }) { if (fail) throw Error('disk unavailable'); saved = value; },
  }, 'coinquest.v1', value => value);
  await assert.rejects(store.save({ total: 5000 }), /disk unavailable/);
  assert.equal(await store.raw(), null);
  fail = false;
  await store.save({ total: 10000 });
  assert.equal(JSON.parse(await store.raw()).total, 10000);
});

test('invalid backup is rejected before persistence', () => {
  let called = false;
  const store = createStore({ set() { called = true; } }, 'coinquest.v1', () => { throw Error('invalid'); });
  assert.throws(() => store.save({}), /invalid/);
  assert.equal(called, false);
});

