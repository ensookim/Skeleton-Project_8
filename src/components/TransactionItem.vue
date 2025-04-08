<template>
  <li style="list-style: none">
    <!-- 클릭하면 상세 내역 보기 -->
    <span>
      {{ index + 1 }} {{ trans.date }} {{ trans.amount }} {{ trans.category }}
      <button>{{ trans.type === 'income' ? '수입' : '지출' }}</button>
    </span>
  </li>
</template>

<script setup>
defineProps(['trans', 'index']);
</script>

<style scoped></style>
