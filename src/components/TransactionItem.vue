<template>
  <li style="list-style: none">
    <!-- 클릭하면 상세 내역 보기 -->
    <span>
      {{ index + 1 }} {{ trans.date }} {{ trans.amount }} {{ trans.category }}
    </span>
  </li>
</template>

<script setup>
defineProps(['trans', 'index']);
</script>

<style scoped></style>
