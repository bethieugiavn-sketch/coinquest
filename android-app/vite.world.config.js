import {defineConfig} from 'vite';
export default defineConfig({build:{outDir:'world-dist',lib:{entry:'world-web.js',name:'TichLocWorld',formats:['iife'],fileName:()=> 'world.js'}}});
