<template>
  <TransactionForm v-if="formReady" :isEdit="true" :form="form" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTransactionStore } from '@/stores/transactionStore';
import TransactionForm from '@/components/TransactionForm.vue';

const route = useRoute();
const transactionStore = useTransactionStore();
const form = ref(null);
const formReady = ref(false); // <- 렌더링 조건

onMounted(async () => {
  const id = route.params.id;
  await transactionStore.fetchTransactions();

  const target = transactionStore.transactions.find(
    (t) => String(t.id) === String(id)
  );

  if (target) {
    form.value = { ...target }; // <- id 포함해서 form 세팅!
    formReady.value = true;
  } else {
    console.error('해당 거래 내역을 찾을 수 없습니다.');
  }
});
</script>
