<template>
  <v-card
    class="league-card"
    elevation="5"
    @click="$emit('handle-card-click', { id })"
  >
    <v-card-text class="text-center py-6">
      <h3 class="league-name">{{ name }}</h3>
      <v-img
        class="grey lighten-2"
        contain
        height="200"
        :src="emblem"
      />
      <p class="league-region">{{ league }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      id: {
        type: Number,
        required: true,
      },
      emblem: {
        type: String,
        default: () => '/src/assets/placeholder.svg',
      },
      name: {
        type: String,
        required: true,
      },
      league: {
        type: String,
        default: () => 'Не указано',
      },
    },
    emits: ['handle-card-click'],
  }
</script>

<style scoped>
.league-card {

  max-width: 660px;
  min-height: 300px;
  border-radius: 32px;
  cursor: pointer;
  background-color: #e21313e0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 auto;
}

.league-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
}

.league-logo {
    background-color: #381212;
}

.league-name {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
    color: #222;
}

.league-region {
    margin: 0;
    font-size: 1.1rem;
    color: #555;
}
</style>
