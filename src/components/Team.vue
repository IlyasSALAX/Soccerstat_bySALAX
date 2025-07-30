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
      <v-row justify="center">
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
              class="white--text"
              cover
              height="150"
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
  cursor: pointer;
  transition: transform 0.2s;
}
.team-card:hover {
  transform: scale(1.02);
}
</style>
