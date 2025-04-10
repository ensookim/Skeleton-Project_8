<template>
  <div class="card rounded-4 d-flex flex-row p-3 m-5 shadow">
    <!-- 이번 달 총 지출 -->
    <div class="card-body d-flex flex-row rounded mx-2">
      <div>
        <i class="fa-solid fa-minus bg-danger rounded-circle p-1 me-2"></i>
      </div>
      <div>
        <h4 class="card-title">이번 달 총 지출</h4>
        <p class="card-text">: {{ formatCurrency(currentExpense) }}</p>
        <p>
          <span class="text-muted me-2">전월 대비</span>

          <span v-if="currentExpense - lastExpense > 0" style="color: green">
            <i class="fa-solid fa-arrow-up"> </i>
            {{ formatCurrency(currentExpense - lastExpense) }}
          </span>
          <span v-if="currentExpense - lastExpense < 0" style="color: red">
            <i class="fa-solid fa-arrow-down"> </i>
            {{ formatCurrency(currentExpense - lastExpense) }}
          </span>
        </p>
      </div>
    </div>

    <div class="border-end"></div>

    <!-- 이번 달 총 수업 -->
    <div class="card-body d-flex flex-row rounded mx-2">
      <div>
        <i class="fa-solid fa-plus bg-success rounded-circle p-1 me-2"></i>
      </div>
      <div>
        <h4 class="card-title">이번 달 총 수입</h4>
        <p class="card-text">: {{ formatCurrency(currentIncome) }}</p>
        <p>
          <span class="text-muted me-2">전월 대비</span>
          <span v-if="currentIncome - lastIncome > 0" style="color: green">
            <i class="fa-solid fa-arrow-up"> </i>
            {{ formatCurrency(currentIncome - lastIncome) }}
          </span>
          <span v-if="currentIncome - lastIncome < 0" style="color: red">
            <i class="fa-solid fa-arrow-down"> </i>
            {{ formatCurrency(currentIncome - lastIncome) }}
          </span>
        </p>
      </div>
    </div>

    <div class="border-end"></div>

    <!-- 이번 달 순수익 -->
    <div class="card-body d-flex flex-row rounded mx-2">
      <div>
        <i
          class="fa-solid fa-plus-minus bg-primary rounded-circle p-1 me-2"
        ></i>
      </div>
      <div>
        <h4 class="card-title">이번 달 순수익</h4>
        <p class="card-text">
          : {{ formatCurrency(currentIncome - currentExpense) }}
        </p>
        <p>
          <span class="text-muted me-2">전월 대비</span>
          <span
            v-if="
              currentIncome - lastIncome - (currentExpense - lastExpense) > 0
            "
            style="color: green"
          >
            <i class="fa-solid fa-arrow-up"> </i>
            {{
              formatCurrency(
                currentIncome - lastIncome - (currentExpense - lastExpense)
              )
            }}
          </span>
          <span
            v-if="
              currentIncome - lastIncome - (currentExpense - lastExpense) < 0
            "
            style="color: red"
          >
            <i class="fa-solid fa-arrow-down"> </i>
            {{
              formatCurrency(
                currentIncome - lastIncome - (currentExpense - lastExpense)
              )
            }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMonthlyStore } from '@/stores/monthly';
import { computed } from 'vue';

const store = useMonthlyStore();
const { fetchExpense, fetchIncome } = store;
const lastExpense = computed(() => store.lastExpense);
const currentExpense = computed(() => store.currentExpense);
const lastIncome = computed(() => store.lastIncome);
const currentIncome = computed(() => store.currentIncome);

fetchExpense();
fetchIncome();

const formatCurrency = (value) => {
  if (value == null) return '₩0';
  return `₩ ${value.toLocaleString('ko-KR')}`;
};
</script>

<style scoped>
.card {
  background-color: #fff;
}
</style>
