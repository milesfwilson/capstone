<template>
  <header>
    <Navbar />
  </header>
  <main class="bg-dark main-footer">
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer class="footer-card footer bg-transparent">
    <div class="container">
      <div class="row">
        <div class="col-2 col-md-3"></div>
        <div class="col-8 col-md-6">
          <div class="mb-5">
            <minimal-nav-component />
          </div>
        </div>
        <div class="col-2 col-md-3"></div>
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

.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
}

.main-footer{
  padding-bottom: 100px;
}

</style>
