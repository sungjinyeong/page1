// 아이디 중복확인
document.querySelectorAll('.id_overlap').forEach(btn => {
  btn.addEventListener('click', () => {
    let inpBox = btn.closest('.inp_box');
    if (!inpBox) return;

    const val = inpBox.querySelector('input[type="text"]').value.trim();

    // 중복 여부 판정 예시 (실제로는 서버에 요청해야 정확함)
    const isDuplicate = (val === 'test'); // 예: 'test'면 중복 테스트

    const fallTip = inpBox.querySelector('.check_tip.fall');
    const trueTip = inpBox.querySelector('.check_tip.true');

    if (isDuplicate) {
      fallTip?.classList.add('active');
      trueTip?.classList.remove('active');
    } else {
      trueTip?.classList.add('active');
      fallTip?.classList.remove('active');
    }
  });
});


// 이메일 셀렉트
$(function () {
  // 초기 로드 시 '직접입력' 상태면 readonly 해제
  const $domain = $('#email_domain');
  const $emailSelect = $('#email_select_box .selected');

  if ($emailSelect.attr('data-value') === '' || !$emailSelect.attr('data-value')) {
    $domain.prop('readOnly', false).val('');
  }

  // 펼치기/접기
  $(document).on('click', '.custom_email_select .selected', function (e) {
    e.stopPropagation();
    const $wrap = $(this).closest('.custom_email_select');

    $('.custom_email_select .options').not($wrap.find('.options')).hide();
    $('.custom_email_select').not($wrap).removeClass('active');

    $wrap.toggleClass('active');
    $wrap.find('.options').toggle();
  });

  // 항목 선택
  $(document).on('click', '.custom_email_select .options li', function (e) {
    e.stopPropagation();
    const $li   = $(this);
    const $wrap = $li.closest('.custom_email_select');
    const value = $li.attr('data-value') ?? '';
    const text  = $li.text();

    // 라벨 반영
    $wrap.find('.selected')
      .text(text)
      .attr('data-value', value);

    // 드롭다운 닫기
    $wrap.addClass('active');
    $wrap.find('.options').hide();

    // 이메일 전용 연동
    if ($wrap.is('#email_select_box')) {
      const $hidden = $('#email_sel_value');

      if ($hidden.length) $hidden.val(value);

      if ($domain.length) {
        if (value === '') {
          // 직접입력
          $domain.prop('readOnly', false).val('');
        } else {
          // 선택입력
          $domain.prop('readOnly', true).val(value);
        }
      }
    }
  });

  // 바깥 클릭 시 모두 닫기
  $(document).on('click', function () {
    $('.custom_email_select').removeClass('active');
    $('.custom_email_select .options').hide();
  });

  // 키보드Enter/Space 토글, Esc 닫기
  $(document).on('keydown', '.custom_email_select .selected', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).click();
    }
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('.custom_email_select').removeClass('active');
      $('.custom_email_select .options').hide();
    }
  });
});




document.addEventListener('input', e => {
  // 텍스트 / 패스워드 입력 처리
  if (e.target.matches('.inp_box input[type="text"], .inp_box input[type="password"]')) {
    const hasValue = e.target.value.trim() !== '';
    e.target.classList.toggle('active', hasValue);

    // 같은 .rg_ton 안의 .rg_sel 버튼 active 처리
    const rgSel = e.target.closest('.rg_ton')?.querySelector('.rg_sel');
    if (rgSel) rgSel.classList.toggle('active', hasValue);
  }

  // 숫자만 입력 가능
  if (e.target.classList.contains('number')) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }
});

// 이메일 셀렉트 옵션 선택 시 value 반영 + active 처리
$(document).on('click', '.custom_email_select .options li', function (e) {
  e.stopPropagation();
  const $li   = $(this);
  const $wrap = $li.closest('.custom_email_select');
  const value = $li.attr('data-value') ?? '';
  const text  = $li.text();
  const $domain = $('#email_domain');

  // UI 반영
  $wrap.find('.selected').text(text).attr('data-value', value);
  $wrap.removeClass('active').find('.options').hide();

  // 숨김 input 값 반영
  $('#email_sel_value').val(value);

  // 직접입력 여부
  if (value === '') {
    $domain.prop('readOnly', false).val('').removeClass('active');
  } else {
    $domain.prop('readOnly', true).val(value).addClass('active'); // ← 여기서 active 강제 추가
  }
});