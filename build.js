// Run: node build.js  — regenerates all pages. Photos: drop files in photos/. Projects: add JSON in projects/.
const fs=require('fs');
const nav=[['index.html','Home'],['projects.html','Projects'],['photos.html','Photos'],['helix.html','Helix'],['work.html','Work']];
const page=(file,title,body)=>fs.writeFileSync(file,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · Jonathan DeVito</title><link rel="stylesheet" href="style.css"></head><body><header><nav><a class="brand" href="index.html">Jonathan DeVito</a>${nav.slice(1).map(([f,n])=>`<a href="${f}"${f==file?' class="on"':''}>${n}</a>`).join('')}</nav></header><main>${body}</main><footer>Shepherd of Electrons. Quietly. · <a href="mailto:jonathan.devito@gmail.com">jonathan.devito@gmail.com</a></footer></body></html>`);
const photos=fs.readdirSync('photos').filter(f=>/\.(jpe?g|png|webp|gif)$/i.test(f)).sort();
const projects=fs.readdirSync('projects').filter(f=>f.endsWith('.json')&&!f.startsWith('_')).map(f=>JSON.parse(fs.readFileSync('projects/'+f))).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
const card=p=>`<div class="card">${p.image?`<img src="${p.image}" alt="" style="width:100%;border-radius:8px">`:''}<h3>${p.title}</h3><p class="muted">${p.date||''}</p><p>${p.summary||''}</p>${p.link?`<a href="${p.link}">Read more →</a>`:''}</div>`;
const projGrid=projects.length?`<div class="grid">${projects.map(card).join('')}</div>`:`<div class="card"><h3>Nothing published yet</h3><p class="muted">Finished projects will show up here once they're done.</p></div>`;
const IG='<svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="#000"/></svg>';
const navl=[['index.html','Home'],['work.html','Work'],['projects.html','Projects'],['photos.html','Photos'],['helix.html','Helix']];
const navh=navl.map(([f,n],k)=>`<a href="${f}"${k==0?' class="on"':''}>${n}</a>`).join('')+`<a class="ig" href="http://www.instagram.com/jonathanfelixdevito" aria-label="Instagram">${IG}</a>`;
const A='assets/old/';
const slides=imgs=>`<div class="slides">${imgs.map((f,k)=>`<img src="${A}${f}" alt=""${k?' loading="lazy"':' class="on"'}>`).join('')}${imgs.length>1?'<button class="p" aria-label="Previous">&#8249;</button><button class="n" aria-label="Next">&#8250;</button>':''}</div>`;
const sc=JSON.parse(fs.readFileSync('showcase.json')).concat(projects.filter(p=>p.image).map(p=>({image:p.image,type:p.type||'personal',title:p.title,link:p.link})));
const tile=x=>{const im=`<img loading="lazy" src="${x.image}" alt="${x.title||''}">`;return `<figure data-type="${x.type}">${x.link?`<a href="${x.link}">${im}</a>`:`<a href="${x.image}">${im}</a>`}<figcaption>${x.type=='work'?'Work':'Personal'}</figcaption>${x.title?`<figcaption class="ttl">${x.title}</figcaption>`:''}</figure>`};
fs.writeFileSync('index.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Jonathan DeVito</title><link rel="stylesheet" href="home.css"></head><body>
<header class="top"><a class="t" href="index.html">Jonathan DeVito</a><nav>${navh}</nav><button class="burger" aria-label="Open Menu"></button></header>
<div class="mnu"><button class="x" aria-label="Close Menu">&times;</button>${navh}</div>
<h4 class="tag">Shepherd of Electrons. Quietly.</h4>
<img class="bleed" src="${A}dsc_0799.jpg" alt="">
<img class="bleed" src="${A}dsc_0243.jpg" alt="" loading="lazy">
${slides(['img_6873.jpg','img_6871.jpg','img_6872.jpg','img_6874.jpg'])}
<section class="wrap"><h3 class="h lead">Currently NYC Electrical Group Leader and Associate Principal at Buro Happold</h3>
<div class="row"><div class="l">About</div><h3 class="h r" style="margin:0">Over 15 years of experience as an electrical engineering design consultant in the real estate arena, focused in NYC with projects across the states.</h3></div></section>
<div class="strip"><a href="https://www.theshed.org/program/304-sonic-sphere"><img loading="lazy" src="${A}sonicsphere-1200.jpg" alt="Sonic Sphere"></a><a href="https://www.theshed.org/program/304-sonic-sphere"><img loading="lazy" src="${A}sonicsphere-0188redux.jpg" alt="Sonic Sphere"></a></div>
<img class="bleed" src="${A}img_3829.jpg" alt="" loading="lazy">
${slides(['335d.jpg','335b.jpg','335c.jpg','335a.jpg'])}
<section class="show" id="projects"><div class="filt"><button class="on" data-f="all">All</button><button data-f="work">Work</button><button data-f="personal">Personal</button></div><div class="grid">${sc.map(tile).join('')}</div></section>
<img class="bleed" src="${A}dsc_0822.jpg" alt="" loading="lazy">
<section class="wrap" style="padding-top:100px"><div class="row"><div class="l">Personal</div><div class="r h"><p>Dedicated to connection.</p><p>Photographer, soccer player, micro-distiller, drummer, runner, painter.</p></div></div>
<div class="row" style="padding-bottom:50px"><div class="l">Contact</div><div class="r h"><p>jonathan.devito@gmail.com</p><a class="btn" href="mailto:jonathan.devito@gmail.com" style="font-family:'EB Garamond',serif">Contact Me</a></div></div></section>
<footer class="foot"><div class="wrap"><h2 class="h">Brooklyn, NY</h2></div></footer>
<script>
document.querySelectorAll('.slides').forEach(s=>{const im=[...s.querySelectorAll('img')];let i=0;const go=d=>{im[i].classList.remove('on');i=(i+d+im.length)%im.length;im[i].classList.add('on')};s.querySelector('.p')?.addEventListener('click',()=>go(-1));s.querySelector('.n')?.addEventListener('click',()=>go(1))});
document.querySelectorAll('.filt button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filt button').forEach(x=>x.classList.toggle('on',x==b));document.querySelectorAll('.grid figure').forEach(f=>f.classList.toggle('hide',b.dataset.f!='all'&&f.dataset.type!=b.dataset.f))});
const m=document.querySelector('.mnu');document.querySelector('.burger').onclick=()=>m.classList.add('open');m.querySelector('.x').onclick=()=>m.classList.remove('open');
</script></body></html>`);
page('projects.html','Projects',`<h1>Projects</h1><p class="muted">Finished things, published when they're done.</p>${projGrid}`);
const ph=photos.length?0:3;
page('photos.html','Photos',`<h1>Photos</h1><p class="muted">More photos coming soon.</p><div class="gallery">${photos.map(f=>`<a href="photos/${f}"><img loading="lazy" src="photos/${f}" alt=""></a>`).join('')}${'<div class="ph">Photo coming soon</div>'.repeat(ph)}</div>`);
page('helix.html','The Helix',`<section class="card" style="text-align:center;padding:3rem 1.5rem"><p class="muted" style="letter-spacing:.2em;text-transform:uppercase;font-family:system-ui;font-size:.8rem">A life journal</p><h1>The Helix</h1><p style="max-width:560px;margin:1rem auto">A long-running record of days, ideas, and the threads that connect them. It is slowly being built into something you'll be able to step into.</p><p><span class="btn off">Enter · coming soon</span></p></section>`);
page('work.html','Work',`<h1>Work</h1><div class="card"><h3>NYC Electrical Group Leader · Associate Principal</h3><p class="muted">Buro Happold · 2024 – present</p></div>
<p>Over 15 years of experience as an electrical engineering design consultant in the real estate arena, focused in NYC with projects across the states.</p>
<h2>Past experience</h2><div class="card"><h3>Thornton Tomasetti</h3><p class="muted">MEP design</p></div><p>Contact: <a href="mailto:jonathan.devito@gmail.com">jonathan.devito@gmail.com</a></p>`);
