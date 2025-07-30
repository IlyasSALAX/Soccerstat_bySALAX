<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>О нас</h4>
        <p>Спортивная статистика и аналитика матчей в реальном времени</p>
      </div>

      <div class="footer-section">
        <h4>Навигация</h4>
        <router-link to="/home">Главная</router-link>
        <router-link to="/leagues">Матчи</router-link>
      </div>

      <div class="footer-section">
        <h4>Контакты</h4>
        <p>Email: info@sportsstats.com</p>
        <p>Телефон: +7 (123) 456-78-90</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 SportsStats. Все права защищены.</p>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'AppFooter',
  }
</script>

<style scoped>
.footer {
  background: #222;
  color: #fff;
  padding: 2rem 0 0;
  margin-top: 2rem;
  font-family: 'Arial', sans-serif;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.footer-section h4 {
  color: #f44336;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-section p {
  margin: 0.5rem 0;
  line-height: 1.6;
  color: #bbb;
}

.footer-section a {
  display: block;
  color: #bbb;
  margin-bottom: 0.5rem;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #f44336;
}

.footer-bottom {
  text-align: center;
  padding: 1rem 0;
  background: #111;
  margin-top: 1rem;
  color: #888;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-section {
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>
