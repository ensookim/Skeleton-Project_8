<template>
  <div>
    <router-link :to="{ name: 'HomePage' }" class="mx-1">홈페이지</router-link>
    <router-link :to="{ name: 'TransactionPage' }" class="mx-1"
      >거래 내역</router-link
    >

    <router-link
      :to="{ name: 'TransactionDetailPage', params: { id: '1' } }"
      class="mx-1"
      >상세 내역</router-link
    >

    <router-link :to="{ name: 'AddPage' }" class="mx-1">추가하기</router-link>

    <router-link :to="{ name: 'EditPage', params: { id: '1' } }" class="mx-1"
      >수정하기</router-link
    >

    <router-link :to="{ name: 'ProfilePage', params: { id: '1' } }" class="mx-1"
      >프로필</router-link
    >

    <router-link
      :to="{ name: 'ProfileEditPage', params: { id: '1' } }"
      class="mx-1"
      >프로필 수정하기</router-link
    >
  </div>

  <router-view></router-view>
</template>

<script setup></script>

<style scoped></style>
