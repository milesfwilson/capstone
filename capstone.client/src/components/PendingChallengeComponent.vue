<template>
  <div class="challengeComponent row mb-3" v-if="(challengeProps.accepted == false) && (challengeProps.participantId == profile.id || challengeProps.creatorId == profile.id) && (challengeProps.rejected == false) && challengeGoalCheck(goals, challengeProps)">
    <div class="col-12">
      <!-- <div class="row">
        <div class="col-12 d-flex">
          <label for="waitingFor" class="ml-auto" v-if="challengeProps.rejected==false && challengeProps.accepted==false && challengeProps.creatorId == profile.id">Waiting for:</label>
        </div>
      </div> -->
      <div class="d-flex radius-25 bg-light text-dark p-2 my-1">
        <img :src="challengeProps.creatorImg" height="50" class="mr-auto rounded-circle" id="waitingFor" alt="">
        <div class="text-center">
          <h4 class="my-auto">
            {{ challengeProps.title }}
          </h4>
          <h6 class="text-muted">
            {{ challengeGoal(goals, challengeProps).title }}
          </h6>
          <p> x{{ challengeGoal(goals, challengeProps).counter }} every {{ challengeGoal(goals, challengeProps).timeFrame }} until {{ challengeGoalDate(goals, challengeProps) }} </p>
        </div>
        <img :src="challengeProps.participantImg" height="50" class="rounded-circle ml-auto" alt="">
      </div>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-6">
              <button v-if="profile.id == challengeProps.creatorId" class="radius-25 btn-outline-light btn ml-3" @click="cancelChallenge(challengeProps.id)">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <goalChallengeComponent v-for="goal in goals"
                                  :key="goal.id"
                                  :goal-props="goal"
                                  :challenge-props="challengeProps"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
import { challengeService } from '../services/ChallengeService'
import goalChallengeComponent from '../components/GoalChallengeComponent'
import { DateTime } from 'luxon'

export default {
  name: 'PendingChallengeComponent',
  props: ['challengeProps'],
  setup() {
    return {
      profiles: computed(() => AppState.profiles),
      profile: computed(() => AppState.profile),
      goals: computed(() => AppState.goals),
      cancelChallenge(id) {
        challengeService.deleteChallenge(id)
      },
      challengeGoalCheck(goals, challenge) {
        for (let i = 0; i < goals.length; i++) {
          if (goals[i].challengeId) {
            if (challenge.id === goals[i].challengeId) {
              return true
            }
          }
        }
        return false
      },
      challengeGoal(goals, challenge) {
        for (let i = 0; i < goals.length; i++) {
          if (goals[i].challengeId) {
            if (challenge.id === goals[i].challengeId) {
              return goals[i]
            }
          }
        }
        return false
      },
      challengeGoalDate(goals, challenge) {
        for (let i = 0; i < goals.length; i++) {
          if (goals[i].challengeId) {
            if (challenge.id === goals[i].challengeId) {
              return DateTime.fromISO(goals[i].endDate).toFormat('DDDD')
            }
          }
        }
        return false
      }
    }
  },
  components: { goalChallengeComponent }
}
</script>

<style lang="scss" scoped>
.radius-25 {
  border-radius: 35px;
}
</style>
