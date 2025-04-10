<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-container">
      <div class="card shadow p-4 rounded-4">
        <h3 class="mb-4">📄 상세 내역</h3>

        <ul class="list-group list-group-flush mb-3">
          <li class="list-group-item">
            <strong>날짜 : </strong> {{ trans.date }}
          </li>
          <li class="list-group-item">
            <strong>유형 : </strong>
            <span
              :class="trans.type === 'income' ? 'text-success' : 'text-danger'"
            >
              {{ trans.type === 'income' ? '수입' : '지출' }}
            </span>
          </li>
          <li class="list-group-item">
            <strong>카테고리 : </strong> {{ trans.category }}
          </li>
          <li class="list-group-item">
            <strong>금액 : </strong>
            <span
              :class="trans.type === 'income' ? 'text-success' : 'text-danger'"
            >
              {{ trans.amount.toLocaleString() }} 원
            </span>
          </li>
          <li class="list-group-item">
            <strong>메모 : </strong> {{ trans.memo || '-' }}
          </li>
          <li class="list-group-item">
            <strong>정기적인가요?</strong>
            {{ trans.isPeriodic ? '예' : '아니오' }}
          </li>
        </ul>

        <div class="d-flex justify-content-end gap-2 mt-4">
          <button class="btn btn-outline-secondary" @click="close">닫기</button>
          <button class="btn btn-primary" @click="edit">수정하기</button>
          <button class="btn btn-danger" @click="del">삭제하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useTransactionStore } from '@/stores/transactionStore';

const props = defineProps({
  trans: Object,
});
const emit = defineEmits(['close']);
const router = useRouter();
const store = useTransactionStore();

function close() {
  emit('close');
}

function edit() {
  router.push(`/transaction/edit/${props.trans.id}`);
}

async function del() {
  await store.deleteTransaction(props.trans.id);
  close();
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-container {
  background: white;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
