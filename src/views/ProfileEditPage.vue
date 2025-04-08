<template>
  <div class="container">
    <h2>프로필 수정</h2>
    <ProfileForm :name="name" :email="email" @submitForm="handleSubmit" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import ProfileForm from '../components/ProfileForm.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const name = ref('');
const email = ref('');

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/users/${id}`);
  name.value = res.data.name;
  email.value = res.data.email;
});

async function handleSubmit(updatedName, updatedEmail) {
  await axios.put(`http://localhost:3000/users/${id}`, {
    id,
    name: updatedName,
    email: updatedEmail,
  });
  alert('저장되었습니다!');
  router.push(`/user/${id}`);
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}
</style>
