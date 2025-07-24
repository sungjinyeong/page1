// .all_btn 체크
$(document).ready(function () {
  $('.all_btn .check_point').on('change', function () {
    let isChecked = $(this).is(':checked'),
        $excelTable = $(this).closest('.excel_table');
    $excelTable.find('.ex_row .check_point').not(this).prop('checked', isChecked).trigger('change');
  });
});