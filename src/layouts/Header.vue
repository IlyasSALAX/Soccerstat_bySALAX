<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/home">
          <img
            class="logo-img"
            src="@/assets/logo.svg"
          >
          SOCCERstat
        </router-link>
      </div>

      <nav class="nav-menu">

        <router-link to="/home">Главная</router-link>
        <router-link to="/leagues">Лиги</router-link>
        <router-link to="/teams/all">Команды</router-link>

      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',
  }
</script>

<style scoped>
.header {
  background: #1a1a1a;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
}
.logo-img {
  height: 70px;
  margin-right: 8px;
  vertical-align: middle;
}
.logo a {
  color:  #f44336;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
  white-space: nowrap;
}

.nav-menu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
}

.nav-menu a {
  color: #e0e0e0;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-menu a:hover {
  color:  #f44336;
}

.nav-menu a.router-link-active {
  color:  #f44336;
}

.nav-menu a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background:  #f44336;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    padding: 0.8rem 1rem;
    gap: 1rem;
  }

  .nav-menu {
    position: static;
    transform: none;
    left: auto;
    width: 100%;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
