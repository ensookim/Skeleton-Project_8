<template>
  <div>
    <h1>최근 거래 내역</h1>
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
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore';
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import TransactionItem from './TransactionItem.vue';

const store_category = useCategoryStore();
const store_trans = useTransactionStore();

const router = useRouter();

store_trans.fetchTransactions();

const { transactions } = storeToRefs(store_trans);
const recentTransactions = computed(() => transactions.value.slice(0, 5));

const goToAdd = () => {
  router.push('/transaction/add');
};
const goToTransaction = () => {
  router.push('/transaction');
};
</script>

<style scoped></style>
