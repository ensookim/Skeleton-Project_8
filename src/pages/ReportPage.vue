<template>
  <MonthlyReport />
  <CategoryReport />
  <YearReport />
</template>

<script setup>
import CategoryReport from '@/components/CategoryReport.vue';
import MonthlyReport from '@/components/MonthlyReport.vue';
import YearReport from '@/components/YearReport.vue';
import { useCategoryStore } from '@/stores/categoryStore';

const categoryStore = useCategoryStore();
categoryStore.fetchCategories();
</script>

<style scoped></style>
