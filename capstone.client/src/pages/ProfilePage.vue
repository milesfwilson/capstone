<template>
  <div class="about container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row" v-if="profile.picture">
          <div class="col-12">
            <div class="">
              <div class="row">
                <div class="col-6">
                  <div class="m-2">
                    <img class="rounded-circle img-fluid grow" height="150" :src="profile.picture" alt="" />
                  </div>
                  <h3 class="text-center text-light">
                    {{ profile.email.split('@').splice(0,1).join('') }}
                  </h3>
                </div>

                <div class="col-6 d-flex flex-column justify-content-center">
                  <transition name="route" mode="out-in">
                    <div class="text-center text-dark gradient-light rounded p-2 shadow"
                         v-if="activeGoal.title"
                    >
                      <h3 class="">
                        {{ activeGoal.title }}
                      </h3>
                      <p class="">
                        {{ activeGoal.progress }} / {{ activeGoal.counter }}
                      </p>
                      <p>
                        Per {{ activeGoal.timeFrame }}
                      </p>
                      <p>
                        {{ goalDate(activeGoal) }}
                      </p>
                    </div>
                  </transition>
                </div>
              </div>
              <div class="d-flex my-5 grow">
                <div :style="'width: ' + Math.floor((profile.completed) / (profile.completed + profile.failures) * 100) + '%; height: 20px'" class="gradient-progress completed"></div>
                <div :style="'width: ' + Math.ceil((profile.failures) / (profile.completed + profile.failures) * 100) + '%; height: 20px'" class="gradient-failure failures"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
          </div>
        </div>
        <div class="row my-3 pt-5 height gradient-light" @mouseleave="revert">
          <div class="col-12 d-flex">
            <goalGraphComponent v-for="goal in myGoals" :key="goal.id" :goal-props="goal" class="d-flex w-100 justify-content-around" />
          </div>
        </div>

        <div class="row my-3">
          <div class="col-12">
            <h4 class="text-light text-center">
              Select goals by frequency
            </h4>
          </div>
          <div class="col-12 d-flex justify-content-around">
            <label :class="{'bg-light text-dark': sortByTimeFrame ==
                     'day'}"
                   class="btn btn-outline-light radius"
                   @click.prevent="sort('day')"
            >
              Daily
            </label>
            <label :class="{'bg-light text-dark': sortByTimeFrame ==
                     'week'}"
                   class="btn btn-outline-light radius"
                   @click.prevent="sort('week')"
            >
              Weekly
            </label>
            <label :class="{'bg-light text-dark': sortByTimeFrame ==
                     'month'}"
                   class="btn btn-outline-light radius"
                   @click.prevent="sort('month')"
            >
              Monthly
            </label>
            <label :class="{'bg-light text-dark': sortByTimeFrame ==
                     'year'}"
                   class="btn btn-outline-light radius"
                   @click.prevent="sort('year')"
            >
              Yearly
            </label>
          </div>
        </div>
        <div class="row text-light">
          <div class="col-12">
            <div v-for="goal in myGoals" :key="goal.id">
              <div class="row" v-if="(goal.timeFrame && (goal.timeFrame == sortByTimeFrame) && goalHasAcceptedChallenge (goal, challenges))">
                <h3 class="ml-5" :class="{'text-muted': goal.completed}">
                  {{ goal.title }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import goalGraphComponent from '../components/GoalGraphComponent'
import { AuthService } from '../services/AuthService'
import { DateTime } from 'luxon'
export default {
  components: { goalGraphComponent },
  name: 'Profile',
  setup() {
    return {
      profile: computed(() => AppState.profile),
      activeGoals: computed(() => AppState.goals),
      myGoals: computed(() => AppState.myGoals),
      sortByTimeFrame: computed(() => AppState.sortByTimeFrame),
      activeGoal: computed(() => AppState.activeGoal),
      challenges: computed(() => AppState.challenges),
      sort(value) {
        AppState.sortByTimeFrame = value
        console.log(AppState.sortByTimeFrame)
      },
      revert() {
        AppState.activeGoal = {}
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      },
      goalDate(goal) {
        if (goal.endDate) {
          return DateTime.fromISO(goal.endDate).toFormat('DDDD')
        }
      },
      goalHasAcceptedChallenge(goal, challenges) {
        if (goal.challengeId) {
          for (let i = 0; i < challenges.length; i++) {
            if (goal.challengeId === challenges[i].id && challenges[i].accepted) {
              return true
            }
          }
          return false
        }
        return true
      }

    }
  }
}
</script>

<style scoped>

.height{
  height: 150px;
}

.completed {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

}
.failures {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
