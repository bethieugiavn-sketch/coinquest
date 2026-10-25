import {initTarot} from './tarot.js';
initTarot({context:()=>window.tichLocTarotContext(),draw:()=>window.tichLocDrawTarot(),notify:message=>window.tichLocGuideNotify(message)});
import {initFeedback} from './feedback.js';
import {initSound} from './sound.js';
const soundStorage={async get(key){return localStorage.getItem(key)},async set(key,value){localStorage.setItem(key,value)}};
initFeedback('2.0.0');
void initSound({storage:soundStorage,notify:message=>window.tichLocGuideNotify(message)});
import {initOnboarding} from './onboarding.js';
void initOnboarding({
 storage:{async get(key){return localStorage.getItem(key)},async set(key,value){localStorage.setItem(key,value)}},
 context:()=>window.tichLocGuideContext(),notify:message=>window.tichLocGuideNotify(message)
}).catch(()=>window.tichLocGuideNotify('Không mở được hướng dẫn. Bạn vẫn có thể dùng ứng dụng.')).finally(()=>document.getElementById('guideLoading')?.remove());
