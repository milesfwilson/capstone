<template>
  <div class="challengeComponent row mb-3" v-if="(challengeProps.accepted == true) && (challengeProps.participantId == profile.id || challengeProps.creatorId == profile.id) ">
    <div class="col-12 ">
      <div class="radius-25 bg-light text-dark p-2 my-1 text-center">
        <!-- <img :src="challengeProps.participantImg" height="50" class="rounded-circle mr-auto" alt=""> -->
        <h4 class="my-auto">
          {{ challengeProps.title }}
        </h4>
        <!-- <img :src="challengeProps.creatorImg" height="50" class="ml-auto rounded-circle" alt=""> -->

        <div class="row" :id="'collapse' + challengeProps.id">
          <goalChallengeComponent v-for="goal in goals"
                                  :key="goal.id"
                                  :goal-props="goal"
                                  :challenge-props="challengeProps"
          />
        </div>
      </div>
      <button class="btn btn-outline-light radius-25 ml-3" v-if="(challengeProps.participantId == profile.id) && (challengeProps.accepted)" @click.prevent="leaveChallenge(challengeProps.id, challengeProps)">
        Leave
      </button>
      <button class="btn btn-outline-light radius-25 ml-3" v-if="(challengeProps.creatorId == profile.id) && (challengeProps.accepted)" @click.prevent="deleteChallenge(challengeProps.id)">
        Delete
      </button>
    </div>
    <!-- <div class="row">
      <div class="col-12 d-flex">
        <button class="btn float-right" data-toggle="collapse" :data-target="'#collapse' + challengeProps.id">
          <i class="fas fa-ellipsis-v text-light"></i>
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
import goalChallengeComponent from '../components/GoalChallengeComponent'
import { challengeService } from '../services/ChallengeService'
export default {
  name: 'ChallengeComponent',
  props: ['challengeProps'],
  setup() {
    return {
      profiles: computed(() => AppState.profiles),
      profile: computed(() => AppState.profile),
      goals: computed(() => AppState.goals),
      leaveChallenge(id, challenge) {
        challengeService.leaveChallenge(id, challenge)
      },
      deleteChallenge(id) {
        challengeService.deleteChallenge(id)
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
