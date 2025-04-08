<template>
  <div>
    <Header />
    <!-- <MonthlyReport />
    <TransactionPage /> -->
    <router-link :to="{ name: 'TransactionPage' }">홈페이지</router-link>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style scoped></style>
