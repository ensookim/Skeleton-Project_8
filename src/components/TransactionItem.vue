<template>
  <li
    @click="store_trans.goToDetail(trans.id)"
    style="list-style: none; cursor: pointer"
  >
    <!-- 클릭하면 상세 내역 보기 -->
    <span>
      {{ index + 1 }} {{ trans.date }} {{ trans.amount }} {{ trans.category }}
      <button>{{ trans.type === 'income' ? '수입' : '지출' }}</button>
    </span>
  </li>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactionStore';

const store_trans = useTransactionStore();

const props = defineProps({
  trans: Object,
  index: Number,
});
</script>

<style scoped src="@/assets/common.css"></style>
