'use strict';
const nav = document.querySelector('#navigation');
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded', String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('open',open);});
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');}
nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const demos = {
rotina: `<p class="app-greeting">Bom dia, Mariana.</p><div class="care-head"><span class="care-label">Círculo de cuidado</span><h3>O dia de Helena</h3><p>Cuidados de hoje · 8 de 9 registrados</p><div class="care-progress"><span></span></div></div><div class="timeline-label">Hoje<span>EXEMPLO ILUSTRATIVO</span></div><div class="timeline-row"><time>08:00</time><div><strong>Medicamento da manhã</strong><small>Registrado por Helena</small></div><span class="status">✓</span></div><div class="timeline-row"><time>09:30</time><div><strong>Hidratação</strong><small>Registrado por Mariana</small></div><span class="status">✓</span></div><div class="timeline-row"><time>16:00</time><div><strong>Caminhada no jardim</strong><small>Próximo cuidado</small></div><span class="status waiting">◷</span></div>`,
medicamentos: `<p class="app-greeting">Os cuidados de Helena.</p><div class="care-head"><span class="care-label">Medicamentos</span><h3>Uma coisa de cada vez.</h3><p>Horários e confirmações organizados.</p></div><div class="timeline-label">Programação<span>DADOS FICTÍCIOS</span></div><div class="timeline-row"><time>08:00</time><div><strong>Medicamento da manhã</strong><small>Confirmação registrada</small></div><span class="status">✓</span></div><div class="timeline-row"><time>14:00</time><div><strong>Medicamento da tarde</strong><small>Aguardando confirmação</small></div><span class="status waiting">◷</span></div><div class="timeline-row"><time>20:00</time><div><strong>Medicamento da noite</strong><small>Programado</small></div><span class="status waiting">◷</span></div>`,
circulo: `<p class="app-greeting">Perto, mesmo de longe.</p><div class="care-head"><span class="care-label">Círculo de Helena</span><h3>Cuidar, juntos.</h3><p>Cada pessoa tem seu papel no cuidado.</p></div><div class="timeline-label">Participantes<span>EXEMPLO ILUSTRATIVO</span></div><div class="timeline-row"><span class="member-avatar">H</span><div><strong>Helena</strong><small>Pessoa acompanhada</small></div></div><div class="timeline-row"><span class="member-avatar">M</span><div><strong>Mariana</strong><small>Familiar responsável</small></div></div><div class="timeline-row"><span class="member-avatar">C</span><div><strong>Carla</strong><small>Cuidadora</small></div></div>`
};
const tabs=[...document.querySelectorAll('[data-feature]')];
function showFeature(tab){tabs.forEach(t=>{const active=t===tab;t.classList.toggle('active',active);t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});document.querySelector('#demo-content').innerHTML=demos[tab.dataset.feature];document.querySelector('#demo-panel').setAttribute('aria-labelledby',tab.id);document.querySelector('#screen-number').textContent=String(tabs.indexOf(tab)+1).padStart(2,'0')+' / 03';if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.documentElement.classList.contains('no-motion')&&document.querySelector('#demo-content').animate)document.querySelector('#demo-content').animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'ease-out'});}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>showFeature(tab));tab.addEventListener('keydown',e=>{let next;if(['ArrowDown','ArrowRight'].includes(e.key))next=(i+1)%tabs.length;if(['ArrowUp','ArrowLeft'].includes(e.key))next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tabs[next].focus();showFeature(tabs[next]);}});});showFeature(tabs[0]);
let annual=false;
document.querySelectorAll('[data-billing]').forEach(button=>button.addEventListener('click',()=>{annual=button.dataset.billing==='annual';document.querySelectorAll('[data-billing]').forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});document.querySelectorAll('[data-monthly]').forEach(p=>p.textContent=p.dataset[annual?'annual':'monthly']);document.querySelectorAll('[data-annual-note]').forEach(p=>p.textContent=annual?p.dataset.annualNote:'Proposta de cobrança mensal');}));
const dialog=document.querySelector('#plan-dialog');
const descriptions={Essencial:'Uma proposta de entrada para quem está começando a organizar o cuidado.',Família:'Uma proposta para reunir familiares e cuidadores no dia a dia.',Círculo:'Uma proposta para acompanhar mais pessoas com círculos separados.'};
document.querySelectorAll('[data-plan]').forEach(button=>button.addEventListener('click',()=>{const card=button.closest('.plan');document.querySelector('#dialog-title').textContent='Serenitas '+button.dataset.plan;document.querySelector('#dialog-description').textContent=descriptions[button.dataset.plan];const details=document.querySelector('#dialog-details');details.replaceChildren();const price=document.createElement('p');price.textContent=card.querySelector('.price').textContent+' · '+card.querySelector('.billing-note').textContent;details.append(price,card.querySelector('ul').cloneNode(true));document.querySelector('.dialog-note').hidden=false;dialog.showModal();}));
document.querySelector('#privacy-trigger').addEventListener('click',()=>{document.querySelector('#dialog-title').textContent='Sobre esta prévia';document.querySelector('#dialog-description').textContent='Esta página apresenta a Serenitas em desenvolvimento. As telas usam pessoas e dados fictícios, e os planos são uma proposta comercial para revisão.';document.querySelector('#dialog-details').textContent='Não há contratação, cadastro de pacientes, coleta de dados de saúde ou envio de formulários nesta prévia. Os botões de planos exibem detalhes sem iniciar uma cobrança.';document.querySelector('.dialog-note').hidden=true;dialog.showModal();});
document.querySelectorAll('.dialog-close,.dialog-done').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');const motionButton=document.querySelector('#motion-toggle');let motionOff=reduced.matches;
function applyMotion(){document.documentElement.classList.toggle('no-motion',motionOff);motionButton.setAttribute('aria-pressed',String(motionOff));motionButton.setAttribute('aria-label',motionOff?'Ativar animações':'Pausar animações');motionButton.innerHTML=motionOff?'▷ <span>Ativar movimento</span>':'Ⅱ <span>Pausar movimento</span>';}
applyMotion();motionButton.addEventListener('click',()=>{motionOff=!motionOff;applyMotion();});
if('IntersectionObserver' in window&&!reduced.matches){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:0.08});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('pending');observer.observe(el);});}

// Minimal line icons for interface navigation, never decorative illustration.
const iconPaths={home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2m4 0h2m-8 3h2"/>',users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m1 4a4 4 0 0 1 3 4v2"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'};
document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round">'+iconPaths[el.dataset.icon]+'</svg>';});
// Native scroll stays intact. Only decorative layers move, at low amplitude.
const header=document.querySelector('.header');
const parallaxLayers=[...document.querySelectorAll('[data-parallax]')];
let scheduled=false;
function updateScroll(){
 scheduled=false;
 const y=window.scrollY;
 header.classList.toggle('scrolled',y>48);
 const total=document.documentElement.scrollHeight-window.innerHeight;
 document.documentElement.style.setProperty('--reading',String(total>0?Math.min(1,Math.max(0,y/total)):0));
 for(const layer of parallaxLayers){
  if(motionOff){layer.style.setProperty('--parallax','0px');continue;}
  const parent=layer.parentElement;
  const box=parent.getBoundingClientRect();
  if(box.bottom<0||box.top>window.innerHeight)continue;
  const offset=layer.classList.contains('hero-image')?Math.min(45,y*.09):Math.max(-35,Math.min(0,(window.innerHeight*.5-box.top-box.height*.5)*Number(layer.dataset.parallax)-18));
  layer.style.setProperty('--parallax',offset+'px');
 }
}
function queueScroll(){if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll);}}
window.addEventListener('scroll',queueScroll,{passive:true});
window.addEventListener('resize',queueScroll,{passive:true});
motionButton.addEventListener('click',queueScroll);
reduced.addEventListener('change',e=>{motionOff=e.matches;applyMotion();queueScroll();});
updateScroll();
