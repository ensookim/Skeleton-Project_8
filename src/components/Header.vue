<template>
  <header class="header">
    <div class="logo">
      <router-link to="/" class="logo-link">
        <h3>
          <i class="fa-solid fa-coins logo-icon"></i>
          알뜰살뜰 가계부
        </h3>
      </router-link>
    </div>

    <nav class="nav">
      <router-link
        to="/transaction"
        class="menu-item"
        :class="{ active: $route.path.startsWith('/transaction') }"
      >
        <i class="fa-solid fa-list"></i>
        <span> 전체 내역</span>
      </router-link>

      <router-link
        to="/report"
        class="menu-item"
        :class="{ active: $route.path.startsWith('/report') }"
      >
        <i class="fa-solid fa-chart-pie"></i>
        <span> 월별 분석</span>
      </router-link>
    </nav>

    <div class="profile">
      <router-link to="/user/1" class="profile-link">
        <div class="profile-icon">
          <i class="fas fa-user"></i>
        </div>
        <span>Profile</span>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background-color: #f9fbfd;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 999;
}

.logo h3 {
  margin: 0;
  font-weight: 700;
  font-size: 1.4rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  background: linear-gradient(90deg, #4ade80, #22c55e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.6rem;
}

.nav {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.menu-item {
  position: relative;
  color: #444;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding-bottom: 4px;
  transition: color 0.3s ease;
}

.menu-item:hover {
  color: #22c55e;
}

.menu-item::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background-color: #22c55e;
  transition: width 0.3s ease;
}

.menu-item:hover::after {
  width: 100%;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #444;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.profile-link:hover {
  color: #22c55e;
}

.profile-icon {
  background-color: #22c55e;
  color: white;
  border-radius: 50%;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
</style>
