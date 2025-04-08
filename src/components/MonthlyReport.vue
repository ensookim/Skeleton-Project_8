<template>
  <div class="card rounded-4 d-flex flex-row">
    <!-- 이번 달 총 지출 -->
    <div class="card-body d-flex flex-row">
      <div>
        <i class="fa-solid fa-minus"></i>
      </div>
      <div>
        <h4 class="card-title">이번 달 총 지출</h4>
        <p class="card-text">{{ currentExpense }}</p>
        <p>
          전월 대비
          <span v-if="currentExpense - lastExpense > 0" style="color: green">
            <i class="fa-solid fa-arrow-up"> </i>
            <i class="fa-solid fa-won-sign"></i
            >{{ currentExpense - lastExpense }}
          </span>
          <span v-if="currentExpense - lastExpense < 0" style="color: red">
            <i class="fa-solid fa-arrow-down"> </i>
            <i class="fa-solid fa-won-sign"></i
            >{{ currentExpense - lastExpense }}
          </span>
        </p>
      </div>
    </div>
    <!-- 이번 달 총 수업 -->
    <div class="card-body d-flex flex-row">
      <div>
        <i class="fa-solid fa-plus"></i>
      </div>
      <div>
        <h4 class="card-title">이번 달 총 수입</h4>
        <p class="card-text">{{ currentIncome }}</p>
        <p>
          전월 대비
          <span v-if="currentIncome - lastIncome > 0" style="color: green">
            <i class="fa-solid fa-arrow-up"> </i>
            <i class="fa-solid fa-won-sign"></i>{{ currentIncome - lastIncome }}
          </span>
          <span v-if="currentIncome - lastIncome < 0" style="color: red">
            <i class="fa-solid fa-arrow-down"> </i>
            <i class="fa-solid fa-won-sign"></i>{{ currentIncome - lastIncome }}
          </span>
        </p>
      </div>
    </div>
    <!-- 이번 달 순수익 -->
    <div class="card-body d-flex flex-row">
      <div>
        <i class="fa-solid fa-plus-minus"></i>
      </div>
      <div>
        <h4 class="card-title">이번 달 순수익</h4>
        <p class="card-text">{{ currentIncome - currentExpense }}</p>
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
</script>

<style scoped></style>
