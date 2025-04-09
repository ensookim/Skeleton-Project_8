import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  //ProfilePage, ProfileEditPage
  const fetchUser = async (id) => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      user.value = res.data;
    } catch (error) {
      console.error('유저 정보 불러오기 실패:', error.message);
    }
  };
  //ProfileEditPage
  const updateUser = async (id, payload) => {
    try {
      const res = await axios.put(`/api/users/${id}`, payload);
      user.value = res.data;
    } catch (error) {
      console.error('유저 정보 업데이트 실패:', error.message);
    }
  };

  return {
    user,
    fetchUser,
    updateUser,
  };
});
