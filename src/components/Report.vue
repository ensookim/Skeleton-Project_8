<template>
  <h3 class="mx-3">차트로 올해 수입/지출 살펴보기</h3>
  <div class="my-5 mx-auto" style="width: 800px">
    <canvas id="expenseChart"></canvas>
  </div>
  <div class="m-5 mx-auto" style="width: 800px">
    <canvas id="incomeChart"></canvas>
  </div>
  <!-- <table>
    <thead>
      <tr>
        <td>1월</td>
        <td>2월</td>
        <td>3월</td>
        <td>4월</td>
        <td>5월</td>
        <td>6월</td>
        <td>7월</td>
        <td>8월</td>
        <td>9월</td>
        <td>10월</td>
        <td>11월</td>
        <td>12월</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ reportStore.JanExpense }}</td>
        <td>{{ reportStore.FebExpense }}</td>
        <td>{{ reportStore.MarExpense }}</td>
        <td>{{ reportStore.AprExpense }}</td>
        <td>{{ reportStore.MayExpense }}</td>
        <td>{{ reportStore.JunExpense }}</td>
        <td>{{ reportStore.JulExpense }}</td>
        <td>{{ reportStore.AugExpense }}</td>
        <td>{{ reportStore.SepExpense }}</td>
        <td>{{ reportStore.OctExpense }}</td>
        <td>{{ reportStore.NovExpense }}</td>
        <td>{{ reportStore.DecExpense }}</td>
      </tr>
    </tbody>
  </table> -->
</template>
<script setup>
import { useReportStore } from '@/stores/report';
import { onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const reportStore = useReportStore();

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
          data: [
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
          ],
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
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
          data: [
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
          ],
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
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
  () => [
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
  ],
  () => {
    createExpenseChart();
    createIncomeChart();
  }
);
</script>
