// 좋아요 토글
$('.like_btn').click(function() {
  $(this).toggleClass('active');
});  

// 회무자랑 모달
$('.company .company_list li').on('click', function () {
  $('.company_modal').addClass('active');
});

// 모달 닫기
$('.modal_close').on('click', function () {
  $('.modal').removeClass('active');
});


// 페이지네이션
$(document).ready(function () {
  $(".pagination li").on("click", function () {
    $(".pagination li").removeClass("active");
    $(this).addClass("active");
  });

  $(".pagination li a").on("click", function (e) {
    e.preventDefault();
  });
});
