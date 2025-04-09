<template>
  <div class="container py-5" v-if="transaction">
    <div class="card shadow p-4">
      <h3 class="text-center mb-4">📄 상세 내역</h3>

      <ul class="list-group list-group-flush mb-3">
        <li class="list-group-item">
          <strong>날짜 : </strong> {{ transaction.date }}
        </li>
        <li class="list-group-item">
          <strong>유형 : </strong>
          <span
            :class="
              transaction.type === 'income' ? 'text-success' : 'text-danger'
            "
          >
            {{ transaction.type === 'income' ? '수입' : '지출' }}
          </span>
        </li>
        <li class="list-group-item">
          <strong>카테고리 : </strong> {{ transaction.category }}
        </li>
        <li class="list-group-item">
          <strong>금액 : </strong>
          <span
            :class="
              transaction.type === 'income' ? 'text-success' : 'text-danger'
            "
          >
            {{ transaction.amount.toLocaleString() }} 원
          </span>
        </li>
        <li class="list-group-item">
          <strong>메모 : </strong> {{ transaction.memo || '-' }}
        </li>
        <li class="list-group-item">
          <strong>정기적인가요?</strong>
          {{ transaction.isPeriodic ? '예' : '아니오' }}
        </li>
      </ul>

      <div class="d-flex justify-content-start gap-2 mt-4">
        <button class="btn btn-outline-secondary" @click="goBack">
          뒤로가기
        </button>
        <button class="btn btn-primary" @click="editTransaction">
          수정하기
        </button>
        <button class="btn btn-danger" @click="deleteTransaction">
          삭제하기
        </button>
      </div>
    </div>
  </div>

  <div v-else class="container py-5">
    <div class="card shadow p-4 text-center">
      <h5>해당 거래 내역을 찾을 수 없습니다.</h5>
      <button class="btn btn-outline-secondary mt-3" @click="goBack">
        뒤로가기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const store = useTransactionStore();
const { transactions } = storeToRefs(store);

const transactionId = route.params.id;
const transaction = ref(null);

onMounted(async () => {
  await store.fetchTransactions();
  transaction.value = transactions.value.find(
    (trans) => String(trans.id) === String(transactionId)
  );
});

const editTransaction = () => {
  router.push(`/transaction/edit/${transactionId}`);
};

const deleteTransaction = async () => {
  if (!transaction.value) return;
  await store.deleteTransaction(transaction.value.id);
  router.push('/transaction');
};

const goBack = () => {
  router.back();
};
</script>
