// 화면 스크롤 scale 조절절
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.fullpage-container');
  const sections = document.querySelectorAll('.section');
  const paginationItems = document.querySelectorAll('.pagination li');
  // const header = document.querySelector('.header');

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

  // IntersectionObserver: section 활성화 (scale) + header 배경색 연동
  const observerOptions = {
    root: container,
    threshold: 0.6
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const section = entry.target;
      section.classList.toggle('active', entry.isIntersecting);

      if (entry.isIntersecting) {
        const textEl = section.querySelector('.text');
        if (textEl) {
          const bgColor = window.getComputedStyle(textEl).backgroundColor;
          // header.style.backgroundColor = bgColor;
        }
      }
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

// header Mobile btn햄버거
let toggleBtn = document.querySelector('.hamburger-button');
toggleBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  toggleBtn.classList.toggle('active');
})


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


// title 애니메이션
// 수정: span 생성 시 <br>도 유지하면서 동작하도록
// BEYOND VISION! 텍스트 줄바꿈 & char 애니메이션
document.addEventListener('DOMContentLoaded', () => {
  const h2El = document.querySelector('.sec1 .title h2');
  const h3El = document.querySelector('.sec1 .title h3');
  const textRaw = 'BEYOND VISION!';
  const textMobile = 'BEYOND<br>VISION!';
  let animatedH2 = false;
  let animatedH3 = false;

  // h2 텍스트 span 애니메이션 + 줄바꿈
  function setCharAnimationText(html) {
    h2El.innerHTML = '';
    html.split(/(<br\s*\/?>)/gi).forEach((seg, i) => {
      if (seg.toLowerCase().includes('<br')) {
        h2El.appendChild(document.createElement('br'));
      } else {
        [...seg].forEach((char, j) => {
          const span = document.createElement('span');
          span.textContent = (char === ' ') ? '\u00A0' : char;
          span.classList.add('char-fade');
          span.style.animationDelay = `${(i + j) * 0.15}s`;
          h2El.appendChild(span);
        });
      }
    });
  }

  // 반응형 텍스트 반환
  function getResponsiveText() {
    return window.innerWidth <= 768 ? textMobile : textRaw;
  }

  // h3 초기 스타일 지정
  h3El.style.opacity = '0';
  h3El.style.filter = 'blur(20px)';
  h3El.style.transition = 'opacity 1.4s ease, filter 1.4s ease';

  // Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // h2 처리
        if (!animatedH2) {
          setCharAnimationText(getResponsiveText());
          animatedH2 = true;
        }
        // h3 처리
        if (!animatedH3) {
          h3El.style.opacity = '1';
          h3El.style.filter = 'blur(0)';
          animatedH3 = true;
        }
      } else {
        // 나가면 초기화
        h2El.innerHTML = '';
        h3El.style.opacity = '0';
        h3El.style.filter = 'blur(20px)';
        animatedH2 = false;
        animatedH3 = false;
      }
    });
  }, { threshold: 0.5 });

  if (h2El) observer.observe(h2El);
  if (h3El) observer.observe(h3El);

  // 리사이즈 시 텍스트 갱신
  window.addEventListener('resize', () => {
    if (animatedH2) {
      setCharAnimationText(getResponsiveText());
    }
  });
});






// scroll 1
const $counters = $(".scroll_on");
const exposurePercentage = 100;
const loop = true;

$(window).on('scroll', function () {
  $counters.each(function () {
    const $el = $(this);
    const rect = $el[0].getBoundingClientRect();
    const winHeight = window.innerHeight;
    const contentHeight = rect.bottom - rect.top;
    
    if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
      $el.addClass('active');
    }
    
    if (loop && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
        $el.removeClass('active');
      }
    });
}).scroll();


    
    
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



document.addEventListener('DOMContentLoaded', function () {
  const el = document.querySelector('.sec7 .h2q');
  const textRaw = 'ACE, 이렇게 다릅니다';
  const textMobile = 'ACE,<br>이렇게 다릅니다';

  function updateH2Text() {
    if (window.innerWidth <= 768) {
      el.innerHTML = textMobile;
    } else {
      el.innerHTML = textRaw;
    }
  }

  updateH2Text(); // 초기 실행
  window.addEventListener('resize', updateH2Text); // 리사이즈 반영
});


// sec3 등장효과
document.addEventListener('DOMContentLoaded', function () {
  const hisItems = document.querySelectorAll('.sec3 .history .his_tt');

  const observerHis = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      const target = entry.target;

      if (entry.isIntersecting) {
        // 순차적으로 visible 추가
        hisItems.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, i * 950);
        });
      } else {
        // 뷰포트 벗어나면 초기화
        hisItems.forEach(el => el.classList.remove('visible'));
      }
    });
  }, { threshold: 0.4 });

  hisItems.forEach(item => observerHis.observe(item));
});


// sec6라운드 등장효과
document.addEventListener('DOMContentLoaded', function () {
  const sec6Items = document.querySelectorAll('.sec6 .round_list li');

  const observerSec6 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 순차 등장
        sec6Items.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, i * 200);
        });
      } else {
        // 뷰포트 벗어나면 초기화
        sec6Items.forEach(el => el.classList.remove('visible'));
      }
    });
  }, { threshold: 0.4 });

  sec6Items.forEach(item => observerSec6.observe(item));
});