function bindLoadFileToggle(scope = document) {
  $(scope).find('.load_file > a').each(function () {
    // href="#"를 javascript:void(0)으로 강제 교체
    $(this).attr('href', 'javascript:void(0)');
  });

  $(scope).find('.load_file > a').off('click').on('click', function (e) {
    e.preventDefault(); // 혹시 모를 기본동작 차단
    const $parent = $(this).closest('.load_file');
    if ($parent.hasClass('view_active')) {
      $parent.removeClass('view_active');
    } else {
      $(scope).find('.load_file').removeClass('view_active');
      $parent.addClass('view_active');
    }
  });
}

// 외부 클릭 시 닫기 (1회만 바인딩)
$(document).on('click', function (e) {
  if (!$(e.target).closest('.load_file').length) {
    $('.load_file').removeClass('view_active');
  }
});

// ========================== HEADER CLONE ==========================
document.addEventListener("DOMContentLoaded", function () {
  const originalHeader = document.querySelector('.header');
  let clone = null;

  bindHamburgerToggle(originalHeader);

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 100 && !clone) {
      clone = originalHeader.cloneNode(true);
      clone.classList.add('header-clone');
      document.body.appendChild(clone);
      bindHamburgerToggle(clone); // ✅ 클론 바인딩
    } else if (scrollY <= 100 && clone) {
      clone.remove();
      clone = null;
    }
  });

  function bindHamburgerToggle(headerEl) {
    const toggleBtn = headerEl.querySelector('.hamburger-button');
    const nav       = headerEl.querySelector('.nav');
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', function (e) {
      if (!headerEl.classList.contains('anchors')) return;
      e.preventDefault();
      toggleBtn.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
});


// ========================== SCROLL_ON VISIBILITY ==========================
const $counters = $(".scroll_on");
const loop = true;

$(window).on('scroll', function () {
  $counters.each(function () {
    const $el         = $(this);
    const rect        = $el[0].getBoundingClientRect();
    const winHeight   = window.innerHeight;
    const threshold   = winHeight * 0.8;

    if (rect.top < threshold && rect.bottom > 0) {
      $el.addClass('active');
    }
    if (loop && (rect.bottom <= 0 || rect.top >= winHeight)) {
      $el.removeClass('active');
    }
  });
}).scroll();

// ========================== STEP 1 INITIAL ANIMATION ==========================
document.addEventListener('DOMContentLoaded', function () {
  const h2   = document.querySelector('.step_1 .posi .h2q');
  const h3   = document.querySelector('.step_1 .posi .h3q');
  const text = document.querySelector('.step_1 .posi .textq');
  if (!h2 || !h3 || !text) return;

  setTimeout(() => {
    h2.style.opacity     = '1';
    h2.style.transform   = 'translateY(0)';
    setTimeout(() => {
      h3.style.opacity   = '1';
      h3.style.transform = 'translateY(0)';
      setTimeout(() => {
        text.style.opacity     = '1';
        text.style.transform   = 'translateY(0)';
      }, 600);
    }, 800);
  }, 500);
});

// ========================== DEPTH_A TIP ==========================
document.addEventListener('DOMContentLoaded', function() {
  const tip = document.querySelector('.depth_a .del .tip');
  if (!tip) return;

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => tip.classList.add('show'), 2000);
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.2
  });

  io.observe(tip);
});

// ========================== STEP 2 KEY_LIST REVEAL ==========================
$(document).ready(function () {
  $('.key_list li').css({
    opacity: 0,
    transform: 'translateY(20%)',
    transition: 'opacity 1.2s ease, transform 1.2s ease'
  });

  let hasAnimated = false;

  function handleKeyListReveal() {
    const $target   = $('.key_list');
    const rect      = $target[0].getBoundingClientRect();
    const winHeight = window.innerHeight;
    const thresh    = winHeight * 0.8;
    const isVisible = rect.top < thresh && rect.bottom > 0;

    if (isVisible && !hasAnimated) {
      hasAnimated = true;
      $target.find('li').each(function (i) {
        setTimeout(() => {
          $(this).css({ opacity: 1, transform: 'translateY(0)' });
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

// ========================== STEP 3 TIP_LIST REVEAL ==========================
$(document).ready(function () {
  const $items = $('.depth_c .tip_list li');
  $items.css({
    opacity: 0,
    transform: 'translateX(-5%)',
    transition: 'opacity 1.2s ease, transform 1.2s ease'
  });

  function handleTipListReveal() {
    const rect      = $('.depth_c')[0].getBoundingClientRect();
    const winHeight = window.innerHeight;
    const thresh    = winHeight * 0.8;
    const isVisible = rect.top < thresh && rect.bottom > 0;

    if (isVisible) {
      $items.each(function (i) {
        setTimeout(() => {
          $(this).css({ opacity: 1, transform: 'translateX(0)' });
        }, i * 500);
      });
    } else {
      $items.css({ opacity: 0, transform: 'translateX(-5%)' });
    }
  }

  $(window).on('scroll resize', handleTipListReveal);
  handleTipListReveal();
});

// ========================== DEPTH_NULL_E .h4q SEQUENTIAL REVEAL ==========================
$(document).ready(function () {
  const $items = $('.depth_null_e .h4q');
  $items.css({
    opacity: 0,
    transform: 'translateY(25%)',
    transition: 'opacity 1s ease, transform 1s ease'
  });

  function handleH4Reveal() {
    const winHeight = $(window).height();
    const thresh    = winHeight * 0.8;

    $items.each(function (i) {
      const $el   = $(this);
      const rect  = $el[0].getBoundingClientRect();
      const vis   = rect.top < thresh && rect.bottom > 0;

      if (vis && !$el.hasClass('visible')) {
        setTimeout(() => {
          $el.addClass('visible').css({
            opacity: 1,
            transform: 'translateY(0)'
          });
        }, 500 + i * 500);
      } else if (!vis) {
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

// ========================== BAR + NUMBER ANIMATION ==========================
function animateHeightAndNumber() {
  const bars = $(".fr_per_a, .fr_per_b, .main_per_a, .main_per_b");
  let maxDuration = 0;

  bars.each(function () {
    const $el       = $(this);
    const targetVal = parseInt($el.attr("data-val"), 10);

    let finalHeight, duration;
    if ($el.hasClass("main_per_b")) {
      finalHeight = 75; duration = 2500;
    } else if ($el.hasClass("main_per_a")) {
      finalHeight = 60; duration = 2500;
    } else if ($el.hasClass("fr_per_b")) {
      finalHeight = 20; duration = 1500;
    } else if ($el.hasClass("fr_per_a")) {
      finalHeight = 10; duration = 1500;
    } else return;

    if (duration > maxDuration) maxDuration = duration;

    $({ h: 0 }).animate({ h: finalHeight }, {
      duration, easing: "swing",
      step(now) { $el.css("height", now + "%"); }
    });

    $({ count: 0 }).animate({ count: targetVal }, {
      duration, easing: "linear",
      step(now) { $el.text(Math.floor(now) + "%"); },
      complete() { $el.text(targetVal + "%"); }
    });
  });

  setTimeout(() => {
    $('.arw1, .arw2').addClass('arw-visible');
  }, maxDuration + 200);
}


// trigger bar animation when .depth_null_d enters viewport
document.addEventListener("DOMContentLoaded", function() {
  const target = document.querySelector(".depth_null_d");
  if (!target) return;

  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      animateHeightAndNumber();
      obs.disconnect();
    }
  }, { threshold: 0.2 });

  observer.observe(target);
});

// ========================== WAVE BACKGROUND BARS ==========================
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('.wave_background_wrap');
  if (!container) return;

  const totalBars = 250;
  const frag      = document.createDocumentFragment();

  for (let i = 0; i < totalBars; i++) {
    const bar = document.createElement('span');
    bar.className           = 'bg_bar';
    bar.style.left          = `${(i/totalBars)*100}%`;
    bar.style.animationDelay = `${i*0.04}s`;
    frag.appendChild(bar);
  }
  container.appendChild(frag);
});


document.addEventListener('DOMContentLoaded', function () {
  const paragraphs = document.querySelectorAll('.depth_null_e .colur p');
  if (paragraphs.length < 2) return;

  const defaultTexts = [
    '뷰티, 패션, 푸드, 여행, 육아 등 다양한 카테고리 중 딱 맞는 인플루언서 카테고리만 선정하여 정밀한 타겟 광고를 진행하실 수 있습니다.',
    '복잡한 인플루언서 광고 진행, 이제 그만! <br>이제 일일이 컨택할 필요 없이, 에이스파이어 하나로 브랜드와 인플루언서 팔로워를 손쉽게 연결할 수 있습니다.'
  ];

  const mobileTexts = [
    '다양한 카테고리로 맞춤 인플루언서 매칭',
    '간편한 인플루언서 광고 진행'
  ];

  function updateInfluencerText() {
    if (window.innerWidth <= 768) {
      paragraphs[0].innerHTML = mobileTexts[0];
      paragraphs[1].innerHTML = mobileTexts[1];
    } else {
      paragraphs[0].innerHTML = defaultTexts[0];
      paragraphs[1].innerHTML = defaultTexts[1];
    }
  }

  updateInfluencerText();
  window.addEventListener('resize', updateInfluencerText);
});


// ========================== FORM & RIPPLE HANDLER ==========================
function formInputHandler(){
  document.querySelectorAll('.form_data input, .form_data textarea')
    .forEach(i => i.addEventListener('input', () => 
      i.classList.toggle('active', i.value.trim() !== '')
    ));
  document.querySelectorAll('.form_data .choice_list li')
    .forEach(li => li.addEventListener('click', () => {
      document.querySelectorAll('.form_data .choice_list li')
        .forEach(x => x.classList.remove('active'));
      li.classList.add('active');
    }));
  const adjustRows = () => 
    document.querySelectorAll('textarea[placeholder="문의사항을 입력해주세요."]')
      .forEach(x => x.rows = window.innerWidth <= 768 ? 3 : 4);
  adjustRows();
  window.addEventListener('resize', adjustRows);
}

function rippleClickEffect() {
  function ripple(x, y) {
    const r = document.createElement('div');
    r.className = 'ripple';
    r.style.left  = `${x-50}px`;
    r.style.top   = `${y-50}px`;
    r.style.width = r.style.height = '100px';
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 600);
  }
  document.addEventListener('click',    e => ripple(e.clientX, e.clientY));
  document.addEventListener('touchstart', e => ripple(e.touches[0].clientX, e.touches[0].clientY));
}

document.addEventListener('DOMContentLoaded', () => {
  formInputHandler();
  rippleClickEffect();
});


// 새로고침 강제이동
window.addEventListener('beforeunload', function () {
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
});