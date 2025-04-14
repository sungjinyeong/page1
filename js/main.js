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
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const index = parseInt(this.getAttribute('data-index'));
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    });
  });
  paginationItems.forEach(item => {
    item.addEventListener('click', () => {
      paginationItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
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


document.addEventListener('DOMContentLoaded', function () {
  // input, textarea에 글이 있으면 active 추가/제거
  const inputs = document.querySelectorAll('.form_data input, .form_data textarea');
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      if (this.value.trim() !== '') {
        this.classList.add('active');
      } else {
        this.classList.remove('active');
      }
    });
  });

  // choice_list 클릭 시 해당 li에만 active 추가
  const choices = document.querySelectorAll('.form_data .choice_list li');
  choices.forEach(function (li) {
    li.addEventListener('click', function () {
      choices.forEach(el => el.classList.remove('active'));
      this.classList.add('active');
    });
  });
});


// textarea rows 조절
$(document).ready(function(){
  function adjustTextareaRows() {
    if (window.innerWidth <= 768) {
      $('textarea[placeholder="문의사항을 입력해주세요."]').attr('rows', 3);
    } else {
      $('textarea[placeholder="문의사항을 입력해주세요."]').attr('rows', 4);
    }
  }

  // 최초 실행
  adjustTextareaRows();

  // 리사이즈 시 처리
  $(window).on('resize', adjustTextareaRows);
});

document.addEventListener("DOMContentLoaded", function () {
  const headerLogoWhite = document.querySelector(".wh_logo");
  const headerLogoRed = document.querySelector(".rd_logo");
  const navLinks = document.querySelectorAll(".header .nav li a");

  // 각 섹션별 폰트 컬러 (sec1 ~ sec9)
  const fontColors = ["white", "black", "white", "black", "white", "white", "black", "black", "black"];

  // 스크롤 감지
  const container = document.querySelector('.fullpage-container');
  container.addEventListener("scroll", () => {
    const scrollTop = container.scrollTop;
    const index = Math.round(scrollTop / window.innerHeight);
    const currentFont = fontColors[index] || "black";

    // 로고 투명도
    if (currentFont === "white") {
      headerLogoWhite.style.opacity = "1";
      headerLogoRed.style.opacity = "0";
    } else {
      headerLogoWhite.style.opacity = "0";
      headerLogoRed.style.opacity = "1";
    }

    // nav a 폰트 색상도 같이 변경
    navLinks.forEach(link => {
      link.style.color = currentFont;
    });
  });
});




// header Mobile btn
let toggleBtn = document.querySelector('.hamburger-button');
toggleBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  toggleBtn.classList.toggle('active');
})