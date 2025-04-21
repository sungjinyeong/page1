// 전체 기능 유지하며 header → section → footer 순서로 정리된 스크립트
// ACE PLANET 풀페이지 웹사이트 (2025.04)

// ========================== HEADER ==========================
function handleHeaderColor() {
  const headerLogoWhite = document.querySelector(".wh_logo");
  const headerLogoRed = document.querySelector(".rd_logo");
  const navLinks = document.querySelectorAll(".header .nav li a");
  const fontColors = ["white","black","white","black","white","white","black","black","black"];
  const container = document.querySelector('.fullpage-container');
  container.addEventListener('scroll', () => {
    const idx = Math.round(container.scrollTop / window.innerHeight);
    const color = fontColors[idx]||'black';
    headerLogoWhite.style.opacity = color==='white'? '1':'0';
    headerLogoRed.style.opacity = color==='white'? '0':'1';
    navLinks.forEach(a=>a.style.color=color);
  });
}

function setupHamburgerToggle() {
  const btns = document.querySelectorAll('.hamburger-button');
  const secs = document.querySelectorAll('.section');
  btns.forEach(btn=>btn.addEventListener('click',()=>{
    const h=btn.closest('.header'); if(!h||!h.classList.contains('anchors')) return;
    const nav=h.querySelector('.nav'); btn.classList.toggle('active'); nav?.classList.toggle('active');
  }));
  const obs=new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){
      const bg=getComputedStyle(e.target).backgroundColor;
      const [r,g,b]=bg.match(/\d+/g).map(Number);
      const lum=(0.299*r+0.587*g+0.114*b)/255;
      btns.forEach(btn=>{
        const h=btn.closest('.header'); if(!h||!h.classList.contains('anchors')) return;
        btn.classList.toggle('hamburger-light',lum>0.5);
        btn.classList.toggle('hamburger-dark',lum<=0.5);
      });
    }});
  },{threshold:0.5}); secs.forEach(s=>obs.observe(s));
}

function hideHeaderOnSec9(){
  const h=document.querySelector('.header'), s9=document.querySelector('.sec9');
  if(!h||!s9) return;
  new IntersectionObserver(es=>es.forEach(e=>h.style.display=e.isIntersecting?'none':'flex'),{threshold:0.3}).observe(s9);
}

// ========================== SECTION ==========================
function setupPaginationScroll(){
  const c=document.querySelector('.fullpage-container');
  const ps=document.querySelectorAll('.pagination li');
  c.addEventListener('scroll',()=>{
    const i=Math.round(c.scrollTop/window.innerHeight);
    ps.forEach(x=>x.classList.remove('active'));
    ps[i]?.classList.add('active');
  });
  ps.forEach(x=>x.addEventListener('click',e=>{
    e.preventDefault(); const i=+x.dataset.index;
    c.scrollTo({top:i*window.innerHeight,behavior:'smooth'});
  }));
  document.querySelectorAll('.section').forEach(s=>{
    new IntersectionObserver(es=>es.forEach(e=>s.classList.toggle('active',e.isIntersecting)),{root:c,threshold:0.6}).observe(s);
  });
}

function setupSectionScaling(){
  const c=document.querySelector('.fullpage-container');
  document.querySelectorAll('.section').forEach(sec=>{
    new IntersectionObserver(es=>es.forEach(e=>{
      sec.classList.toggle('active',e.isIntersecting);
    }),{root:c,threshold:0.6}).observe(sec);
  });
}

function setupSec1CharAnimation(){
  const targets=[
    {sel:'.sec1 .title h2',raw:'BEYOND VISION!',mob:'BEYOND<br>VISION!'},
    // {sel:'.sec7 .h2q',raw:'ACE, 이렇게 다릅니다',mob:'ACE,<br>이렇게 다릅니다'},
    {sel:'.sec8 .fir_title',raw:'PARTNERS<br>함께하는 파트너',mob:'PARTNERS<br>함께하는 파트너'}
  ];
  targets.forEach(t=>{
    const el=document.querySelector(t.sel); if(!el) return; let anim=false;
    const setText=txt=>{
      el.innerHTML=''; txt.split(/(<br\s*\/?>)/gi).forEach(seg=>{
        if(/<br/i.test(seg)) el.appendChild(document.createElement('br'));
        else [...seg].forEach(ch=>{const sp=document.createElement('span');sp.textContent=ch||'\u00A0';sp.classList.add('char-fade');el.appendChild(sp);});
      });
    };
    new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting&&!anim){setText(window.innerWidth<=768?t.mob:t.raw);anim=true;}
      if(!e.isIntersecting){el.innerHTML='';anim=false;}
    }),{threshold:0.5}).observe(el);
    window.addEventListener('resize',()=>anim&&setText(window.innerWidth<=768?t.mob:t.raw));
  });
}

function setupSec1H3Reveal(){
  const h3 = document.querySelector('.sec1 .title h3'); if (!h3) return;
  h3.style.opacity = '0';
  h3.style.transform = 'translateY(20%)';
  h3.style.visibility = 'hidden'; // 처음부터 안 보이도록
  h3.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  
  new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          h3.style.visibility = 'visible'; // 보이게 전환
          h3.style.opacity = '1';
          h3.style.transform = 'translateY(0)';
        });
      }, 1500);
    } else {
      h3.style.visibility = 'hidden'; // 다시 숨김
      h3.style.opacity = '0';
      h3.style.transform = 'translateY(20%)';
    }
  }), { threshold: 0.5, root: document.querySelector('.fullpage-container') }).observe(h3);
}




function setupSec2FadeScale() {
  const sec2 = document.querySelector('.sec2');
  if (!sec2) return;

  const titleEls = sec2.querySelectorAll('.title .h2q, .title .h3q');
  const textEls = sec2.querySelectorAll('.textq');
  const img = sec2.querySelector('.sel .img_box img');

  // 클래스 세팅
  titleEls.forEach(el => el?.classList.add('fade-up-seq'));
  textEls.forEach(el => el?.classList.add('fade-up-fast'));
  img?.classList.add('scale-in-img');

  let timers = [];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 타이틀 순차 등장 (800ms 간격)
        titleEls.forEach((el, i) => {
          timers.push(setTimeout(() => el.classList.add('visible'), i * 800));
        });

        // 텍스트 4개 빠르게 순차 등장 (400ms 간격)
        textEls.forEach((el, i) => {
          timers.push(setTimeout(() => el.classList.add('visible'), i * 400));
        });

        img?.classList.add('active');
      } else {
        timers.forEach(clearTimeout);
        timers = [];
        [...titleEls, ...textEls].forEach(el => el.classList.remove('visible'));
        img?.classList.remove('active');
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(sec2);
}


function setupSec3HistoryList(){
  const el=document.querySelector('.sec3 .history'); const items=document.querySelectorAll('.sec3 .history .his_tt');
  if(!el||!items.length) return; let lt,tts=[];
  items.forEach(x=>{x.classList.remove('visible');x.style.opacity='0';x.style.transform='translateY(30px)';});
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){clearTimeout(lt);tts.forEach(clearTimeout);tts=[]; const d=window.innerWidth<=768?1500:2000; if(d>1500) el.classList.add('line-animate'); lt=setTimeout(()=>items.forEach((x,i)=>tts.push(setTimeout(()=>x.classList.add('visible'),i*800))),d);
    } else {clearTimeout(lt);tts.forEach(clearTimeout);tts=[];el.classList.remove('line-animate');items.forEach(x=>{x.classList.remove('visible');x.style.opacity='0';x.style.transform='translateY(30px)';});}
  }),{threshold:0.3}).observe(el);
}

function setupSec4to6TextAnimations(){
  const cfg=[{sel:'.sec4',ech:['.h2q','.h3q','.textq']},{sel:'.sec5 .title',ech:['.h2q','.h3q','.textq']},{sel:'.sec6 .title',ech:['.h2q','.h3q','.textq']}];
  cfg.forEach(({sel,ech})=>{const root=document.querySelector(sel); if(!root) return; const els=ech.map(s=>root.querySelector(s)).filter(Boolean); let iks=[];
    els.forEach(x=>{x.style.opacity='0';x.style.transform='translateY(20%)';x.style.transition='opacity 1s ease,transform 1s ease';});
    new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){els.forEach((x,i)=>iks.push(setTimeout(()=>{x.style.opacity='1';x.style.transform='translateY(0)'},i*800)));}
      else{iks.forEach(clearTimeout);iks=[];els.forEach(x=>{x.style.opacity='0';x.style.transform='translateY(20%)';});}
    }),{threshold:0.5}).observe(root);
  });
}

function setupSec6ImageAdjust(){
  const img=document.querySelector('.sec6 .img_box img'); if(!img) return;
  const adj=()=>{if(window.innerWidth>=window.innerHeight){img.style.maxWidth='100%';img.style.maxHeight='none';}else{img.style.maxWidth='none';img.style.maxHeight='100%';}};
  window.addEventListener('load',adj);window.addEventListener('resize',adj);
}

function setupSec6RoundList(){
  const sec6=document.querySelector('.sec6'); const items=document.querySelectorAll('.sec6 .round_list li');
  if(!sec6||!items.length) return; let st,tts=[];
  items.forEach(x=>x.classList.remove('visible'));
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){clearTimeout(st);tts.forEach(clearTimeout);tts=[];st=setTimeout(()=>items.forEach((x,i)=>tts.push(setTimeout(()=>x.classList.add('visible'),i*500))),2000);} 
    else{clearTimeout(st);tts.forEach(clearTimeout);tts=[];items.forEach(x=>x.classList.remove('visible'));}
  }),{threshold:0.4}).observe(sec6);
}

function setupSec7TextUpdate(){
  const el = document.querySelector('.sec7 .h2q');
  if (!el) return;

  const raw = 'ACE,&nbsp;이렇게&nbsp;다릅니다';
  const mob = 'ACE,<br>이렇게&nbsp;다릅니다';
  const upd = () => {
    el.innerHTML = window.innerWidth <= 768 ? mob : raw;
  };

  upd();
  window.addEventListener('resize', upd);
}


function setupServiceListAnimation(){
  const items=document.querySelectorAll('.service_list li'); if(!items.length) return; let st,tts=[];
  items.forEach(x=>{x.style.opacity='0';x.style.transform='translateY(30px)';x.style.transition='opacity 0.8s ease,transform 0.8s ease';});
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){clearTimeout(st);tts.forEach(clearTimeout);tts=[];st=setTimeout(()=>items.forEach((x,i)=>tts.push(setTimeout(()=>{x.style.opacity='1';x.style.transform='translateY(0)'},i*500))),1500);} 
    else{clearTimeout(st);tts.forEach(clearTimeout);tts=[];items.forEach(x=>{x.style.opacity='0';x.style.transform='translateY(30px)';});}
  }),{threshold:0.4}).observe(document.querySelector('.service_list'));
}

function setupSponSlider(){
  function speed(b=85000,w=1920){return b/(window.innerWidth/w);} 
  function init(){if($('.slider1').length)$('.slider1').destroySlider();if($('.slider2').length)$('.slider2').destroySlider();imagesLoaded('.row1 .track',()=>$('.row1 .track').addClass('slider1').bxSlider({slideSelector:'img',minSlides:5,maxSlides:20,moveSlides:1,slideWidth:150,slideMargin:20,ticker:true,speed:speed(85000),useCSS:false}));imagesLoaded('.row2 .track',()=>$('.row2 .track').addClass('slider2').bxSlider({slideSelector:'img',minSlides:5,maxSlides:20,moveSlides:1,slideWidth:150,slideMargin:20,ticker:true,speed:speed(60000),useCSS:false}));}
  init();$(window).on('resize',init);
}

// ========================== FOOTER / FORM ==========================
function formInputHandler(){
  document.querySelectorAll('.form_data input, .form_data textarea').forEach(i=>i.addEventListener('input',()=>i.classList.toggle('active',i.value.trim()!=='')));
  document.querySelectorAll('.form_data .choice_list li').forEach(li=>li.addEventListener('click',()=>{document.querySelectorAll('.form_data .choice_list li').forEach(x=>x.classList.remove('active'));li.classList.add('active');}));
  const adj=()=>document.querySelectorAll('textarea[placeholder="문의사항을 입력해주세요."]').forEach(x=>x.rows=window.innerWidth<=768?3:4);
  adj();window.addEventListener('resize',adj);
}

function rippleClickEffect(){
  function ripple(x,y){const r=document.createElement('div');r.className='ripple';r.style.left=`${x-50}px`;r.style.top=`${y-50}px`;r.style.width=r.style.height='100px';document.body.appendChild(r);setTimeout(()=>r.remove(),600);} 
  document.addEventListener('click',e=>ripple(e.clientX,e.clientY));document.addEventListener('touchstart',e=>ripple(e.touches[0].clientX,e.touches[0].clientY));
}

// ========================== INIT ==========================
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.fullpage-container');
  imagesLoaded(container, { background: true }, function () {
    // ✅ 이미지 모두 로드 완료 후 실행할 기능들
    handleHeaderColor();
    setupHamburgerToggle();
    hideHeaderOnSec9();
    setupPaginationScroll();
    setupSectionScaling();
    setupSec1CharAnimation();
    setupSec1H3Reveal();
    setupSec2FadeScale();
    setupSec3HistoryList();
    setupSec4to6TextAnimations();
    setupSec6ImageAdjust();
    setupSec6RoundList();
    setupSec7TextUpdate();
    setupServiceListAnimation();
    setupSponSlider();
    formInputHandler();
    rippleClickEffect();
    setupSec2FadeScale();
    // ✅ 모바일 최적화 추가
    // if (window.innerWidth <= 768) {
    //   container.style.scrollSnapType = 'none';
    //   document.querySelectorAll('.fade-up-seq').forEach(el => {
    //     el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    //   });
    // }
  });
});