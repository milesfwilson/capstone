<template>
  <div class="createGoalComponent">
    <h4 v-if="!reveal">
      Would you like to challenge somebody?
    </h4>

    <div class="d-flex justify-content-around" v-if="!reveal">
      <button class="btn btn-outline-light"
              @click.prevent="challenge(true)"
      >
        <h4>
          Yes
        </h4>
      </button>
      <button class="
              btn
              btn-outline-light"
              @click.prevent="challenge(false), revealForm(true)"
      >
        <h4>
          No
        </h4>
      </button>
    </div>

    <transition-group name="fade">
      <newChallengeComponent v-if="goal.challenge" />
    </transition-group>
    <p v-if="activeChallenge.id" class="text-danger">
      Challenge will not be sent unless goal is also submitted
    </p>
    <form class="form-group hideMe" @submit.prevent="createGoal" v-if="reveal">
      <h4 class="my-2">
        What is your goal?
      </h4>
      <input type="text" id="goalTitle" class="form-control my-2 bg-transparent border border-0 text-light" placeholder="Enter goal" v-model="state.newGoal.title">
      <h4 class="my-2">
        What is your start date?
      </h4>
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <input type="date"
                 id="endDate"
                 class="my-2 bg-light border border-0 text-dark radius-25 p-2"
                 v-model="state.newGoal.startDate"
                 required
          >
        </div>
      </div>
      <h4 class="my-2">
        What is your end date?
      </h4>
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <input type="date"
                 id="endDate"
                 class="my-2 bg-light border border-0 text-dark radius-25 p-2"
                 v-model="state.newGoal.endDate"
                 required
          >
        </div>
      </div>
      <h4>Select Category</h4>
      <div class="row">
        <div class="col-12 d-flex justify-content-around flex-wrap">
          <label class="btn btn-outline-light m-1 p-1"
                 :class="{'bg-light text-dark': state.newGoal.category ==
                   'mental'}"
          >
            <input type="radio"
                   value="mental"
                   name="mental"
                   id="mental"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Mental
          </label>
          <label class="btn btn-outline-light m-1 p-1"
                 :class="{'bg-light text-dark': state.newGoal.category ==
                   'finance'}"
          >
            <input type="radio"
                   value="finance"
                   name="options"
                   id="finance"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Finance
          </label>
          <label class="btn btn-outline-light m-1 p-1"
                 :class="{'bg-light text-dark': state.newGoal.category ==
                   'health'}"
          >
            <input type="radio"
                   value="health"
                   name="options"
                   id="health"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Health
          </label>
          <label class="btn btn-outline-light m-1 p-1"
                 :class="{'bg-light text-dark': state.newGoal.category ==
                   'skill'}"
          >
            <input type="radio"
                   value="skill"
                   name="options"
                   id="skill"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Skill
          </label>
          <label class="btn btn-outline-light m-1 p-1"
                 :class="{'bg-light text-dark': state.newGoal.category ==
                   'project'}"
          >
            <input type="radio"
                   value="project"
                   name="options"
                   id="project"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Project
          </label>
          <label class="btn btn-outline-light m-1 p-1"
                 :class="{'bg-light text-dark': state.newGoal.category ==
                   'travel'}"
          >
            <input type="radio"
                   value="travel"
                   name="options"
                   id="travel"
                   autocomplete="off"
                   v-model="state.newGoal.category"
            > Travel
          </label>
          <label class="btn btn-outline-light m-1 p-1"
                 :class="{'bg-light text-dark': state.newGoal.category ==
                   'other'}"
          >
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
          <div class="col-12 d-flex justify-content-around hideMe ">
            <label class="btn btn-outline-light m-1 p-1"
                   :class="{'bg-light text-dark': state.newGoal.timeFrame ==
                     'day'}"
            >
              <input type="radio"
                     value="day"
                     name="day"
                     id="day"
                     autocomplete="off"
                     v-model="state.newGoal.timeFrame"
              > Daily
            </label>
            <label class="btn btn-outline-light m-1 p-1"
                   :class="{'bg-light text-dark': state.newGoal.timeFrame ==
                     'week'}"
            >
              <input type="radio"
                     value="week"
                     name="week"
                     id="week"
                     autocomplete="off"
                     v-model="state.newGoal.timeFrame"
              > Weekly
            </label>
            <label class="btn btn-outline-light m-1 pl-1"
                   :class="{'bg-light text-dark': state.newGoal.timeFrame ==
                     'month'}"
            >
              <input type="radio"
                     value="month"
                     name="month"
                     id="month"
                     autocomplete="off"
                     v-model="state.newGoal.timeFrame"
              > Monthly
            </label>
            <label class="btn btn-outline-light m-1 p-1"
                   :class="{'bg-light text-dark': state.newGoal.timeFrame ==
                     'year'}"
            >
              <input type="radio"
                     value="year"
                     name="year"
                     id="year"
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
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <input type="number"
                   class="p-2 radius-25 my-2 bg-light text-dark border-0 w-50 text-center"
                   placeholder="How many?"
                   v-model="state.newGoal.counter"
                   v-if="goal.counter"
                   min="1"
                   max="10000"
            >
          </div>
        </div>
      </transition>

      <div class="row mt-3">
        <div class="col-12 d-flex justify-content-center">
          <button type="submit" class="btn btn-outline-light">
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
        startDate: DateTime.local()
      }
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      goal: computed(() => AppState.newGoal),
      reveal: computed(() => AppState.reveal),
      activeChallenge: computed(() => AppState.activeChallenge),
      createGoal(newGoal) {
        goalService.createGoal(state.newGoal)
        state.newGoal.title = ''
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
      revealForm(value) {
        AppState.reveal = value
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

.radius-25{
border-radius: 35px;
}

</style>
