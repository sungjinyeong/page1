document.querySelector('.form_data .sel form')
  .addEventListener('touchstart', function(e) {
    console.log("터치 대상:", e.target, e.target.closest('form, input, textarea, select, button'));
    e.stopPropagation();
});

let swiperInitialized = false;
      
function initPorerSwiperIfMobile() {
  if (swiperInitialized) return;

  if (window.innerWidth <= 768) {
    new Swiper(".porerSwiper", {
      loop: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 20,
      initialSlide: 1,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      }
    });
    swiperInitialized = true;
  }
}

window.addEventListener("DOMContentLoaded", initPorerSwiperIfMobile);
window.addEventListener("resize", initPorerSwiperIfMobile);



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

