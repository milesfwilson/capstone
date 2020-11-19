<template>
  <div class="home container-fluid">
    <button class="mt-3 btn btn-outline-success btn-block" data-toggle="collapse" data-target="#contentId">
      Create New Goal
    </button>
    <div class="row collapse" id="contentId">
      <div class="col-12">
        <form class="form-group" @submit.prevent="createGoal">
          <small class="text-muted" for="goalTitle">What is your goal?</small>
          <input type="text" id="goalTitle" class="form-control my-2" placeholder="What is your goal?" v-model="state.newGoal.title">
          <h6>Select Category</h6>
          <label class="btn btn-outline-dark">
            <input type="radio"
                   value="mental"
                   name="mental"
                   id="mental"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Mental
          </label>
          <label class="btn btn-outline-dark">
            <input type="radio"
                   value="finance"
                   name="options"
                   id="finance"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Finance
          </label>
          <label class="btn btn-outline-dark">
            <input type="radio"
                   value="health"
                   name="options"
                   id="health"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Health
          </label>
          <label class="btn btn-outline-dark">
            <input type="radio"
                   value="skill"
                   name="options"
                   id="skill"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Skill
          </label>
          <label class="btn btn-outline-dark">
            <input type="radio"
                   value="project"
                   name="options"
                   id="project"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Project
          </label>
          <label class="btn btn-outline-dark">
            <input type="radio"
                   value="travel"
                   name="options"
                   id="travel"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Travel
          </label>
          <label class="btn btn-outline-dark">
            <input type="radio"
                   value="other"
                   name="other"
                   id="other"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Other
          </label>
          <h6>Is this a recurring goal?</h6>
          <button class="btn btn-outline-success" @click.prevent="recurring(true)">
            Yes
          </button>
          <button class="btn btn-outline-danger" @click.prevent="recurring(false)">
            No
          </button>
          <span class="row mt-3" v-if="goal.recurring">
            <div class="col">
              <label class="btn btn-outline-dark">
                <input type="radio"
                       value="daily"
                       name="daily"
                       id="daily"
                       autocomplete="off"
                       v-model="state.newGoal.timeFrame"
                > Daily
              </label>
              <label class="btn btn-outline-dark">
                <input type="radio"
                       value="weekly"
                       name="weekly"
                       id="weekly"
                       autocomplete="off"
                       v-model="state.newGoal.timeFrame"
                > Weekly
              </label>
              <label class="btn btn-outline-dark">
                <input type="radio"
                       value="monthly"
                       name="monthly"
                       id="monthly"
                       autocomplete="off"
                       v-model="state.newGoal.timeFrame"
                > Monthly
              </label>
              <label class="btn btn-outline-dark">
                <input type="radio"
                       value="yearly"
                       name="yearly"
                       id="yearly"
                       autocomplete="off"
                       v-model="state.newGoal.timeFrame"
                > Yearly
              </label>
            </div>
          </span>
          <h6>Does this goal need a counter?</h6>
          <button class="btn btn-outline-success" @click.prevent="counter(true)">
            Yes
          </button>
          <button class="btn btn-outline-danger" @click.prevent="counter(false)">
            No
          </button>
          <input type="number" class="form-control my-2" placeholder="How many would you like to complete?" v-model="state.newGoal.counter" v-if="goal.counter">
          <h6>Would you like to challenge somebody?</h6>
          <button class="btn btn-outline-success" @click.prevent="challenge(true)">
            Yes
          </button>
          <button class="btn btn-outline-danger" @click.prevent="challenge(false)">
            No
          </button>
          <input type="text" class="form-control my-2" placeholder="Enter challenger email" v-model="state.newGoal.challengeId" v-if="goal.challenge">
          <div class="row mt-3">
            <div class="col-12 align-items-center">
              <button type="submit" class="btn bg-dark text-light">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
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
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
