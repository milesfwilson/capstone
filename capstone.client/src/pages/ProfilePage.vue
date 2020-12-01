<template>
  <div class="about container-fluid">
    <div class="row mt-3">
      <div class="col-4">
        <img class="rounded-circle img-fluid" :src="profile.picture" alt="" />
      </div>
      <div class="col-8 d-flex">
        <h3 class="my-auto text-light">
          {{ profile.name }}
        </h3>
      </div>
    </div>
    <div class="row mt-3 bg-dark">
      <div class="col-6 d-flex">
        <h5 class="text-success my-auto py-2">
          Goals Completed: {{ profile.completed }}
        </h5>
      </div>
      <div class="col-6 d-flex">
        <h5 class="text-danger my-auto py-2">
          Goals in Progress:
        </h5>
      </div>
    </div>
    <div class="row mt-3">
      <img src="https://heap.io/wp-content/uploads/2017/11/interactive-line-graph.png" class="img-fluid" alt="">
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <h2 class="text-center text-light">
          See Goals
        </h2>
      </div>
    </div>
    <ul>
      <active-goals-component v-for="goal in activeGoals" :key="goal" :goal-props="goal" />
    </ul>
    <div class="row">
      <div class="col-12 text-center">
        <h2>Go to Challenges</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import ActiveGoalsComponent from '../components/ActiveGoalsComponent.vue'
export default {
  components: { ActiveGoalsComponent },
  name: 'Profile',
  setup() {
    return {
      profile: computed(() => AppState.profile),
      activeGoals: computed(() => AppState.goals)

    }
  }
}
</script>

<style scoped>

</style>
