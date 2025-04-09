<template>
  <li @click="goToDetail" style="list-style: none; cursor: pointer">
    <!-- 클릭하면 상세 내역 보기 -->
    <span>
      {{ index + 1 }} {{ trans.date }} {{ trans.amount }} {{ trans.category }}
      <button>{{ trans.type === 'income' ? '수입' : '지출' }}</button>
    </span>
  </li>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactionStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const store_trans = useTransactionStore();

const props = defineProps({
  trans: Object,
  index: Number,
});

const goToDetail = () => {
  router.push(`/transaction/${props.trans.id}`);
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
  justify-content: space-between; /* 좌측, 중앙, 우측 정렬 */
  gap: 1rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #4a4a4a;
  font-weight: 500;
  transition: 0.2s;
  width: 100%; /* 버튼 너비를 일정하게 맞추기 */
}

.btn:hover {
  background: #2e7d32;
  color: #fff;
  border-color: #2e7d32;
}

/* 버튼을 각 위치에 배치 */
.left {
  text-align: left;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}
</style>
