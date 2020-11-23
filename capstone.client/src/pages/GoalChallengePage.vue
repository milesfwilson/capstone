<template>
  <div class="GoalChallengePage">
  </div>
</template>

<script>
import { computed } from 'vue'
// import { useRoute } from 'vue-router'
// import { challengeService } from '../services/ChallengeService'
import { AppState } from '../AppState'
export default {
  name: 'GoalChallengePage',
  setup() {
    // const route = useRoute()
    // onMounted(() => {
    //   challengeService.getGoalByChallengeId(route.params.challengeId)
    // })
    return {
      goal: computed(() => AppState.challengeGoal)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
