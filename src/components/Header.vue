<template>
  <header class="header">
    <div class="left">💰 알뜰살뜰 가계부 💰</div>
    <div class="center">
      <a href="#" class="menu-item">
        <i class="fas fa-list"></i>
        <span>전체 내역</span>
      </a>
      <a href="#" class="menu-item">
        <i class="fas fa-clock"></i>
        <span>지난내역</span>
      </a>
    </div>
    <div class="right">
      <router-link to="/user/1" class="profile-link">
        <i class="fas fa-user"></i>
        <span>Profile</span>
      </router-link>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  font-family: 'Arial', sans-serif;
}

.left {
  font-weight: bold;
  font-size: 1.2rem;
}

.center {
  display: flex;
  gap: 2rem;
  margin-left: -40rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #333;
  font-size: 0.95rem;
  text-decoration: none;
}

.menu-item i {
  font-size: 1rem;
}

.right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #333;
  text-decoration: none;
}
</style>
