//여기서 거래 내역 가져오고 추가 수정 삭제
import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionStore = defineStore('useTransactionStore', () => {
  const transactions = ref([]);

  //불러오기
  const fetchTransactions = async () => {
    try {
      const reseponse = await axios.get('http://localhost:3000/transaction');
      transactions.value = reseponse.data;
    } catch (err) {
      console.error('거래 내역 불러오기에 실패했습니다. :', err);
    }
  };

  // 추가 post
  const addTransaction = async (newItem) => {
    try {
      const reseponse = await axios.post(
        'http://localhost:3000/transaction',
        newItem
      );
      transactions.value.push(reseponse.data);
    } catch (err) {
      console.error('추가하기에 실패했습니다. : ', err);
    }
  };

  // 수정은 put
  const updateTransaction = async (updateItem) => {
    try {
      await axios.put(
        `http://localhost:3000/transaction/${updateItem.id}`,
        updateItem
      );
      // console.log(updateItem, updateItem.id);

      const index = transactions.value.findIndex(
        (target) => String(target.id) === String(updateItem.id)
      );
      // console.log(index);
      // console.log(
      //   '전체 거래 내역:',
      //   transactions.value.map((t) => t.id)
      // );
      // console.log('수정할 아이디:', updateItem.id);
      // console.log(
      //   '찾은 인덱스:',
      //   transactions.value.findIndex(
      //     (t) => String(t.id) === String(updateItem.id)
      //   )
      // );

      if (index !== -1) {
        transactions.value[index] = updateItem;
      }
    } catch (err) {
      console.log('수정하기에 실패했습니다. : ');
    }
  };

  // 삭제
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/transaction/${id}`);
      transactions.value = transactions.value.filter(
        (target) => String(target.id) !== String(id)
      );
    } catch (err) {
      console.log('거래 삭제에 실패했습니다. : ', err);
    }
  };

  return {
    transactions,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
});
