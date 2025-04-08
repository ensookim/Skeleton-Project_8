<template>
  <TransactionForm :isEdit="false" :form="form" />
</template>
<script setup>
import { ref } from 'vue';
import TransactionForm from '@/components/TransactionForm.vue';

//형식
const form = ref({
  date: '',
  amount: 0,
  type: 'income',
  category: '',
  isPeriodic: false,
  memo: '',
});
</script>
