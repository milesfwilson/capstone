<template>
  <!-- <div v-for="challenge in challenges" :key="challenge.id" :goalProps="goalProps">
    <div v-if="((challenge.id == goalProps.challengeId) && (challenge.accepted && !challenge.rejected) && (profile.id == goalProps.creatorId)) || ((!goalProps.challengeId) && (profile.id == goalProps.creatorId))">
      {{ challenge.title }}
    </div>
  </div> -->

  <div class="goalComponent" v-if="(goalProps.creatorId == profile.id) && ((goalProps.category == sort || (goalProps.category== {} || sortByStatus == 'all')) || (goalProps.completed == sortByStatus || (goalProps.completed == {} || sortByStatus == 'all')))">
    <div class="col-12">
      <div class="row my-1">
        <div class="col-10 d-flex">
          <div v-if="goalProps.counter" class="bg-light rounded mr-2 move-left align-self-center" :style="'width: 3px; height:'+ goalProps.progress/goalProps.counter*100+'%'">
          </div>

          <div v-else class=" mr-2 " style="width: 3px">
          </div>
          <h4 :class="{'completed':goalProps.completed}" class="my-auto grow" @click="crossOffGoal(goalProps.id, goalProps)">
            {{ goalProps.title }}
          </h4>
        </div>
        <div class="col-2 d-flex justify-content-end">
          <button class="btn grow" data-toggle="collapse" :data-target="'#collapse' + goalProps.id">
            <i class="fas fa-ellipsis-v text-light"></i>
          </button>
        </div>
      </div>
      <div class="row collapse" :id="'collapse' + goalProps.id">
        <div class="col-12 d-flex justify-content-between">
          <editGoalComponent :editgoal-props="goalProps" />
          <div class="d-flex">
            <div class="d-flex" v-if="goalProps.counter">
              <button class="btn grow" @click="decrement(goalProps.id, goalProps)">
                <i class="fa fa-minus-circle text-light" aria-hidden="true"></i>
              </button>

              <h6 class="my-auto px-2">
                {{ goalProps.progress }} / {{ goalProps.counter }}
              </h6>

              <button class="btn grow" @click="increment(goalProps.id, goalProps)">
                <i class="fa fa-plus-circle text-light" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <button class="btn grow" @click="deleteGoal(goalProps.id)">
            <i class="far fa-trash-alt text-light"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goalService } from '../services/GoalService'
import { computed } from 'vue'
import { AppState } from '../AppState'
import EditGoalComponent from '../components/EditGoalComponent'
export default {
  name: 'GoalComponent',
  props: ['goalProps'],
  setup() {
    return {
      profile: computed(() => AppState.profile),
      sort: computed(() => AppState.sort),
      sortByStatus: computed(() => AppState.sortByStatus),
      challenges: computed(() => AppState.challenges),
      deleteGoal(id) {
        goalService.deleteGoal(id)
      },
      crossOffGoal(id, goal) {
        goalService.crossOffGoal(id, goal)
      },
      increment(id, goal) {
        goalService.increment(id, goal)
      },
      decrement(id, goal) {
        goalService.decrement(id, goal)
      }
    }
  },
  components: { EditGoalComponent }
}
</script>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}

.move-left {
  position: relative;
  left: -10px;
}

.grow:hover {
  transform: scale(1.025);
  transition: all .20s ease-in-out;
  opacity: .75;
  }

</style>
