<template>
  <div class="about container-fluid">
    <div class="row">
      <div class="col-8 offset-2">
        <div class="row" v-if="profile.picture">
          <div class="col-12">
            <img class="rounded-circle" height="150" :src="profile.picture" alt="" />
            <h3 class="text-center text-light">
              {{ profile.email.split('@').splice(0,1).join('') }}
            </h3>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 d-flex">
            <div :style="'width:' + 1 / myGoals.length * 100 + '%'" v-for="goal in myGoals" :key="goal.id" class="align-self-end">
              <div class="bg-success graph grow" :style="'height:' + goal.progress / goal.counter * 100 + 'px'">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12" v-if="profile.completed > 0">
            {{ (profile.completed) / (profile.completed + profile.failures) * 100 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'

export default {
  components: { },
  name: 'Profile',
  setup() {
    return {
      profile: computed(() => AppState.profile),
      activeGoals: computed(() => AppState.goals),
      myGoals: computed(() => AppState.myGoals)

    }
  }
}
</script>

<style scoped>
.graph {
  width: 80%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
