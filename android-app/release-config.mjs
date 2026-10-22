import assert from 'node:assert/strict';
export function configureManifest(xml){
 xml=xml.replace(/android:allowBackup="[^"]*"/, 'android:allowBackup="false"');
 xml=xml.replace(/\sandroid:usesCleartextTraffic="[^"]*"/g,'').replace(/\sandroid:debuggable="[^"]*"/g,'');
 return xml.replace('<application','<application android:usesCleartextTraffic="false"');
}
export function configureGradle(src,release,signed=false){
 assert.equal(release.applicationId,'io.github.bethieugiavn.coinquest');
 assert.ok(Number.isSafeInteger(release.versionCode)&&release.versionCode>0);
 assert.match(release.versionName,/^\d+\.\d+\.\d+$/);
 assert.match(src,new RegExp('applicationId ["\']'+release.applicationId.replaceAll('.','\\.')+'["\']'));
 src=src.replace(/versionCode\s+\d+/,`versionCode ${release.versionCode}`).replace(/versionName\s+"[^"]+"/,`versionName "${release.versionName}"`);
 src=src.replace(/\napply from: 'release-signing.gradle'\s*/g,'\n');
 src=src.trimEnd();
 if(signed)src+="\napply from: 'release-signing.gradle'\n";
 return src;
}
export function auditManifest(xml,{release=true}={}){
 const names=[...xml.matchAll(/<uses-permission\b[^>]*android:name="([^"]+)"/g)].map(m=>m[1]);
 const allowed=new Set(['android.permission.INTERNET','android.permission.VIBRATE','io.github.bethieugiavn.coinquest.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION']);
 for(const n of names)assert.ok(allowed.has(n),`Unexpected permission: ${n}`);
 assert.ok(!/BIND_ACCESSIBILITY_SERVICE/.test(xml));
 if(release)assert.ok(!/android:debuggable="true"/.test(xml));
 assert.match(xml,/android:allowBackup="false"/);assert.match(xml,/android:usesCleartextTraffic="false"/);
 return names;
}

