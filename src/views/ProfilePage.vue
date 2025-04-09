<template>
  <div class="container">
    <h2>프로필</h2>
    <p><strong>이름 : </strong> {{ user?.name }}</p>
    <p><strong>이메일 : </strong> {{ user?.email }}</p>
    <div class="btn-wrap">
      <router-link to="/" class="btn">뒤로가기</router-link>
      <router-link :to="`/user/edit/${id}`" class="btn">수정하기</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const route = useRoute();
const id = route.params.id;

const userStore = useUserStore();
const { user, fetchUser } = userStore;

onMounted(() => {
  fetchUser(id);
});
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

.btn-wrap {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #4a4a4a;
  font-weight: 500;
  transition: 0.2s;
}

.btn:hover {
  background: #2e7d32;
  color: #fff;
  border-color: #2e7d32;
}
</style>
