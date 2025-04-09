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

<style scoped src="@/assets/common.css"></style>
