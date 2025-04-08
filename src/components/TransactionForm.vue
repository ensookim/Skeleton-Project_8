<!--  ADD, EDIT FORM 입니다 -->

<template>
  <h2>{{ isEdit ? '내역 수정하기' : '내역 추가하기' }}</h2>
  <p>Transcation Detail</p>
  <!--  날짜 달력으로 사라락 -->
  <div class="form-group">
    <label>날짜</label>
    <input type="date" v-model="form.date" required />
  </div>

  <div class="form-group">
    <label>금액</label>
    <input type="number" v-model="form.amount" required />
  </div>

  <!-- 거래 유형이 카테고리보다 위에 있어야함 -->
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

  <div class="button-group">
    <button @click="onSubmit">
      {{ isEdit ? '수정하기' : '추가하기' }}
    </button>
    <button v-if="isEdit" @click="onDelete">삭제하기</button>
    <button @click="goBack">뒤로가기</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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
//마운트하면서 카테고리 불러옴
onMounted(() => {
  categoryStore.fetchCategories();
});

const filteredCategories = computed(() => {
  return categoryStore.getCategoryByType(props.form.type);
});

//수정하기 추가하기
const onSubmit = async () => {
  if (props.isEdit) {
    await transactionStore.updateTransaction(props.form);
  } else {
    await transactionStore.addTransaction(props.form);
  }

  router.push('/transaction');
};

//삭제하기 -> 목록페이지
const onDelete = async () => {
  await transactionStore.deleteTransaction(props.form.id);
  router.push('/transaction');
};
// 뒤로가기
const goBack = () => {
  router.back();
};

// import { ref } from 'vue';

// const isEdit = ref(false);
// const form = ref({
//   date: '',
//   amount: 0,
//   type: 'income',
//   category: '공과금',
//   isPeriodic: false,
//   memo: 'ㅎㅇㅎㅇ',
// });
</script>
