import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { languages, text, copy, expertise, projects, cv, email, linkedin, github } from './portfolio-content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const right = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
const left = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H4m6-6-6 6 6 6"/></svg>';
const down = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6"/></svg>';
const pin = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const tagList = tags => `<div class="tags">${tags.map(tag=>`<span class="tag">${esc(tag)}</span>`).join('')}</div>`;
const external = (href, label, className='text-link') => `<a class="${className}" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}${arrow}</a>`;
const selected = projects.filter(project=>project.selected);
const outputs = [];

function context(lang, file='index.html') {
  const prefix = lang === 'en' ? '' : '../';
  const t = key => esc(text(copy[key],lang));
  const p = value => esc(text(value,lang));
  const home = file === 'index.html' ? '' : 'index.html';
  return {lang,file,prefix,t,p,home};
}

function header(c) {
  const {t,home,prefix,lang,file} = c;
  const nav = [['portfolio','work'],['services','expertise'],['about','about']].map(([id,key])=>`<a href="${home}#${id}" data-section="${id}">${t(key)}</a>`).join('');
  return `<a class="skip-link" href="#main">${t('skip')}</a>
<header class="site-header"><div class="container header-inner">
  <a class="brand" href="index.html" aria-label="Donatas Paulauskas — ${t('work')}">donpaul<span>.</span></a>
  <nav class="desktop-nav" aria-label="${t('openMenu')}">${nav}</nav>
  <div class="header-actions"><nav class="language" aria-label="${t('languages')}">${languages.map(code=>`<a href="${prefix}${code === 'en' ? '' : code+'/'}${file}" lang="${code}" hreflang="${code}" aria-label="${{en:'English',lt:'Lietuvių',nl:'Nederlands'}[code]}"${code===lang?' aria-current="page"':''}>${code.toUpperCase()}</a>`).join('')}</nav>
    <a class="header-contact" href="${home}#contact">${t('contact')}${arrow}</a>
    <button class="menu-toggle" type="button" aria-label="${t('openMenu')}" aria-expanded="false" aria-controls="mobile-nav"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div></div><nav class="mobile-nav" id="mobile-nav" aria-label="${t('openMenu')}" hidden>${nav}<a href="${home}#resume">${t('viewCv')}</a><a href="${home}#contact">${t('contact')}</a></nav>
</header><noscript><nav class="mobile-nav">${nav}<a href="${home}#contact">${t('contact')}</a></nav></noscript>`;
}

function footer(c) {
  return `<footer class="footer"><div class="container footer-inner"><a class="brand" href="index.html">donpaul<span>.</span></a><p>© 2026 ${c.t('footer')}</p><a class="text-link" href="#top">${c.t('backTop')}<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V4m-6 6 6-6 6 6"/></svg></a></div></footer>`;
}

function card(project, c, index, featured=false) {
  const {p,prefix,t}=c;
  return `<article class="project-card${featured?' featured':''}" data-categories="${project.categories.join(' ')}">
  <a class="project-link" href="${project.file}"><div class="project-image ${project.style}"><img src="${prefix}${project.image}" alt="${p(project.title)}" width="1280" height="800" loading="lazy" decoding="async"><span class="project-arrow">${arrow}</span></div>
    <div class="project-info"><div class="project-topline"><span class="category">${p(project.category)}</span><span class="project-number">${featured?t('featured'):String(index+1).padStart(2,'0')}</span></div><h3>${p(project.title)}</h3><p>${p(project.summary)}</p>${tagList(project.tags)}${featured?`<span class="case-link">${t('readCase')}${right}</span>`:''}</div>
  </a></article>`;
}

function contact(c) {
  const {t}=c;
  return `<section class="section contact-section" id="contact"><div class="container contact-grid"><div>
  <p class="eyebrow">${t('contactEyebrow')}</p><h2>${t('contactTitle').replace('\n','<br><em>')}</em></h2><p class="contact-copy">${t('contactIntro')}</p>
  <a class="contact-email" href="mailto:${email}">${email}</a><div class="contact-socials">${external(linkedin,'LinkedIn','')}${external(github,'GitHub','')}<a href="tel:+37067137273">+370 671 37273</a></div>
  </div><form class="contact-form" id="contact-form" action="https://hook.eu2.make.com/3j1ikw5v6en68pxtan3ofsm08gs4pz35" method="post">
  <div class="form-row"><div class="field"><label for="contact-name">${t('name')}</label><input id="contact-name" name="name" autocomplete="name" required maxlength="150"></div><div class="field"><label for="contact-email">${t('email')}</label><input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="254"></div></div>
  <div class="field"><label for="contact-subject">${t('subject')}</label><input id="contact-subject" name="subject" placeholder="${t('subjectHint')}" required maxlength="200"></div>
  <div class="field"><label for="contact-message">${t('message')}</label><textarea id="contact-message" name="message" rows="4" placeholder="${t('messageHint')}" required maxlength="8000"></textarea></div>
  <div class="honeypot" aria-hidden="true"><label for="contact-website">Website</label><input id="contact-website" name="website" autocomplete="off" tabindex="-1"></div>
  <div class="form-bottom"><button class="button" type="submit"><span data-submit-label>${t('send')}</span>${arrow}</button><p class="form-note">${t('privacy')}</p></div><p class="form-status" id="form-status" role="status" aria-live="polite" aria-atomic="true"></p>
  </form></div></section>`;
}

function home(c) {
  const {t,p,prefix}=c;
  const filtered = [['all','all'],['powerbi','Power BI'],['analytics','analytics'],['automation','automation'],['ai','ai']];
  return `<main id="main"><section class="hero" id="hero"><div class="container"><div class="hero-main">
  <div class="hero-copy"><p class="eyebrow">Donatas Paulauskas</p><h1>${t('heroLine1')}<em>${t('heroLine2')}</em></h1><p class="hero-intro">${t('heroIntro')}</p>
  <div class="hero-buttons"><a class="button button-accent" href="#portfolio">${t('viewWork')}${down}</a>${external(cv,t('viewCv'))}</div></div>
  <figure class="portrait-wrap"><div class="portrait-frame"><img src="${prefix}assets/img/profile/profile-2.webp" alt="Donatas Paulauskas" width="898" height="898" fetchpriority="high"><figcaption class="portrait-caption"><strong>Donatas Paulauskas</strong><span>${t('profession')}</span></figcaption></div></figure>
  </div><div class="hero-bottom"><p class="location">${pin}${t('location')}</p><div class="tool-strip" aria-label="${t('expertise')}"><span>Power BI</span><span class="tool-dot"></span><span>SQL</span><span class="tool-dot"></span><span>Python</span><span class="tool-dot"></span><span>Make.com</span><span class="tool-dot"></span><span>APIs</span></div></div></div></section>
  <section class="section work-section" id="portfolio"><div class="container"><p class="eyebrow">01 / ${t('selected')}</p><div class="section-heading"><h2>${t('workTitle').replace('\n','<br>')}</h2><p>${t('workIntro')}</p></div>
  <div class="work-controls"><div class="filters" role="group" aria-label="${t('work')}">${filtered.map(([id,label])=>`<button class="filter" type="button" data-filter="${id}" aria-pressed="${id==='all'}">${label==='Power BI'?label:t(label)}<span class="filter-count">${selected.filter(project=>id==='all'||project.categories.includes(id)).length}</span></button>`).join('')}</div><span class="results-count" id="results-count" role="status" aria-live="polite">${t('results').replace('{count}','7').replace('{total}','7')}</span></div>
  <noscript><p class="no-script">${t('noJs')}</p></noscript><div class="project-grid" data-filterable>${selected.map((project,index)=>card(project,c,index,index===0)).join('')}</div>
  <div class="work-footer"><p>${t('workFoot')}</p>${external(github,t('githubLink'))}</div></div></section>
  <section class="section expertise-section" id="services"><div class="container"><p class="eyebrow">02 / ${t('expertise')}</p><div class="section-heading"><h2>${t('expertiseTitle').replace('\n','<br>')}</h2><p>${t('expertiseIntro')}</p></div><div class="expertise-grid">${expertise.map((item,index)=>`<article class="expertise-card"><span>${String(index+1).padStart(2,'0')}</span><h3>${p(item.title)}</h3><p>${p(item.desc)}</p>${tagList(item.tags)}</article>`).join('')}</div></div></section>
  <section class="section about-section" id="about"><div class="container about-grid"><div><p class="eyebrow">03 / ${t('aboutEyebrow')}</p><h2>${t('aboutTitle').replace('\n','<br><em>')}</em></h2><p>${t('aboutP1')}</p><p>${t('aboutP2')}</p>
  <div class="about-facts"><div><span>${t('based')}</span><strong>Eindhoven, NL</strong></div><div><span>${t('focus')}</span><strong>${t('focusValue')}</strong></div><div><span>${t('languages')}</span><strong>${t('languageValue')}</strong></div><div><span>${t('education')}</span><strong>${t('educationValue')}</strong></div></div>
  <div class="about-links">${external(cv,t('viewCv'),'button button-accent')}${external(linkedin,'LinkedIn')}</div></div>
  <div class="experience-column" id="resume"><p class="experience-title">${t('journey')}</p>
  <article class="timeline-item"><span class="date">2026</span><h3>${t('certificate')}</h3><p class="company">Vilnius Coding School</p><p>${t('certificateDesc')}</p></article>
  <article class="timeline-item"><span class="date">2024 — 2025</span><h3>${t('graduation')}</h3><p class="company">Cosmicnode B.V. · Eindhoven</p><p>${t('graduationDesc')}</p></article>
  <article class="timeline-item"><span class="date">2022 — 2023</span><h3>${t('internship')}</h3><p class="company">Flexi-Force B.V. · Barneveld</p><p>${t('internshipDesc')}</p></article>
  <details><summary>${t('moreBackground')}</summary><article class="timeline-item"><span class="date">2020 — 2025</span><h3>International Business</h3><p class="company">Fontys University of Applied Sciences</p></article><p class="certifications">Make.com Advanced Badge · 2026<br>Google Digital Garage · 2021</p></details>
  </div></div></section>${contact(c)}</main>`;
}

function casePage(project,c) {
  const {t,p,prefix}=c;
  const preview = prefix+project.image;
  const related = selected.filter(item=>item.id!==project.id).slice(0,3);
  return `<main id="main"><section class="case-hero"><div class="container"><a class="back-link" href="index.html#portfolio">${left}${t('backWork')}</a><p class="eyebrow">${p(project.category)}</p><h1>${p(project.title)}</h1><p class="case-summary">${p(project.summary)}</p><div class="case-meta">${tagList(project.tags)}${project.source?external(project.source,t('source')):''}</div></div></section>
  <div class="container case-image-section"><button class="case-image-trigger" type="button" data-image="${preview}" data-caption="${p(project.title)}" aria-label="${t('inspect')}: ${p(project.title)}"><img class="case-main-image" src="${preview}" alt="${p(project.title)}" width="1280" height="800" fetchpriority="high"></button><div class="image-caption"><p>${project.style==='dashboard'?t('reportNote'):t('imageNote')}</p><button type="button" data-image="${preview}" data-caption="${p(project.title)}">${t('inspect')}${arrow}</button></div></div>
  <div class="container case-layout"><nav class="case-nav" aria-label="${t('caseStudy')}"><a href="#overview">${t('overview')}</a><a href="#approach">${t('approach')}</a><a href="#outcome">${t('outcome')}</a>${project.gallery.length?`<a href="#gallery">${t('gallery')}</a>`:''}</nav><div class="case-content">
  <section class="case-content-section" id="overview"><p class="eyebrow">01 / ${t('overview')}</p><h2>${t('challenge')}</h2><p>${p(project.problem)}</p></section>
  <section class="case-content-section" id="approach"><p class="eyebrow">02 / ${t('approach')}</p><h2>${t('approachHeading')}</h2><p>${p(project.approach)}</p>${project.findings?.length?`<ul>${project.findings.map(finding=>`<li>${p(finding)}</li>`).join('')}</ul>`:''}</section>
  <section class="case-content-section" id="outcome"><p class="eyebrow">03 / ${t('outcome')}</p><h2>${t('outcomeHeading')}</h2><div class="outcome-box"><p>${p(project.outcome)}</p></div>${project.source?`<div class="about-links">${external(project.source,t('source'),'button')}</div>`:''}</section>
  ${project.gallery.length?`<section class="case-content-section" id="gallery"><p class="eyebrow">04 / ${t('gallery')}</p><h2>${t('gallery')}</h2><div class="case-gallery">${project.gallery.map(([src,caption])=>`<button class="gallery-button" type="button" data-image="${prefix}${src}" data-caption="${p(caption)}" aria-label="${t('inspect')}: ${p(caption)}"><img src="${prefix}${src}" alt="${p(caption)}" loading="lazy" decoding="async" width="1280" height="800"><span class="gallery-label">${p(caption)} ${arrow}</span></button>`).join('')}</div></section>`:''}
  </div></div><section class="related-section"><div class="container"><div class="section-heading"><h2>${t('nextProjects')}</h2><a class="text-link" href="index.html#portfolio">${t('all')}${right}</a></div><div class="project-grid">${related.map((item,index)=>card(item,c,index)).join('')}</div></div></section>${contact(c)}</main>
  <dialog class="lightbox" id="image-lightbox" aria-labelledby="lightbox-caption"><div class="lightbox-top"><p id="lightbox-caption">${t('gallery')}</p><button class="lightbox-close" type="button" aria-label="${t('closeImage')}" autofocus><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button></div><img id="lightbox-image" alt=""></dialog>`;
}

function documentPage(c, content, project) {
  const {t,p,prefix,lang,file}=c;
  const title = project ? p(project.title)+' — Donatas Paulauskas' : t('title');
  const description = project ? p(project.summary) : t('description');
  const ui = Object.fromEntries(['openMenu','closeMenu','results','sending','sent','sendError','send'].map(key=>[key,text(copy[key],lang)]));
  const alternate = languages.map(code=>`<link rel="alternate" hreflang="${code}" href="${prefix}${code==='en'?'':code+'/'}${file}">`).join('\n');
  return `<!doctype html>
<html lang="${lang}" id="top"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><meta name="theme-color" content="#0d1c24"><meta property="og:type" content="${project?'article':'website'}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><link rel="icon" href="${prefix}assets/img/monogram.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="${prefix}assets/img/apple-touch-icon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&amp;family=Manrope:wght@400;500;600;650;700;750;800&amp;display=swap"><link rel="stylesheet" href="${prefix}assets/css/portfolio.css">${alternate}</head><body>
${header(c)}${content}${footer(c)}<script id="ui-strings" type="application/json">${JSON.stringify(ui).replace(/</g,'\\u003c')}</script><script src="${prefix}assets/js/portfolio.js" type="module"></script></body></html>\n`;
}

function write(file, content) {
  const target = path.join(root,file);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,content.replace(/[ \t]+$/gm,''));
  outputs.push(file);
}

for (const lang of languages) {
  const directory = lang === 'en' ? '' : lang+'/';
  const c = context(lang);
  write(directory+'index.html',documentPage(c,home(c)));
  for (const project of projects) {
    const c = context(lang,project.file);
    write(directory+project.file,documentPage(c,casePage(project,c),project));
  }
  const website = projects.find(project=>project.id==='website');
  const aliasContext = context(lang,'portfolio-website.html');
  write(directory+'portfolio-website.html',documentPage(aliasContext,casePage(website,aliasContext),website));
}
// Keep old template URLs useful, pointing to their corresponding redesigned sections.
for (const [file,hash] of [['portfolio-details.html','portfolio'],['service-details.html','services'],['starter-page.html','hero']]) {
  write(file,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Donatas Paulauskas — Portfolio</title><meta http-equiv="refresh" content="0;url=index.html#${hash}"></head><body><a href="index.html#${hash}">Continue to Donatas Paulauskas’s portfolio</a></body></html>\n`);
}

const dist = path.join(root,'dist');
fs.rmSync(dist,{recursive:true,force:true});
fs.mkdirSync(dist,{recursive:true});
for (const file of outputs) {
  fs.mkdirSync(path.dirname(path.join(dist,file)),{recursive:true});
  fs.copyFileSync(path.join(root,file),path.join(dist,file));
}
// Only ship assets referenced by the redesigned pages; legacy vendor bundles stay in source.
const assets = new Set(['assets/css/portfolio.css','assets/js/portfolio.js','assets/img/monogram.svg','assets/img/apple-touch-icon.png','assets/img/profile/profile-2.webp']);
for (const project of projects) { assets.add(project.image); for (const [image] of project.gallery) assets.add(image); }
for (const file of assets) {
  const source=path.join(root,file);
  if(!fs.existsSync(source)) throw new Error('Missing public asset: '+file);
  fs.mkdirSync(path.dirname(path.join(dist,file)),{recursive:true});
  fs.copyFileSync(source,path.join(dist,file));
}
console.log(`Built ${outputs.length} pages in 3 languages, with ${assets.size} local assets.`);
