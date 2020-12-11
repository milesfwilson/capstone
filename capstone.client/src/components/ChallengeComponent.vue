<template>
  <div class="challengeComponent row mb-3" v-if="(challengeProps.accepted == true) && (challengeProps.participantId == profile.id || challengeProps.creatorId == profile.id) ">
    <div class="col-12 ">
      <div class="radius-25 bg-light text-dark p-2 my-1 text-center">
        <!-- <img :src="challengeProps.participantImg" height="50" class="rounded-circle mr-auto" alt=""> -->
        <h4 class="my-auto">
          {{ challengeProps.title }}
        </h4>
        <h3 class="my-auto text-muted">
          {{ findGoalByChallengeId(challengeProps.id)[0].title }}
        </h3>
        <!-- <img :src="challengeProps.creatorImg" height="50" class="ml-auto rounded-circle" alt=""> -->

        <div class="row" :id="'collapse' + challengeProps.id">
          <goalChallengeComponent v-for="goal in goals"
                                  :key="goal.id"
                                  :goal-props="goal"
                                  :challenge-props="challengeProps"
          />
        </div>
      </div>
      <div class="d-flex">
        <button class="btn btn-outline-light radius-25 ml-3" v-if="(challengeProps.participantId == profile.id) && (challengeProps.accepted)" @click.prevent="leaveChallenge(challengeProps.id, challengeProps)">
          Leave
        </button>
        <button class="btn btn-outline-light radius-25 ml-3" v-if="(challengeProps.creatorId == profile.id) && (challengeProps.accepted)" @click.prevent="deleteChallenge(challengeProps.id)">
          Delete
        </button>
        <!-- <form @submit.prevent="renewChallenge(state.newGoal.endDate, findGoalByChallengeId(challengeProps.id))" class="d-flex" v-if="((challengeProps.creatorId == profile.id) && (challengeProps.accepted))"> -->
        <form @submit.prevent="renewChallenge(state.newGoal.endDate, findGoalByChallengeId(challengeProps.id))" class="d-flex" v-if="((challengeProps.creatorId == profile.id) && (challengeProps.accepted)) && (findGoalByChallengeId(challengeProps.id)[0].endDate.split('-').join('').split('T').splice(0,1).join('')) < (Number(date.split('-').join('')))">
          <button class="btn btn-outline-light radius-25 ml-3">
            Renew
          </button>
          <input type="date"
                 id="endDate"
                 class="my-2 bg-light border border-0 text-dark radius-25 p-2"
                 v-model="state.newGoal.endDate"
                 required
          >
        </form>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-12 d-flex">
        <button class="btn float-right" data-toggle="collapse" :data-target="'#collapse' + challengeProps.id">
          <i class="fas fa-ellipsis-v text-light"></i>
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import goalChallengeComponent from '../components/GoalChallengeComponent'
import { challengeService } from '../services/ChallengeService'
import { goalService } from '../services/GoalService'

import swal from 'sweetalert'
export default {
  name: 'ChallengeComponent',
  props: ['challengeProps'],
  setup() {
    const state = reactive({
      newGoal: {

      }
    })
    return {
      state,
      profiles: computed(() => AppState.profiles),
      profile: computed(() => AppState.profile),
      goals: computed(() => AppState.goals),
      date: computed(() => AppState.date),
      leaveChallenge(id, challenge) {
        swal({
          title: 'Are you sure?',
          text: 'Once you leave, you can no longer participate!',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              challengeService.leaveChallenge(id, challenge)

              swal('You have left the challenge!', {
                icon: 'https://www.miqols.org/toolbox2/isp/img/toggle_checked.png'

              })
            } else {
              swal('Your challenge is still active, go win!')
            }
          })
      },
      deleteChallenge(id) {
        swal({
          title: 'Deleted!',
          text: 'You deleted the challenge',
          icon: 'error',
          button: 'Dismiss'
        })
        challengeService.deleteChallenge(id)
      },
      findGoalByChallengeId(id) {
        return AppState.goals.filter(goal => (goal.challengeId === id))
      },
      renewChallenge(body, goals) {
        goalService.renewChallenge(state.newGoal, goals)
      }
    }
  },
  components: { goalChallengeComponent }
}
</script>

<style lang="scss" scoped>
.radius-25 {
border-radius: 30px;
}
</style>
