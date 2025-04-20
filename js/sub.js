// ✅ header clone 처리
// (삭제 없음)
document.addEventListener("DOMContentLoaded", function () {
  const originalHeader = document.querySelector('.header');
  let clone = null;

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 100 && !clone) {
      clone = originalHeader.cloneNode(true);
      clone.classList.add('header-clone');
      document.body.appendChild(clone);
      bindHamburgerToggle(clone);
    } else if (scrollY <= 100 && clone) {
      clone.remove();
      clone = null;
    }
  });

  function bindHamburgerToggle(headerEl) {
    const toggleBtn = headerEl.querySelector('.hamburger-button');
    const nav = headerEl.querySelector('.nav');

    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', function (e) {
      if (!headerEl.classList.contains('anchors')) return;
      e.preventDefault();
      toggleBtn.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
});


// ✅ scroll_on 클래스 visibility 처리 (threshold 0.2)
const $counters = $(".scroll_on");
const exposurePercentage = 80; // 하단 20% 기준
const loop = true;

$(window).on('scroll', function () {
  $counters.each(function () {
    const $el = $(this);
    const rect = $el[0].getBoundingClientRect();
    const winHeight = window.innerHeight;
    const visibleThreshold = winHeight * 0.8;

    if (rect.top < visibleThreshold && rect.bottom > 0) {
      $el.addClass('active');
    }

    if (loop && (rect.bottom <= 0 || rect.top >= winHeight)) {
      $el.removeClass('active');
    }
  });
}).scroll();


// ✅ step1 초기 진입 애니메이션
document.addEventListener('DOMContentLoaded', function () {
  const h2 = document.querySelector('.step_1 .posi .h2q');
  const h3 = document.querySelector('.step_1 .posi .h3q');
  const text = document.querySelector('.step_1 .posi .textq');

  if (!h2 || !h3 || !text) return;

  setTimeout(() => {
    h2.style.opacity = '1';
    h2.style.transform = 'translateY(0)';
    setTimeout(() => {
      h3.style.opacity = '1';
      h3.style.transform = 'translateY(0)';
      setTimeout(() => {
        text.style.opacity = '1';
        text.style.transform = 'translateY(0)';
      }, 600);
    }, 800);
  }, 500);
});


// ✅ .depth_a .tip 애니메이션 (2초 뒤 등장)
document.addEventListener('DOMContentLoaded', function () {
  const tip = document.querySelector('.depth_a .del .tip');
  if (!tip) return;

  tip.style.opacity = '0';
  tip.style.filter = 'blur(10px)';
  tip.style.transition = 'opacity 1.2s ease, filter 1.2s ease';

  setTimeout(() => {
    tip.style.opacity = '1';
    tip.style.filter = 'blur(0)';
  }, 2000);
});


// ✅ step2 .key_list 등장 애니메이션 (bottom 20%)
$(document).ready(function () {
  $('.key_list li').css({
    opacity: 0,
    transform: 'translateY(20%)',
    transition: 'opacity 1.2s ease, transform 1.2s ease'
  });

  let hasAnimated = false;

  function handleKeyListReveal() {
    const $target = $('.key_list');
    const rect = $target[0].getBoundingClientRect();
    const winHeight = window.innerHeight;
    const threshold = winHeight * 0.8;

    const isVisible = rect.top < threshold && rect.bottom > 0;

    if (isVisible && !hasAnimated) {
      hasAnimated = true;
      $target.find('li').each(function (i) {
        const $el = $(this);
        setTimeout(() => {
          $el.css({ opacity: 1, transform: 'translateY(0)' });
        }, i * 500);
      });
    }

    if (!isVisible && hasAnimated) {
      hasAnimated = false;
      $target.find('li').css({ opacity: 0, transform: 'translateY(20%)' });
    }
  }

  $(window).on('scroll resize', handleKeyListReveal);
  handleKeyListReveal();
});


// ✅ step3 .tip_list li 등장 (bottom 20%)
$(document).ready(function () {
  const $items = $('.depth_c .tip_list li');
  $items.css({
    opacity: 0,
    transform: 'translateX(-5%)',
    transition: 'opacity 1.2s ease, transform 1.2s ease'
  });

  function handleTipListReveal() {
    const container = $('.depth_c')[0].getBoundingClientRect();
    const winHeight = window.innerHeight;
    const threshold = winHeight * 0.8;
    const isVisible = container.top < threshold && container.bottom > 0;

    if (isVisible) {
      $items.each(function (i) {
        const $el = $(this);
        setTimeout(() => {
          $el.css({ opacity: 1, transform: 'translateX(0%)' });
        }, i * 500);
      });
    } else {
      $items.css({ opacity: 0, transform: 'translateX(-5%)' });
    }
  }

  $(window).on('scroll resize', handleTipListReveal);
  handleTipListReveal();
});


// ✅ .depth_null_e .h4q 순차 등장 (bottom 20%)
$(document).ready(function () {
  const $items = $('.depth_null_e .h4q');
  $items.css({
    opacity: 0,
    transform: 'translateY(25%)',
    transition: 'opacity 1s ease, transform 1s ease'
  });

  function handleH4Reveal() {
    const winHeight = $(window).height();
    const threshold = winHeight * 0.8;

    $items.each(function (i) {
      const $el = $(this);
      const rect = $el[0].getBoundingClientRect();
      const isVisible = rect.top < threshold && rect.bottom > 0;

      if (isVisible && !$el.hasClass('visible')) {
        setTimeout(() => {
          $el.addClass('visible').css({
            opacity: 1,
            transform: 'translateY(0)'
          });
        }, 500 + i * 500);
      } else if (!isVisible) {
        $el.removeClass('visible').css({
          opacity: 0,
          transform: 'translateY(25%)'
        });
      }
    });
  }

  $(window).on('scroll resize', handleH4Reveal);
  handleH4Reveal();
});


// ✅ 막대 + 숫자 동시 애니메이션 (step - 퍼센트)
document.addEventListener("DOMContentLoaded", function () {
  const bars = $(".fr_per_a, .fr_per_b, .main_per_a, .main_per_b");

  bars.each(function () {
    $(this).text("0%").css("height", "0%");
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateHeightAndNumber();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const target = document.querySelector(".depth_null_d");
  if (target) observer.observe(target);

  function animateHeightAndNumber() {
    bars.each(function () {
      const $el = $(this);
      const targetVal = parseInt($el.attr("data-val"), 10);
      const isMain = $el.hasClass("main_per_a") || $el.hasClass("main_per_b");
      const duration = isMain ? 2500 : 1500;
      const finalHeight = isMain ? 75 : 45;

      $({ p: 0 }).animate({ p: finalHeight }, {
        duration: duration,
        easing: "swing",
        step: function (now) {
          $el.css("height", now + "%");
        }
      });

      $({ count: 0 }).animate({ count: targetVal }, {
        duration: duration,
        easing: "linear",
        step: function (now) {
          $el.text(Math.floor(now) + "%");
        },
        complete: function () {
          $el.text(targetVal + "%");
        }
      });
    });
  }
});


// ✅ wave 막대 배경 효과
// (나선 효과는 CSS 변경 필요 — 유지)
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('.wave_background_wrap');
  const totalBars = 250;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalBars; i++) {
    const bar = document.createElement('span');
    bar.classList.add('bg_bar');
    bar.style.left = `${(i / totalBars) * 100}%`;
    bar.style.animationDelay = `${i * 0.04}s`;
    fragment.appendChild(bar);
  }

  container.appendChild(fragment);
});


// ✅ sponsor 슬라이드
function getSliderSpeed(baseSpeed = 85000, baseWidth = 1920) {
  const currentWidth = window.innerWidth;
  const ratio = currentWidth / baseWidth;
  return baseSpeed / ratio;
}

$(document).ready(function() {
  function initSliders() {
    if ($('.slider1').length) $('.slider1').destroySlider();
    if ($('.slider2').length) $('.slider2').destroySlider();

    const speed1 = getSliderSpeed(85000);
    const speed2 = getSliderSpeed(60000);

    imagesLoaded('.row1 .track', function() {
      $('.row1 .track').addClass('slider1').bxSlider({
        slideSelector: 'img',
        minSlides: 5,
        maxSlides: 20,
        moveSlides: 1,
        slideWidth: 150,
        slideMargin: 20,
        ticker: true,
        speed: speed1,
        useCSS: false
      });
    });

    imagesLoaded('.row2 .track', function() {
      $('.row2 .track').addClass('slider2').bxSlider({
        slideSelector: 'img',
        minSlides: 5,
        maxSlides: 20,
        moveSlides: 1,
        slideWidth: 150,
        slideMargin: 20,
        ticker: true,
        speed: speed2,
        useCSS: false
      });
    });
  }

  initSliders();
  $(window).on('resize', initSliders);
});


function formInputHandler(){
  document.querySelectorAll('.form_data input, .form_data textarea').forEach(i=>i.addEventListener('input',()=>i.classList.toggle('active',i.value.trim()!=='')));
  document.querySelectorAll('.form_data .choice_list li').forEach(li=>li.addEventListener('click',()=>{document.querySelectorAll('.form_data .choice_list li').forEach(x=>x.classList.remove('active'));li.classList.add('active');}));
  const adj=()=>document.querySelectorAll('textarea[placeholder="문의사항을 입력해주세요."]').forEach(x=>x.rows=window.innerWidth<=768?3:4);
  adj();window.addEventListener('resize',adj);
}

document.addEventListener('DOMContentLoaded',()=>{
  formInputHandler();rippleClickEffect();
});