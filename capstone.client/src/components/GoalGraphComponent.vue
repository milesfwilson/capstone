<template>
  <div class="goalGraphComponent align-self-end" :style="'width:' + 1 / myGoals.length * 100 + 'px'" v-if="((goalProps.timeFrame && ((goalProps.timeFrame == sortByTimeFrame))))">
    <div v-if="(goalProps.timeFrame && ((goalProps.timeFrame == sortByTimeFrame)))" class="gradient-progress graph grow" :style="'height:' + goalProps.progress / goalProps.counter * 100 + 'px'" @mouseover="showDetails(goalProps)">
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'GoalGraphComponent',
  props: ['goalProps'],
  setup() {
    return {
      sortByTimeFrame: computed(() => AppState.sortByTimeFrame),
      myGoals: computed(() => AppState.myGoals),
      showDetails(goalProps) {
        AppState.activeGoal = goalProps
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.graph {
  width: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
