<template>
  <div>
    <!-- Хлебные крошки -->
    <Breadcrumbs v-if="teamName" :items="breadcrumbs" />

    <v-progress-circular
      v-if="isLoading"
      class="d-block mx-auto my-8"
      color="primary"
      indeterminate
    />

    <v-row align="start" class="pa-1" justify="center">
      <v-col md="2">
        <v-dialog v-model="dialog" width="auto">
          <template #activator="{ props }">
            <v-text-field
              v-model="formattedDate"
              v-bind="props"
              label="Выберите дату"
              prepend-icon="mdi-calendar"
              readonly
            />
          </template>
          <v-date-picker
            v-model="dateFrom"
            no-title
            scrollable
            @update:model-value="onDateSelected"
          />
        </v-dialog>

        <div class="text-center mt-2">
          <v-btn
            color="red darken-1"
            height="25"
            rounded="lg"
            style="font-size: 10px;"
            @click="clearFilter"
          >
            Очистить фильтр
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Информация о команде и игроках -->
    <v-row class="ma-0">
      <v-col class="pa-1" cols="auto">
        <v-btn
          color="primary"
          height="25"
          rounded="lg"
          style="font-size: 10px;"
          @click="openInfo('team')"
        >
          Информация о команде
        </v-btn>
      </v-col>
      <v-col class="pa-1" cols="auto">
        <v-btn
          color="red darken-1"
          height="25"
          rounded="lg"
          style="font-size: 10px;"
          @click="openInfo('players')"
        >
          Игроки
        </v-btn>
      </v-col>
    </v-row>

    <!-- Внешний компонент с диалогами -->
    <InfoCard ref="infoCard" :team-id="teamId" />

    <!-- Таблица игр команды -->
    <v-data-table
      class="mt-4"
      :headers="headers"
      :items="filteredMatches"
      :items-per-page="10"
    >
      <template #item.utcDate="{ item }">
        {{ new Date(item.utcDate).toLocaleString('ru-RU') }}
      </template>

      <template #item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" small>
          {{ getStatusText(item.status) }}
        </v-chip>
      </template>

      <template #item.teams="{ item }">
        <b>{{ item.homeTeam?.name }}</b> - {{ item.awayTeam?.name }}
      </template>

      <template #item.score="{ item }">
        <span v-if="item.score?.fullTime?.home != null && item.score?.fullTime?.away != null">
          {{ item.score.fullTime.home }} : {{ item.score.fullTime.away }}
        </span>
        <span v-else>
          – : –
        </span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import api from '@/api'
  import Breadcrumbs from '@/components/Breadcrumbs.vue'
  import InfoCard from '@/components/InfoCard.vue'

  export default {
    components: { Breadcrumbs, InfoCard },
    data () {
      return {
        dialog: false,
        dateFrom: null,
        matches: [],
        isLoading: false,
        teamName: '',
        teamId: this.$route.params.id,
        headers: [
          { title: 'Дата и время', value: 'utcDate', width: '180px' },
          { title: 'Статус', value: 'status', width: '120px' },
          { title: 'Команды', value: 'teams', width: '300px' },
          { title: 'Счёт', value: 'score', width: '80px' },
        ],
      }
    },
    computed: {
      breadcrumbs () {
        return [
          { title: 'Главная', to: '/home' },
          { title: 'Команды', to: '/teams/all' },
          { title: this.teamName || 'Загрузка...', to: null },
        ]
      },
      filteredMatches () {
        if (!this.dateFrom) return this.matches
        const selected = new Date(this.dateFrom)
        return this.matches.filter(match => new Date(match.utcDate) >= selected)
      },
      formattedDate () {
        return this.dateFrom ? new Date(this.dateFrom).toLocaleDateString('ru-RU') : ''
      },
    },
    mounted () {
      this.loadMatches()
    },
    methods: {
      clearFilter () {
        this.dateFrom = null
      },
      onDateSelected () {
        this.dialog = false
      },
      getStatusText (status) {
        const map = {
          FINISHED: 'Матч завершён',
          SCHEDULED: 'Запланирован',
          TIMED: 'Назначено время',
          LIVE: 'В эфире',
          IN_PLAY: 'В игре',
          PAUSED: 'Пауза',
          SUSPENDED: 'Приостановлен',
          CANCELED: 'Отменён',
          POSTPONED: 'Отложен',
        }
        return map[status] || status
      },
      getStatusColor (status) {
        const map = {
          FINISHED: 'green',
          SCHEDULED: 'blue',
          TIMED: 'light-blue',
          LIVE: 'red',
          IN_PLAY: 'orange',
          PAUSED: 'yellow',
          SUSPENDED: 'deep-orange',
          CANCELED: 'grey',
          POSTPONED: 'indigo',
        }
        return map[status] || 'grey'
      },
      loadMatches () {
        this.isLoading = true
        const teamId = this.$route.params.id

        Promise.all([
          api.get(`/api/v4/teams/${teamId}`),
          api.get(`/api/v4/teams/${teamId}/matches`),
        ])
          .then(([teamRes, matchesRes]) => {
            this.teamName = teamRes.data.name
            this.matches = matchesRes.data.matches
          })
          .catch(console.error)
          .finally(() => {
            this.isLoading = false
          })
      },
      openInfo (kind) {
        if (this.$refs.infoCard && typeof this.$refs.infoCard.open === 'function') {
          this.$refs.infoCard.open(kind)
        }
      },
    },
  }
</script>

<style scoped>
.v-data-table {
  margin-top: 16px;
  table-layout: fixed;
}

.v-data-table-header th {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
