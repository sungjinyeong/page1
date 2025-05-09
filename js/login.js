document.addEventListener('DOMContentLoaded', function() {
  // 로그인 폼 input에 글 입력 시 부모 컨테이너 border 변경
  document.querySelectorAll('.log_form .user_ID input, .log_form .user_PASS input')
    .forEach(input => {
      input.addEventListener('input', function() {
        const container = this.closest('.user_ID, .user_PASS');
        if (!container) return;
        container.style.border = this.value.trim()
          ? '1px solid var(--dark)'
          : '1px solid var(--border)';
      });
    });

  // 햄버거 버튼 토글
  const header    = document.querySelector('.header.anchors.user_header');
  if (!header) return;
  const toggleBtn = header.querySelector('.hamburger-button');
  const nav       = header.querySelector('.nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleBtn.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
});
  

  $(document).ready(function () {
  $('.load_file > a').on('click', function (e) {
    e.preventDefault();
    const $parent = $(this).parent();

    if ($parent.hasClass('view_active')) {
      $parent.removeClass('view_active');
    } else {
      $('.load_file').removeClass('view_active');
      $parent.addClass('view_active');
    }
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.load_file').length) {
      $('.load_file').removeClass('view_active');
    }
  });
});