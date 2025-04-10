<template>
  <div class="m-5 card rounded-4 p-4 shadow">
    <h3 class="d-flex justify-content-center mx-3 mt-2">
      올해 수입/지출 차트로 살펴보기
    </h3>

    <p class="d-flex justify-content-center m-3">
      올해는&nbsp;<span class="text-danger">{{ maxExpenseMonth }}월</span>에
      가장 많이 썼어요!
    </p>
    <div class="my-5 mx-auto" style="width: 80%">
      <canvas id="expenseChart"></canvas>
    </div>

    <p class="d-flex justify-content-center m-3">
      올해는&nbsp;<span class="text-success">{{ maxIncomeMonth }}월</span>에
      가장 많이 벌었어요!
    </p>
    <div class="my-5 mx-auto" style="width: 80%">
      <canvas id="incomeChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { useReportStore } from '@/stores/report';
import { onMounted, watch, computed } from 'vue';
import Chart from 'chart.js/auto';

const reportStore = useReportStore();

// 예시 데이터 설정
reportStore.JanExpense = 200;
reportStore.FebExpense = 200;
reportStore.MarExpense = 150;
reportStore.AprExpense = 100;
reportStore.MayExpense = 250;
reportStore.JunExpense = 300;
reportStore.JulExpense = 200;
reportStore.AugExpense = 100;
reportStore.SepExpense = 150;
reportStore.OctExpense = 200;
reportStore.NovExpense = 300;
reportStore.DecExpense = 400;

reportStore.JanIncome = 300;
reportStore.FebIncome = 250;
reportStore.MarIncome = 200;
reportStore.AprIncome = 350;
reportStore.MayIncome = 400;
reportStore.JunIncome = 450;
reportStore.JulIncome = 300;
reportStore.AugIncome = 250;
reportStore.SepIncome = 350;
reportStore.OctIncome = 400;
reportStore.NovIncome = 500;
reportStore.DecIncome = 600;

const yearExpense = computed(() => [
  reportStore.JanExpense,
  reportStore.FebExpense,
  reportStore.MarExpense,
  reportStore.AprExpense,
  reportStore.MayExpense,
  reportStore.JunExpense,
  reportStore.JulExpense,
  reportStore.AugExpense,
  reportStore.SepExpense,
  reportStore.OctExpense,
  reportStore.NovExpense,
  reportStore.DecExpense,
]);

const yearIncome = computed(() => [
  reportStore.JanIncome,
  reportStore.FebIncome,
  reportStore.MarIncome,
  reportStore.AprIncome,
  reportStore.MayIncome,
  reportStore.JunIncome,
  reportStore.JulIncome,
  reportStore.AugIncome,
  reportStore.SepIncome,
  reportStore.OctIncome,
  reportStore.NovIncome,
  reportStore.DecIncome,
]);
// 동률시 배열 추가
const maxExpenseAmount = computed(() => Math.max(...yearExpense.value));
const maxExpenseMonth = computed(() => {
  const maxMonths = yearExpense.value
    .map((expense, index) =>
      expense === maxExpenseAmount.value ? index + 1 : null
    )
    .filter((month) => month !== null);
  console.log('최대 지출 월:', maxMonths);
  return maxMonths.length > 0 ? maxMonths.join(', ') : '없음';
});

const maxIncomeAmount = computed(() => Math.max(...yearIncome.value));
const maxIncomeMonth = computed(() => {
  const maxMonths = yearIncome.value
    .map((income, index) =>
      income === maxIncomeAmount.value ? index + 1 : null
    )
    .filter((month) => month !== null);
  console.log('최대 수입 월:', maxMonths);
  return maxMonths.length > 0 ? maxMonths.join(', ') : '없음';
});

let expenseChartInstance = null;
let incomeChartInstance = null;

const createExpenseChart = () => {
  const ctx = document.getElementById('expenseChart').getContext('2d');
  if (expenseChartInstance) {
    expenseChartInstance.destroy();
  }
  expenseChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ],
      datasets: [
        {
          label: '1월 ~ 12월 지출',
          data: yearExpense.value,
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const createIncomeChart = () => {
  const ctx = document.getElementById('incomeChart').getContext('2d');
  if (incomeChartInstance) {
    incomeChartInstance.destroy();
  }
  incomeChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ],
      datasets: [
        {
          label: '1월 ~ 12월 수입',
          data: yearIncome.value,
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

onMounted(async () => {
  await reportStore.fetchExpense();
  await reportStore.fetchIncome();
  createExpenseChart();
  createIncomeChart();
});

watch(
  () => [yearExpense.value, yearIncome.value],
  () => {
    createExpenseChart();
    createIncomeChart();
  }
);
</script>
