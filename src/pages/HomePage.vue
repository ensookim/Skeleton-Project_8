<template>
  <MonthlyReport />
  <RecentHistory />
  <TransactionDetailModal
    v-if="route.query.id"
    :trans="store.transactions.find((t) => t.id === route.query.id)"
    @close="router.push({ query: { ...route.query, id: undefined } })"
  />
</template>

<script setup>
import MonthlyReport from '@/components/MonthlyReport.vue';
import RecentHistory from '@/components/RecentHistory.vue';
import TransactionDetailModal from '@/components/TransactionDetailModal.vue';
import { useRoute, useRouter } from 'vue-router';
import { useTransactionStore } from '@/stores/transactionStore';
const store = useTransactionStore();

const route = useRoute();
const router = useRouter();
</script>

<style scoped></style>
