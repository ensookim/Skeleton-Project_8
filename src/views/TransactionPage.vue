<template>
  <div>
    <span>전체 내역</span>
    <button @click="goToAddPage">추가하기</button>

    <!-- Filter -->
    <div class="container mt-3 p-1">
      <!-- 날짜 선택 radio -->
      <form class="d-flex">
        <div class="form-check me-2">
          <input
            type="radio"
            class="form-check-input"
            id="radio1"
            name="category"
            value="option1"
            v-model="selectedDateRange"
            checked
          />
          <label class="form-check-label" for="radio1">최근 1주일</label>
        </div>
        <div class="form-check me-2">
          <input
            type="radio"
            class="form-check-input"
            id="radio2"
            name="category"
            value="option2"
            v-model="selectedDateRange"
          />
          <label class="form-check-label" for="radio2">최근 1개월</label>
        </div>
        <div class="form-check me-2">
          <input
            type="radio"
            class="form-check-input"
            id="radio3"
            name="category"
            value="option3"
            v-model="selectedDateRange"
          />
          <label class="form-check-label" for="radio3">최근 3개월</label>
        </div>
      </form>

      <!-- 카테고리 선택 select -->
      <!-- <form>
        <select
          class="form-select me-2"
          id="incomeCategory"
          name="incomeCategory"
          v-model="selectedIncomeCategory"
        >
          <option disabled selected>수입 카테고리 선택</option>
          <option
            v-for="(category, index) in incomeCategory[0]"
            :key="index"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <select
          class="form-select"
          id="expenseCategory"
          name="expenseCategory"
          v-model="selectedExpenseCategory"
        >
          <option disabled selected>지출 카테고리 선택</option>
          <option
            v-for="category in expenseCategory[0]"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </form> -->

      <!-- 카테고리 선택 checkbox -->
      <form>
        <div>
          <span>수입 카테고리</span>
          <div class="d-flex flex-row">
            <div
              v-for="(category, index) in incomeCategory"
              :key="'income-' + index"
              class="form-check"
            >
              <input
                type="checkbox"
                class="form-check-input"
                :id="'income-' + index"
                :value="category"
                v-model="selectedIncomeCategories"
              />
              <label class="form-check-label" :for="'income-' + index">
                {{ category }}
              </label>
            </div>
          </div>
        </div>

        <div>
          <span>지출 카테고리</span>
          <div class="d-flex flex-row">
            <div
              v-for="(category, index) in expenseCategory"
              :key="'expense-' + index"
              class="form-check"
            >
              <input
                type="checkbox"
                class="form-check-input"
                :id="'expense-' + index"
                :value="category"
                v-model="selectedExpenseCategories"
              />
              <label class="form-check-label" :for="'expense-' + index">
                {{ category }}
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>

    <TransactionItem
      v-for="(trans, index) in paginationTransactions"
      :key="trans.id"
      :trans="trans"
      :index="index"
    />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button
            class="page-link"
            aria-label="Previous"
            @click="goToPage(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item">
          <button
            class="page-link"
            aria-label="Next"
            @click="goToPage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import TransactionItem from '@/components/TransactionItem.vue';
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore';

const router = useRouter();
const store = useTransactionStore();

store.fetchTransactions();

const categoryStore = useCategoryStore();
categoryStore.fetchCategories();

const { transactions } = storeToRefs(store);
const { incomeCategory, expenseCategory } = storeToRefs(categoryStore);

const selectedIncomeCategories = ref([]);
const selectedExpenseCategories = ref([]);
const selectedDateRange = ref('option1'); // 기본값: 최근 1주일

// 카테고리 데이터가 로드된 후 초기화
watch(
  [incomeCategory, expenseCategory],
  ([newIncomeCategory, newExpenseCategory]) => {
    if (newIncomeCategory) {
      selectedIncomeCategories.value = [...newIncomeCategory];
    }
    if (newExpenseCategory) {
      selectedExpenseCategories.value = [...newExpenseCategory];
    }
  },
  { immediate: true } // 컴포넌트 로드 시에도 실행
);

// 날짜 필터 계산
const getDateRange = () => {
  const now = new Date();
  if (selectedDateRange.value === 'option1') {
    // 최근 1주일
    return new Date(now.setDate(now.getDate() - 7));
  } else if (selectedDateRange.value === 'option2') {
    // 최근 1개월
    return new Date(now.setMonth(now.getMonth() - 1));
  } else if (selectedDateRange.value === 'option3') {
    // 최근 3개월
    return new Date(now.setMonth(now.getMonth() - 3));
  }
  return null;
};

// 필터링된 거래 내역
const filteredTransactions = computed(() => {
  const dateRange = getDateRange();

  return transactions.value.filter((transaction) => {
    // 날짜 필터
    const transactionDate = new Date(transaction.date);
    const isDateMatch = dateRange ? transactionDate >= dateRange : true;

    // 카테고리 필터
    const isIncomeCategoryMatch = selectedIncomeCategories.value.includes(
      transaction.category
    );
    const isExpenseCategoryMatch = selectedExpenseCategories.value.includes(
      transaction.category
    );

    return isDateMatch && (isIncomeCategoryMatch || isExpenseCategoryMatch);
  });
});

// 페이징 관련
const currentPage = ref(1);
const itemsPerPage = 10;

// Math.ceil 올림 함수 transaction 갯수 / 10 으로 페이지 수 정함
const totalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / itemsPerPage)
);
// 페이지에 따른 가계부 내역
const paginationTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage; // 1 페이지 0부터 2 페이지 10부터
  const end = start + itemsPerPage;
  // slice end 값 미포함
  return filteredTransactions.value.slice(start, end);
});

// 페이지 이동
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

const goToAddPage = () => {
  router.push('/transaction/add');
};
</script>

<style scoped></style>
