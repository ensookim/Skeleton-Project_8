//여기서 거래 내역 가져오고 추가 수정 삭제
import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useTransactionStore = defineStore('useTransactionStore', () => {
  const transactions = ref([]);
  const router = useRouter();
  //불러오기
  const fetchTransactions = async () => {
    try {
      const reseponse = await axios.get('/api/transaction');
      transactions.value = reseponse.data;
    } catch (err) {
      console.error('거래 내역 불러오기에 실패했습니다. :', err);
    }
  };

  // 추가 post
  const addTransaction = async (newItem) => {
    try {
      const reseponse = await axios.post('/api/transaction', newItem);
      transactions.value.push(reseponse.data);
    } catch (err) {
      console.error('추가하기에 실패했습니다. : ', err);
    }
  };

  // 수정은 put
  const updateTransaction = async (updateItem) => {
    try {
      await axios.put(`/api/transaction/${updateItem.id}`, updateItem);
      await fetchTransactions();
    } catch (err) {
      console.log('수정하기에 실패했습니다. : ', err);
    }
  };

  // 삭제
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/api/transaction/${id}`);
      transactions.value = transactions.value.filter(
        (target) => String(target.id) !== String(id)
      );
    } catch (err) {
      console.log('거래 삭제에 실패했습니다. : ', err);
    }
  };

  const goToAdd = () => {
    router.push('/transaction/add');
  };

  const goToTransaction = () => {
    router.push('/transaction');
  };

  const goToDetail = (id) => {
    router.push(`/transaction/${id}`);
  };

  return {
    transactions,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    goToAdd,
    goToDetail,
    goToTransaction,
  };
});
