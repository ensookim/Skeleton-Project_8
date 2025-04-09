<template>
  <div class="m-5 card rounded-4 p-4 shadow">
    <div class="clearfix">
      <h1 class="mb-4 fw-bold float-start">
        <i class="fa-solid fa-list"></i> 전체 내역
      </h1>
    </div>

    <!-- Filter -->
    <div class="container-fluid p-1">
      <h5 class="fw-bold mb-3" style="color: #22c55e">
        <i class="fa-solid fa-circle-check"></i> 거래 기간 선택
      </h5>
      <!-- 날짜 선택 radio -->
      <form class="d-flex ms-3 mb-4">
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
      <form class="mb-4">
        <h5 class="fw-bold mb-3" style="color: #22c55e">
          <i class="fa-solid fa-circle-check"></i> 거래 카테고리 선택
        </h5>

        <div class="d-flex">
          <div>
            <span class="fw-bold mt-4 mb-3">수입 카테고리</span>
            <div class="d-flex flex-row mt-1 mb-2">
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
                <label class="form-check-label me-3" :for="'income-' + index">
                  {{ category }}
                </label>
              </div>
            </div>
          </div>

          <div class="ms-5">
            <span class="fw-bold">지출 카테고리</span>
            <div class="d-flex flex-row mt-1 mb-2">
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
                <label class="form-check-label me-3" :for="'expense-' + index">
                  {{ category }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <button @click="goToAddPage" class="btn">추가하기</button>
    <ul class="history-list">
      <li class="item header">
        <span class="col no">No.</span>
        <span class="col date">날짜</span>
        <span class="col amount">금액</span>
        <span class="col category">카테고리</span>
        <span class="col type">유형</span>
      </li>
      <TransactionItem
        v-for="(trans, index) in paginationTransactions"
        :key="trans.id"
        :trans="trans"
        :index="index"
      />
    </ul>
    <nav class="d-flex mt-3 mb-3 justify-content-center">
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
    const isDateMatch = dateRange
      ? transactionDate >= dateRange && transactionDate <= new Date()
      : true;

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

<style>
input[type='checkbox'] {
  accent-color: green;
}
.history-list {
  padding: 0;
  margin: 0;
  flex-grow: 1;
  list-style: none;
}
.header {
  display: flex;
  padding: 10px 16px;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
}
.item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}
.col {
  display: inline-block;
  padding: 0 8px;
  font-size: 0.95rem;
}
.no {
  width: 40px;
}
.date {
  width: 100px;
}
.amount {
  width: 100px;
}
.category {
  width: 120px;
}
.type {
  width: 80px;
}
.btn-wrap {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #4a4a4a;
  font-weight: 500;
  text-align: center;
  transition: 0.2s;
  width: 100%;
}

.btn:hover {
  background: #0d6efd;
  color: #fff;
  border-color: #0d6efd;
}
</style>
