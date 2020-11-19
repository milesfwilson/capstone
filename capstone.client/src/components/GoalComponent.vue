<template>
  <div class="goalComponent">
    <div class="col-12">
      <div class="row">
        <div class="col-12">
          <h6 data-toggle="collapse" :data-target="'#collapse' + goalProps.id">
            {{ goalProps.title }}
          </h6>
        </div>
      </div>
      <div class="row collapse" :id="'collapse' + goalProps.id">
        <div class="col-12">
          <i class="far fa-trash-alt text-danger"></i>
          hello
        </div>
      </div>
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
