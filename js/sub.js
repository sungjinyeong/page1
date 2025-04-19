document.addEventListener("DOMContentLoaded", function () {
  const originalHeader = document.querySelector('.header');
  let clone = null;

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 100 && !clone) {
      clone = originalHeader.cloneNode(true);
      clone.classList.add('header-clone');
      document.body.appendChild(clone);

      // ✅ clone 내부 기능 재바인딩
      bindHamburgerToggle(clone);
    } else if (scrollY <= 100 && clone) {
      clone.remove();
      clone = null;
    }
  });

  // ✅ clone 내부 햄버거 이벤트 처리 함수
  function bindHamburgerToggle(headerEl) {
    const toggleBtn = headerEl.querySelector('.hamburger-button');
    const nav = headerEl.querySelector('.nav');

    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', function (e) {
      // header-clone은 작동 안 하도록 제한
      if (!headerEl.classList.contains('anchors')) return;

      e.preventDefault();
      toggleBtn.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
});




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




$(document).ready(function () {
  function handleScrollReveal(targetSelector) {
    const $items = $(targetSelector);
    const winHeight = $(window).height();
    const threshold = winHeight * 0.7; // 하단 30% 보이면 작동

    $items.each(function (i) {
      const $el = $(this);
      const rect = $el[0].getBoundingClientRect();
      const isVisible = rect.top < threshold && rect.bottom > 0;

      if (isVisible && !$el.hasClass('visible')) {
        setTimeout(() => {
          $el.addClass('visible').css({ opacity: 1, transform: 'translateY(0)' });
        }, i * 800); // 0.8초 간격
      }

      // 화면 밖으로 나가면 초기화 (딜레이 없이 바로)
      if (!isVisible) {
        $el.removeClass('visible').css({ opacity: 0, transform: 'translateY(40px)' });
      }
    });
  }
});


$(document).ready(function () {
  // 초기 스타일 정의
  $('.key_list li').css({
    opacity: 0,
    transform: 'translateY(20%)',
    transition: 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.35, 1.7, 0.7, 1)'
  });

  function handleKeyListReveal() {
    const $items = $('.key_list li');
    const winHeight = $(window).height();
    const threshold = winHeight * 0.7;

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
        }, i * 500); // 0.5초 간격
      }

      if (!isVisible) {
        $el.removeClass('visible').css({
          opacity: 0,
          transform: 'translateY(20%)'
        });
      }
    });
  }

  $(window).on('scroll resize', handleKeyListReveal);
  handleKeyListReveal(); // 최초 실행
});


$(document).ready(function () {
  // 초기 스타일 정의
  $('.depth_null_e .h4q').css({
    opacity: 0,
    transform: 'translateY(25%)',
    transition: 'opacity 1s ease, transform 1s ease'
  });

  function handleH4Reveal() {
    const $items = $('.depth_null_e .h4q');
    const winHeight = $(window).height();
    const threshold = winHeight * 0.7;

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
        }, 500 + i * 500); // 1초 후 시작 + 순서당 0.5초 간격
      }

      // 화면 벗어나면 즉시 초기화
      if (!isVisible) {
        $el.removeClass('visible').css({
          opacity: 0,
          transform: 'translateY(20%)'
        });
      }
    });
  }

  $(window).on('scroll resize', handleH4Reveal);
  handleH4Reveal(); // 초기 실행
});



$(document).ready(function () {
  const $items = $('.depth_c .tip_list li');
  const exposurePercentage = 100;

  // 초기 스타일 설정
  $items.css({
    opacity: 0,
    transform: 'translateX(-5%)',
    transition: 'opacity 1.2s ease, transform 1.2s ease'
  });

  function handleTipListReveal() {
    $('.depth_c').each(function () {
      const rect = this.getBoundingClientRect();
      const winHeight = window.innerHeight;
      const contentHeight = rect.bottom - rect.top;

      const isVisible =
        rect.top <= winHeight - (contentHeight * exposurePercentage / 100) &&
        rect.bottom >= (contentHeight * exposurePercentage / 100);

      if (isVisible) {
        setTimeout(() => {
          $items.each(function (i) {
            const $el = $(this);
            if (!$el.hasClass('visible')) {
              setTimeout(() => {
                $el.addClass('visible').css({
                  opacity: 1,
                  transform: 'translateX(0%)'
                });
              }, i * 500);
            }
          });
        }, 500); // 최초 0.5초 대기
      } else {
        $items.removeClass('visible').css({
          opacity: 0,
          transform: 'translateX(-5%)'
        });
      }
    });
  }

  $(window).on('scroll resize', handleTipListReveal);
  handleTipListReveal(); // 초기 실행
});


document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('.wave_background_wrap');
  const totalBars = 90; // 200의 약 2/3
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalBars; i++) {
    const bar = document.createElement('span');
    bar.classList.add('bg_bar');
    bar.style.left = `${(i / totalBars) * 100}%`;
    bar.style.animationDelay = `${i * 0.02}s`;
    fragment.appendChild(bar);
  }

  container.appendChild(fragment);
});
