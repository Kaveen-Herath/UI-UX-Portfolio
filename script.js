const projectData = {
  altrium: {
    kicker: 'UI/UX · FRONT-END · FULL-STACK',
    title: 'Altrium - Recruitment Management Platform',
    body: 'A full recruitment workflow built around a polished candidate experience and a practical admin side. The project covers vacancy discovery, search and filtering, saved jobs, applications, progress tracking, interview scheduling, Google Calendar integration, notifications and admin management.',
    highlights: [['Role','Design + Development'],['Focus','Product UX'],['Testing','Playwright']],
    actions: [['Live project','https://altrium-staging.onrender.com/']]
  },
  greenbite: {
    kicker: 'FRONT-END · WEB DEVELOPMENT',
    title: 'GreenBite - Responsive Web Experience',
    body: 'A functional website created for a web-development module, with responsive layouts, clear content hierarchy and interactive front-end behaviour.',
    highlights: [['Role','Front-End'],['Focus','Responsive UI'],['Type','Web Project']],
    actions: [['Live project','https://kaveen-herath.github.io/greenbite-sd-cb015693/']]
  },
  medical: {
    kicker: 'UI/UX DESIGN',
    title: 'Medical Management System',
    body: 'A UI/UX project focused on structuring information-heavy healthcare workflows into clear screens, dashboards and interactions.',
    highlights: [['Role','UI/UX'],['Focus','Usability'],['Tool','Figma']],
    actions: [['GitHub','https://github.com/Kaveen-Herath/MediLink-UI-UX-Design.git']]
  },
  gate: {
    kicker: 'IOT · EMBEDDED SYSTEM',
    title: 'Secure Industrial Loading Gate',
    body: 'An ESP32-based embedded prototype designed around motion detection, obstruction safety, servo control, OLED feedback and a manual tuning control.',
    highlights: [['Board','ESP32'],['Sensors','PIR + Ultrasonic'],['Output','Servo + OLED']],
    actions: [['GitHub','https://github.com/Kaveen-Herath/Secure-Industrial-Loading-Gate.git']]
  }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalBody = document.getElementById('modalBody');
const modalHighlights = document.getElementById('modalHighlights');
const modalActions = document.getElementById('modalActions');

function openProject(key){
  const data = projectData[key];
  if (!data) return;
  modalKicker.textContent = data.kicker;
  modalTitle.textContent = data.title;
  modalBody.textContent = data.body;
  modalHighlights.innerHTML = data.highlights.map(([label,value]) => `<div><b>${label}</b><span>${value}</span></div>`).join('');
  modalActions.innerHTML = data.actions.length
    ? data.actions.map(([label,url]) => `<a class="btn btn-primary" href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`).join('')
    : `<span class="btn btn-ghost">Case study details coming soon</span>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeProject(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

document.querySelectorAll('.project').forEach(card => card.addEventListener('click', () => openProject(card.dataset.project)));
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeProject));
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeProject(); });

document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  document.querySelectorAll('.project').forEach(card => {
    const categories = card.dataset.category.split(' ');
    card.classList.toggle('hidden', filter !== 'all' && !categories.includes(filter));
  });
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = window.innerWidth/2, my = window.innerHeight/2, rx = mx, ry = my;
window.addEventListener('pointermove', e => { mx=e.clientX; my=e.clientY; dot.style.transform=`translate(${mx-3}px,${my-3}px)`; });
function cursorLoop(){ rx += (mx-rx)*.16; ry += (my-ry)*.16; ring.style.transform=`translate(${rx-14}px,${ry-14}px)`; requestAnimationFrame(cursorLoop); }
cursorLoop();

document.querySelectorAll('a,button,.project,.magnetic').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width='42px'; ring.style.height='42px'; ring.style.borderColor='rgba(102,241,255,.85)'; });
  el.addEventListener('mouseleave', () => { ring.style.width='28px'; ring.style.height='28px'; ring.style.borderColor='rgba(102,241,255,.55)'; });
});

document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * .12;
    const y = (e.clientY - r.top - r.height/2) * .12;
    el.style.transform = `translate(${x}px,${y}px)`;
  });
  el.addEventListener('pointerleave', () => el.style.transform='');
});
