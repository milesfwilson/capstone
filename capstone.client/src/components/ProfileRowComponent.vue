<template>
  <div class="profileRowComponent row my-2" @click="selectChallenger(profileProps)" v-if="profile.id != profileProps.id">
    <div class="col-10 offset-1">
      <div class="grow d-flex radius-25 p-1" :class="{'bg-light text-dark': profileProps.id == activeChallenger.id}">
        <img :src="profileProps.picture" height="60" class="rounded-circle" alt="">
        <h6 class="my-auto grow ml-3">
          {{ profileProps.name }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>

import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  name: 'ProfileRowComponent',
  props: ['profileProps'],
  setup() {
    return {
      activeChallenger: computed(() => AppState.activeChallenger),
      profile: computed(() => AppState.profile),
      selectChallenger(profile) {
        AppState.activeChallenger = profile
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.grow:hover {
  transform: scale(1.025);
  transition: all .20s ease-in-out;
  opacity: .75;
  }

  .radius-25 {
    border-radius: 35px;
  }
</style>
