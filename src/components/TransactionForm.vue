<!-- TransactionForm.vue -->

<template>
  <div class="container">
    <h2>{{ isEdit ? '내역 수정하기' : '내역 추가하기' }}</h2>
    <p>Transaction Detail</p>

    <div class="form-group">
      <label>날짜</label>
      <input type="date" v-model="form.date" required />
    </div>

    <div class="form-group">
      <label>금액</label>
      <input type="number" v-model="form.amount" required />
    </div>

    <div class="form-group">
      <label>거래 유형</label>
      <select v-model="form.type">
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>

    <div class="form-group">
      <label>카테고리</label>
      <select v-model="form.category">
        <option v-for="index in filteredCategories" :key="index" :value="index">
          {{ index }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label>정기적인가요?</label>
      <select v-model="form.isPeriodic">
        <option :value="true">예</option>
        <option :value="false">아니오</option>
      </select>
    </div>

    <div class="form-group">
      <label>메모</label>
      <textarea
        v-model="form.memo"
        rows="3"
        placeholder="추가 메모가 있다면 입력해주세요"
      />
    </div>

    <div class="btn-wrap">
      <button class="btn left" @click="onSubmit">
        {{ isEdit ? '수정하기' : '추가하기' }}
      </button>
      <button v-if="isEdit" class="btn center" @click="onDelete">
        삭제하기
      </button>
      <button class="btn right" @click="goBack">뒤로가기</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore';
import { useTransactionStore } from '@/stores/transactionStore';

const router = useRouter();
const categoryStore = useCategoryStore();
const transactionStore = useTransactionStore();

const props = defineProps({
  isEdit: Boolean,
  form: Object,
});

onMounted(() => {
  categoryStore.fetchCategories();
});

const filteredCategories = computed(() =>
  categoryStore.getCategoryByType(props.form.type)
);

// 추가 or 확인 + 유효성 검사
const onSubmit = async () => {
  const emptyFields = [];

  if (!props.form.date) emptyFields.push('날짜');
  if (!props.form.amount) emptyFields.push('금액');
  if (!props.form.category) emptyFields.push('카테고리');

  //빈칸 발견시
  if (emptyFields.length > 0) {
    alert(`${emptyFields.join(', ')}를(을) 채워주세요!`);
    return;
  }
  // 금액 0 이하
  if (props.form.amount <= 0) {
    alert('금액은 0보다 커야합니다!');
    return;
  }
  if (props.isEdit) {
    if (!props.form.id) {
      console.error('수정인데 form.id가 없습니다!', props.form);
      return;
    }
    await transactionStore.updateTransaction(props.form);
  } else {
    await transactionStore.addTransaction(props.form);
  }

  router.push('/transaction');
};

// 삭제
const onDelete = async () => {
  if (!props.form.id) {
    console.error('삭제하려는 거래에 id가 없습니다!', props.form);
    return;
  }
  await transactionStore.deleteTransaction(props.form.id);
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
