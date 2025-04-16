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

document.querySelector('.form_data .sel form')
  .addEventListener('touchstart', function(e) {
    console.log("터치 대상:", e.target, e.target.closest('form, input, textarea, select, button'));
    e.stopPropagation();
});





new Swiper(".over_list", {
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,
  slidesPerGroup: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    1000: {
      slidesPerView: 2
    }
  }
});
