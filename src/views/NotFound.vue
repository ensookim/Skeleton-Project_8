<template>
  <div class="not-found">
    <h2>Error Code (404)</h2>
    <h3>Page Not Found</h3>
    <router-link to="/">Back</router-link>
  </div>
</template>
<script setup></script>
<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
  color: #333;
}

.not-found h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.not-found a {
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
}
</style>
