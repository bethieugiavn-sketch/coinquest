import * as THREE from 'three';
import {evolutionAt,STYLES,gearAt} from './evolution.js';

export function initWorld(stage) {
  if(!stage)return;
  let renderer;
  try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.25;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const canvas=renderer.domElement;
  canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Linh thú 3D trên hòn đảo nổi');
  canvas.className='world-canvas';stage.prepend(canvas);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,.1,60);
  const ambient=new THREE.HemisphereLight(0xe8ffef,0x183126,3);scene.add(ambient);
  const sun=new THREE.DirectionalLight(0xffe5b4,4);sun.position.set(-3,7,5);sun.castShadow=true;sun.shadow.mapSize.set(512,512);sun.shadow.camera.left=-5;sun.shadow.camera.right=5;sun.shadow.camera.top=5;sun.shadow.camera.bottom=-5;scene.add(sun);
  const rim=new THREE.PointLight(0xb9f574,18,12);rim.position.set(2,3,-2);scene.add(rim);
  let content,hero,leaves,orbit,visible=true,angle=.17,targetAngle=.17,lastFrame=0,signature='';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const palettes=[['#102d25','#7faf5b','#39724f','#badc81'],['#302d29','#b7a469','#6f9b55','#f2b8aa'],['#0e3441','#66b7a5','#348d8a','#a4eff1'],['#242741','#8584bd','#8779c9','#c1c4ff'],['#33404a','#a6c9bf','#8cae9f','#ffe1ad'],['#131b38','#535b88','#846dc4','#f6cf79']];
  const material=(color,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness:metalness?.28:.67,metalness});
  function mesh(geometry,color,parent,x=0,y=0,z=0,metalness=0){const m=new THREE.Mesh(geometry,material(color,metalness));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
  function ball(parent,color,x,y,z,sx,sy=sx,sz=sx){const m=mesh(new THREE.SphereGeometry(1,20,14),color,parent,x,y,z);m.scale.set(sx,sy,sz);return m;}
  function crystal(parent,color,x,y,z,size){const m=mesh(new THREE.OctahedronGeometry(size,0),color,parent,x,y,z,.25);m.scale.y=1.6;return m;}
  function disposeGroup(group){group.traverse(o=>{o.geometry?.dispose();if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m.dispose())}});scene.remove(group);}
  function rebuild(level,styleId=window.tichLocStyle||'wood'){
    const style=STYLES.find(s=>s.id===styleId)||STYLES[0],grade=gearAt(level);
    const e=evolutionAt(level),key=e.tier+':'+e.stars+':'+style.id+':'+grade;
    if(signature===key)return;signature=key;
    if(content)disposeGroup(content);
    content=new THREE.Group();scene.add(content);const [sky,ground,tree,skin]=palettes[e.world];
    scene.background=new THREE.Color(sky);scene.fog=new THREE.Fog(sky,9,20);rim.color.set(skin);
    mesh(new THREE.CylinderGeometry(2.65,1.8,.75,48),ground,content,0,-.55,0);
    const island=mesh(new THREE.ConeGeometry(1.9,1.7,7),e.world===5?'#34314d':'#615e49',content,0,-1.7,0);island.rotation.z=Math.PI;
    mesh(new THREE.CylinderGeometry(2.7,2.65,.12,48),ground,content,0,-.12,0);
    for(let i=0;i<7;i++){
      const a=i*1.04+.25,x=Math.sin(a)*2.03,z=Math.cos(a)*1.7;
      if(z>1&&Math.abs(x)<1.5)continue;
      if(e.world===3||e.world===5){crystal(content,skin,x,.45,z,.3+(i%3)*.13);crystal(content,tree,x+.22,.17,z+.18,.19);}
      else if(e.world===4){ball(content,'#e4f0e6',x,.45,z,.5,.2,.3);ball(content,'#cfdfd9',x+.25,.34,z,.45,.18,.3);}
      else{mesh(new THREE.CylinderGeometry(.1,.14,1.1,9),'#85633f',content,x,.35,z);if(i%2===0){ball(content,tree,x,.98,z,.58,.56,.49);ball(content,tree,x-.3,.85,z+.1,.39);ball(content,tree,x+.28,.88,z-.07,.37);}else for(let j=0;j<3;j++)mesh(new THREE.ConeGeometry(.5-j*.1,.8,9),tree,content,x,.7+j*.35,z);}
    }
    for(let i=0;i<12;i++){const a=i*.93;ball(content,e.world===2?'#afe4e5':i%2?'#e5cf8e':'#f0bcba',Math.sin(a)*2.25,0,Math.cos(a)*1.8,.06,.12,.06);}
    if(e.world===2){const lake=mesh(new THREE.CylinderGeometry(.85,.85,.025,40),'#7bd7df',content,-1.25,-.03,.8,.45);lake.scale.z=.6;}
    hero=new THREE.Group();hero.position.y=.05;hero.scale.setScalar(1.12);content.add(hero);
    const accent=style.id==='wood'?(e.tier>=20?'#efc66c':skin):style.color;
    const body=ball(hero,accent,0,.92,0,.56,.72,.43);
    ball(hero,'#eaf0c4',0,1.02,.32,.45,.4,.19);
    ball(hero,tree,-.3,.14,.12,.2,.16,.27);ball(hero,tree,.3,.14,.12,.2,.16,.27);
    const left=ball(hero,accent,-.62,.82,.04,.15,.28,.15);left.rotation.z=-.4;
    const right=ball(hero,accent,.62,.82,.04,.15,.28,.15);right.rotation.z=.4;
    for(const x of [-.18,.18]){ball(hero,'#15362b',x,1.13,.505,.078,.105,.04);ball(hero,'#ffffff',x-.023,1.17,.545,.025);ball(hero,'#b7e3cc',x+.023,1.10,.54,.012);ball(hero,'#eaa498',x*1.6,.98,.478,.07,.032,.02);}
    const smile=mesh(new THREE.TorusGeometry(.07,.012,6,16,Math.PI),'#3a6040',hero,0,1,.523);smile.rotation.z=Math.PI;
    const belt=mesh(new THREE.TorusGeometry(.43,.055,8,32),'#467743',hero,0,.53,.05);belt.rotation.x=Math.PI/2;
    const coin=mesh(new THREE.CylinderGeometry(.14,.14,.05,24),'#ebc45b',hero,0,.55,.46,.7);coin.rotation.x=Math.PI/2;
    mesh(new THREE.BoxGeometry(.035,.17,.018),'#8e6c29',hero,0,.55,.495,.5);
    leaves=new THREE.Group();hero.add(leaves);
    mesh(new THREE.CylinderGeometry(.028,.035,.25,8),tree,leaves,0,1.67,0);
    const leafCount=2+(e.tier%4);
    for(let i=0;i<leafCount;i++){const a=(i/leafCount)*Math.PI*2;const leaf=ball(leaves,e.world===5?'#ffd87c':tree,Math.sin(a)*.2,1.8+Math.cos(a)*.03,Math.cos(a)*.13,.11,.29,.055);leaf.rotation.z=-Math.sin(a)*.8;leaf.rotation.x=Math.cos(a)*.7;}
    leaves.visible=style.id==='wood';
    const gold=grade>=2?'#efca76':'#b99250';
    if(style.id==='wood'){
      // Bark tunic, boots and a scalloped leaf cap echo the supplied woodland mascot.
      mesh(new THREE.CylinderGeometry(.49,.43,.48,12),'#9b714a',hero,0,.49,.02);
      for(let i=0;i<8;i++){const a=i*Math.PI/4;const strip=mesh(new THREE.BoxGeometry(.045,.43,.045),'#725438',hero,Math.sin(a)*.47,.49,Math.cos(a)*.39+.02);strip.rotation.y=a;}
      for(const x of [-.3,.3])ball(hero,'#735438',x,.13,.16,.21,.17,.27);
      for(let i=0;i<7;i++){const a=i*Math.PI*2/7;ball(hero,tree,Math.sin(a)*.36,1.5,Math.cos(a)*.28,.2,.15,.18);}
      if(grade>=1){mesh(new THREE.CylinderGeometry(.035,.055,1.05,8),'#7d623a',hero,.78,.67,.05);ball(hero,tree,.78,1.23,.05,.17,.22,.13);}
      if(grade>=2)for(const x of [-.55,.55])ball(hero,'#547f40',x,.85,.02,.22,.18,.25);
      if(grade>=3)for(let i=0;i<5;i++)crystal(hero,'#ebce73',(i-2)*.15,1.62+(.12-Math.abs(i-2)*.03),.28,.055);
    }
    if(style.id==='knight'){
      ball(hero,grade>=2?'#e6d6a5':'#94abb8',0,.62,.27,.47,.3,.28);
      for(const x of [-.53,.53])ball(hero,'#788e9e',x,.91,.02,.23,.16,.22);
      const helmet=mesh(new THREE.TorusGeometry(.45,.065,8,32),'#8096a5',hero,0,1.47,.01);helmet.rotation.x=Math.PI/2;
      mesh(new THREE.ConeGeometry(.1,.36,5),gold,hero,0,1.75,-.1);
      const shield=mesh(new THREE.CylinderGeometry(.29,.29,.07,6),grade>=2?gold:'#947b47',hero,-.77,.8,.23,.45);shield.rotation.x=Math.PI/2;
      mesh(new THREE.BoxGeometry(.055,.31,.025),'#ebd99c',hero,-.77,.8,.28);
      const blade=mesh(new THREE.BoxGeometry(.1,.65+.1*grade,.035),'#e1e9ed',hero,.8,1.05,.1,.7);blade.rotation.z=-.16;
      mesh(new THREE.BoxGeometry(.3,.055,.08),gold,hero,.83,.72,.1,.5);
      mesh(new THREE.CylinderGeometry(.045,.045,.2,8),'#685640',hero,.83,.61,.1);
      if(grade>=3)for(const x of [-.55,.55])crystal(hero,'#e9cd77',x,1.04,.13,.12);
    }
    if(style.id==='mage'){
      mesh(new THREE.CylinderGeometry(.39,.6,.68,18),'#6c4b91',hero,0,.46,-.04);
      const brim=mesh(new THREE.CylinderGeometry(.59,.59,.065,32),'#76549c',hero,0,1.52,0);
      const hat=mesh(new THREE.ConeGeometry(.4,.68+.07*grade,24),'#76549c',hero,-.07,1.88,-.03);hat.rotation.z=.18;
      mesh(new THREE.TorusGeometry(.36,.025,6,32),gold,hero,0,1.58,.02).rotation.x=Math.PI/2;
      mesh(new THREE.CylinderGeometry(.035,.05,1.45,8),'#9d8251',hero,.78,.92,.04);
      const gem=crystal(hero,'#c7b3ff',.78,1.72,.04,.16+.025*grade);gem.material.emissive.set('#6546aa');gem.material.emissiveIntensity=.4;
      if(grade>=2){const seal=mesh(new THREE.TorusGeometry(.7,.015,6,48),'#d9c1ff',hero,0,.34,.06);seal.rotation.x=Math.PI/2;}
    }
    if(style.id==='dragon'){
      for(const x of [-.32,.32]){const horn=mesh(new THREE.ConeGeometry(.1,.39+.04*grade,9),gold,hero,x,1.66,-.04);horn.rotation.z=-x;}
      const shape=new THREE.Shape();shape.moveTo(0,0);shape.lineTo(.18,.6);shape.lineTo(.8,.79);shape.lineTo(.59,.27);shape.lineTo(.32,.33);shape.lineTo(.2,.05);shape.closePath();
      for(const side of [-1,1]){const wing=mesh(new THREE.ExtrudeGeometry(shape,{depth:.035,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.01,bevelThickness:.01}),grade>=2?'#b9a058':'#4d9f8d',hero,side*.41,.87,-.29);wing.scale.x=side*(.9+grade*.13);wing.rotation.y=side*.3;}
      const tailPath=new THREE.CatmullRomCurve3([new THREE.Vector3(0,.5,-.3),new THREE.Vector3(.15,.27,-.75),new THREE.Vector3(.6,.23,-.9),new THREE.Vector3(.8,.49,-.75)]);
      mesh(new THREE.TubeGeometry(tailPath,16,.09,8,false),'#559c81',hero);crystal(hero,gold,.8,.51,-.75,.12);
      if(grade>=1)for(const x of [-.25,0,.25])crystal(hero,gold,x,.68,.46,.07);
    }
    if(style.id==='mecha'){
      const chest=mesh(new THREE.BoxGeometry(.88,.54,.55),'#758f9d',hero,0,.6,.08,.4);
      for(const x of [-.57,.57]){ball(hero,'#7b99a6',x,.93,.03,.22,.18,.22);mesh(new THREE.BoxGeometry(.33,.18,.42),'#617e89',hero,x*.55,.13,.17,.35);}
      const core=ball(hero,'#a3f3ed',0,.68,.39,.14,.14,.045);core.material.emissive.set('#3bc8c1');core.material.emissiveIntensity=.6;
      mesh(new THREE.CylinderGeometry(.028,.028,.36,8),'#647b86',hero,.33,1.66,-.01,.45);ball(hero,'#a3f3ed',.33,1.88,-.01,.065);
      for(const x of [-.33,.33]){const turbine=mesh(new THREE.CylinderGeometry(.13,.13,.45,14),'#758e9b',hero,x,.71,-.42,.4);if(grade>=1)ball(hero,'#a3eef1',x,.4,-.42,.07,.18,.07);}
      if(grade>=2)for(const x of [-.56,.56])mesh(new THREE.BoxGeometry(.17,.3,.16),gold,hero,x,1,.15,.5);
    }
    // Each quartet gains a distinct accessory silhouette, not just a hue change.
    const accessory=style.id==='wood'?e.tier%4:-1;
    if(accessory===1){for(const x of [-.52,.52]){const petal=ball(hero,skin,x,1.56,0,.24,.08,.18);petal.rotation.z=x;}}
    if(accessory===2){for(const x of [-.55,.55]){const wing=ball(hero,e.world===5?'#d8c1ff':'#d1e6bc',x,1.17,-.28,.35,.5,.065);wing.rotation.z=x*.7;}crystal(hero,'#e9c66b',0,1.53,.35,.08);}
    if(accessory===3){mesh(new THREE.CylinderGeometry(.31,.27,.16,12),'#e8c15e',hero,0,1.62,0,.65);for(let i=0;i<5;i++){const a=i*Math.PI*2/5;mesh(new THREE.ConeGeometry(.065,.23,5),'#f8dc88',hero,Math.sin(a)*.25,1.8,Math.cos(a)*.25,.55);}}
    if(e.tier>=8){for(const x of [-.4,.4])crystal(hero,skin,x,1.55,-.02,.1);}
    if(e.tier>=12){const cape=ball(hero,tree,0,.8,-.4,.52,.66,.12);cape.rotation.x=-.2;}
    if(e.tier>=16){for(const x of [-.68,.68])crystal(hero,'#f7ce76',x,1.06,.13,.12);}
    orbit=new THREE.Group();orbit.position.y=1;hero.add(orbit);
    if(e.tier>=20){const halo=mesh(new THREE.TorusGeometry(.9,.018,6,64),'#f3d184',orbit);halo.rotation.x=.7;halo.rotation.y=.3;}
    const starCount=Math.min(10,Math.floor(e.tier/4)+e.stars);
    for(let i=0;i<starCount;i++){const a=i*Math.PI*2/Math.max(1,starCount);crystal(orbit,'#ffe4a0',Math.cos(a)*1.02,Math.sin(a)*.65,Math.sin(a)*.3,.06);}
    renderer.render(scene,camera);stage.classList.add('has3d');
  }
  function resize(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
  const observer=new ResizeObserver(resize);observer.observe(stage);resize();
  let onScreen=true;const intersection=new IntersectionObserver(([entry])=>{onScreen=entry.isIntersecting;},{threshold:.02});intersection.observe(stage);
  const update=e=>rebuild(e.detail.level,e.detail.style);window.addEventListener('tichloc:level',update);
  const rotate=()=>{targetAngle+=Math.PI/7;};document.getElementById('rotateWorld')?.addEventListener('click',rotate);
  let pointer=null;
  const down=e=>{pointer={x:e.clientX,y:e.clientY};canvas.setPointerCapture?.(e.pointerId);};
  const move=e=>{if(!pointer)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;if(Math.abs(dx)>Math.abs(dy))targetAngle-=dx*.009;pointer={x:e.clientX,y:e.clientY};};
  const up=()=>{pointer=null;};
  canvas.style.touchAction='pan-y';canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
  const vis=()=>{visible=!document.hidden;};document.addEventListener('visibilitychange',vis);
  rebuild(window.tichLocLevel||1);
  renderer.setAnimationLoop(time=>{
    if(!visible||!onScreen||time-lastFrame<1000/(reduced.matches?4:50))return;lastFrame=time;
    const t=reduced.matches?0:time*.001;
    angle+=(targetAngle-angle)*.07;
    camera.position.set(Math.sin(angle)*7.3,3.05,Math.cos(angle)*7.3);camera.lookAt(0,.65,0);
    hero.position.y=.06+Math.sin(t*1.7)*.045;hero.rotation.y=Math.sin(t*.7)*.07;
    leaves.rotation.z=Math.sin(t*1.8)*.04;orbit.rotation.y=t*.15;
    renderer.render(scene,camera);
  });
  const dispose=()=>{renderer.setAnimationLoop(null);observer.disconnect();intersection.disconnect();window.removeEventListener('tichloc:level',update);document.removeEventListener('visibilitychange',vis);document.getElementById('rotateWorld')?.removeEventListener('click',rotate);if(content)disposeGroup(content);renderer.dispose();canvas.remove();stage.classList.remove('has3d');};
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();dispose();},{once:true});
  window.addEventListener('pagehide',e=>{if(!e.persisted)dispose();},{once:true});
  return {dispose};
}
