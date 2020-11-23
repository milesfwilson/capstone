<template>
  <div class="rejectedComponent row" v-if="(challengeProps.rejected == true) && (challengeProps.creatorId == profile.id)">
    <div class="col-12">
      <div class="d-flex radius-25 bg-light text-dark p-2 my-2">
        <img :src="challengeProps.participantImg" height="50" class="rounded-circle mr-auto" alt="">
        <h4 class="my-auto">
          {{ challengeProps.title }}
        </h4>
        <img :src="challengeProps.creatorImg" height="50" class="ml-auto rounded-circle" alt="">
      </div>
      <div class="row">
        <div class="col-12 d-flex">
          <button class="btn btn-outline-light float-right" data-toggle="collapse" :data-target="'#collapse' + challengeProps.id">
            View Goals
          </button>
          <button class="btn btn-outline-light float-right" @click.prevent="deleteChallenge(challengeProps.id)">
            Delete Challenge
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
import { computed } from 'vue'
import { AppState } from '../AppState'
import goalChallengeComponent from '../components/GoalChallengeComponent'
import { challengeService } from '../services/ChallengeService'
export default {
  name: 'RejectedComponent',
  props: ['challengeProps'],
  setup() {
    return {
      profiles: computed(() => AppState.profiles),
      profile: computed(() => AppState.profile),
      goals: computed(() => AppState.goals),
      deleteChallenge(id) {
        challengeService.deleteChallenge(id)
      }
    }
  },
  components: { goalChallengeComponent }
}
</script>

<style lang="scss" scoped>

</style>
