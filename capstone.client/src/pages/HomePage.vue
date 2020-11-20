<template>
  <div class="home container-fluid bg-dark text-light">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <button class="mt-3 btn text-light" data-toggle="collapse" data-target="#contentId">
          <h3>
            Create
          </h3>
        </button>
      </div>
    </div>
    <div class="row collapse" id="contentId">
      <div class="col-12 hideMe">
        <h4>Would you like to challenge somebody?</h4>
        <div class="col-6">
          <div class="d-flex justify-content-around">
            <button class="btn btn-outline-light" @click.prevent="challenge(true)">
              <h4>
                Yes
              </h4>
            </button>
            <button class="btn btn-outline-light" @click.prevent="challenge(false)">
              <h4>
                No
              </h4>
            </button>
          </div>
        </div>
        <newChallengeComponent v-if="goal.challenge" />
        <form class="form-group" @submit.prevent="createGoal">
          <h4 class="my-2">
            What is your goal?
          </h4>
          <input type="text" id="goalTitle" class="form-control my-2" placeholder="What is your goal?" v-model="state.newGoal.title">
          <h4>Select Category</h4>

          <label class="btn btn-outline-light m-1">
            <input type="radio"
                   value="mental"
                   name="mental"
                   id="mental"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Mental
          </label>
          <label class="btn btn-outline-light m-1">
            <input type="radio"
                   value="finance"
                   name="options"
                   id="finance"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Finance
          </label>
          <label class="btn btn-outline-light m-1">
            <input type="radio"
                   value="health"
                   name="options"
                   id="health"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Health
          </label>
          <label class="btn btn-outline-light m-1">
            <input type="radio"
                   value="skill"
                   name="options"
                   id="skill"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Skill
          </label>
          <label class="btn btn-outline-light m-1">
            <input type="radio"
                   value="project"
                   name="options"
                   id="project"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Project
          </label>
          <label class="btn btn-outline-light m-1">
            <input type="radio"
                   value="travel"
                   name="options"
                   id="travel"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Travel
          </label>
          <label class="btn btn-outline-light m-1">
            <input type="radio"
                   value="other"
                   name="other"
                   id="other"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Other
          </label>

          <h4 class="my-2">
            Is this a recurring goal?
          </h4>
          <div class="col-6 d-flex justify-content-around">
            <button class="btn btn-outline-light" @click.prevent="recurring(true)">
              <h4>
                Yes
              </h4>
            </button>
            <button class="btn btn-outline-light" @click.prevent="recurring(false)">
              <h4>
                No
              </h4>
            </button>
          </div>
          <span class="row mt-3" v-if="goal.recurring">
            <div class="col hideMe">
              <label class="btn btn-outline-light m-1">
                <input type="radio"
                       value="daily"
                       name="daily"
                       id="daily"
                       autocomplete="off"
                       v-model="state.newGoal.timeFrame"
                > Daily
              </label>
              <label class="btn btn-outline-light m-1">
                <input type="radio"
                       value="weekly"
                       name="weekly"
                       id="weekly"
                       autocomplete="off"
                       v-model="state.newGoal.timeFrame"
                > Weekly
              </label>
              <label class="btn btn-outline-light m-1">
                <input type="radio"
                       value="monthly"
                       name="monthly"
                       id="monthly"
                       autocomplete="off"
                       v-model="state.newGoal.timeFrame"
                > Monthly
              </label>
              <label class="btn btn-outline-light m-1">
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
          <h4>Does this goal need a counter?</h4>
          <div class="col-6 d-flex justify-content-around">
            <button class="btn btn-outline-light" @click.prevent="counter(true)">
              <h4>
                Yes
              </h4>
            </button>
            <button class="btn btn-outline-light" @click.prevent="counter(false)">
              <h4>
                No
              </h4>
            </button>
          </div>
          <input type="number" class="form-control my-2" placeholder="How many would you like to complete?" v-model="state.newGoal.counter" v-if="goal.counter">

          <div class="row mt-3">
            <div class="col-12 d-flex justify-content-center">
              <button type="submit" class="btn bg-dark text-light">
                <h3>
                  Submit
                </h3>
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
import NewChallengeComponent from '../components/NewChallengeComponent'

import { reactive, computed } from 'vue'
import { goalService } from '../services/GoalService'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  components: { GoalsComponent, NewChallengeComponent },
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

.hideMe input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}
</style>
