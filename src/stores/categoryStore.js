import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useCategoryStore = defineStore('categoryStore', () => {
  const incomeCategory = ref([]);
  const expenseCategory = ref([]);

  //카테고리 가져오기
  const fetchCategories = async () => {
    try {
      const incomeReseponse = await axios.get('/api/incomeCategory');
      const expenseResponse = await axios.get('/api/expenseCategory');
      incomeCategory.value = incomeReseponse.data[0].name;
      expenseCategory.value = expenseResponse.data[0].name;
    } catch (error) {
      console.error('카테고리 로딩 실패:', error);
    }
  };

  // 타입에 따라 카테고리 반환!(수입, 지출)
  const getCategoryByType = computed(() => {
    return (type) =>
      type === 'income' ? incomeCategory.value : expenseCategory.value;
  });

  return {
    incomeCategory,
    expenseCategory,
    getCategoryByType,
    fetchCategories,
  };
});
