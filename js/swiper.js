document.querySelector('.form_data .sel form')
  .addEventListener('touchstart', function(e) {
    console.log("터치 대상:", e.target, e.target.closest('form, input, textarea, select, button'));
    e.stopPropagation();
});
let swiperInitialized = false;
      
// ========================== PORER SWIPER RESPONSIVE ==========================
let porerSwiper = null;

function handlePorerSwiper() {
  const isMobile = window.innerWidth <= 768;

  // 모바일 진입 시 아직 초기화 안 됐으면 초기화
  if (isMobile && !porerSwiper) {
    porerSwiper = new Swiper(".porerSwiper", {
      loop: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 20,
      initialSlide: 1,
      autoplay: { delay: 4000, disableOnInteraction: false }
    });
  }
  // 데스크탑 진입(>768px) 시 이미 초기화된 인스턴스가 있으면 파괴
  else if (!isMobile && porerSwiper) {
    porerSwiper.destroy(true, true);  // 모든 이벤트·스타일 제거
    porerSwiper = null;
  }
}

// 처음 로드와 매 리사이즈 시 실행
window.addEventListener("DOMContentLoaded", handlePorerSwiper);
window.addEventListener("resize", handlePorerSwiper);




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

