<template>
  <div class="card p-4 shadow-sm">
    <h2 class="mb-3">{{ isEdit ? '내역 수정하기' : '내역 추가하기' }}</h2>

    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label">날짜</label>
        <input type="date" v-model="form.date" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">금액</label>
        <input
          type="number"
          v-model="form.amount"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">거래 유형</label>
        <select v-model="form.type" class="form-select">
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">카테고리</label>
        <select v-model="form.category" class="form-select">
          <option v-for="item in filteredCategories" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">정기적인가요?</label>
        <select v-model="form.isPeriodic" class="form-select">
          <option :value="true">예</option>
          <option :value="false">아니오</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">메모</label>
        <textarea v-model="form.memo" class="form-control" rows="3"></textarea>
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-success" type="submit">
          {{ isEdit ? '수정하기' : '추가하기' }}
        </button>
        <button
          v-if="isEdit"
          class="btn btn-danger"
          type="button"
          @click="onDelete"
        >
          삭제하기
        </button>
        <button class="btn btn-secondary" type="button" @click="goBack">
          뒤로가기
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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

const onSubmit = async () => {
  const emptyFields = [];
  if (!props.form.date) emptyFields.push('날짜');
  if (!props.form.amount) emptyFields.push('금액');
  if (!props.form.category) emptyFields.push('카테고리');

  if (emptyFields.length > 0) {
    alert(`${emptyFields.join(', ')}를(을) 채워주세요!`);
    return;
  }

  if (props.form.amount <= 0) {
    alert('금액은 0보다 커야합니다!');
    return;
  }

  if (props.isEdit) {
    if (!props.form.id) {
      console.error('수정인데 form.id가 없습니다!', props.form);
      return;
    }
    // await transactionStore.updateTransaction(props.form);
    // router.push(`/transaction/${props.form.id}`); // 수정 후 상세페이지로
    await transactionStore.updateTransaction(props.form);
    router.push('/transaction'); // 상세 페이지 안 타고 그냥 목록으로
  } else {
    await transactionStore.addTransaction(props.form);
    router.push('/transaction'); // 추가 후 전체 목록으로
  }
};

const onDelete = async () => {
  if (!props.form.id) {
    console.error('삭제하려는 거래에 id가 없습니다!', props.form);
    return;
  }
  const confirmDelete = confirm('정말 삭제하시겠습니까?');
  if (!confirmDelete) return;

  await transactionStore.deleteTransaction(props.form.id);
  router.push('/transaction'); // 삭제 후 목록으로
};

// const goBack = () => {
//   router.back();
// };
const route = useRoute();

const goBack = () => {
  if (route.query.from === 'home') {
    router.push({ path: '/', query: {} }); // 홈이면 모달 없이 돌아가도록
  } else {
    router.push('/transaction'); // 그 외엔 전체 내역으로
  }
};
</script>
