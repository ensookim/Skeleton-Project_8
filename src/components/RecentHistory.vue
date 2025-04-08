<template>
  <div>
    <h1>최근 거래 내역</h1>
    <button @click="goToAdd">추가하기</button>
    <button @click="goToTransaction">더보기</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore';

const store = useCategoryStore();

const router = useRouter();
const goToAdd = () => {
  router.push('/transaction/add');
};
const goToTransaction = () => {
  router.push('/transaction');
};
</script>

<style scoped></style>
