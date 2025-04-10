<template>
  <div class="container">
    <h2><i class="fas fa-user fa-sm text-primary"></i> 프로필</h2>

    <p class="text-muted mb-4">Profile</p>
    <p><strong>이름 : </strong> {{ user?.name }}</p>
    <p><strong>이메일 : </strong> {{ user?.email }}</p>
    <div class="btn-wrap">
      <router-link
        to="/"
        class="btn btn-outline-secondary text-white"
        style="background-color: gray"
        >뒤로가기</router-link
      >
      <router-link :to="`/user/edit/${id}`" class="btn btn-primary text-white"
        >수정하기</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const id = route.params.id;

const userStore = useUserStore();
const { fetchUser } = userStore;
const { user } = storeToRefs(userStore);

onMounted(() => {
  fetchUser(id);
});
</script>
<style scoped src="@/assets/common.css"></style>
