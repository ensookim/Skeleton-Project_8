import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    incomeCategory: ['기타', '용돈', '월급', '이자'],
    expenseCategory: [
      '공과금',
      '교통비',
      '문화생활',
      '쇼핑',
      '식비',
      '정기구독',
    ],
  }),

  getters: {
    getCategoryByType: (state) => {
      return (type) => {
        return type === 'income' ? state.incomeCategory : state.expenseCategory;
      };
    },
  },
});
