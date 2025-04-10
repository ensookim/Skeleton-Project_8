<template>
  <header class="header">
    <div class="logo">
      <router-link to="/" class="logo-link">
        <h3>💰 알뜰살뜰 가계부</h3>
      </router-link>
    </div>

    <nav class="nav">
      <router-link to="/transaction" class="menu-item">
        <i class="fas fa-list"></i>
        <span>전체 내역</span>
      </router-link>
      <router-link to="/" class="menu-item">
        <i class="fas fa-clock"></i>
        <span>최근 내역</span>
      </router-link>
      <router-link to="/report" class="menu-item">
        <i class="fa-solid fa-calendar"></i>
        <span>월별 분석</span>
      </router-link>
    </nav>

    <div class="profile">
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
  padding: 1.2rem 2rem;
  background-color: #f9fbfd;

  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Pretendard', 'Arial', sans-serif;
  position: sticky;
  top: 0;
  z-index: 999;
}

.logo h3 {
  margin: 0;
  font-weight: 600;
  font-size: 1.2rem;
  color: #333;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #444;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.menu-item:hover {
  color: #007bff;
}

.menu-item i {
  font-size: 1rem;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #444;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.profile-link:hover {
  color: #007bff;
}

.profile i {
  font-size: 1.1rem;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}
</style>
