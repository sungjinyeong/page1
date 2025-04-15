// 화면 스크롤 scale 조절절
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.fullpage-container');
  const sections = document.querySelectorAll('.section');
  const paginationItems = document.querySelectorAll('.pagination li');

  // 스크롤 시 현재 섹션에 따른 페이지네이션 active 업데이트
  container.addEventListener('scroll', function() {
    const index = Math.round(container.scrollTop / window.innerHeight);
    paginationItems.forEach(item => item.classList.remove('active'));
    if (paginationItems[index]) {
      paginationItems[index].classList.add('active');
    }
  });

  // 페이지네이션 클릭 시 해당 섹션으로 부드럽게 스크롤
  paginationItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const index = parseInt(this.getAttribute('data-index'));
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    });
  });
  paginationItems.forEach(item => {
    item.addEventListener('click', () => {
      paginationItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
    });
  });
  

  // IntersectionObserver를 이용하여 화면 내 보이는 섹션에 active 클래스 추가 (scale 효과 적용)
  const observerOptions = {
    root: container,
    threshold: 0.6
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});


document.addEventListener('DOMContentLoaded', function () {
  // input, textarea에 글이 있으면 active 추가/제거
  const inputs = document.querySelectorAll('.form_data input, .form_data textarea');
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      if (this.value.trim() !== '') {
        this.classList.add('active');
      } else {
        this.classList.remove('active');
      }
    });
  });

  // choice_list 클릭 시 해당 li에만 active 추가
  const choices = document.querySelectorAll('.form_data .choice_list li');
  choices.forEach(function (li) {
    li.addEventListener('click', function () {
      choices.forEach(el => el.classList.remove('active'));
      this.classList.add('active');
    });
  });
});


// textarea rows 조절
$(document).ready(function(){
  function adjustTextareaRows() {
    if (window.innerWidth <= 768) {
      $('textarea[placeholder="문의사항을 입력해주세요."]').attr('rows', 3);
    } else {
      $('textarea[placeholder="문의사항을 입력해주세요."]').attr('rows', 4);
    }
  }

  adjustTextareaRows();
  $(window).on('resize', adjustTextareaRows);
});


// section별 헤드 폰트$로고 컬러 조절
document.addEventListener("DOMContentLoaded", function () {
  const headerLogoWhite = document.querySelector(".wh_logo");
  const headerLogoRed = document.querySelector(".rd_logo");
  const navLinks = document.querySelectorAll(".header .nav li a");

  // 각 섹션별 폰트 컬러 (sec1 ~ sec9)
  const fontColors = ["white", "black", "white", "black", "white", "white", "black", "black", "black"];

  // 스크롤 감지
  const container = document.querySelector('.fullpage-container');
  container.addEventListener("scroll", () => {
    const scrollTop = container.scrollTop;
    const index = Math.round(scrollTop / window.innerHeight);
    const currentFont = fontColors[index] || "black";

    // 로고 투명도
    if (currentFont === "white") {
      headerLogoWhite.style.opacity = "1";
      headerLogoRed.style.opacity = "0";
    } else {
      headerLogoWhite.style.opacity = "0";
      headerLogoRed.style.opacity = "1";
    }

    // nav a 폰트 색상도 같이 변경
    navLinks.forEach(link => {
      link.style.color = currentFont;
    });
  });
});

// sec6 배경이미지 컨트롤
function adjustSec6Image() {
  const img = document.querySelector('.sec6 .img_box img');
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  if (winW >= winH) {
    img.style.maxWidth = '100%';
    img.style.maxHeight = 'none';
  } else {
    img.style.maxWidth = 'none';
    img.style.maxHeight = '100%';
  }
}
window.addEventListener('load', adjustSec6Image);
window.addEventListener('resize', adjustSec6Image);


// sec1 title 애니메이션
function animateTextByChar(el) {
  const text = el.textContent;
  el.innerHTML = ''; // 초기화

  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('char-fade');
    span.style.animationDelay = `${i * 0.05}s`;
    el.appendChild(span);
  });
}

// h2, h3 타겟 초기 분리
const targetSelectors = ['.sec1 .title h2'];
const animatedFlags = {}; // 각 요소별 애니메이션 완료 여부 저장

document.addEventListener('DOMContentLoaded', () => {
  // 초기 텍스트 저장 및 초기화
  targetSelectors.forEach((selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const originalText = el.textContent;
    animatedFlags[selector] = false;
    el.setAttribute('data-text', originalText);
    el.textContent = ''; // 초기화
  });

  // Observer 설정
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      const selector = targetSelectors.find(sel => el.matches(sel));
      if (!selector) return;

      if (entry.isIntersecting && !animatedFlags[selector]) {
        const text = el.getAttribute('data-text');
        el.innerHTML = '';

        [...text].forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = (char === ' ') ? '\u00A0' : char; // 공백 표시 처리
          span.classList.add('char-fade');
          span.style.animationDelay = `${i * 0.05}s`;
          el.appendChild(span);
        });

        animatedFlags[selector] = true;
      }

      if (!entry.isIntersecting) {
        animatedFlags[selector] = false;
        el.innerHTML = ''; // 벗어나면 초기화
      }
    });
  }, {
    threshold: 0.5
  });

  // 타겟 감시 시작
  targetSelectors.forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) observer.observe(el);
  });
});




// 클릭효과
document.addEventListener('DOMContentLoaded', () => {
  function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${x - 50}px`;
    ripple.style.top = `${y - 50}px`;
    ripple.style.width = '100px';
    ripple.style.height = '100px';

    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600); // 애니메이션 시간과 일치
  }

  function handleEvent(e) {
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const y = (e.touches ? e.touches[0].clientY : e.clientY);
    createRipple(x, y);
  }

  document.addEventListener('click', handleEvent);
  document.addEventListener('touchstart', handleEvent);
});



// header Mobile btn햄버거
let toggleBtn = document.querySelector('.hamburger-button');
toggleBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  toggleBtn.classList.toggle('active');
})