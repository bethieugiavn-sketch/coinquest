import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const allowed = new Set(['android.permission.INTERNET', 'android.permission.VIBRATE']);
if (process.argv.includes('--audit')) {
  function findManifest(path) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const file = `${path}/${entry.name}`;
      if (entry.isDirectory()) { const result = findManifest(file); if (result) return result; }
      else if (entry.name === 'AndroidManifest.xml') return file;
    }
  }
  const path = findManifest('android/app/build/intermediates/merged_manifests');
  assert.ok(path, 'Merged AndroidManifest.xml not found');
  const manifest = readFileSync(path, 'utf8');
  const names = [...manifest.matchAll(/<uses-permission\b[^>]*android:name="([^"]+)"/g)].map(m => m[1]);
  for (const name of names) {
    // AndroidX adds an app-scoped signature permission for internal receivers.
    assert.ok(allowed.has(name) || name === 'io.github.bethieugiavn.coinquest.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION', `Unexpected permission: ${name}`);
  }
  assert.ok(!/BIND_ACCESSIBILITY_SERVICE/.test(manifest), 'Accessibility service is prohibited');
  assert.match(manifest, /android:allowBackup="false"/);
  console.log('Merged manifest audit passed:', names.join(', '));
} else {
  const path = 'android/app/src/main/AndroidManifest.xml';
  let xml = readFileSync(path, 'utf8').replace('android:allowBackup="true"', 'android:allowBackup="false"');
  // INTERNET comes from the app, VIBRATE from the Haptics plugin. No SMS,
  // contacts, accessibility, storage or notification permissions are requested.
  writeFileSync(path, xml);
  const gradle = 'android/app/build.gradle';
  writeFileSync(gradle, readFileSync(gradle, 'utf8').replace('versionCode 1', 'versionCode 2').replace('versionName "1.0"', 'versionName "1.1.0"'));
}
