// 달력
$(function () {
  $('.datepicker').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    todayHighlight: true,
    language: 'ko'
  }).on('changeDate', function(e) {
    $(this).addClass('active');
  });
});


// 셀렉트
$(document).ready(function() {
  $(".value_select_label").click(function() {
    $(this).siblings(".value_select_list").toggle();
  });

  $(".value_select_list li").click(function() {
    let selectedText = $(this).text();
    let valueSelect = $(this).closest(".value_select");

    valueSelect.find(".value_select_label").text(selectedText);
    valueSelect.addClass("active");
    $(this).parent().hide();
  });

  $(document).click(function(e) {
    if (!$(e.target).closest(".value_select").length) {
      $(".value_select_list").hide();
    }
  });
});


// 시간 단위 선택
$(document).ready(function () {
  $('.section_gp .info .sel .drop_sel').on('click', function (e) {
    e.stopPropagation();
    $(this).toggleClass('active');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.section_gp .info .sel .drop_sel').length) {
      $('.section_gp .info .sel .drop_sel').removeClass('active');
    }
  });
});

// 시간 범위 선택 교체
$(document).ready(function () {
  $('.drop_sel').on('click', function (e) {
    e.stopPropagation();
    const $this = $(this);
    const $ulist = $this.find('.custom_ulist');

    // 현재 상태에 따라 toggle
    if ($ulist.is(':visible')) {
      $ulist.hide();
      $this.removeClass('active');
    } else {
      $('.drop_sel').removeClass('active').find('.custom_ulist').hide(); // 다른 드롭다운 닫기
      $ulist.show();
      $this.addClass('active');
    }
  });

  $('.custom_ulist ul li').on('click', function (e) {
    e.stopPropagation();
    const text = $(this).text();
    const $dropSel = $(this).closest('.drop_sel');

    $dropSel.find('.h2_st').text(text);
    $dropSel.find('.custom_ulist').hide();
    $dropSel.removeClass('active');
  });

  $(document).on('click', function () {
    $('.drop_sel').removeClass('active').find('.custom_ulist').hide();
  });
});
