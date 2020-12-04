<template>
  <div class="minimalNavComponent">
    <div class="row">
      <div class="col-12">
        <div class="radius p-2 shadow-lg border-height ">
          <div class="d-flex text-dark shadow-lg opacity radius justify-content-between p-3">
            <router-link class="text-dark" :to="{ name: 'Home' }">
              <i class="fa fa-home text-dark fa-2x grow" aria-hidden="true"></i>
            </router-link>
            <router-link :to="{ name: 'Challenges' }" class="text-dark d-flex no-decoration grow">
              <i class="fas fa-user-friends text-dark fa-2x"></i>
              <div v-if="pending.length > 0" class="rounded-circle bauble  bg-danger d-flex align-self-end">
                <h6 class="small m-auto text-light">
                  {{ pending.length }}
                </h6>
              </div>
              <div v-else class="bauble d-flex align-self-end rounded-circle bauble  d-flex">
                <h6 class="m-auto small">
                </h6>
              </div>
            </router-link>
            <router-link v-if="profile.picture" :to="{ name: 'Profile' }">
              <img :src="profile.picture" height="35" class="rounded-circle grow" alt="">
            </router-link>
            <a v-else class="text-dark" @click.prevent="login()">
              <i class="fas fa-sign-in-alt grow fa-2x"></i>
            </a>
            <div v-if="profile.picture"
                 class="text-dark"
                 @click="logout"
            >
              <i class="fa fa-sign-out fa-2x grow" aria-hidden="true"></i>
            </div>
            <router-link class="text-dark" :to="{ name: 'About' }">
              <i class="fa fa-info-circle text-dark fa-2x grow" aria-hidden="true"></i>
            </router-link>
          </div>
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
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
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
// .border-height{
//   border: 5px solid #3a7a86;
//   // backdrop-filter: blur(8px);

// }

.opacity {
  background-color: #ffffff87;
  backdrop-filter: blur(3px);

}

.bauble {
  height: 17px;
  width: 17px;
  margin-left: -7px;

}
.no-decoration {
text-decoration: none;
}

.padding{
  padding-left: 5px;
}
</style>
