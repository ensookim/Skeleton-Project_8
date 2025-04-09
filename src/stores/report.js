import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useReportStore = defineStore('report', () => {
  // state
  const JanExpense = ref();
  const FebExpense = ref();
  const MarExpense = ref();
  const AprExpense = ref();
  const MayExpense = ref();
  const JunExpense = ref();
  const JulExpense = ref();
  const AugExpense = ref();
  const SepExpense = ref();
  const OctExpense = ref();
  const NovExpense = ref();
  const DecExpense = ref();

  const JanIncome = ref();
  const FebIncome = ref();
  const MarIncome = ref();
  const AprIncome = ref();
  const MayIncome = ref();
  const JunIncome = ref();
  const JulIncome = ref();
  const AugIncome = ref();
  const SepIncome = ref();
  const OctIncome = ref();
  const NovIncome = ref();
  const DecIncome = ref();

  // getter

  // action
  const fetchExpense = async () => {
    try {
      const now = new Date();
      const months = [
        'JanExpense',
        'FebExpense',
        'MarExpense',
        'AprExpense',
        'MayExpense',
        'JunExpense',
        'JulExpense',
        'AugExpense',
        'SepExpense',
        'OctExpense',
        'NovExpense',
        'DecExpense',
      ];

      for (let i = 0; i < 12; i++) {
        const startOfMonth = new Date(now.getFullYear(), i, 1).toISOString();
        const endOfMonth = new Date(now.getFullYear(), i + 1, 0).toISOString();

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

        eval(`${months[i]}.value = currentTotal`);
        console.log(`${months[i]}:`, eval(months[i]).value);
      }
    } catch (error) {
      console.error('에러 발생:', error.message);
    }
  };

  const fetchIncome = async () => {
    try {
      const now = new Date();
      const months = [
        'JanIncome',
        'FebIncome',
        'MarIncome',
        'AprIncome',
        'MayIncome',
        'JunIncome',
        'JulIncome',
        'AugIncome',
        'SepIncome',
        'OctIncome',
        'NovIncome',
        'DecIncome',
      ];

      for (let i = 0; i < 12; i++) {
        const startOfMonth = new Date(now.getFullYear(), i, 1).toISOString();
        const endOfMonth = new Date(now.getFullYear(), i + 1, 0).toISOString();

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

        eval(`${months[i]}.value = currentTotal`);
        console.log(`${months[i]}:`, eval(months[i]).value);
      }
    } catch (error) {
      console.error('에러 발생:', error.message);
    }
  };

  return {
    JanExpense,
    FebExpense,
    MarExpense,
    AprExpense,
    MayExpense,
    JunExpense,
    JulExpense,
    AugExpense,
    SepExpense,
    OctExpense,
    NovExpense,
    DecExpense,
    JanIncome,
    FebIncome,
    MarIncome,
    AprIncome,
    MayIncome,
    JunIncome,
    JulIncome,
    AugIncome,
    SepIncome,
    OctIncome,
    NovIncome,
    DecIncome,
    fetchIncome,
    fetchExpense,
  };
});
