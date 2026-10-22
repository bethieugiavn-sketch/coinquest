import test from 'node:test';import assert from 'node:assert/strict';
import {configureManifest,configureGradle,auditManifest} from './release-config.mjs';
const cfg={applicationId:'io.github.bethieugiavn.coinquest',versionCode:7,versionName:'1.6.0'};
test('release configuration is idempotent, preserves app identity and signs only when requested',()=>{
 const src='android { defaultConfig { applicationId "io.github.bethieugiavn.coinquest"; versionCode 1; versionName "1.0" } }';
 const result=configureGradle(src,cfg,true);assert.equal(configureGradle(result,cfg,true),result);assert.match(result,/versionCode 7/);assert.match(result,/release-signing.gradle/);assert.ok(!configureGradle(result,cfg,false).includes('release-signing.gradle'));assert.throws(()=>configureGradle(src,{...cfg,applicationId:'changed'},true));
});
test('release permissions reject debug, backup, cleartext and unexpected permissions',()=>{
 const xml=configureManifest('<manifest><uses-permission android:name="android.permission.INTERNET"/><application android:allowBackup="true" android:debuggable="true" android:usesCleartextTraffic="true"/></manifest>');
 assert.deepEqual(auditManifest(xml),['android.permission.INTERNET']);
 for(const modified of [xml.replace('allowBackup="false"','allowBackup="true"'),xml.replace('usesCleartextTraffic="false"','usesCleartextTraffic="true"'),xml.replace('<application','<application android:debuggable="true"'),xml.replace('android.permission.INTERNET','android.permission.READ_SMS')])assert.throws(()=>auditManifest(modified));
});

test('debug audit permits only the debug flag without weakening release audit',()=>{const xml=configureManifest('<manifest><application android:allowBackup="true"/></manifest>').replace('<application','<application android:debuggable="true"');assert.doesNotThrow(()=>auditManifest(xml,{release:false}));assert.throws(()=>auditManifest(xml));});
