import {readFile,stat} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const required=['dist/index.html','dist/style.css','dist/app.js','dist/operations.js','dist/vendor/xlsx.full.min.js','dist/vendor/SHEETJS-LICENSE.txt','dist/samples/power-electronics-products.xlsx','dist/samples/power-electronics-products.csv','dist/samples/power-electronics-bulk-order.xlsx'];
for(let id=1;id<=14;id++)required.push(`dist/assets/product-${id}.webp`);
for(const file of required){const info=await stat(path.join(root,file));if(!info.isFile()||info.size===0)throw Error(`Missing or empty file: ${file}`);}
for(const file of ['dist/app.js','dist/operations.js','dist/vendor/xlsx.full.min.js']){const check=spawnSync(process.execPath,['--check',path.join(root,file)],{stdio:'inherit'});if(check.status!==0)process.exit(check.status||1);}
const html=await readFile(path.join(root,'dist/index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)){await stat(path.join(root,'dist',match[1]));}
const config=JSON.parse(await readFile(path.join(root,'vercel.json'),'utf8'));if(config.outputDirectory!=='dist'||config.framework!==null)throw Error('Invalid static Vercel configuration.');
const app=await readFile(path.join(root,'dist/app.js'),'utf8');if(app.includes("const storeOrigin='https://"))throw Error('Share links must use the current deployment origin.');
console.log(`Build checks passed: ${required.length} files, JavaScript syntax, local references and Vercel configuration. Static output is ready in dist/.`);
