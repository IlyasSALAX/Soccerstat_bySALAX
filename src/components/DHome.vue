<template>
  <div class="home-page">
    <section class="cards-section">
      <router-link class="card" to="/leagues">
        <img alt="Кубок" class="card-icon" src="@/assets/League.png">
        <h2>Лиги</h2>
        <p>Обзор популярных футбольных лиг</p>
      </router-link>

      <router-link class="card" to="/teams/all">
        <img alt="Футбольный мяч" class="card-icon" src="@/assets/Teams.png">
        <h2>Команды</h2>
        <p>Информация о футбольных командах</p>
      </router-link>
    </section>
    <!-- Герой-секция -->
    <section class="hero-section">
      <h1>Добро пожаловать в SportsStats</h1>
      <p>Самая актуальная спортивная статистика и результаты</p>
      <v-btn color="red darken-1" large to="/leagues">
        Смотреть лиги
      </v-btn>
    </section>

    <!-- Текст под героем -->
    <section class="intro-text">
      <p>
        SportsStats — это ваш надежный источник свежей информации о футбольных матчах, командах и лигах.
        Следите за последними результатами, анализируйте статистику и оставайтесь в курсе всех событий!
      </p>
    </section>


  </div>
</template>

<script>
  export default {
    name: 'HomePage',
  }
</script>

<style scoped>
.home-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero-section p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.intro-text {
  font-size: 1.15rem;
  color: #818181;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cards-section {
  display: flex;
  justify-content: center;
  gap: 64px;
  margin-bottom: 64px;
  margin-top: 32px;
}

.card {
  background-color: #f44336;
  color: white;
  border-radius: 8px;
  padding: 30px 20px;
  text-decoration: none;
  width: 580px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.card-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 15px;
}

.card h2 {
  margin-bottom: 12px;
}

.card p {
  font-size: 1rem;
}
</style>
