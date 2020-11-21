<template>
  <div class="newChallengeComponent">
    <form @submit.prevent="createChallenge">
      <input type="text" class="form-control my-2" placeholder="Challenge Title" v-model="state.newChallenge.title">
      <input type="text" class="form-control my-2" placeholder="Participant ID" v-model="state.newChallenge.participantId">
      <div class="row">
        <div class="col d-flex justify-content-center">
          <button type="submit" class="btn text-light">
            <h4>
              Send Request
            </h4>
          </button>
        </div>
      </div>
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
button {
  width: 50%;
  height: 50px;
}

label {
  width: 20%;
  border-radius: 25px;

}
</style>
