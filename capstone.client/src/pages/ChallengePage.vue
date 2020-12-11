<template>
  <div class="challengePage container-fluid bg-dark text-light">
    <div class="row">
      <div class="col-12">
        <h3 class="text-center">
          Pending Challenges
        </h3>
        <pendingChallengeComponent v-for="challenge in challenges" :key="challenge.id" :challenge-props="challenge" />
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h3 class="text-center">
          Challenges
        </h3>

        <challengeComponent v-for="challenge in challenges" :key="challenge.id" :challenge-props="challenge" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3 class="text-center">
          Rejected Challenges
        </h3>
        <rejectedComponent v-for="challenge in challenges" :key="challenge.id" :challenge-props="challenge" />
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
import challengeComponent from '../components/ChallengeComponent'
import pendingChallengeComponent from '../components/PendingChallengeComponent'

export default {
  name: 'ChallengePage',
  setup() {
    return {
      challenges: computed(() => AppState.challenges),
      checkedChallenges: computed(() => AppState.checkedChallenges)
    }
  },
  components: { challengeComponent, pendingChallengeComponent }
}
</script>

<style lang="scss" scoped>

</style>
