<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label>이름</label>
      <input v-model="localName" type="text" />
    </div>
    <div class="form-group">
      <label>이메일</label>
      <input v-model="localEmail" type="email" />
    </div>
    <button type="submit">저장하기</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  name: String,
  email: String,
});
const emit = defineEmits(['submitForm']);

const localName = ref(props.name);
const localEmail = ref(props.email);

watch(
  () => props.name,
  (val) => (localName.value = val)
);
watch(
  () => props.email,
  (val) => (localEmail.value = val)
);

function onSubmit() {
  emit('submitForm', localName.value, localEmail.value);
}
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #444;
}

input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #2e7d32;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #25682a;
}
</style>
