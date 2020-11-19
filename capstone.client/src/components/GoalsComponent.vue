<template>
  <div class="GoalsComponent container-fluid">
    <div class="col-12">
      <div class="p-2 m-2 bg-dark text-light rounded">
        <goalComponent v-for="goal in goals" :goal-props="goal" :key="goal.id" class="row" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import GoalComponent from '../components/GoalComponent'
export default {
  name: 'GoalsComponent',
  setup() {
    return {
      goals: computed(() => AppState.goals)
    }
  },
  components: { GoalComponent }
}
</script>

<style lang="scss" scoped>

</style>
