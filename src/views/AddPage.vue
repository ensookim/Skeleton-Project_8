<template>
  <div class="container mt-4">
    <TransactionForm :isEdit="false" :form="form" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TransactionForm from '@/components/TransactionForm.vue';

const form = ref({
  date: '',
  amount: 0,
  type: 'income',
  category: '',
  isPeriodic: false,
  memo: '',
});
</script>
