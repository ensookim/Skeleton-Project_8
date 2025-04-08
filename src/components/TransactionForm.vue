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

  <!-- 이부분 어려워요ㅠㅠ-->
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
    <button>{{ isEdit ? '수정하기' : '추가하기' }}</button>
    <button v-if="isEdit" @click="onDelete">삭제하기</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore';

const router = useRouter();
const props = defineProps({
  isEdit: Boolean,
  form: Object,
});

const incomeCategory = categoryStore.incomeCategory;
const expenseCategory = categoryStore.expenseCategory;

// 수입, 지출에 따른 카테고리 변화
const filteredCategories = computed(() =>
  props.form.type === 'income'
    ? categoryStore.incomeCategory
    : categoryStore.expenseCategory
);

// transactionStore.js 임포트해서 가져와야댐댐
// const deleteTransaction = (id) => {
//   transcationStore.deleteTransaction({ id });
// };

//추가하기 삭제하기
const switchButton = async () => {
  if (props.isEdit) {
    await transactionStore.updateTransaction(props.form);
  }
};
</script>
