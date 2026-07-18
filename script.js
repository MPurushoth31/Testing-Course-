const menu=document.querySelector(".menu");

const navMenu=document.querySelector(".nav nav");

const navbar=document.querySelector(".nav");

menu.addEventListener("click",()=>{

menu.classList.toggle("active");

navMenu.classList.toggle("open");

document.body.classList.toggle("menu-open");

});

document.querySelectorAll(".nav nav a").forEach(link=>{

link.addEventListener("click",()=>{

navMenu.classList.remove("open");

menu.classList.remove("active");

document.body.classList.remove("menu-open");

});

});
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelectorAll('.faq-list article button').forEach(btn=>btn.addEventListener('click',()=>{const a=btn.parentElement;a.classList.toggle('open');btn.querySelector('b').textContent=a.classList.contains('open')?'−':'+'}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('copyUpi').addEventListener('click',async function(){await navigator.clipboard.writeText('sandypurushoth123@okhdfcbank');this.textContent='Copied ✓';setTimeout(()=>this.textContent='Copy',1800)});
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('.cards .reveal,.benefit-grid .reveal,.modules .reveal').forEach((el,i)=>{
  el.style.transitionDelay=(Math.min(i%4,3)*90)+'ms';
});

document.querySelectorAll('.module-head').forEach(btn=>btn.addEventListener('click',()=>{
 const m=btn.parentElement; m.classList.toggle('open');
 btn.setAttribute('aria-expanded',m.classList.contains('open'));
}));
const demoSteps=[
 {formula:'=SUM(D2:D5)',status:'Calculating Formulas...'},
 {formula:'=XLOOKUP("Laptop",B2:B5,D2:D5)',status:'Analyzing with Pivot Table...'},
 {formula:'=GETPIVOTDATA("Sales",A1)',status:'Creating Interactive Charts...'}
];
let demoIndex=0;
function runFormulaDemo(){
 const target=document.getElementById('typedFormula'),status=document.getElementById('demoStatus');
 if(!target||!status)return;
 const step=demoSteps[demoIndex%demoSteps.length]; target.textContent=''; status.textContent=step.status;
 let i=0; const timer=setInterval(()=>{target.textContent+=step.formula.charAt(i++);if(i>=step.formula.length){clearInterval(timer);setTimeout(()=>{demoIndex++;runFormulaDemo()},2500)}},55);
}
runFormulaDemo();

// Animated counters when stats enter viewport
const statsSection=document.querySelector('.stats-wrap');
if(statsSection){
 let counted=false;
 const countObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!counted){
   counted=true;
   document.querySelectorAll('.counter').forEach(el=>{
    const target=+el.dataset.target,suffix=el.dataset.suffix||'';let start=0;
    const duration=1200,stepTime=30,inc=target/(duration/stepTime);
    const timer=setInterval(()=>{start+=inc;if(start>=target){start=target;clearInterval(timer)}el.textContent=Math.floor(start)+suffix},stepTime);
   });
  }
 },{threshold:.35});countObserver.observe(statsSection);
}
// Ripple feedback for every important click
document.querySelectorAll('.btn,.module-head,.faq-list button,.socials a,.nav a,.stat-card').forEach(el=>{
 el.classList.add('ripple-ready');
 el.addEventListener('click',function(e){
  const r=document.createElement('span'),rect=this.getBoundingClientRect(),size=Math.max(rect.width,rect.height);
  r.className='click-ripple';r.style.width=r.style.height=size+'px';
  r.style.left=(e.clientX-rect.left-size/2)+'px';r.style.top=(e.clientY-rect.top-size/2)+'px';
  this.appendChild(r);setTimeout(()=>r.remove(),700);
 });
});
/* ==========================================
   V4 HERO TILT
========================================== */

const excelApp=document.querySelector(".excel-app");

if(excelApp){

excelApp.addEventListener("mousemove",(e)=>{

const rect=excelApp.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*8;

const rotateX=((y/rect.height)-0.5)*-8;

excelApp.style.transform=

`perspective(1600px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-6px)`;

});

excelApp.addEventListener("mouseleave",()=>{

excelApp.style.transform=

`perspective(1600px)
rotateX(0deg)
rotateY(0deg)
translateY(0px)`;

});

}

/*==========================================
V4 HERO PARALLAX
==========================================*/

const hero=document.querySelector(".hero");

const layers=document.querySelectorAll(

".badge-formula,.badge-pivot,.badge-chart"

);

if(hero){

hero.addEventListener("mousemove",(e)=>{

const rect=hero.getBoundingClientRect();

const x=(e.clientX-rect.left)/rect.width-.5;

const y=(e.clientY-rect.top)/rect.height-.5;

layers.forEach((layer,index)=>{

const depth=(index+1)*12;

layer.style.transform=

`translate(${x*depth}px,${y*depth}px)`;

});

});

hero.addEventListener("mouseleave",()=>{

layers.forEach(layer=>{

layer.style.transform="translate(0,0)";

});

});

}
/* ==========================================
   V4 SMART NAVBAR
========================================== */

let lastScroll=0;

let ticking=false;

function updateNavbar(){

const current=window.pageYOffset;

if(current>25){

navbar.classList.add("nav-scrolled");

}else{

navbar.classList.remove("nav-scrolled");

}

if(current>120){

if(current>lastScroll){

navbar.classList.add("nav-hidden");

}else{

navbar.classList.remove("nav-hidden");

}

}else{

navbar.classList.remove("nav-hidden");

}

lastScroll=current;

ticking=false;

}

window.addEventListener("scroll",()=>{

if(!ticking){

window.requestAnimationFrame(updateNavbar);

ticking=true;

}

},{passive:true});
