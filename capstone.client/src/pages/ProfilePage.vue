<template>
  <div class="about container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row" v-if="profile.picture">
          <div class="col-12">
            <div class="">
              <img class="rounded-circle" height="150" :src="profile.picture" alt="" />
              <div class="d-flex">
                <div :style="'width: ' + Math.ceil((profile.failures) / (profile.completed + profile.failures) * 100) + 'px; height: 100px'" class="bg-danger"></div>
                <div :style="'width: ' + Math.floor((profile.completed) / (profile.completed + profile.failures) * 100) + 'px; height: 100px'" class="bg-success"></div>
              </div>
            </div>

            <h3 class="text-center text-light">
              {{ profile.email.split('@').splice(0,1).join('') }}
            </h3>
          </div>
        </div>
        <div class="row mt-3 height">
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
              <div class="row" v-if="(!goal.completed && (goal.timeFrame == sortByTimeFrame))">
                <h3 class="ml-5">
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
export default {
  components: { goalGraphComponent },
  name: 'Profile',
  setup() {
    return {
      profile: computed(() => AppState.profile),
      activeGoals: computed(() => AppState.goals),
      myGoals: computed(() => AppState.myGoals),
      sortByTimeFrame: computed(() => AppState.sortByTimeFrame),
      sort(value) {
        AppState.sortByTimeFrame = value
        console.log(AppState.sortByTimeFrame)
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }

    }
  }
}
</script>

<style scoped>

.height{
  height: 100px;
}

</style>
