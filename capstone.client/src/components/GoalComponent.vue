<template>
  <div class="goalComponent">
    <div class="col-12">
      <h6>
        {{ goalProps.title }}
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoalComponent',
  props: ['goalProps'],
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
