import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';

export const useMonthlyStore = defineStore('monthly', () => {
  // state
  const lastExpense = ref();
  const currentExpense = ref();
  const lastIncome = ref();
  const currentIncome = ref();

  // getter

  // action
  const fetchExpense = async () => {
    try {
      const now = new Date();
      // 이번 달
      const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      ).toISOString();
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).toISOString();

      // const currentMonth = await axios.get(
      //   `/api/transaction?type=expense&date_gte=${startOfMonth}&date_lte=${endOfMonth}`
      // );
      const currentMonth = await axios.get('/api/transaction', {
        params: {
          type: 'expense',
          date_gte: startOfMonth,
          date_lte: endOfMonth,
        },
      });
      const currentTotal = currentMonth.data.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      // 저번 달
      const startOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      ).toISOString();
      const endOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        0
      ).toISOString();

      // const lastMonth = await axios.get(
      //   `/api/transaction?type=expense&date_gte=${startOfLastMonth}&date_lte=${endOfLastMonth}`
      // );
      const lastMonth = await axios.get('/api/transaction', {
        params: {
          type: 'expense',
          date_gte: startOfLastMonth,
          date_lte: endOfLastMonth,
        },
      });
      const lastTotal = lastMonth.data.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      lastExpense.value = lastTotal;
      currentExpense.value = currentTotal;
    } catch (error) {
      console.error('에러 발생:', error.message);
    }
  };

  const fetchIncome = async () => {
    try {
      const now = new Date();
      // 이번 달
      const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      ).toISOString();
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).toISOString();

      // const currentMonth = await axios.get(
      //   `/api/transaction?type=income&date_gte=${startOfMonth}&date_lte=${endOfMonth}`
      // );
      const currentMonth = await axios.get('/api/transaction', {
        params: {
          type: 'income',
          date_gte: startOfMonth,
          date_lte: endOfMonth,
        },
      });
      const currentTotal = currentMonth.data.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      // 저번 달
      const startOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      ).toISOString();
      const endOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        0
      ).toISOString();

      // const lastMonth = await axios.get(
      //   `/api/transaction?type=income&date_gte=${startOfLastMonth}&date_lte=${endOfLastMonth}`
      // );
      const lastMonth = await axios.get('/api/transaction', {
        params: {
          type: 'income',
          date_gte: startOfLastMonth,
          date_lte: endOfLastMonth,
        },
      });
      const lastTotal = lastMonth.data.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      lastIncome.value = lastTotal;
      currentIncome.value = currentTotal;
    } catch (error) {
      console.error('에러 발생:', error.message);
    }
  };

  return {
    lastExpense,
    currentExpense,
    lastIncome,
    currentIncome,
    fetchExpense,
    fetchIncome,
  };
});
