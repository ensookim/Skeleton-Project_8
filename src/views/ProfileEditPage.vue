<template>
  <div class="container">
    <h2><i class="fas fa-user fa-sm text-primary"></i> 프로필</h2>

    <p class="text-muted mb-4">Edit Profile</p>
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

<style scoped src="@/assets/common.css"></style>
