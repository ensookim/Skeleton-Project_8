<template>
  <div>
    <Header />
    <MonthlyReport />
    <TransactionPage />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import MonthlyReport from './components/MonthlyReport.vue';
import TransactionPage from './views/TransactionPage.vue';
</script>

<style scoped></style>
