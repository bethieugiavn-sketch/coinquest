import * as THREE from 'three';
import {evolutionAt} from './evolution.js';

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
  function rebuild(level){
    const e=evolutionAt(level),key=e.tier+':'+e.stars;
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
      else{mesh(new THREE.CylinderGeometry(.07,.1,.8,7),'#69583c',content,x,.25,z);for(let j=0;j<3;j++)mesh(new THREE.ConeGeometry(.5-j*.1,.8,9),tree,content,x,.7+j*.35,z);}
    }
    for(let i=0;i<12;i++){const a=i*.93;ball(content,e.world===2?'#afe4e5':i%2?'#e5cf8e':'#f0bcba',Math.sin(a)*2.25,0,Math.cos(a)*1.8,.06,.12,.06);}
    if(e.world===2){const lake=mesh(new THREE.CylinderGeometry(.85,.85,.025,40),'#7bd7df',content,-1.25,-.03,.8,.45);lake.scale.z=.6;}
    hero=new THREE.Group();hero.position.y=.05;content.add(hero);
    const accent= e.tier>=20?'#efc66c':skin;
    const body=ball(hero,accent,0,.92,0,.56,.72,.43);
    ball(hero,'#eaf0c4',0,1.02,.32,.45,.4,.19);
    ball(hero,tree,-.3,.14,.12,.2,.16,.27);ball(hero,tree,.3,.14,.12,.2,.16,.27);
    const left=ball(hero,accent,-.62,.82,.04,.15,.28,.15);left.rotation.z=-.4;
    const right=ball(hero,accent,.62,.82,.04,.15,.28,.15);right.rotation.z=.4;
    for(const x of [-.18,.18]){ball(hero,'#15362b',x,1.13,.505,.063,.095,.035);ball(hero,'#ffffff',x-.018,1.16,.536,.02);ball(hero,'#eaa498',x*1.6,.98,.478,.07,.032,.02);}
    const smile=mesh(new THREE.TorusGeometry(.07,.012,6,16,Math.PI),'#3a6040',hero,0,1,.523);smile.rotation.z=Math.PI;
    const belt=mesh(new THREE.TorusGeometry(.43,.055,8,32),'#467743',hero,0,.53,.05);belt.rotation.x=Math.PI/2;
    const coin=mesh(new THREE.CylinderGeometry(.14,.14,.05,24),'#ebc45b',hero,0,.55,.46,.7);coin.rotation.x=Math.PI/2;
    mesh(new THREE.BoxGeometry(.035,.17,.018),'#8e6c29',hero,0,.55,.495,.5);
    leaves=new THREE.Group();hero.add(leaves);
    mesh(new THREE.CylinderGeometry(.028,.035,.25,8),tree,leaves,0,1.67,0);
    const leafCount=2+(e.tier%4);
    for(let i=0;i<leafCount;i++){const a=(i/leafCount)*Math.PI*2;const leaf=ball(leaves,e.world===5?'#ffd87c':tree,Math.sin(a)*.2,1.8+Math.cos(a)*.03,Math.cos(a)*.13,.11,.29,.055);leaf.rotation.z=-Math.sin(a)*.8;leaf.rotation.x=Math.cos(a)*.7;}
    // Each quartet gains a distinct accessory silhouette, not just a hue change.
    const accessory=e.tier%4;
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
  const update=e=>rebuild(e.detail.level);window.addEventListener('tichloc:level',update);
  const rotate=()=>{targetAngle+=Math.PI/7;};document.getElementById('rotateWorld')?.addEventListener('click',rotate);
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
