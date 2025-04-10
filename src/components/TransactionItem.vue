<template>
  <li class="item" @click="$emit('click', trans)">
    <span class="col no">{{ index + 1 }}</span>
    <span class="col date">{{ formattedDate }}</span>
    <span
      class="col amount"
      :class="trans.type === 'income' ? 'text-success' : 'text-danger'"
    >
      {{ formattedAmount }}
    </span>
    <span class="col category">{{ trans.category }}</span>
    <span class="col type">
      <span :class="['badge', trans.type]">
        {{ trans.type === 'income' ? '수입' : '지출' }}
      </span>
    </span>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps({
  trans: Object,
  index: Number,
});

const emit = defineEmits(['click']);
// 삭제 예정
// const router = useRouter();
// const goToDetail = () => {
//   router.push(`/transaction/${props.trans.id}`);
// };

const formattedDate = computed(() =>
  new Date(props.trans.date).toLocaleDateString('ko-KR')
);

const formattedAmount = computed(
  () => props.trans.amount.toLocaleString('ko-KR') + '원'
);
</script>

<style scoped>
.item {
  display: flex;
  padding: 10px 0px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}
.item:hover {
  background-color: #f8f9fa;
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
  font-weight: bold;
}
.category {
  width: 120px;
}
.type {
  width: 80px;
}
.badge {
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.85rem;
}
.income {
  background-color: #a5e6d7;
  color: #198754;
}
.expense {
  background-color: #ffc3c3;
  color: #dc3545;
}
</style>
