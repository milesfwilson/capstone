<template>
  <div class="createGoalComponent">
    <h4>Would you like to challenge somebody?</h4>

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

    <transition-group name="fade">
      <newChallengeComponent v-if="goal.challenge" />
    </transition-group>
    <form class="form-group hideMe" @submit.prevent="createGoal">
      <h4 class="my-2">
        What is your goal?
      </h4>
      <input type="text" id="goalTitle" class="form-control my-2 bg-transparent border border-0 text-light" placeholder="Enter goal" v-model="state.newGoal.title">
      <h4 class="my-2">
        What is your start date?
      </h4>
      <input type="date" id="endDate" class="form-control my-2 bg-transparent border border-0 text-light" placeholder="End Date" v-model="state.newGoal.startDate">
      <h4 class="my-2">
        What is your end date?
      </h4>
      <input type="date" id="endDate" class="form-control my-2 bg-transparent border border-0 text-light" placeholder="End Date" v-model="state.newGoal.endDate">
      <h4>Select Category</h4>
      <div class="row">
        <div class="col-10 offset-1 d-flex justify-content-around flex-wrap">
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
        </div>
      </div>
      <h4 class="my-2">
        Is this a recurring goal?
      </h4>
      <div class=" d-flex justify-content-around">
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
      <transition-group name="fade">
        <span class="row mt-3" v-if="goal.recurring">
          <div class="col-10 offset-1 d-flex justify-content-around hideMe ">
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
      </transition-group>
      <h4 class="mt-3">
        Does this goal need a counter?
      </h4>

      <div class="d-flex justify-content-around">
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
      <transition name="fade">
        <input type="number" class="form-control my-2" placeholder="How many would you like to complete?" v-model="state.newGoal.counter" v-if="goal.counter">
      </transition>

      <div class="row mt-3">
        <div class="col-12 d-flex justify-content-center">
          <button type="submit" class="btn text-light">
            <h3>
              Submit
            </h3>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import NewChallengeComponent from '../components/NewChallengeComponent'

import { reactive, computed } from 'vue'
import { goalService } from '../services/GoalService'
import { AppState } from '../AppState'
import { DateTime } from 'luxon'

export default {
  name: 'CreateGoalComponent',
  components: { NewChallengeComponent },
  setup() {
    const state = reactive({
      newGoal: {
        lastDate: DateTime.local().plus({ month: 1 }).toISOWeekDate()

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

button {
  width: 50%;
  height: 50px;
}

label {
  width: 20%;
  border-radius: 25px;

}

</style>
