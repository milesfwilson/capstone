<template>
  <div class="goalChallengeComponent row" v-if="goalProps.challengeId">
    <div v-if="goalProps.challengeId == challengeProps.id">
      <div>
        <h6>
          {{ goalProps.title }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoalChallengeComponent',
  props: ['goalProps', 'challengeProps'],
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
