<template>
  <div class="home-page">
    <!-- Герой-секция -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Добро пожаловать в SportsStats</h1>
        <p>Самые актуальные спортивные статистика и результаты</p>
        <v-btn color="red darken-1" large to="/matches">
          Смотреть матчи
        </v-btn>
      </div>
    </section>

    <!-- Популярные лиги -->
    <section class="popular-leagues">
      <h2 class="section-title">Популярные лиги</h2>
      <div class="leagues-grid">
        <v-card
          v-for="league in featuredLeagues"
          :key="league.id"
          class="league-card"
          @click="$router.push(`/league/?id=${league.id}`)"
        >
          <v-img
            class="league-emblem"
            contain
            height="120"
            :src="league.emblem"
          />
          <v-card-title class="text-center">
            {{ league.name }}
          </v-card-title>
        </v-card>
      </div>
    </section>

    <!-- Последние матчи -->
    <section class="recent-matches">
      <h2 class="section-title">Последние результаты</h2>
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Команды</th>
              <th>Счёт</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="match in recentMatches"
              :key="match.id"
              class="match-row"
              @click="$router.push(`/match/${match.id}`)"
            >
              <td>{{ formatDate(match.utcDate) }}</td>
              <td>
                <strong>{{ match.homeTeam.name }}</strong> vs {{ match.awayTeam.name }}
              </td>
              <td>
                {{ match.score.fullTime.home }} : {{ match.score.fullTime.away }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </section>
  </div>
</template>

<script>

</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 20px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 40px;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.section-title {
  text-align: center;
  margin: 40px 0 20px;
  color: #333;
  font-size: 2rem;
}

.leagues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.league-card {
  cursor: pointer;
  transition: transform 0.3s;
  text-align: center;
  padding: 20px;
}

.league-card:hover {
  transform: translateY(-5px);
}

.league-emblem {
  margin: 0 auto;
  width: 100px;
}

.match-row {
  cursor: pointer;
}

.match-row:hover {
  background-color: #f5f5f5;
}

</style>
