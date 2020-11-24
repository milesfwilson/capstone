<template>
  <div class="goalChallengeComponent row" v-if="goalProps.challengeId">
    <div v-if="goalProps.challengeId == challengeProps.id">
      <div>
        <h6>
          {{ goalProps.title }}
        </h6>
        <button class="btn btn-outline-light" @click="acceptChallenge(goalProps, challengeProps)">
          Accept Challenge
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { challengeService } from '../services/ChallengeService'
export default {
  name: 'GoalChallengeComponent',
  props: ['goalProps', 'challengeProps'],
  setup() {
    return {
      acceptChallenge(goal, challenge) {
        challengeService.acceptChallenge(goal, challenge)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
