

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
