<template>
  <div class="profileListComponent row">
    <div class="col-12 overflow-auto height">
      <profileRowComponent v-for="profile in profiles" :key="profile.id" :profile-props="profile" class="" />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
import ProfileRowComponent from '../components/ProfileRowComponent'
export default {
  name: 'ProfileListComponent',
  setup() {
    return {
      profiles: computed(() => AppState.profiles)
    }
  },
  components: { ProfileRowComponent }
}
</script>

<style lang="scss" scoped>
.height {
  height: 40vh;
}
</style>
