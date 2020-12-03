<template>
  <nav class="navbar navbar-dark bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <p class="header-font">
        m o m e n t
      </p>
      <div class="d-flex bg-circle ml-2 text-center" v-if="pending.length > 0">
        <h6 class="text-light m-auto">
          {{ pending.length }}
        </h6>
      </div>
    </router-link>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      pending: computed(() => AppState.pending),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--light);
}

.bg-circle{
  background-color: rgb(249, 64, 64);
  border-radius: 50%;
  height: 25px;
  width: 25px;
  }

  .color{
    border-bottom: 5px solid #3a7a86;
  }

  .header-font{
    font-family: 'Montserrat Alternates', sans-serif;
    font-weight: 100;
  }

  .sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
