<template>
  <div class="mx-5 card rounded-4 p-4 shadow">
    <h3 class="d-flex justify-content-center m-3">
      이번 달 카테고리별 지출 분석
    </h3>
    <table
      class="table table-bordered table-light table-responsive m-auto"
      style="text-align: center; width: 80%"
    >
      <thead>
        <tr>
          <th v-for="item in expenseCategoryTotals">{{ item.category }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="item in expenseCategoryTotals">
            {{ formatCurrency(item.total) }}
          </td>
        </tr>
      </tbody>
    </table>
    <p class="d-flex justify-content-center m-3">
      이번 달에는&nbsp<span class="text-danger">{{ maxExpenseCategory }}</span
      >에 가장 많이 썼어요!
    </p>
    <div class="mb-5 mx-auto" style="width: 80%">
      <canvas id="expenseCategoryChart"></canvas>
    </div>

    <h3 class="d-flex justify-content-center mb-4">
      이번 달 카테고리별 수입 분석
    </h3>
    <table
      class="table table-bordered table-light table-responsive m-auto"
      style="text-align: center; width: 80%"
    >
      <thead>
        <tr>
          <th v-for="item in incomeCategoryTotals">
            {{ item.category }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="item in incomeCategoryTotals">
            {{ formatCurrency(item.total) }}
          </td>
        </tr>
      </tbody>
    </table>
    <p class="d-flex justify-content-center m-3">
      이번 달에는&nbsp<span class="text-success">{{ maxIncomeCategory }}</span
      >으로 가장 많이 벌었어요!
    </p>
    <div class="mb-5 mx-auto" style="width: 80%">
      <canvas id="incomeCategoryChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/stores/categoryStore';
import { useTransactionStore } from '@/stores/transactionStore';
import { onMounted, watch, computed } from 'vue';
import Chart from 'chart.js/auto';

const categoryStore = useCategoryStore();
const transactionStore = useTransactionStore();

let expenseCategoryChartInstance = null;
let incomeCategoryChartInstance = null;

const now = new Date();
const thisYear = now.getFullYear();
const thisMonth = now.toLocaleString('ko-KR', { month: '2-digit' }).slice(0, 2);

// 각 카테고리별 지출 합계 계산
const expenseCategoryTotals = computed(() =>
  categoryStore.expenseCategory.map((category) => ({
    category,
    total: transactionStore.transactions
      .filter((data) => data.category === category)
      .filter((data) => data.date.startsWith(thisYear + '-' + thisMonth))
      .reduce((sum, item) => sum + item.amount, 0),
  }))
);

const maxExpenseAmount = computed(() =>
  expenseCategoryTotals.value.length > 0
    ? Math.max(...expenseCategoryTotals.value.map((item) => item.total))
    : 0
);

const maxExpenseCategory = computed(
  () =>
    expenseCategoryTotals.value.find(
      (item) => item.total === maxExpenseAmount.value
    )?.category || '없음'
);

const maxIncomeAmount = computed(() =>
  incomeCategoryTotals.value.length > 0
    ? Math.max(...incomeCategoryTotals.value.map((item) => item.total))
    : 0
);

const maxIncomeCategory = computed(
  () =>
    incomeCategoryTotals.value.find(
      (item) => item.total === maxIncomeAmount.value
    )?.category || '없음'
);

// 각 카테고리별 수입 합계 계산
const incomeCategoryTotals = computed(() =>
  categoryStore.incomeCategory.map((category) => ({
    category,
    total: transactionStore.transactions
      .filter((data) => data.category === category)
      .filter((data) => data.date.startsWith('2025-04'))
      .reduce((sum, item) => sum + item.amount, 0),
  }))
);

const createExpenseCategoryChart = () => {
  const ctx = document.getElementById('expenseCategoryChart').getContext('2d');
  if (expenseCategoryChartInstance) {
    expenseCategoryChartInstance.destroy();
  }
  expenseCategoryChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: categoryStore.expenseCategory,
      datasets: [
        {
          label: '각 항목별 지출',
          data: expenseCategoryTotals.value.map((item) => item.total),
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

const createIncomeCategoryChart = () => {
  const ctx = document.getElementById('incomeCategoryChart').getContext('2d');
  if (incomeCategoryChartInstance) {
    incomeCategoryChartInstance.destroy();
  }
  incomeCategoryChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: categoryStore.incomeCategory,
      datasets: [
        {
          label: '각 항목별 수입',
          data: incomeCategoryTotals.value.map((item) => item.total),
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
  await categoryStore.fetchCategories();
  await transactionStore.fetchTransactions();

  createExpenseCategoryChart();
  createIncomeCategoryChart();
});

watch(
  () => [
    // data 내용 넣기
  ],
  () => {
    createExpenseCategoryChart();
    createIncomeCategoryChart();
  }
);

const formatCurrency = (value) => {
  if (value == null) return '₩0';
  return `₩ ${value.toLocaleString('ko-KR')}`;
};
</script>

<style scoped></style>
