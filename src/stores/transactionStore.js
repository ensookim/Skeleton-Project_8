import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/api/transaction');
      transactions.value = res.data;
    } catch (e) {
      console.error('가계부 내역 불러오기 실패', e);
    }
  };

  return {
    transactions,
    fetchTransactions,
  };
});
