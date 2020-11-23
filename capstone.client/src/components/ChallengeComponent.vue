<template>
  <div class="challengeComponent row" v-if="challengeProps.participantId == profile.id || challengeProps.creatorId == profile.id">
    <div class="col-12">
      <div class="d-flex radius-25 bg-light text-dark p-2 my-2">
        <img :src="challengeProps.participantImg" height="50" class="rounded-circle mr-auto" alt="">
        <h4 class="my-auto">
          {{ challengeProps.title }}
        </h4>
        <img :src="challengeProps.creatorImg" height="50" class="ml-auto rounded-circle" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  name: 'ChallengeComponent',
  props: ['challengeProps'],
  setup() {
    return {
      profiles: computed(() => AppState.profiles),
      profile: computed(() => AppState.profile)

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.radius-25 {
  border-radius: 30px;
}
</style>
