<template>
  <div>
    <!-- Диалог информации о команде -->
    <v-dialog v-model="teamInfoDialog" max-width="800">
      <v-card>
        <v-card-title class="text-center mx-4">
          <div>{{ teamInfo.name }}</div>
          <v-img
            v-if="teamInfo.crest"
            contain
            max-height="200"
            :src="teamInfo.crest"
          />
        </v-card-title>

        <v-card-text class="text-center">
          <v-row dense>
            <v-col class="my-4" cols="12" sm="6">
              <p><strong>Страна:</strong> {{ teamInfo.area?.name || '—' }}</p>
              <p><strong>Год основания:</strong> {{ teamInfo.founded || '—' }}</p>
              <p><strong>Цвета клуба:</strong> {{ teamInfo.clubColors || '—' }}</p>
            </v-col>

            <v-col class="my-4" cols="12" sm="6">
              <p><strong>Стадион:</strong> {{ teamInfo.venue || '—' }}</p>
              <p><strong>Тренер:</strong> {{ teamInfo.coach?.name || '—' }}</p>
              <p><strong>Сайт:</strong>
                <a v-if="teamInfo.website" :href="teamInfo.website" rel="noopener" target="_blank">
                  {{ teamInfo.website }}
                </a>
                <span v-else>—</span>
              </p>
            </v-col>
          </v-row>

          <p><strong>Адрес:</strong> {{ teamInfo.address || '—' }}</p>

          <p><strong>Текущие соревнования:</strong></p>
          <ul
            v-if="teamInfo.runningCompetitions && teamInfo.runningCompetitions.length"
            :style="{ 'list-style-type': 'none', padding: 0, margin: 0 }"
          >
            <li v-for="comp in teamInfo.runningCompetitions" :key="comp.id">{{ comp.name }}</li>
          </ul>
          <p v-else>Информация отсутствует.</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" rounded @click="teamInfoDialog = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Диалог о игроках -->
    <v-dialog v-model="playersDialog" max-width="1500">
      <v-card>
        <v-card-title class="d-flex align-center">
          <span class="text-h6">Игроки команды</span>
          <v-spacer />
          <v-btn icon @click="playersDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <div v-if="isPlayersLoading" class="text-center my-6">
            <v-progress-circular indeterminate size="48" />
          </div>

          <div v-else-if="players.length === 0" class="text-center my-6">
            Игроки не найдены.
          </div>

          <div v-else>
            <div v-for="(playersGroup, pos) in groupedPlayers" :key="pos" class="mb-8">
              <div class="d-flex align-center mb-2">
                <span class="text-h6 font-weight-medium">
                  {{ pos || 'Без категории' }}
                </span>
                <span class="ml-2 grey--text text--darken-1">({{ playersGroup.length }})</span>
              </div>

              <v-row dense>
                <v-col
                  v-for="p in playersGroup"
                  :key="p.id"
                  class="py-2"
                  cols="12"
                  lg="3"
                  md="4"
                  sm="6"
                >
                  <v-card class="player-card" elevation="1" outlined>
                    <v-card-text class="pa-3">
                      <div class="font-weight-medium">{{ p.name }}</div>
                      <div class="text-caption">
                        <span v-if="p.shirtNumber">#{{ p.shirtNumber }}&nbsp;•&nbsp;</span>
                        <span>{{ translatePosition(p.position) || '—' }}</span>
                      </div>
                      <div class="text-caption">
                        <small>{{ p.nationality || '—' }}</small>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="playersDialog = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    name: 'InfoCard',
    props: {
      teamId: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        teamInfo: {},
        teamInfoDialog: false,
        playersDialog: false,
        players: [],
        groupedPlayers: {},
        isPlayersLoading: false,
      }
    },
    methods: {
      open (kind) {
        if (kind === 'team') {
          this.teamInfoDialog = true
          if (!this.teamInfo.name) {
            this.loadTeamInfo()
          }
        } else if (kind === 'players') {
          this.playersDialog = true
          this.loadPlayers()
        }
      },
      loadTeamInfo () {
        api.get(`/api/v4/teams/${this.teamId}`)
          .then(response => {
            this.teamInfo = response.data
          })
          .catch(err => {
            console.error(err)
          })
      },
      loadPlayers () {
        this.isPlayersLoading = true
        api.get(`/api/v4/teams/${this.teamId}`)
          .then(response => {
            this.players = response.data.squad || []
            this.groupPlayersByPosition()
          })
          .catch(() => {
            this.players = []
            this.groupedPlayers = {}
          })
          .finally(() => {
            this.isPlayersLoading = false
          })
      },
      translatePosition (pos) {
        if (!pos) return 'Без категории'
        const map = {
          Goalkeeper: 'Вратарь',
          Defence: 'Защитник',
          Defender: 'Защитник',
          Midfield: 'Полузащитник',
          Offence: 'Нападающий',
          Attacker: 'Нападающий',
          Striker: 'Форвард',
          'Left-Back': 'Левый защитник',
          'Right-Back': 'Правый защитник',
          'Centre-Back': 'Центральный защитник',
          'Centre-Forward': 'Центральный нападающий',
          'Defensive Midfield': 'Опорный полузащитник',
          'Attacking Midfield': 'Атакующий полузащитник',
          'Central Midfield': 'Центральный полузащитник',
          'Left Winger': 'Левый фланг',
          'Right Winger': 'Правый фланг',
          Substitute: 'Запасной',
          Unknown: 'Без категории',
        }
        return map[pos] || pos
      },
      groupPlayersByPosition () {
        this.groupedPlayers = this.players.reduce((groups, player) => {
          const translated = this.translatePosition(player.position)
          if (!groups[translated]) groups[translated] = []
          groups[translated].push(player)
          return groups
        }, {})
      },
    },
  }
</script>

<style scoped>
.player-card {
  transition: transform .15s ease-in-out;
}
.player-card:hover {
  transform: translateY(-2px);
}
</style>
