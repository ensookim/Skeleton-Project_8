<template>
  <div class="container">
    <h2>프로필 수정</h2>
    <ProfileForm :name="name" :email="email" @submitForm="handleSubmit" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import ProfileForm from '@/components/ProfileForm.vue';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const id = route.params.id;

const name = ref('');
const email = ref('');

onMounted(async () => {
  await userStore.fetchUser(id);
  name.value = userStore.user?.name || '';
  email.value = userStore.user?.email || '';
});

const handleSubmit = async (newName, newEmail) => {
  await userStore.updateUser(id, {
    id,
    name: newName,
    email: newEmail,
  });
  alert('수정되었습니다!');
  router.push(`/user/${id}`);
};
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
</style>
