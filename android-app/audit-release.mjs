import {readFileSync} from 'node:fs';import {execFileSync} from 'node:child_process';import assert from 'node:assert/strict';
const c=JSON.parse(readFileSync('release.json','utf8'));
const tool=process.env.ANDROID_HOME+'/build-tools/36.0.0/aapt2';
const text=execFileSync(tool,['dump','badging','android/app/build/outputs/apk/release/app-release.apk'],{encoding:'utf8'});
assert.ok(text.includes(`name='${c.applicationId}'`));assert.ok(text.includes(`versionCode='${c.versionCode}'`));assert.ok(text.includes(`versionName='${c.versionName}'`));assert.ok(text.includes(`targetSdkVersion:'${c.targetSdk}'`));assert.ok(!text.includes('application-debuggable'));
console.log(`Packaged release verified: ${c.applicationId} ${c.versionName} (${c.versionCode}), target API ${c.targetSdk}, not debuggable.`);
