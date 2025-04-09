<template>
  <div class="app-wrapper">
    <Header />
    <router-view />
  </div>
  <Footer />
</template>
<script setup>
import Header from '@/components/Header.vue';
import Footer from './components/Footer.vue';
</script>
<style src="@/assets/base.css"></style>
