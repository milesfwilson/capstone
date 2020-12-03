<template>
  <div class="newChallengeComponent">
    <form @submit.prevent="createChallenge">
      <input type="text" class="form-control my-2 bg-dark border-0 text-light" placeholder="Challenge Title" v-model="state.newChallenge.title" required>
      <!-- <input type="text" class="form-control my-2" placeholder="Participant ID" v-model="state.newChallenge.participantId"> -->
      <h4>Select who you would like to challenge</h4>
      <profileListComponent />
      <div class="row">
        <div class="col d-flex justify-content-center">
          <button type="submit" class="btn btn-outline-light radius-25 my-2">
            Send Request
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { challengeService } from '../services/ChallengeService'
import { AppState } from '../AppState'
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
      },
      reveal(value) {
        AppState.reveal = value
      },
      challenge(value) {
        AppState.newGoal.challenge = value
      }
    }
  },
  components: { }
}
</script>

<style lang="scss" scoped>
button {
  width: 50%;
  height: 50px;
}

label {
  width: 20%;
  border-radius: 25px;

}

.radius-25 {
  border-radius: 25px;
}
</style>
