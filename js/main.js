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
    {sel:'.sec7 .h2q',raw:'ACE, 이렇게 다릅니다',mob:'ACE,<br>이렇게 다릅니다'},
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
  const h3=document.querySelector('.sec1 .title h3');if(!h3)return;
  h3.style.transition='opacity 1s ease, transform 1s ease';
  h3.style.opacity='0';h3.style.transform='translateY(20%)';h3.style.visibility='hidden';
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting) setTimeout(()=>{h3.style.visibility='visible';h3.style.opacity='1';h3.style.transform='translateY(0)';},1000);
    else{h3.style.visibility='hidden';h3.style.opacity='0';h3.style.transform='translateY(20%)';}
  }),{threshold:0.5,root:document.querySelector('.fullpage-container')}).observe(h3);
}


function setupSec2FadeScale(){
  const sec2=document.querySelector('.sec2'); if(!sec2) return;
  const items=[sec2.querySelector('.h2q'),sec2.querySelector('.h3q'),sec2.querySelector('.textq')];
  const img=sec2.querySelector('.sel .img_box img'); items.forEach(el=>el?.classList.add('fade-up-seq'));
  img?.classList.add('scale-in-img'); let timers=[];
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){
      items.forEach((el,i)=>timers.push(setTimeout(()=>el.classList.add('visible'),i*800)));
      setTimeout(()=>img.classList.add('active'),0);
    } else {timers.forEach(clearTimeout);timers=[];items.forEach(el=>el.classList.remove('visible'));img.classList.remove('active');}
  }),{threshold:0.5}).observe(sec2);
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
  const el=document.querySelector('.sec7 .h2q'); if(!el) return;
  const raw='ACE, 이렇게 다릅니다',mob='ACE,<br>이렇게 다릅니다';
  const upd=()=>el.innerHTML=window.innerWidth<=768?mob:raw;
  upd();window.addEventListener('resize',upd);
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
document.addEventListener('DOMContentLoaded',()=>{
  handleHeaderColor();setupHamburgerToggle();hideHeaderOnSec9();
  setupPaginationScroll();setupSectionScaling();
  setupSec1CharAnimation();setupSec1H3Reveal();
  setupSec2FadeScale();setupSec3HistoryList();
  setupSec4to6TextAnimations();setupSec6ImageAdjust();setupSec6RoundList();
  setupSec7TextUpdate();setupServiceListAnimation();
  setupSponSlider();
  formInputHandler();rippleClickEffect();
});




// // 화면 스크롤 scale 조절절
// document.addEventListener('DOMContentLoaded', function() {
//   const container = document.querySelector('.fullpage-container');
//   const sections = document.querySelectorAll('.section');
//   const paginationItems = document.querySelectorAll('.pagination li');
//   // const header = document.querySelector('.header');

//   // 스크롤 시 현재 섹션에 따른 페이지네이션 active 업데이트
//   container.addEventListener('scroll', function() {
//     const index = Math.round(container.scrollTop / window.innerHeight);
//     paginationItems.forEach(item => item.classList.remove('active'));
//     if (paginationItems[index]) {
//       paginationItems[index].classList.add('active');
//     }
//   });

//   // 페이지네이션 클릭 시 해당 섹션으로 부드럽게 스크롤
//   paginationItems.forEach(item => {
//     item.addEventListener('click', function (e) {
//       e.preventDefault();
//       const index = parseInt(this.getAttribute('data-index'));
//       container.scrollTo({
//         top: index * window.innerHeight,
//         behavior: 'smooth'
//       });
//     });
//   });

//   paginationItems.forEach(item => {
//     item.addEventListener('click', () => {
//       paginationItems.forEach(el => el.classList.remove('active'));
//       item.classList.add('active');
//     });
//   });

//   // IntersectionObserver: section 활성화 (scale) + header 배경색 연동
//   const observerOptions = {
//     root: container,
//     threshold: 0.6
//   };

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       const section = entry.target;
//       section.classList.toggle('active', entry.isIntersecting);

//       if (entry.isIntersecting) {
//         const textEl = section.querySelector('.text');
//         if (textEl) {
//           const bgColor = window.getComputedStyle(textEl).backgroundColor;
//           // header.style.backgroundColor = bgColor;
//         }
//       }
//     });
//   }, observerOptions);

//   sections.forEach(section => observer.observe(section));
// });



// document.addEventListener('DOMContentLoaded', function () {
//   // input, textarea에 글이 있으면 active 추가/제거
//   const inputs = document.querySelectorAll('.form_data input, .form_data textarea');
//   inputs.forEach(function (input) {
//     input.addEventListener('input', function () {
//       if (this.value.trim() !== '') {
//         this.classList.add('active');
//       } else {
//         this.classList.remove('active');
//       }
//     });
//   });

//   // choice_list 클릭 시 해당 li에만 active 추가
//   const choices = document.querySelectorAll('.form_data .choice_list li');
//   choices.forEach(function (li) {
//     li.addEventListener('click', function () {
//       choices.forEach(el => el.classList.remove('active'));
//       this.classList.add('active');
//     });
//   });
// });


// // textarea rows 조절
// $(document).ready(function(){
//   function adjustTextareaRows() {
//     if (window.innerWidth <= 768) {
//       $('textarea[placeholder="문의사항을 입력해주세요."]').attr('rows', 3);
//     } else {
//       $('textarea[placeholder="문의사항을 입력해주세요."]').attr('rows', 4);
//     }
//   }

//   adjustTextareaRows();
//   $(window).on('resize', adjustTextareaRows);
// });


// // section별 헤드 폰트$로고 컬러 조절
// document.addEventListener("DOMContentLoaded", function () {
//   const headerLogoWhite = document.querySelector(".wh_logo");
//   const headerLogoRed = document.querySelector(".rd_logo");
//   const navLinks = document.querySelectorAll(".header .nav li a");

//   // 각 섹션별 폰트 컬러 (sec1 ~ sec9)
//   const fontColors = ["white", "black", "white", "black", "white", "white", "black", "black", "black"];

//   // 스크롤 감지
//   const container = document.querySelector('.fullpage-container');
//   container.addEventListener("scroll", () => {
//     const scrollTop = container.scrollTop;
//     const index = Math.round(scrollTop / window.innerHeight);
//     const currentFont = fontColors[index] || "black";

//     // 로고 투명도
//     if (currentFont === "white") {
//       headerLogoWhite.style.opacity = "1";
//       headerLogoRed.style.opacity = "0";
//     } else {
//       headerLogoWhite.style.opacity = "0";
//       headerLogoRed.style.opacity = "1";
//     }

//     // nav a 폰트 색상도 같이 변경
//     navLinks.forEach(link => {
//       link.style.color = currentFont;
//     });
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const allToggles = document.querySelectorAll('.hamburger-button');
//   const sections = document.querySelectorAll('.sec1, .sec2, .sec3, .sec4, .sec5, .sec6, .sec7, .sec8, .sec9');

//   // 햄버거 클릭 제어
//   allToggles.forEach(toggleBtn => {
//     toggleBtn.addEventListener('click', function (e) {
//       const parentHeader = this.closest('.header');

//       // clone된 header는 클릭 막음
//       if (!parentHeader || parentHeader.classList.contains('header-clone')) {
//         e.preventDefault();
//         e.stopPropagation();
//         return false;
//       }

//       // anchors 클래스만 허용
//       if (!parentHeader.classList.contains('anchors')) return;

//       const nav = parentHeader.querySelector('.nav');
//       this.classList.toggle('active');
//       nav?.classList.toggle('active');
//     });
//   });

//   // 배경색 따라 햄버거 버튼 클래스 토글
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         const bg = window.getComputedStyle(entry.target).backgroundColor;
//         const isLight = isLightColor(bg);

//         allToggles.forEach(btn => {
//           const parentHeader = btn.closest('.header');
//           // 오직 anchors 헤더만 처리
//           if (!parentHeader || !parentHeader.classList.contains('anchors')) return;

//           btn.classList.toggle('hamburger-light', !isLight);
//           btn.classList.toggle('hamburger-dark', isLight);
//         });
//       }
//     });
//   }, {
//     threshold: 0.5
//   });

//   sections.forEach(section => observer.observe(section));

//   // 밝기 판별 함수
//   function isLightColor(rgb) {
//     const [r, g, b] = rgb.match(/\d+/g).map(Number);
//     const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
//     return luminance > 0.5;
//   }
// });





// // sec6 배경이미지 컨트롤
// function adjustSec6Image() {
//   const img = document.querySelector('.sec6 .img_box img');
//   const winW = window.innerWidth;
//   const winH = window.innerHeight;

//   if (winW >= winH) {
//     img.style.maxWidth = '100%';
//     img.style.maxHeight = 'none';
//   } else {
//     img.style.maxWidth = 'none';
//     img.style.maxHeight = '100%';
//   }
// }
// window.addEventListener('load', adjustSec6Image);
// window.addEventListener('resize', adjustSec6Image);


// // title 애니메이션
// // 수정: span 생성 시 <br>도 유지하면서 동작하도록
// // BEYOND VISION! 텍스트 줄바꿈 & char 애니메이션
// document.addEventListener('DOMContentLoaded', () => {
//   const h2Targets = [
//     { selector: '.sec1 .title h2', textRaw: 'BEYOND VISION!', textMobile: 'BEYOND<br>VISION!' },
//     { selector: '.sec7 .h2q', textRaw: 'ACE, 이렇게 다릅니다', textMobile: 'ACE,<br>이렇게 다릅니다' },
//     { selector: '.sec8 .fir_title', textRaw: 'PARTNERS<br>함께하는 파트너', textMobile: 'PARTNERS<br>함께하는 파트너' }
//   ];

//   const h3Targets = [
//     // { selector: '.sec1 .title h3' },
//   ];

//   // h2 문자 단위 애니메이션
//   h2Targets.forEach(target => {
//     const el = document.querySelector(target.selector);
//     if (!el) return;

//     let animated = false;

//     function setCharAnimationText(html) {
//       el.innerHTML = '';
//       html.split(/(<br\s*\/?>)/gi).forEach((seg, i) => {
//         if (seg.toLowerCase().includes('<br')) {
//           el.appendChild(document.createElement('br'));
//         } else {
//           [...seg].forEach((char, j) => {
//             const span = document.createElement('span');
//             span.textContent = (char === ' ') ? '\u00A0' : char;
//             span.classList.add('char-fade');
//             span.style.animationDelay = `${(i + j) * 0.15}s`;
//             el.appendChild(span);
//           });
//         }
//       });
//     }

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting && !animated) {
//           setCharAnimationText(window.innerWidth <= 768 ? target.textMobile : target.textRaw);
//           animated = true;
//         } else if (!entry.isIntersecting) {
//           el.innerHTML = '';
//           animated = false;
//         }
//       });
//     }, { threshold: 0.5 });

//     observer.observe(el);

//     window.addEventListener('resize', () => {
//       if (animated) {
//         setCharAnimationText(window.innerWidth <= 768 ? target.textMobile : target.textRaw);
//       }
//     });
//   });

//   // h3 페이드/블러 애니메이션
//   h3Targets.forEach(target => {
//     const el = document.querySelector(target.selector);
//     if (!el) return;

//     el.style.opacity = '0';
//     el.style.filter = 'blur(20px)';
//     el.style.transition = 'opacity 1.4s ease, filter 1.4s ease';

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           el.style.opacity = '1';
//           el.style.filter = 'blur(0)';
//         } else {
//           el.style.opacity = '0';
//           el.style.filter = 'blur(20px)';
//         }
//       });
//     }, { threshold: 0.5 });

//     observer.observe(el);
//   });

//   // ✅ scale + blur 애니메이션 대상 정의 (직접 selector/durationClass 지정)
//   const animatedH2List = [
//     { selector: '.sec3 .title h2',     durationClass: 'show2000' },
//   ];

//   animatedH2List.forEach(target => {
//     const el = document.querySelector(target.selector);
//     if (!el) return;

//     el.classList.add('h2q-animate');

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           el.classList.remove('show1500', 'show2000', 'show2500');
//           el.classList.add(target.durationClass);
//         } else {
//           el.classList.remove('show1500', 'show2000', 'show2500');
//         }
//       });
//     }, { threshold: 0.5 });

//     observer.observe(el);
//   });
// });

//   // 초기 스타일 설정
//   document.addEventListener('DOMContentLoaded', function () {
//     const h3 = document.querySelector('.sec1 .title h3');
//     if (!h3) return;
  
//     // 초기 완전 숨김 (시작할 때 안보이게)
//     h3.style.opacity = '0';
//     h3.style.transform = 'translateX(-3%)';
//     h3.style.visibility = 'hidden';
//     h3.style.transition = 'opacity 2s ease, transform 2s ease';
  
//     let timer = null;
  
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           // 2.5초 뒤 부드럽게 등장
//           timer = setTimeout(() => {
//             h3.style.visibility = 'visible';
//             h3.style.opacity = '1';
//             h3.style.transform = 'translateX(0)';
//           }, 2500);
//         } else {
//           // 즉시 초기화 (완전히 안보이게)
//           clearTimeout(timer);
//           h3.style.opacity = '0';
//           h3.style.transform = 'translateX(-3%)';
//           h3.style.visibility = 'hidden';
//         }
//       });
//     }, {
//       threshold: 0.5,
//       root: document.querySelector('.fullpage-container') || null
//     });
  
//     observer.observe(h3);
//   });
  


// // sec2
// document.addEventListener('DOMContentLoaded', function () {
//   const sec2 = document.querySelector('.sec2');
//   const fadeTargets = [
//     sec2.querySelector('.text .h2q'),
//     sec2.querySelector('.text .h3q'),
//     sec2.querySelector('.text .textq')
//   ];
//   const scaleImg = sec2.querySelector('.sel .img_box img');

//   // 초기 스타일 세팅
//   fadeTargets.forEach(el => {
//     el.classList.add('fade-up-seq');
//     el.classList.remove('visible');
//   });

//   if (scaleImg) {
//     scaleImg.classList.add('scale-in-img');
//     scaleImg.classList.remove('active');
//   }

//   let fadeTimers = [];

//   const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         // 순차 등장
//         fadeTargets.forEach((el, i) => {
//           const t = setTimeout(() => el.classList.add('visible'), i * 800);
//           fadeTimers.push(t);
//         });

//         if (scaleImg) {
//           setTimeout(() => {
//             scaleImg.classList.add('active');
//           }, 0);
//         }
//       } else {
//         // 타이머 정리 + 즉시 초기화
//         fadeTimers.forEach(t => clearTimeout(t));
//         fadeTimers = [];

//         fadeTargets.forEach(el => el.classList.remove('visible'));
//         if (scaleImg) scaleImg.classList.remove('active');
//       }
//     });
//   }, { threshold: 0.5 });

//   observer.observe(sec2);
// });

// // sec list
// document.addEventListener('DOMContentLoaded', function () {
//   const configs = [
//     {
//       section: '.sec4',
//       targets: ['.h2q', '.h3q', '.textq'] // title 밖에 있어도 전부 적용
//     },
//     {
//       section: '.sec5 .title',
//       targets: ['.h2q', '.h3q', '.textq']
//     },
//     {
//       section: '.sec6 .title',
//       targets: ['.h2q', '.h3q', '.textq']
//     }
//   ];

//   configs.forEach(({ section, targets }) => {
//     const root = document.querySelector(section);
//     if (!root) return;

//     const elements = targets
//       .map(sel => root.querySelector(sel))
//       .filter(Boolean);

//     if (elements.length === 0) return;

//     // 초기 스타일 세팅
//     elements.forEach(el => {
//       el.style.opacity = '0';
//       el.style.transform = 'translateY(20%)';
//       el.style.transition = 'opacity 1s ease, transform 1s ease';
//     });

//     let timers = [];

//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           elements.forEach((el, i) => {
//             const t = setTimeout(() => {
//               el.style.opacity = '1';
//               el.style.transform = 'translateY(0)';
//             }, i * 800);
//             timers.push(t);
//           });
//         } else {
//           timers.forEach(t => clearTimeout(t));
//           timers = [];
//           elements.forEach(el => {
//             el.style.opacity = '0';
//             el.style.transform = 'translateY(20%)';
//           });
//         }
//       });
//     }, { threshold: 0.5 });

//     observer.observe(root);
//   });
// });






// // sec8 header delet
// document.addEventListener('DOMContentLoaded', () => {
//   const header = document.querySelector('.header');
//   const targetSection = document.querySelector('.sec9');

//   if (header && targetSection) {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           header.style.display = 'none';
//         } else {
//           header.style.display = 'flex'; // 또는 원래 display값
//         }
//       });
//     }, {
//       threshold: 0.3
//     });

//     observer.observe(targetSection);
//   }
// });

    
    
// // 클릭효과
// document.addEventListener('DOMContentLoaded', () => {
//   function createRipple(x, y) {
//     const ripple = document.createElement('div');
//     ripple.className = 'ripple';
//     ripple.style.left = `${x - 50}px`;
//     ripple.style.top = `${y - 50}px`;
//     ripple.style.width = '100px';
//     ripple.style.height = '100px';

//     document.body.appendChild(ripple);

//     setTimeout(() => {
//       ripple.remove();
//     }, 600); // 애니메이션 시간과 일치
//   }

//   function handleEvent(e) {
//     const x = (e.touches ? e.touches[0].clientX : e.clientX);
//     const y = (e.touches ? e.touches[0].clientY : e.clientY);
//     createRipple(x, y);
//   }

//   document.addEventListener('click', handleEvent);
//   document.addEventListener('touchstart', handleEvent);
// });



// document.addEventListener('DOMContentLoaded', function () {
//   const el = document.querySelector('.sec7 .h2q');
//   const textRaw = 'ACE, 이렇게 다릅니다';
//   const textMobile = 'ACE,<br>이렇게 다릅니다';

//   function updateH2Text() {
//     if (window.innerWidth <= 768) {
//       el.innerHTML = textMobile;
//     } else {
//       el.innerHTML = textRaw;
//     }
//   }

//   updateH2Text(); // 초기 실행
//   window.addEventListener('resize', updateH2Text); // 리사이즈 반영
// });



// // sec6라운드 등장효과
// document.addEventListener('DOMContentLoaded', function () {
//   const sec6 = document.querySelector('.sec6');
//   const sec6Items = document.querySelectorAll('.sec6 .round_list li');

//   if (!sec6 || sec6Items.length === 0) return;

//   let showTimeout = null;
//   let itemTimeouts = [];

//   // 초기화
//   sec6Items.forEach(el => {
//     el.classList.remove('visible');
//   });

//   const observerSec6 = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         // 기존 타이머 제거
//         clearTimeout(showTimeout);
//         itemTimeouts.forEach(t => clearTimeout(t));
//         itemTimeouts = [];

//         // 순차 등장
//         showTimeout = setTimeout(() => {
//           sec6Items.forEach((el, i) => {
//             const timeout = setTimeout(() => {
//               el.classList.add('visible');
//             }, i * 500);
//             itemTimeouts.push(timeout);
//           });
//         }, 2000);
//       } else {
//         // 나가면 초기화
//         clearTimeout(showTimeout);
//         itemTimeouts.forEach(t => clearTimeout(t));
//         itemTimeouts = [];
//         sec6Items.forEach(el => el.classList.remove('visible'));
//       }
//     });
//   }, { threshold: 0.4 });

//   observerSec6.observe(sec6);
// });




// // spon 슬라이드
// function getSliderSpeed(baseSpeed = 85000, baseWidth = 1920) {
//   const currentWidth = window.innerWidth;
//   const ratio = currentWidth / baseWidth;
//   return baseSpeed / ratio;
// }

// $(document).ready(function() {
//   function initSliders() {
//     if ($('.slider1').length) $('.slider1').destroySlider();
//     if ($('.slider2').length) $('.slider2').destroySlider();

//     const speed1 = getSliderSpeed(85000);
//     const speed2 = getSliderSpeed(60000);

//     imagesLoaded('.row1 .track', function() {
//       $('.row1 .track').addClass('slider1').bxSlider({
//         slideSelector: 'img',
//         minSlides: 5,
//         maxSlides: 20,
//         moveSlides: 1,
//         slideWidth: 150,
//         slideMargin: 20,
//         ticker: true,
//         speed: speed1,
//         useCSS: false
//       });
//     });

//     imagesLoaded('.row2 .track', function() {
//       $('.row2 .track').addClass('slider2').bxSlider({
//         slideSelector: 'img',
//         minSlides: 5,
//         maxSlides: 20,
//         moveSlides: 1,
//         slideWidth: 150,
//         slideMargin: 20,
//         ticker: true,
//         speed: speed2,
//         useCSS: false
//       });
//     });
//   }

//   initSliders();
//   $(window).on('resize', function() {
//     initSliders();
//   });
// });



// // sec3 리스트 효과
// document.addEventListener('DOMContentLoaded', function () {
//   const historyEl = document.querySelector('.sec3 .history');
//   const hisItems = document.querySelectorAll('.sec3 .history .his_tt');
//   const isMobile = () => window.innerWidth <= 768;

//   if (!historyEl || hisItems.length === 0) return;

//   let lineTimeout = null;
//   let itemTimeouts = [];

//   // 초기 스타일 세팅
//   hisItems.forEach(el => {
//     el.classList.remove('visible');
//     el.style.opacity = '0';
//     el.style.transform = 'translateY(30px)';
//     el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
//   });

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         // 기존 타이머 초기화
//         clearTimeout(lineTimeout);
//         itemTimeouts.forEach(t => clearTimeout(t));
//         itemTimeouts = [];

//         if (isMobile()) {
//           // 모바일도 1.5초 후에 등장
//           lineTimeout = setTimeout(() => {
//             hisItems.forEach((el, i) => {
//               const t = setTimeout(() => el.classList.add('visible'), i * 800);
//               itemTimeouts.push(t);
//             });
//           }, 1500);
//         } else {
//           // PC: 선 애니메이션 후 등장
//           historyEl.classList.add('line-animate');
//           lineTimeout = setTimeout(() => {
//             hisItems.forEach((el, i) => {
//               const t = setTimeout(() => el.classList.add('visible'), i * 800);
//               itemTimeouts.push(t);
//             });
//           }, 2000);
//         }

//       } else {
//         // 초기화
//         clearTimeout(lineTimeout);
//         itemTimeouts.forEach(id => clearTimeout(id));
//         itemTimeouts = [];

//         historyEl.classList.remove('line-animate');
//         hisItems.forEach(el => {
//           el.classList.remove('visible');
//           el.style.opacity = '0';
//           el.style.transform = 'translateY(30px)';
//         });
//       }
//     });
//   }, {
//     threshold: 0.3
//   });

//   observer.observe(historyEl);
// });





// document.addEventListener('DOMContentLoaded', function () {
//   const serviceItems = document.querySelectorAll('.service_list li');
//   let showTimeout = null;
//   let itemTimeouts = [];

//   // 초기 스타일 세팅 (필수)
//   serviceItems.forEach(li => {
//     li.style.opacity = '0';
//     li.style.transform = 'translateY(30px)';
//     li.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
//   });

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         // 기존 타이머 제거
//         clearTimeout(showTimeout);
//         itemTimeouts.forEach(t => clearTimeout(t));
//         itemTimeouts = [];

//         // 1.5초 후 순차 등장
//         showTimeout = setTimeout(() => {
//           serviceItems.forEach((el, i) => {
//             const timeout = setTimeout(() => {
//               el.style.opacity = '1';
//               el.style.transform = 'translateY(0)';
//             }, i * 500);
//             itemTimeouts.push(timeout);
//           });
//         }, 1500);
//       } else {
//         // 벗어나면 타이머 초기화 및 바로 리셋
//         clearTimeout(showTimeout);
//         itemTimeouts.forEach(t => clearTimeout(t));
//         itemTimeouts = [];
//         serviceItems.forEach(el => {
//           el.style.opacity = '0';
//           el.style.transform = 'translateY(30px)';
//         });
//       }
//     });
//   }, { threshold: 0.4 });

//   serviceItems.forEach(item => observer.observe(item));
// });
