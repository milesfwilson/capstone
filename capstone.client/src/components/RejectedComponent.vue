<template>
  <div class="rejectedComponent row mb-3" v-if="(challengeProps.rejected == true) && (challengeProps.creatorId == profile.id)">
    <div class="col-12">
      <div class="d-flex radius-25 bg-light text-dark p-2 my-1">
        <img :src="challengeProps.participantImg" height="50" class="rounded-circle mr-auto" alt="">
        <h4 class="my-auto">
          {{ challengeProps.title }}
        </h4>
        <img :src="challengeProps.creatorImg" height="50" class="ml-auto rounded-circle" alt="">
      </div>
      <div class="row">
        <div class="col-12 d-flex">
          <!-- <button class="btn btn-outline-light float-right" data-toggle="collapse" :data-target="'#collapse' + challengeProps.id">
            View Goals
          </button> -->
          <button class="btn btn-outline-light ml-3 radius-25" @click.prevent="deleteChallenge(challengeProps.id)">
            Delete
          </button>
        </div>
      </div>
      <!-- <div class="row collapse" :id="'collapse' + challengeProps.id">
        <div class="col-12">
          <goalChallengeComponent v-for="goal in goals"
                                  :key="goal.id"
                                  :goal-props="goal"
                                  :challenge-props="challengeProps"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import swal from 'sweetalert'
// import goalChallengeComponent from '../components/GoalChallengeComponent'
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
        swal({
          title: 'Deleted!',
          text: 'You deleted the challenge',
          icon: 'error',
          button: 'Dismiss'
        })
        challengeService.deleteChallenge(id)
      }
    }
  },
  components: { }
}
</script>

<style lang="scss" scoped>
.radius-25 {
  border-radius: 35px;
}
</style>
