<template>
  <div class="container" v-if="transaction">
    <h2>상세 내역</h2>
    <div class="form-group">날짜: {{ transaction.date }}</div>
    <div class="form-group">
      유형:
      {{ transaction.type === 'income' ? '수입' : '지출' }}
    </div>
    <div class="form-group">카테고리: {{ transaction.category }}</div>
    <div class="form-group">금액: {{ transaction.amount }} 원</div>
    <div class="form-group">메모: {{ transaction.memo }}</div>
    <div class="form-group">
      정기적인가요?
      {{ transaction.isPeriodic ? '예' : '아니오' }}
    </div>

    <div class="btn-wrap">
      <button class="btn left" @click="goBack">뒤로가기</button>
      <button class="btn left" @click="editTransaction">수정하기</button>
      <button class="btn right" @click="deleteTransaction">삭제하기</button>
    </div>
  </div>

  <div v-else class="not-found">
    <div class="form-group">해당 거래 내역을 찾을 수 없습니다.</div>
    <button class="btn left" @click="goBack">뒤로가기</button>
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

// 거래 상세 정보 불러오기
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

// 뒤로가기
const goBack = () => {
  router.back();
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

p {
  color: rgb(111, 222, 111);
}

.btn-wrap {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}
.btn {
  padding: 0.8rem 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #4a4a4a;
  font-weight: 500;
  transition: 0.2s;
  width: 100%;
}

.btn:hover {
  background: #2e7d32;
  color: #fff;
  border-color: #2e7d32;
}
</style>
