<template>
  <div class="goalChallengeComponent col-6" v-if="goalProps.challengeId">
    <div class="row" v-if="goalProps.challengeId == challengeProps.id">
      <div class="col-12">
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <div class="">
              <h6 class="text-center">
                {{ goalProps.progress }} / {{ goalProps.counter }}
              </h6>
              <div class="d-flex rounded">
                <div class="progressBar bg-success left" :class="{'right': goalProps.progress == goalProps.counter}" :style="'width:' + goalProps.progress/goalProps.counter*100+'px'">
                </div>
                <div class="progressBar bg-muted right" :class="{'left': goalProps.progress == 0}" :style="'width:' + (100-(goalProps.progress/goalProps.counter*100))+'px'">
                </div>
              </div>

              <h6 class="text-center m-2" v-if="goalProps.completed">
                <i class="fas fa-check-circle text-success fa-2x  "></i>
              </h6>
              <h6 class="text-center m-2" v-else>
                <i class="fas fa-times-circle fa-2x text-danger "></i>
              </h6>
            </div>
          </div>
          <button class="btn btn-outline-light" v-if="(!challengeProps.accepted && !challengeProps.rejected) &&(challengeProps.participantId == profile.id)" @click="acceptChallenge(goalProps, challengeProps)">
            Accept Challenge
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { challengeService } from '../services/ChallengeService'
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  name: 'GoalChallengeComponent',
  props: ['goalProps', 'challengeProps'],
  setup() {
    return {
      profile: computed(() => AppState.profile),
      acceptChallenge(goal, challenge) {
        challengeService.acceptChallenge(goal, challenge)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.progressBar {
  height: 10px;
}

.left {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

}

.right {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

}
</style>
