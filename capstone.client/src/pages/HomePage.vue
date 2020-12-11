<template>
  <div class="home container-fluid bg-dark text-light">
    <div class="row" v-if="profile.id">
      <div class="col-3"></div>
      <div class="col-6 d-flex justify-content-center">
        <router-link :to="{ name: 'Create' }" class=" btn text-light">
          <h3 :class="{'radius btn btn-outline-light': myGoals.length < 1}">
            Create Goal
          </h3>
        </router-link>
      </div>
      <div class="dropdown">
        <button class="btn mt-2 btn-outline-light dropdown-toggle radius"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
        >
          Sort
        </button>
        <div class="col-3 d-flex justify-content-end">
          <div class="dropdown-menu bg-transparent border-0" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item bg-light text-dark radius my-1" href="#" @click.prevent="sort('finance')">
              <i class="fa fa-circle-o text-success" aria-hidden="true"></i>
              Finance</a>
            <a class="dropdown-item bg-light text-dark radius my-1" href="#" @click.prevent="sort('health')">
              <i class="fa fa-circle-o text-primary" aria-hidden="true"></i>
              Health</a>
            <a class="dropdown-item bg-light text-dark radius my-1" href="#" @click.prevent="sort('mental')">
              <i class="fa fa-circle-o text-secondary" aria-hidden="true"></i>
              Mental</a>
            <a class="dropdown-item bg-light text-dark radius my-1" href="#" @click.prevent="sort('other')">
              <i class="fa fa-circle-o text-info" aria-hidden="true"></i>
              Other</a>
            <a class="dropdown-item bg-light text-dark radius my-1" href="#" @click.prevent="sort('project')">
              <i class="fa fa-circle-o text-danger" aria-hidden="true"></i>
              Project</a>
            <a class="dropdown-item bg-light text-dark radius my-1" href="#" @click.prevent="sort('skill')">
              <i class="fa fa-circle-o text-warning" aria-hidden="true"></i>
              Skill</a>
            <a class="dropdown-item bg-light text-dark radius my-1" href="#" @click.prevent="sort('travel')">
              <i class="fa fa-circle-o text-kody" aria-hidden="true"></i>
              Travel</a>
            <a class="dropdown-item bg-light text-dark radius my-1" href="#" @click.prevent="sortByStatus(false)">
              <i class="fa fa-circle-o" aria-hidden="true"></i>
              Open</a>
            <a class="dropdown-item bg-light text-dark radius my-1" href="#" @click.prevent="sortByStatus(true)">
              <i class="fas fa-times"></i>
              Completed</a>
            <a class="dropdown-item bg-light text-dark radius my-1" href="#" @click.prevent="sortByStatus('all')">
              <i class="fa fa-circle" aria-hidden="true"></i>
              All</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row"> -->
    <div class="row" v-show="!profile.id">
      <div class="col-12 text-center">
        <h1 class="header-text">
          A single <span class="text-moment"> m o m e n t </span>can change everything
        </h1>
        <p>(Start by creating and account and loggin in)</p>
      </div>
    </div>
    <div class="col-12" v-show="((myGoals.length < 1) && profile.id)">
      <ol>
        <h6>
          <li class="mt-3">
            Start by creating a goal
          </li>
          <li class="mt-2">
            Example: "Drink 8 glass of water per day" or "Go to Europe this year"
          </li>
          <li class="mt-2">
            Select when you want to start and end your goal
          </li>
          <li class="mt-2">
            Choose your category
          </li>
          <li class="mt-2">
            Select how often you want to do this goal, ie once a day, week, month, or year
          </li>
          <li class="mt-2">
            Choose how many times you'd like to accomplish your goal
          </li>
          <li class="mt-2">
            Challenge your friends
          </li>
          <li class="mt-2">
            Check your profile to see your progress! 🎉
          </li>
        </h6>
      </ol>
    </div>
    <!-- </div> -->
    <goalsComponent />
  </div>
</template>

<script>
import GoalsComponent from '../components/GoalsComponent'

import { reactive, computed } from 'vue'
import { goalService } from '../services/GoalService'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  components: { GoalsComponent },

  setup(props) {
    const state = reactive({
      newGoal: {
      }
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      goal: computed(() => AppState.newGoal),
      myGoals: computed(() => AppState.myGoals),
      createGoal(newGoal) {
        goalService.createGoal(state.newGoal)
        // state.newGoal.title = ''
        // state.newGoal.category = ''
      },
      recurring(value) {
        AppState.newGoal.recurring = value
      },
      counter(value) {
        AppState.newGoal.counter = value
      },
      challenge(value) {
        AppState.newGoal.challenge = value
      },
      sort(value) {
        AppState.sort = value
        AppState.sortByStatus = {}
        console.log(AppState.sort)
      },
      sortByStatus(value) {
        AppState.sortByStatus = value
        AppState.sort = {}
        console.log(AppState.sortByStatus)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.hideMe input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.text-kody {
  color:#3a7b86;
}

.text-moment{
    font-family: 'Montserrat Alternates', sans-serif;
  color:#3a7b86;
}

.header-text{
  font-size: 3em;
  margin-top: 25vh;
}

</style>
