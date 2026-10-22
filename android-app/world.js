import {ANIME_ATLAS} from './anime-art.js';
import {evolutionAt,STYLES,gearAt} from './evolution.js';

// Illustrated 2.5D scene. All artwork is bundled, including the standalone HTML.
export function initWorld(stage){
 if(!stage)return;
 const css=document.createElement('style');css.textContent=`
 .stage.anime-scene{height:390px;perspective:900px;background:#09221e;overflow:hidden}
 .anime-scene>.hero-art,.anime-scene>.fireflies{display:none!important}.anime-scene:before,.anime-scene:after{display:none}
 .anime-world{position:absolute;inset:0;overflow:hidden;touch-action:pan-y;background:radial-gradient(ellipse at 50% 12%,#a3e7bf55,transparent 52%),linear-gradient(#102e30,#1c554a 65%,#0b2524);transition:background 1s}
 .anime-world:before{content:'';position:absolute;width:320px;height:320px;left:50%;top:5px;transform:translateX(-50%);border:1px solid #e5dca244;border-radius:50%;box-shadow:0 0 65px #b8ffc91a,inset 0 0 50px #b8ffc915}
 .anime-moon{position:absolute;left:18%;top:14%;width:55px;height:55px;border-radius:50%;background:#f4e5b7;box-shadow:0 0 65px #fff1ad66;opacity:.75}
 .anime-forest{position:absolute;inset:32% -12% -5%;background:linear-gradient(130deg,#112c28dd,#38615188);clip-path:polygon(0 100%,0 45%,9% 8%,16% 55%,25% 0,34% 62%,43% 12%,51% 70%,67% 17%,76% 55%,88% 0,100% 52%,100% 100%);transform:translateX(var(--forest-x,0px));transition:transform .2s}
 .anime-forest.near{inset:60% -15% -15%;background:#08251fe6;filter:blur(1px);transform:translateX(calc(var(--forest-x,0px)*-1))}
 .anime-platform{position:absolute;left:50%;bottom:34px;width:290px;height:62px;border-radius:50%;transform:translateX(-50%);background:radial-gradient(ellipse,#c5d17e88,#7cc49444 45%,#b7e89a99 48%,#2d635a88 51%,transparent 62%);box-shadow:0 20px 35px #0003}
 .anime-actor{position:absolute;left:50%;bottom:48px;width:190px;height:317px;transform:translateX(-50%);filter:drop-shadow(0 8px 12px #001d2280);pointer-events:none}
 .anime-pose{width:100%;height:100%;transform-origin:50% 90%;animation:anime-breathe 5s ease-in-out infinite;transform:rotateY(var(--tilt,0deg))}
 .anime-sprite{mask-image:linear-gradient(90deg,transparent,black 7%,black 91%,transparent);width:100%;height:100%;background-repeat:no-repeat;background-size:500% 100%;background-position:var(--sprite-x,0%) 50%}
 .anime-aura{position:absolute;left:50%;bottom:45px;width:220px;height:260px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(ellipse,var(--aura,#d3f39733),transparent 68%);filter:blur(15px);animation:anime-aura 4s ease-in-out infinite}
 .anime-particle{position:absolute;width:3px;height:3px;border-radius:50%;background:#f6e6ac;box-shadow:0 0 10px #ffe7a9;animation:anime-particle var(--speed) ease-in-out infinite;animation-delay:var(--delay);pointer-events:none}
 .anime-caption{position:absolute;right:13px;top:67px;font-size:9px;letter-spacing:2px;writing-mode:vertical-rl;color:#e7dbbba6;pointer-events:none}
 .anime-spark{position:absolute;inset:0;background:radial-gradient(circle at 52% 42%,#fff8c577,transparent 40%);animation:anime-flash .65s ease-out forwards;pointer-events:none}
 @keyframes anime-breathe{0%,100%{transform:translateY(0) rotate(-.7deg) rotateY(var(--tilt,0deg)) scale(1)}50%{transform:translateY(-7px) rotate(.7deg) rotateY(var(--tilt,0deg)) scale(1.018)}}
 @keyframes anime-aura{50%{opacity:.5;transform:translateX(-50%) scale(1.12)}}
 @keyframes anime-particle{0%,100%{opacity:.12;transform:translateY(12px)}50%{opacity:.9;transform:translateY(-22px)}}
 @keyframes anime-flash{to{opacity:0;transform:scale(1.3)}}
 .anime-pose.greet{animation:anime-greet .7s ease-in-out}
 @keyframes anime-greet{0%,100%{transform:rotate(0)}30%{transform:translateY(-16px) rotate(-5deg)}65%{transform:translateY(-7px) rotate(4deg)}}
 @media(prefers-reduced-motion:reduce){.anime-pose,.anime-aura,.anime-particle{animation:none}.anime-world *{transition:none}}
 `;document.head.append(css);
 const scene=document.createElement('div');scene.className='anime-world';scene.setAttribute('role','img');scene.setAttribute('aria-label','Linh thú anime 2.5D trong khu rừng ánh sáng');
 scene.innerHTML='<div class="anime-moon"></div><div class="anime-forest"></div><div class="anime-aura"></div><div class="anime-platform"></div><div class="anime-actor"><div class="anime-pose"><div class="anime-sprite"></div></div></div><div class="anime-forest near"></div><span class="anime-caption">LINH THÚ · ANIME 2.5D</span>';
 const sprite=scene.querySelector('.anime-sprite'),pose=scene.querySelector('.anime-pose');sprite.style.backgroundImage=`url("${ANIME_ATLAS}")`;
 // Foreground stays below the character's feet.
 scene.querySelector('.near').style.clipPath='polygon(0 100%,0 65%,12% 30%,23% 80%,36% 88%,62% 88%,78% 80%,91% 30%,100% 65%,100% 100%)';
 for(let i=0;i<18;i++){const p=document.createElement('i');p.className='anime-particle';p.style.cssText=`left:${5+(i*37)%90}%;top:${14+(i*23)%70}%;--speed:${3+i%5}s;--delay:-${i*.7}s`;scene.append(p)}
 stage.prepend(scene);stage.classList.add('anime-scene');
 let tilt=0,down=null,lastKey='';
 const palettes=['#113b30','#4a354d','#164652','#252744','#314a50','#211e45'];
 function greet(){pose.classList.remove('greet');void pose.offsetWidth;pose.classList.add('greet');}
 pose.addEventListener('animationend',()=>pose.classList.remove('greet'));
 function update(level,styleId=window.tichLocStyle||'wood'){
 const index=Math.max(0,STYLES.findIndex(s=>s.id===styleId)),e=evolutionAt(level),grade=gearAt(level),key=index+':'+e.world+':'+grade;
 sprite.style.setProperty('--sprite-x',index*25+'%');
 scene.style.background=`radial-gradient(ellipse at 50% 12%,#b7e7d344,transparent 55%),linear-gradient(${palettes[e.world]},#102f30)`;
 scene.style.setProperty('--aura',['#a7f3b033','#e3cf7555','#8be6fa77','#d4abff88'][grade]);
 if(lastKey!==key){lastKey=key;const flash=document.createElement('div');flash.className='anime-spark';scene.append(flash);flash.addEventListener('animationend',()=>flash.remove(),{once:true});greet()}
 }
 const onLevel=e=>update(e.detail.level,e.detail.style);window.addEventListener('tichloc:level',onLevel);
 const turn=()=>{tilt=tilt>=12?-12:tilt+12;scene.style.setProperty('--tilt',tilt+'deg');scene.style.setProperty('--forest-x',tilt*.45+'px');greet()};
 const button=document.getElementById('rotateWorld');if(button){button.textContent='✧ Chào linh thú';button.addEventListener('click',turn)}
 scene.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};scene.setPointerCapture?.(e.pointerId)});
 scene.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-down.x,dy=e.clientY-down.y;if(Math.abs(dx)>Math.abs(dy)){tilt=Math.max(-18,Math.min(18,dx*.2));scene.style.setProperty('--tilt',tilt+'deg');scene.style.setProperty('--forest-x',tilt*.5+'px')}});
 scene.addEventListener('pointerup',()=>{down=null});scene.addEventListener('pointercancel',()=>{down=null});
 update(window.tichLocLevel||1);
 return{dispose(){window.removeEventListener('tichloc:level',onLevel);button?.removeEventListener('click',turn);scene.remove();css.remove();stage.classList.remove('anime-scene')}};
}

