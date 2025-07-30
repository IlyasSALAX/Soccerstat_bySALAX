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
        placeholder="Поиск..."
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
    <v-alert
      v-else-if="filteredLeagues.length===0"
      type="info"
    >
      {{ searchQuery ? 'Ни одной лиги не найдено' : 'Нет доступных лиг' }}
    </v-alert>
    <template v-else>
      <v-row justify="center">
        <v-col
          v-for="league in paginatedLeagues"
          :key="league.id"
          class="justify-center"
          cols="12"
          lg="4"
          md="6"
          sm="8"
        >
          <card
            :id="league.id"
            :emblem="league.emblem"
            :league="league.area.name"
            :name="league.name"
            @handle-card-click="goToLeague"
          />
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
  import Card from '@/components/Card.vue'
  export default {
    components: { Card },
    data () {
      return {
        leagues: [],
        page: 1,
        itemsPerPage: 9,
        searchQuery: '',
        isLoading: false,

      }
    },
    computed: {
      totalPages () {
        return Math.ceil(this.filteredLeagues.length / this.itemsPerPage)
      },
      paginatedLeagues () {
        const start = (this.page - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.filteredLeagues.slice(start, end)
      },
      filteredLeagues () {
        if (!this.searchQuery) return this.leagues
        const query = this.searchQuery.toLowerCase()
        return this.leagues.filter(league => league.name.toLowerCase().includes(query))
      },
    },
    mounted () {
      this.loadLeagues()
    },
    methods: {
      loadLeagues () {
        this.isLoading = true
        api.get('api/v4/competitions')
          .then(response => this.leagues = response.data.competitions)
          .catch(error => console.error(error))
          .finally(() => this.isLoading = false)
      },
      onSearchInput () {
        this.page = 1
      },
      goToLeague (payload) {
        this.$router.push(`/matches/?id=${payload.id}`)
      },
    },
  }
</script>
<style scoped>
.v-pagination {
  justify-content: center;
}
.search-field {
  max-width: 360px;
  font-size: 13px;
  margin-bottom: 6px;
}
</style>
