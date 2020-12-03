<template>
  <div class="minimalNavComponent">
    <div class="row">
      <div class="col-12">
        <div class="d-flex text-dark shadow-lg opacity radius justify-content-between p-2">
          <router-link class="text-dark" :to="{ name: 'Home' }">
            <i class="fa fa-circle-o text-dark fa-3x grow" aria-hidden="true"></i>
          </router-link>
          <router-link :to="{ name: 'Challenges' }" class="text-dark d-flex no-decoration">
            <div class="bauble"></div>
            <i class="fas fa-user-friends text-dark fa-3x grow"></i>
            <div v-if="pending.length > 0" class="rounded-circle bauble  bg-danger d-flex align-self-end ml-1">
              <h6 class="small m-auto text-light">
                {{ pending.length }}
              </h6>
            </div>
            <div v-else class="bauble"></div>
          </router-link>
          <router-link v-if="profile.picture" :to="{ name: 'Profile' }">
            <img :src="profile.picture" height="50" class="rounded-circle grow" alt="">
          </router-link>
          <a v-else class="text-dark" @click="login">
            <i class="fas fa-sign-in-alt grow fa-3x"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'

export default {
  name: 'MinimalNavComponent',
  setup() {
    return {
      profile: computed(() => AppState.profile),
      user: computed(() => AppState.user),
      pending: computed(() => AppState.pending),
      async login() {
        AuthService.loginWithPopup()
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.radius {
  border-radius: 50px;
}

.opacity {
  background-color: rgba(255, 255, 255, 0.212);
}

.bauble {
  height: 17px;
  width: 17px;
}
.no-decoration {
text-decoration: none;
}
</style>
