import {defineConfig} from 'vite';
export default defineConfig({build:{outDir:'guide-dist',lib:{entry:'onboarding-web.js',name:'TichLocGuide',formats:['iife'],fileName:()=> 'guide.js'}}});
