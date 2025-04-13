// 스폰서 슬라이더 등 다른 Swiper 인스턴스들
new Swiper(".spon_swiper", {
  slidesPerView: 6,
  slidesPerGroup: 1,
  loop: false,
  navigation: false,
  pagination: false,
  allowTouchMove: true,
  breakpoints: {
    1000: { slidesPerView: 5 },
    700: { slidesPerView: 4 },
    500: { slidesPerView: 3 },
    0: { slidesPerView: 2 }
  }
});

new Swiper(".keySwiper", {
  loop: true,
  spaceBetween: 20,
  centeredSlides: false,
  slidesPerView: 4,
  slidesPerGroup: 1,
  breakpoints: {
    1000: { slidesPerView: 4, slidesPerGroup: 1, centeredSlides: false },
    750: { slidesPerView: 3, slidesPerGroup: 1, centeredSlides: true },
    500: { slidesPerView: 2, slidesPerGroup: 1, centeredSlides: true },
    0: { slidesPerView: 1.5, slidesPerGroup: 1, centeredSlides: true }
  }
});

console.log("터치 대상:", evt.target, evt.target.closest('form, input, textarea, select, button'));
document.querySelector('.form_data .sel form')
  .addEventListener('touchstart', function(e) {
    e.stopPropagation(); // 터치 이벤트가 부모로 전파되지 않도록
  });
