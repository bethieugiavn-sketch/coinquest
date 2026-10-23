import {initOnboarding} from './onboarding.js';
void initOnboarding({
 storage:{async get(key){return localStorage.getItem(key)},async set(key,value){localStorage.setItem(key,value)}},
 context:()=>window.tichLocGuideContext(),notify:message=>window.tichLocGuideNotify(message)
});
