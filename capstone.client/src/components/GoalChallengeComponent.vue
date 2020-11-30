<template>
  <div class="goalChallengeComponent col-6" v-if="goalProps.challengeId == challengeProps.id">
    <div class="row" v-if="(goalProps.challengeId == challengeProps.id) && (!challengeProps.accepted)">
      <div class="col-12 d-flex mb-2">
        <button class="btn btn-outline-light radius-25 mr-1" v-if="(!challengeProps.accepted && !challengeProps.rejected) &&(challengeProps.participantId == profile.id)" @click="acceptChallenge(goalProps, challengeProps)">
          Accept
        </button>
        <button class="btn btn-outline-light radius-25" v-if="(challengeProps.participantId == profile.id) && (!challengeProps.accepted)" @click.prevent="rejectChallenge(challengeProps.id, challengeProps)">
          Reject
        </button>
      </div>
    </div>

    <div class="row justify-content-around my-2" v-if="(goalProps.challengeId == challengeProps.id) && (challengeProps.accepted)">
      <div class="col-12">
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <img :src="challengeProps.creatorImg" class="rounded-circle shadow" height="100" alt="" v-if="challengeProps.creatorId == goalProps.creatorId">
            <img :src="challengeProps.participantImg" class="rounded-circle shadow" height="100" alt="" v-if="challengeProps.participantId == goalProps.creatorId">
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <h6 class="my-2">
              {{ goalProps.progress }} / {{ goalProps.counter }}
            </h6>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <div class="" v-if="goalProps.creatorId == profile.id">
              <button class="btn grow" @click="decrement(goalProps.id, goalProps)">
                <i class="fa fa-minus-circle text-dark" aria-hidden="true"></i>
              </button>
            </div>

            <div class="d-flex rounded my-auto">
              <div class="progressBar bg-success left" :class="{'right': goalProps.progress == goalProps.counter}" :style="'width:' + goalProps.progress/goalProps.counter*100+'px'">
              </div>
              <div class="progressBar bg-muted right" :class="{'left': goalProps.progress == 0}" :style="'width:' + (100-(goalProps.progress/goalProps.counter*100))+'px'">
              </div>
            </div>
            <div class="" v-if="goalProps.creatorId == profile.id">
              <button class="btn grow" @click="increment(goalProps.id, goalProps)">
                <i class="fa fa-plus-circle text-dark" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <h6 class="text-center m-2" v-if="goalProps.completed">
              <i class="fas fa-check-circle text-success fa-2x"></i>
            </h6>

            <h6 class="text-center m-2" v-else>
              <i class="fas fa-times-circle fa-2x text-danger "></i>
            </h6>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <button class="btn btn-outline-dark radius-25" v-if="(challengeProps.participantId == profile.id) && (challengeProps.accepted) && (goalProps.creatorId == profile.id)" @click.prevent="leaveChallenge(challengeProps.id, challengeProps)">
              Leave
            </button>
            <button class="btn btn-outline-dark radius-25" v-if="(challengeProps.creatorId == profile.id) && (challengeProps.accepted) && (goalProps.creatorId == profile.id)" @click.prevent="deleteChallenge(challengeProps.id)">
              Delete
            </button>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { challengeService } from '../services/ChallengeService'
import { goalService } from '../services/GoalService'
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
      },
      rejectChallenge(id, challenge) {
        challengeService.rejectChallenge(id, challenge)
      },
      leaveChallenge(id, challenge) {
        challengeService.leaveChallenge(id, challenge)
      },
      deleteChallenge(id) {
        challengeService.deleteChallenge(id)
      },
      increment(id, goal) {
        goalService.increment(id, goal)
      },
      decrement(id, goal) {
        goalService.decrement(id, goal)
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

.radius-25 {
  border-radius: 35px;
}
</style>
