<template>
  <div class="home container-fluid bg-dark text-light">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6 d-flex justify-content-center">
        <router-link :to="{ name: 'Create' }" class="mt-3 btn text-light">
          <h3>
            Create Goal
          </h3>
        </router-link>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <div class="dropdown">
          <button class="btn btn-outline-light dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            Sort
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" @click.prevent="sort('finance')">Finance</a>
            <a class="dropdown-item" href="#" @click.prevent="sort('health')">Health</a>
            <a class="dropdown-item" href="#" @click.prevent="sort('mental')">Mental</a>
            <a class="dropdown-item" href="#" @click.prevent="sort('other')">Other</a>
            <a class="dropdown-item" href="#" @click.prevent="sort('project')">Project</a>
            <a class="dropdown-item" href="#" @click.prevent="sort('skill')">Skill</a>
            <a class="dropdown-item" href="#" @click.prevent="sort('travel')">Travel</a>
            <a class="dropdown-item" href="#" @click.prevent="sortByStatus(false)">Open</a>
            <a class="dropdown-item" href="#" @click.prevent="sortByStatus(true)">Completed</a>
            <a class="dropdown-item" href="#" @click.prevent="sortByStatus('all')">All</a>
          </div>
        </div>
      </div>
    </div>
    <goalsComponent />
  </div>
</template>

<script>
import GoalsComponent from '../components/GoalsComponent'

import { reactive, computed, onMounted } from 'vue'
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
    onMounted(() => goalService.updateGoal())
    return {
      state,
      profile: computed(() => AppState.profile),
      goal: computed(() => AppState.newGoal),
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
</style>
