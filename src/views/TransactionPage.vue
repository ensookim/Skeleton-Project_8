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
        <div class="form-check me-2">
          <input
            type="radio"
            class="form-check-input"
            id="radio4"
            name="category"
            value="custom"
            v-model="selectedDateRange"
          />
          <label class="form-check-label" for="radio4">직접 입력</label>
        </div>
      </form>
      <!-- 직접 선택 선택시 보이는 시작일 종료일 -->
      <div
        v-if="selectedDateRange === 'custom'"
        class="d-flex align-items-center ms-3 mt-2 mb-3"
      >
        <label class="me-2 fw-bold">시작일: </label>
        <input
          type="date"
          v-model="customStartDate"
          class="form-control me-3"
          style="width: 200px"
        />

        <label class="me-2 fw-bold">종료일: </label>
        <input
          type="date"
          v-model="customEndDate"
          class="form-control"
          style="width: 200px"
        />
      </div>

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
    <button @click="goToAddPage" class="action-button mb-4">추가하기</button>
    <ul class="history-list">
      <li class="item header">
        <span class="col no">No.</span>
        <span class="col date">날짜</span>
        <span class="col amount">금액</span>
        <span class="col memo">메모</span>
        <span class="col type">유형</span>
      </li>
      <TransactionItem
        v-for="(trans, index) in paginationTransactions"
        :key="trans.id"
        :trans="trans"
        :index="index"
        @click="openModal"
      />
    </ul>
    <TransactionDetailModal
      v-if="selectedTransaction"
      :trans="selectedTransaction"
      @close="closeModal"
    />
    <nav class="d-flex mt-3 mb-3 justify-content-center">
      <ul class="pagination">
        <!-- 이전 그룹 -->
        <li
          class="page-item"
          :class="{ disabled: currentPageGroup.value === 0 }"
        >
          <button class="page-link" @click="goToPrevGroup">&laquo;</button>
        </li>
        <!-- 현재 그룹 페이지 번호 -->
        <li
          class="page-item"
          v-for="page in visiblePages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <!-- 다음 그룹 -->
        <li
          class="page-item"
          :class="{
            disabled:
              (currentPageGroup.value + 1) * pagesPerGroup >= totalPages.value,
          }"
        >
          <button class="page-link" @click="goToNextGroup">&raquo;</button>
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
import TransactionDetailModal from '@/components/TransactionDetailModal.vue';

const router = useRouter();
const store = useTransactionStore();

store.fetchTransactions();

const categoryStore = useCategoryStore();
categoryStore.fetchCategories();

const { transactions } = storeToRefs(store);
const { incomeCategory, expenseCategory } = storeToRefs(categoryStore);

const selectedIncomeCategories = ref([]);
const selectedExpenseCategories = ref([]);
// 직접 입력한 시작일, 종료일 기본값 오늘
const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD' 형태
const customStartDate = ref(today);
const customEndDate = ref(today);

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
    return { start: new Date(now.setDate(now.getDate() - 7)), end: new Date() };
  } else if (selectedDateRange.value === 'option2') {
    // 최근 1개월
    return {
      start: new Date(now.setMonth(now.getMonth() - 1)),
      end: new Date(),
    };
  } else if (selectedDateRange.value === 'option3') {
    // 최근 3개월
    return {
      start: new Date(now.setMonth(now.getMonth() - 3)),
      end: new Date(),
    };
  } else if (selectedDateRange.value === 'custom') {
    // 직접 입력한 시작일, 종료일
    if (customStartDate.value && customEndDate.value) {
      return {
        start: new Date(customStartDate.value),
        end: new Date(customEndDate.value),
      };
    } else {
      return null;
    }
  }
  return null;
};

// 필터링된 거래 내역
const filteredTransactions = computed(() => {
  const dateRange = getDateRange();

  return transactions.value.filter((transaction) => {
    //날짜 필터
    const transactionDate = new Date(transaction.date);
    const isDateMatch =
      dateRange && dateRange.start && dateRange.end
        ? transactionDate >= dateRange.start && transactionDate <= dateRange.end
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
// 최대 페이지 수 10개
const pagesPerGroup = 10;

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

//Math.floor 버림 함수
const currentPageGroup = computed(() =>
  Math.floor((currentPage.value - 1) / pagesPerGroup)
);
// 페이지 그룹
const visiblePages = computed(() => {
  const start = currentPageGroup.value * pagesPerGroup + 1;
  const end = Math.min(start + pagesPerGroup - 1, totalPages.value);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// 페이지 이동
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

// 이전 페이지 그룹
function goToPrevGroup() {
  const prevGroupStart = (currentPageGroup.value - 1) * pagesPerGroup + 1;
  if (prevGroupStart >= 1) {
    currentPage.value = prevGroupStart;
  }
}
// 다음 페이지 그룹
function goToNextGroup() {
  const nextGroupStart = (currentPageGroup.value + 1) * pagesPerGroup + 1;
  if (nextGroupStart <= totalPages.value) {
    currentPage.value = nextGroupStart;
  }
}

// 페이지 수 변경되면 1 페이지로 지정
watch([filteredTransactions, totalPages], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
});

const selectedTransaction = ref(null);

function openModal(trans) {
  selectedTransaction.value = trans;
}
function closeModal() {
  selectedTransaction.value = null;
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
.memo {
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
.action-button {
  padding: 10px 24px;
  border-radius: 9999px;
  background-color: #fff;
  font-weight: bold;
  color: #4f46e5;
  border: 1px solid #d1d5db;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.action-button:hover {
  background-color: #f3f4f6;
}
</style>
