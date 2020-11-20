<template>
  <div class="newChallengeComponent">
    <form @submit.prevent="createChallenge">
      <input type="text" class="form-control" placeholder="Challenge Title" v-model="state.newChallenge.title">
      <input type="text" class="form-control" placeholder="Participant ID" v-model="state.newChallenge.participantId">
      <button type="submit">
        Create
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { challengeService } from '../services/ChallengeService'
export default {
  name: 'NewChallengeComponent',
  setup() {
    const state = reactive({
      newChallenge: {

      }
    })
    return {
      state,
      createChallenge(newChallenge) {
        challengeService.createChallenge(state.newChallenge)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
