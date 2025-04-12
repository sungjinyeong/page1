// 포인트 상품 이미지 스와이퍼
// new Swiper(".winner_img", {
//   effect: "fade",
//   fadeEffect: {
//     crossFade: true
//   },
//   loop: true,
//   autoplay: {
//     delay: 3000, // 자동 재생 간격
//     disableOnInteraction: false
//   },
//   speed: 1500, // ← 전환 시간 (ms) 부드럽게 천천히
//   allowTouchMove: true,
//   navigation: false,
//   pagination: false
// });

// 콘테스트 모달
var swiper = new Swiper('.modal_swiper', {
  loop: true,
  navigation: {
    nextEl: '.modal_next',
    prevEl: '.modal_prev'
  },
  pagination: {
    el: '.modal_pagination',
    clickable: false,
    type: 'custom',
    renderCustom: function (swiper, current, total) {
      return current + ' / ' + total;
    }
  }
});

// 프리미엄 뷰 슬라이드
$(function () {
  let swiperSingle = new Swiper('.swiper_single', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });
});