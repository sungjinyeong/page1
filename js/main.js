document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.fullpage-container');
  const sections = document.querySelectorAll('.section');
  const paginationItems = document.querySelectorAll('.pagination li');

  // 스크롤 시 현재 섹션에 따른 페이지네이션 active 업데이트
  container.addEventListener('scroll', function() {
    const index = Math.round(container.scrollTop / window.innerHeight);
    paginationItems.forEach(item => item.classList.remove('active'));
    if (paginationItems[index]) {
      paginationItems[index].classList.add('active');
    }
  });

  // 페이지네이션 클릭 시 해당 섹션으로 부드럽게 스크롤
  paginationItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const index = parseInt(this.getAttribute('data-index'));
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    });
  });

  // IntersectionObserver를 이용하여 화면 내 보이는 섹션에 active 클래스 추가 (scale 효과 적용)
  const observerOptions = {
    root: container,
    threshold: 0.6
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
