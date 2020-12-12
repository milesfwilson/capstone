<template>
  <!-- <div v-for="challenge in challenges" :key="challenge.id" :goalProps="goalProps">
    <div v-if="((challenge.id == goalProps.challengeId) && (challenge.accepted && !challenge.rejected) && (profile.id == goalProps.creatorId)) || ((!goalProps.challengeId) && (profile.id == goalProps.creatorId))">
      {{ challenge.title }}
    </div>
  </div> -->

  <div class="goalComponent" v-if="(goalProps.creatorId == profile.id) && acceptedChallengeGoal(challenges, goalProps) && ((goalProps.category == sort || (goalProps.category== {} || sortByStatus == 'all')) || (goalProps.completed == sortByStatus || (goalProps.completed == {} || sortByStatus == 'all')))">
    <div class="col-12">
      <div class="row my-1">
        <div class="col-10 d-flex">
          <div v-if="goalProps.counter" class="bg-light rounded mr-2 move-left align-self-center" :style="'width: 3px; height:'+ goalProps.progress/goalProps.counter*100+'%'">
          </div>

          <div v-else class=" mr-2 " style="width: 3px">
          </div>
          <h4 :class="{'completed':goalProps.completed}" class="my-auto grow expired" v-if="(Number(goalProps.endDate.split('-').join('').split('T').splice(0,1).join(''))) < (Number(date.split('-').join('')))">
            {{ goalProps.title }}
          </h4>

          <h4 :class="{'completed':goalProps.completed}" class="my-auto grow" @click="crossOffGoal(goalProps.id, goalProps)" v-if="(Number(goalProps.endDate.split('-').join('').split('T').splice(0,1).join(''))) > (Number(date.split('-').join('')))">
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
          <!-- <editGoalComponent :editgoal-props="goalProps" /> -->
          <div class="d-flex">
            <div class="d-flex" v-if="goalProps.counter">
              <button class="btn grow" @click="decrement(goalProps.id, goalProps)" v-show="(Number(goalProps.endDate.split('-').join('').split('T').splice(0,1).join(''))) > (Number(date.split('-').join('')))">
                <i class="fa fa-minus-circle text-light" aria-hidden="true"></i>
              </button>

              <h6 class="my-auto px-2">
                {{ goalProps.progress }} / {{ goalProps.counter }}
              </h6>
              <button class="btn grow" @click="increment(goalProps.id, goalProps)" v-show="(Number(goalProps.endDate.split('-').join('').split('T').splice(0,1).join(''))) > (Number(date.split('-').join('')))">
                <i class="fa fa-plus-circle text-light" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <button class="btn grow" @click="deleteGoal(goalProps.id)">
            <i class="far fa-trash-alt text-light"></i>
          </button>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-12 d-flex justify-content-around">
              <div class="d-flex bg-light text-dark px-2 radius">
                <i class="fa fa-clock-o my-auto" aria-hidden="true"></i>
                <p class="my-auto pl-2">
                  {{ goalDate(goalProps).toLowerCase() }}
                </p>
              </div>
              <div class="d-flex bg-light text-dark px-2 radius" v-if="goalProps.recurring">
                <i class="fa fa-calendar-o my-auto" aria-hidden="true"></i>
                <p class="my-auto pl-2">
                  every {{ goalProps.timeFrame }}
                </p>
              </div>
              <div class="d-flex bg-light text-dark px-2 radius">
                <i class="fa fa-circle-o my-auto" aria-hidden="true"></i> <p class="my-auto pl-2">
                  {{ goalProps.category }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goalService } from '../services/GoalService'
// import { challengeService } from '../services/ChallengeService'
import { computed } from 'vue'
import { AppState } from '../AppState'
import swal from 'sweetalert'
import { DateTime } from 'luxon'
// import EditGoalComponent from '../components/EditGoalComponent'
export default {
  name: 'GoalComponent',
  props: ['goalProps'],
  setup() {
    return {
      profile: computed(() => AppState.profile),
      sort: computed(() => AppState.sort),
      sortByStatus: computed(() => AppState.sortByStatus),
      challenges: computed(() => AppState.challenges),
      date: computed(() => AppState.date),
      deleteGoal(id) {
        swal({
          title: 'Are you sure?',
          text: 'Once deleted, your goal will be gone forever!',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
          position: 'top-end'
        })
          .then((willDelete) => {
            if (willDelete) {
              goalService.deleteGoal(id)
              swal('Your goal has been deleted!', {
                icon: 'https://www.miqols.org/toolbox2/isp/img/toggle_checked.png'

              })
            } else {
              swal('Your goal is safe! Keep working on it!')
            }
          })
      },
      crossOffGoal(id, goal) {
        goalService.crossOffGoal(id, goal)
      },
      increment(id, goal) {
        goalService.increment(id, goal)
      },
      decrement(id, goal) {
        goalService.decrement(id, goal)
      },
      acceptedChallengeGoal(challenges, goalProps) {
        if (goalProps.challengeId) {
          for (let i = 0; i < challenges.length; i++) {
            if (challenges[i].id === goalProps.challengeId) {
              return challenges[i].accepted
            }
          }
          return true
        } else if (!goalProps.challengeId) {
          return true
        }
        // challengeService.acceptedChallengeGoal(goalProps)
      },
      goalDate(goal) {
        return DateTime.fromISO(goal.endDate).toFormat('DDDD')
      }

    }
  },
  components: { }
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

  .expired {
    color: gray;
  }

</style>
