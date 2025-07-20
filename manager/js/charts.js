// ======== 사용자 설정값 ========
const lineTension = 0;        // 선 휘는 정도 (0 = 직선)
const pointRadius = 2;          // 도트 크기
const borderWidth = 1;          // 선 굵기
const stepSizeY = 100000;       // Y축 간격
const maxYValue = 600000;       // Y축 최대값
// ===============================

// ======== 차트 데이터 ========
const lineLabels = [...Array(31)].map((_, i) => (i + 1).toString());
const datasets = [
  {
    label: '데이터1',
    data: [100000, 120000, 110000, 90000, 110000, 130000, 150000, 170000, 190000, 210000, 230000, 250000, 270000, 290000, 310000, 330000, 350000, 330000, 310000, 290000, 270000, 250000, 230000, 250000, 270000, 290000, 310000, 250000, 210000, 190000, 200000],
    borderColor: 'red',
    fill: false
  },
  {
    label: '데이터2',
    data: [500000, 490000, 470000, 450000, 430000, 410000, 390000, 370000, 350000, 330000, 310000, 290000, 270000, 200000, 150000, 100000, 50000, 80000, 120000, 180000, 250000, 300000, 400000, 450000, 350000, 300000, 250000, 350000, 420000, 450000, 480000],
    borderColor: 'teal',
    fill: false
  },
  {
    label: '데이터3',
    data: [450000, 460000, 480000, 500000, 480000, 460000, 440000, 420000, 400000, 350000, 300000, 270000, 250000, 220000, 190000, 160000, 130000, 160000, 200000, 260000, 320000, 370000, 500000, 480000, 400000, 300000, 200000, 280000, 450000, 500000, 550000],
    borderColor: 'dodgerblue',
    fill: false
  },
  {
    label: '데이터4',
    data: [200000, 220000, 200000, 180000, 200000, 230000, 260000, 300000, 320000, 330000, 310000, 300000, 400000, 490000, 520000, 540000, 510000, 480000, 420000, 350000, 270000, 200000, 180000, 220000, 300000, 430000, 310000, 230000, 200000, 180000, 280000],
    borderColor: 'orange',
    fill: false
  },
  {
    label: '데이터5',
    data: [50000, 70000, 60000, 80000, 120000, 150000, 180000, 200000, 220000, 200000, 180000, 210000, 250000, 300000, 350000, 400000, 450000, 400000, 350000, 300000, 250000, 200000, 100000, 80000, 120000, 300000, 270000, 230000, 150000, 100000, 150000],
    borderColor: 'purple',
    fill: false
  }
];

// ======== 공통 속성 주입 ========
datasets.forEach(ds => {
  ds.tension = lineTension;
  ds.pointRadius = pointRadius;
  ds.borderWidth = borderWidth;
});

// ======== 차트 생성 ========
const ctx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: lineLabels,
    datasets: datasets
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: context => context.dataset.label + ': ' + context.formattedValue
        }
      }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        min: 0,
        max: maxYValue,
        ticks: {
          stepSize: stepSizeY,
          callback: value => value.toLocaleString()
        },
        grid: { color: '#ccc' }
      }
    }
  }
});