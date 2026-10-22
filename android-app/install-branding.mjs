import {mkdirSync,writeFileSync,copyFileSync} from 'node:fs';
import {join} from 'node:path';

// Preserve the approved artwork. Android scales BitmapDrawables at render time;
// the inset keeps the emblem inside circular and squircle adaptive icon masks.
export function installBranding(res='android/app/src/main/res',source='logo.png') {
  const put=(dir,name,content)=>{mkdirSync(join(res,dir),{recursive:true});writeFileSync(join(res,dir,name),content)};
  mkdirSync(join(res,'drawable-nodpi'),{recursive:true});
  copyFileSync(source,join(res,'drawable-nodpi/tichloc_logo.png'));
  put('drawable','tichloc_icon_foreground.xml',`<?xml version="1.0" encoding="utf-8"?>
<inset xmlns:android="http://schemas.android.com/apk/res/android" android:inset="16dp">
  <bitmap android:src="@drawable/tichloc_logo" android:gravity="fill" android:filter="true"/>
</inset>\n`);
  for(const name of ['ic_launcher','ic_launcher_round']) {
    put('mipmap-anydpi',name+'.xml',`<?xml version="1.0" encoding="utf-8"?>
<bitmap xmlns:android="http://schemas.android.com/apk/res/android" android:src="@drawable/tichloc_logo" android:gravity="fill" android:filter="true"/>\n`);
    put('mipmap-anydpi-v26',name+'.xml',`<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
  <background android:drawable="@color/tichloc_icon_background"/>
  <foreground android:drawable="@drawable/tichloc_icon_foreground"/>
</adaptive-icon>\n`);
  }
  put('values','tichloc_brand.xml',`<?xml version="1.0" encoding="utf-8"?>
<resources><color name="tichloc_icon_background">#06372C</color></resources>\n`);
}
