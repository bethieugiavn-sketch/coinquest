import {readFileSync,writeFileSync,readdirSync,copyFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {configureManifest,configureGradle,auditManifest} from './release-config.mjs';
const release=JSON.parse(readFileSync('release.json','utf8'));
if(process.argv.includes('--audit')){
 const variant=process.argv.includes('--release')?'release':'debug';
 function find(path){for(const e of readdirSync(path,{withFileTypes:true})){const p=path+'/'+e.name;if(e.isDirectory()){const result=find(p);if(result)return result}else if(e.name==='AndroidManifest.xml'&&p.toLowerCase().includes('/'+variant+'/'))return p}}
 const path=find('android/app/build/intermediates/merged_manifests');assert.ok(path,'Merged manifest missing for '+variant);
 console.log('Manifest audit passed:',auditManifest(readFileSync(path,'utf8'),{release:variant==='release'}).join(', '));
}else{
 const signed=process.argv.includes('--release');
 if(signed)for(const n of ['TICHLOC_KEYSTORE_PATH','TICHLOC_STORE_PASSWORD','TICHLOC_KEY_ALIAS','TICHLOC_KEY_PASSWORD'])assert.ok(process.env[n],`Missing ${n}`);
 const manifest='android/app/src/main/AndroidManifest.xml';writeFileSync(manifest,configureManifest(readFileSync(manifest,'utf8')));
 const gradle='android/app/build.gradle';writeFileSync(gradle,configureGradle(readFileSync(gradle,'utf8'),release,signed));
 const vars='android/variables.gradle';let text=readFileSync(vars,'utf8');
 text=text.replace(/compileSdkVersion\s*=\s*\d+/,`compileSdkVersion = ${release.targetSdk}`).replace(/targetSdkVersion\s*=\s*\d+/,`targetSdkVersion = ${release.targetSdk}`);writeFileSync(vars,text);
 if(signed)copyFileSync('release-signing.gradle','android/app/release-signing.gradle');
 console.log(`Configured ${release.applicationId} ${release.versionName} (${release.versionCode}), target ${release.targetSdk}`);
}
