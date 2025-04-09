<template>
  <div>
    <span>전체 내역</span>
    <button @click="goToAdd">추가하기</button>
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
import { ref, computed } from 'vue';

const router = useRouter();

const store = useTransactionStore();
store.fetchTransactions();

const { transactions } = storeToRefs(store);

// 페이징 관련
const currentPage = ref(1);
const itemsPerPage = 10;

// Math.ceil 올림 함수 transaction 갯수 / 10 으로 페이지 수 정함
const totalPages = computed(() =>
  Math.ceil(transactions.value.length / itemsPerPage)
);
// 페이지에 따른 가계부 내역
const paginationTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage; // 1 페이지 0부터 2 페이지 10부터
  const end = start + itemsPerPage;
  // slice end 값 미포함
  return transactions.value.slice(start, end);
});

// 페이지 이동
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

const goToAdd = () => {
  router.push('/transaction/add');
};
</script>

<style scoped></style>
