<template>
  <div>
    <h1>최근 거래 내역</h1>
    <select v-model="selectedType">
      <option value="all">지출/수입</option>
      <option value="expense">지출</option>
      <option value="income">수입</option>
    </select>
    <ul>
      <TransactionItem
        v-for="(trans, index) in recentTransactions"
        :key="trans.id"
        :trans="trans"
        :index="index"
      />
    </ul>
    <button @click="goToAdd">추가하기</button>
    <button @click="goToTransaction">더보기</button>
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
</script>

<style scoped></style>
