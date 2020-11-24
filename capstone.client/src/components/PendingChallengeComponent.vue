<template>
  <div class="challengeComponent row" v-if="(challengeProps.accepted == false) && (challengeProps.participantId == profile.id || challengeProps.creatorId == profile.id) && (challengeProps.rejected == false)">
    <div class="col-12">
      <div class="row">
        <div class="col-12 d-flex">
          <button class="btn btn-outline-light radius-25" v-if="challengeProps.participantId == profile.id" @click.prevent="acceptChallenge(challengeProps.id, challengeProps)">
            Accept Challenge
          </button>
          <button class="btn btn-outline-light radius-25" v-if="challengeProps.participantId == profile.id" @click.prevent="rejectChallenge(challengeProps.id, challengeProps)">
            Reject Challenge
          </button>
          <label for="waitingFor" class="ml-auto" v-if="challengeProps.rejected==false && challengeProps.accepted==false && challengeProps.creatorId == profile.id">Waiting for:</label>
        </div>
      </div>
      <div class="d-flex radius-25 bg-light text-dark p-2 my-1">
        <img :src="challengeProps.creatorImg" height="50" class="mr-auto rounded-circle" id="waitingFor" alt="">
        <h4 class="my-auto">
          {{ challengeProps.title }}
        </h4>
        <img :src="challengeProps.participantImg" height="50" class="rounded-circle ml-auto" alt="">
      </div>
      <div class="row">
        <div class="col-12 d-flex">
          <button class="btn btn-outline-light float-right mb-2" data-toggle="collapse" :data-target="'#collapse' + challengeProps.id">
            View Goals
          </button>
        </div>
      </div>
      <div class="row collapse" :id="'collapse' + challengeProps.id">
        <div class="col-12">
          <goalChallengeComponent v-for="goal in goals"
                                  :key="goal.id"
                                  :goal-props="goal"
                                  :challenge-props="challengeProps"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
import { challengeService } from '../services/ChallengeService'
import goalChallengeComponent from '../components/GoalChallengeComponent'
export default {
  name: 'PendingChallengeComponent',
  props: ['challengeProps'],
  setup() {
    return {
      profiles: computed(() => AppState.profiles),
      profile: computed(() => AppState.profile),
      goals: computed(() => AppState.goals),
      acceptChallenge(id, challenge) {
        challengeService.acceptChallenge(id, challenge)
      },
      rejectChallenge(id, challenge) {
        challengeService.rejectChallenge(id, challenge)
      }
    }
  },
  components: { goalChallengeComponent }
}
</script>

<style lang="scss" scoped>
.radius-25 {
  border-radius: 30px;
}
</style>
