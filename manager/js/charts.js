const lineTension = 0;
const pointRadius = 3;
const borderWidth = 1;
const stepSizeY = 100000;
const maxYValue = 600000;

const labelMap = {
  days_1: [...Array(7)].map((_, i) => `${i + 1}`),
  days_2: [...Array(31)].map((_, i) => `${i + 1}`),
  days_3: [...Array(13)].map((_, i) => `${i + 1}`),
  days_4: [...Array(12)].map((_, i) => `${i + 1}`),
  days_5: [...Array(14)].map((_, i) => `${i + 1}`)
};

const datasetMap = {
  test_a: {
    label: '정산금액',
    data: [100000, 120000, 110000, 90000, 110000, 130000, 150000, 170000, 190000, 210000, 230000, 250000, 270000, 290000, 310000, 330000, 350000, 330000, 310000, 290000, 270000, 250000, 230000, 250000, 270000, 290000, 310000, 250000, 210000, 190000, 200000],
    borderColor: '#D90000'
  },
  test_b: {
    label: 'PV',
    data: [500000, 490000, 470000, 450000, 430000, 410000, 390000, 370000, 350000, 330000, 310000, 290000, 270000, 200000, 150000, 100000, 50000, 80000, 120000, 180000, 250000, 300000, 400000, 450000, 350000, 300000, 250000, 350000, 420000, 450000, 480000],
    borderColor: '#0081CF'
  },
  test_c: {
    label: 'Click',
    data: [450000, 460000, 480000, 500000, 480000, 460000, 440000, 420000, 400000, 350000, 300000, 270000, 250000, 220000, 190000, 160000, 130000, 160000, 200000, 260000, 320000, 370000, 500000, 480000, 400000, 300000, 200000, 280000, 450000, 500000, 550000],
    borderColor: '#008F7A'
  },
  test_d: {
    label: 'CTR',
    data: [200000, 220000, 200000, 180000, 200000, 230000, 260000, 300000, 320000, 330000, 310000, 300000, 400000, 490000, 520000, 540000, 510000, 480000, 420000, 350000, 270000, 200000, 180000, 220000, 300000, 430000, 310000, 230000, 200000, 180000, 280000],
    borderColor: '#845EC2'
  },
  test_e: {
    label: 'Ecpm',
    data: [50000, 70000, 60000, 80000, 120000, 150000, 180000, 200000, 220000, 200000, 180000, 210000, 250000, 300000, 350000, 400000, 450000, 400000, 350000, 300000, 250000, 200000, 100000, 80000, 120000, 300000, 270000, 230000, 150000, 100000, 150000],
    borderColor: '#FFC75F'
  }
};


let lineChart;

function renderLineChart(type) {
  const labels = labelMap[type];
  if (!labels) return;

  const activeKeys = $('.check_point:checked').map(function () {
    return this.id;
  }).get();

  const activeDatasets = activeKeys.map(key => {
    const base = datasetMap[key];
    if (!base) return null;

    return {
      label: base.label,
      data: base.data.slice(0, labels.length),
      borderColor: base.borderColor,
      pointBackgroundColor: base.borderColor,  // ✅ 도트 내부 채움
      pointBorderColor: base.borderColor,      // ✅ 도트 외곽
      fill: false,
      tension: lineTension,
      pointRadius: pointRadius,
      pointHoverRadius: 6,
      borderWidth: borderWidth
    };
  }).filter(Boolean);

  const ctx = document.getElementById('lineChart').getContext('2d');
  if (lineChart) lineChart.destroy();

  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: activeDatasets
    },
    options: {
      responsive: true,
      animation: {
        duration: 500,
        delay: ctx => ctx.dataIndex * 10,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        x: {
          type: 'category',
          offset: false,
          grid: { display: false },
          border: {
            display: true,
            width: 1,
            color: '#333'
          },
          ticks: {
            font: { size: 10 }
          }
        },
        y: {
          grid: {
            display: true,
            color: '#ccc',
            lineWidth: 1
          },
          border: {
            display: false
          },
          ticks: {
            stepSize: stepSizeY,
            callback: value => value.toLocaleString()
          },
          min: 0,
          max: maxYValue
        }
      }
    }
  });
}

// 초기 실행
$(function () {
  renderLineChart('days_2');

  // 기간 선택시
  $('.custom_ulist ul li').on('click', function () {
    $('.custom_ulist ul li').removeClass('active');
    $(this).addClass('active');

    const type = $(this).data('value');
    renderLineChart(type);
  });
});

// 선택 항목만 동적으로 추가/제거
$('.check_point').on('change', function () {
  const key = this.id;
  const type = $('.custom_ulist ul li.active').data('value') || 'days_2';
  const labels = labelMap[type];

  if (!lineChart) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: []
      },
      options: {
        responsive: true,
        animation: {
          duration: 100,
          delay: ctx => ctx.dataIndex * 10,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: {
            type: 'category',
            offset: false,
            grid: { display: false },
            border: {
              display: true,
              width: 1,
              color: '#333'
            },
            ticks: { font: { size: 10 } }
          },
          y: {
            grid: {
              display: true,
              color: '#ccc',
              lineWidth: 1
            },
            border: { display: false },
            ticks: {
              stepSize: stepSizeY,
              callback: value => value.toLocaleString()
            },
            min: 0,
            max: maxYValue
          }
        }
      }
    });
  }

  const label = datasetMap[key]?.label;
  const index = lineChart.data.datasets.findIndex(ds => ds.label === label);

 if (this.checked && index === -1) {
  const dataset = datasetMap[key];
  lineChart.data.datasets.push({
    label: dataset.label,
    data: dataset.data.slice(0, labels.length),
    borderColor: dataset.borderColor,
    pointBackgroundColor: dataset.borderColor,
    pointBorderColor: dataset.borderColor,
    fill: false,
    tension: lineTension,
    pointRadius: pointRadius,
    pointHoverRadius: 6, // ✅ 여기에 명시적으로 추가
    borderWidth: borderWidth
  });
  lineChart.update();
}


  if (!this.checked && index !== -1) {
    lineChart.data.datasets.splice(index, 1);
    lineChart.update();
  }
});
