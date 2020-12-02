<template>
  <div class="createGoalPage container-fluid bg-dark text-light">
    <div class="row">
      <div class="col-12 col-md-2 col-lg-3"></div>
      <div class="col-12 col-md-8 col-lg-6">
        <createGoalComponent />
      </div>
      <div class="col-12 col-md-2 col-lg-3"></div>
    </div>
  </div>
</template>

<script>
import createGoalComponent from '../components/CreateGoalComponent'
export default {
  name: 'CreateGoalPage',
  setup() {
    return {}
  },
  components: { createGoalComponent }
}
</script>

<style lang="scss" scoped>

</style>
