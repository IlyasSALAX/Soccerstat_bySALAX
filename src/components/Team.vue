<template>
  <div class="search">
    <v-row class="mt-1" justify="center">
      <v-text-field
        v-model="searchQuery"
        class="search-field"
        clearable
        density="compact"
        flat
        hide-details
        placeholder="Поиск команд..."
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="solo"
        @input="onSearchInput"
      />
    </v-row>

    <v-progress-circular
      v-if="isLoading"
      class="d-block mx-auto my-8"
      color="primary"
      indeterminate
    />

    <v-alert v-else-if="filteredTeams.length === 0" type="info">
      {{ searchQuery ? 'Ни одной команды не найдено' : 'Нет доступных команд' }}
    </v-alert>

    <template v-else>
      <v-row class="mx-16" justify="center">
        <v-col
          v-for="(team,index) in paginatedTeams"
          :key="index"
          class="justify-center"
          cols="12"
          lg="4"
          md="6"
          sm="8"
        >
          <v-card class="team-card" hover @click="goToTeam(team.id)">
            <v-img
              contain
              height="200"
              :src="team.crest"
            />
            <v-card-title class="text-h6 text-center">{{ team.name }}</v-card-title>
            <v-card-subtitle class="text-center">{{ team.venue }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <v-pagination
        v-model="page"
        class="mt-4"
        :length="totalPages"
        :total-visible="7"
      />
    </template>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    data () {
      return {
        teams: [],
        page: 1,
        itemsPerPage: 9,
        searchQuery: '',
        isLoading: false,
      }
    },
    computed: {
      filteredTeams () {
        if (!this.searchQuery) return this.teams
        const query = this.searchQuery.toLowerCase()
        return this.teams.filter(team =>
          team.name.toLowerCase().includes(query)
        )
      },
      paginatedTeams () {
        const start = (this.page - 1) * this.itemsPerPage
        return this.filteredTeams.slice(start, start + this.itemsPerPage)
      },
      totalPages () {
        return Math.ceil(this.filteredTeams.length / this.itemsPerPage)
      },
    },
    mounted () {
      this.loadTeams()
    },
    methods: {
      loadTeams () {
        this.isLoading = true
        api.get('api/v4/teams')
          .then(response => this.teams = response.data.teams)
          .catch(error => console.error(error))
          .finally(() => this.isLoading = false)
      },
      onSearchInput () {
        this.page = 1
      },
      goToTeam (teamId) {
        this.$router.push(`/teams/${teamId}/matches`)
      },
    },
  }
</script>

<style scoped>
.search-field {
  max-width: 360px;
  margin-bottom: 8px;
}
.v-pagination {
  justify-content: center;
}


.team-card {

  max-width: 660px;
  min-height: 200px;
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

.team-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
}

.team-logo {
    background-color: #381212;
}

.team-name {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
    color: #222;
}

.team-region {
    margin: 0;
    font-size: 1.1rem;
    color: #555;
}
</style>
