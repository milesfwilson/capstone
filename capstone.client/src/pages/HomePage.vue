<template>
  <div class="home container-fluid">
    <form class="text-center form-group" @submit.prevent="createGoal">
      <input type="text" class="form-control my-2" placeholder="Goal" v-model="state.newGoal.title">
      <!-- <input type="text" class="form-control my-2" placeholder="Category" v-model="state.newGoal.category"> -->
      <h3>Select Category</h3>
      <select v-model="state.newGoal.category">
        <option disabled value="">
          Please select a category
        </option>
        <option>Health</option>
        <option>Mental</option>
        <option>Financial</option>
      </select>
      <input type="number" class="form-control my-2" placeholder="How many would you like to complete?" v-model="state.newGoal.finish">
      <h3>Is this a recurring goal?</h3>
      <button class="btn btn-outline-success" @click.prevent="recurring(true)">
        Yes
      </button>
      <button class="btn btn-outline-danger" @click.prevent="recurring(false)">
        No
      </button>
      <!-- <input type="text" class="form-control my-2" placeholder="How often is this recurring?" v-if="goal.recurring"> -->
      <select v-model="state.newGoal.timeFrame" v-if="goal.recurring">
        <option disabled value="">
          Please select a frequency
        </option>
        <option>Daily</option>
        <option>Weekly</option>
        <option>Monthly</option>
        <option>Yearly</option>
      </select>
      <h3>Does this goal need a counter?</h3>
      <button class="btn btn-outline-success" @click.prevent="counter(true)">
        Yes
      </button>
      <button class="btn btn-outline-danger" @click.prevent="counter(false)">
        No
      </button>
      <input type="text" class="form-control my-2" placeholder="Does this need a counter?" v-if="goal.counter">
      <h3>Would you like to challenge somebody?</h3>
      <button class="btn btn-outline-success" @click.prevent="challenge(true)">
        Yes
      </button>
      <button class="btn btn-outline-danger" @click.prevent="challenge(false)">
        No
      </button>
      <input type="text" class="form-control my-2" placeholder="Enter challenger email" v-if="goal.challenge">
      <div class="row mt-3">
        <div class="col-12 align-items-center">
          <button type="submit" class="btn bg-dark text-light">
            Create
          </button>
        </div>
      </div>
    </form>
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
  setup() {
    const state = reactive({
      newGoal: {
      }
    })
    return {
      state,
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
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
