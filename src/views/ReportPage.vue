<template>
  <MonthlyReport />
  <Report />
</template>

<script setup>
import MonthlyReport from '@/components/MonthlyReport.vue';
import Report from '@/components/Report.vue';
import { useCategoryStore } from '@/stores/categoryStore';

const categoryStore = useCategoryStore();
categoryStore.fetchCategories();
</script>

<style scoped></style>
