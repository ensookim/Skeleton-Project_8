<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label>이름</label>
      <input v-model="localName" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label>이메일</label>
      <input v-model="localEmail" type="email" class="form-control" />
    </div>
    <button type="submit" class="btn">저장하기</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

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

<style scoped src="@/assets/common.css"></style>
