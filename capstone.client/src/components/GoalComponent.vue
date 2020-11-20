<template>
  <div class="goalComponent" v-if="goalProps.creatorId == profile.id">
    <div class="col-12">
      <div class="row my-2">
        <div class="col-10 d-flex">
          <h4 :class="{'completed':goalProps.completed}" class="my-auto" @click="crossOffGoal(goalProps.id, goalProps)">
            {{ goalProps.title }}
          </h4>
        </div>
        <div class="col-2 d-flex justify-content-end">
          <button class="btn" data-toggle="collapse" :data-target="'#collapse' + goalProps.id">
            <i class="fa fa-expand text-light" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="row collapse" :id="'collapse' + goalProps.id">
        <div class="col-12 d-flex justify-content-between">
          <div class="d-flex">
            <editGoalComponent :editgoal-props="goalProps" />
            <div class="d-flex" v-if="goalProps.counter">
              <button class="btn" @click="decrement(goalProps.id, goalProps)">
                <i class="fa fa-minus-circle text-light" aria-hidden="true"></i>
              </button>

              <h6 class="my-auto px-2">
                {{ goalProps.progress }} / {{ goalProps.counter }}
              </h6>
              <button class="btn" @click="increment(goalProps.id, goalProps)">
                <i class="fa fa-plus-circle text-light" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <button class="btn" @click="deleteGoal(goalProps.id)">
            <i class="far fa-trash-alt text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goalService } from '../services/GoalService'
import { computed } from 'vue'
import { AppState } from '../AppState'
import EditGoalComponent from '../components/EditGoalComponent'
export default {
  name: 'GoalComponent',
  props: ['goalProps'],
  setup() {
    return {
      profile: computed(() => AppState.profile),
      deleteGoal(id) {
        goalService.deleteGoal(id)
      },
      crossOffGoal(id, goal) {
        goalService.crossOffGoal(id, goal)
      },
      increment(id, goal) {
        goalService.increment(id, goal)
      },
      decrement(id, goal) {
        goalService.decrement(id, goal)
      }
    }
  },
  components: { EditGoalComponent }
}
</script>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}

</style>
