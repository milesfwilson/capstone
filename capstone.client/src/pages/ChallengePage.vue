<template>
  <div class="challengePage container-fluid bg-dark text-light">
    <div class="row">
      <div class="col-12">
        <h3 class="text-center">
          Challenges
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-8 offset-2">
        <challenegeComponent v-for="challenge in challenges" :key="challenge.id" :challenge-props="challenge" />
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
import challenegeComponent from '../components/ChallengeComponent'
export default {
  name: 'ChallengePage',
  setup() {
    return {
      challenges: computed(() => AppState.challenges)
    }
  },
  components: { challenegeComponent }
}
</script>

<style lang="scss" scoped>

</style>
