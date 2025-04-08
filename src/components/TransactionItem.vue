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
import { useRouter } from 'vue-router';

const props = defineProps({
  trans: Object,
  index: Number,
});

const router = useRouter();

const goToDetail = () => {
  router.push(`/transaction/${props.trans.id}`);
};
</script>

<style scoped></style>
