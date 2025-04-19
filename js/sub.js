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
