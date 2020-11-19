<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <form class="text-center" @submit.prevent="createGoal">
      <input type="text" class="form-control" placeholder="Goal" v-model="state.newGoal.title">
      <input type="text" class="form-control" placeholder="Category" v-model="state.newGoal.Category">
      <button type="submit" class="btn bg-dark text-light">
        Create
      </button>
    </form>
    <goalsComponent />
  </div>
</template>

<script>
import GoalsComponent from '../components/GoalsComponent'
import { reactive } from 'vue'
import { goalService } from '../services/GoalService'
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
      createGoal(newGoal) {
        goalService.createGoal(state.newGoal)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
