<template>
  <div class="activeGoalsComponent">
    <div class="col-12">
      <li>
        <h6 class="text-light" v-if="profile.id === goalProps.creatorId">
          {{ goalProps.title }}
        </h6>
      </li>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'ActiveGoalsComponent',
  props: ['goalProps'],
  setup() {
    return {
      activeGoals: computed(() => AppState.goals),
      profile: computed(() => AppState.profile)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
