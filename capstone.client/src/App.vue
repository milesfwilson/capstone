<template>
  <header>
    <Navbar />
  </header>
  <main class="bg-dark">
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer class="footer bg-dark">
    <div class="container">
      <div class="row">
        <div class="col-3 col-md-4"></div>
        <div class="col-6 col-md-4">
          <div class="mb-5">
            <minimal-nav-component />
          </div>
        </div>
        <div class="col-3 col-md-4"></div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
