<template>
  <div class="card rounded-4 p-3 m-5 shadow">
    <div class="card-body">
      <div class="card-title d-flex justify-content-between">
        <h3 class="mb-3">최근 거래 내역</h3>
        <select
          v-model="selectedType"
          class="form-select mb-3"
          style="width: 200px"
        >
          <option value="all">지출/수입</option>
          <option value="expense">지출</option>
          <option value="income">수입</option>
        </select>
      </div>
      <ul class="history-list">
        <li class="item header">
          <span class="col no">No.</span>
          <span class="col date">날짜</span>
          <span class="col amount">금액</span>
          <span class="col category">메모</span>
          <span class="col type">유형</span>
        </li>
        <TransactionItem
          v-for="(trans, index) in recentTransactions"
          :key="trans.id"
          :trans="trans"
          :index="index"
          @click="openModal"
        />
      </ul>
      <div class="mt-4 button-group">
        <div class="center-btn">
          <button class="action-button" @click="goToAdd">추가하기</button>
        </div>
        <div class="right-btn">
          <button class="action-button" @click="goToTransaction">
            자세히 보기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import TransactionItem from './TransactionItem.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const store_trans = useTransactionStore();

store_trans.fetchTransactions();
const { transactions } = storeToRefs(store_trans);

const selectedType = ref('all');

const recentTransactions = computed(() => {
  let filtered = transactions.value;

  if (selectedType.value === 'expense') {
    filtered = filtered.filter((trans) => trans.type === 'expense');
  } else if (selectedType.value === 'income') {
    filtered = filtered.filter((trans) => trans.type === 'income');
  }

  return filtered.slice(0, 5);
});

const goToAdd = () => {
  router.push('/transaction/add');
};
const goToTransaction = () => {
  router.push('/transaction');
};
const openModal = (trans) => {
  router.push({
    query: {
      ...router.currentRoute.value.query,
      id: String(trans.id),
      from: 'home',
    },
  });
};
</script>

<style scoped>
.history-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.header {
  display: flex;
  padding: 10px 16px;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
}
.item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}
.col {
  display: inline-block;
  padding: 0 8px;
  font-size: 0.95rem;
}
.no {
  width: 40px;
}
.date {
  width: 100px;
}
.amount {
  width: 100px;
}
.category {
  width: 120px;
}
.type {
  width: 80px;
}
.button-group {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  height: 60px;
}
.center-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.right-btn {
  margin-left: auto;
}
.action-button {
  padding: 10px 24px;
  border-radius: 9999px;
  background-color: #fff;
  font-weight: bold;
  color: #4f46e5;
  border: 1px solid #d1d5db;
  cursor: pointer;
}

.action-button:hover {
  background-color: #f3f4f6;
}
</style>
