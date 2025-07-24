// header Nav li active
// 헤더 공용입니다 //
$(document).ready(function (){
  $('.header_nav li').on('click', function (e){
    e.preventDefault();
    $('.header_nav li').removeClass('active');
    $(this).addClass('active');
  });
});

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
    let $ulist = $this.find('.custom_ulist');

    if ($ulist.is(':visible')) {
      $ulist.hide();
      $this.removeClass('active');
    } else {
      $('.drop_sel').removeClass('active').find('.custom_ulist').hide();
      $ulist.show();
      $this.addClass('active');
    }
  });

  $('.custom_ulist ul li').on('click', function (e) {
    e.stopPropagation();
    const text = $(this).text();
    let $dropSel = $(this).closest('.drop_sel');

    $dropSel.find('.h2_st').text(text);
    $dropSel.find('.custom_ulist').hide();
    $dropSel.removeClass('active');
  });

  $(document).on('click', function () {
    $('.drop_sel').removeClass('active').find('.custom_ulist').hide();
  });
});