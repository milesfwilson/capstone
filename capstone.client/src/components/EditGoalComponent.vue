<template>
  <div class="editGoalComponent">
    <button class="btn" data-toggle="modal" :data-target="'#modal'+editgoalProps.id">
      <i class="far fa-edit text-light"></i>
    </button>

    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade"
         :id="'modal'+editgoalProps.id"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog text-dark" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modal title
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ editgoalProps.title }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditGoalComponent',
  props: ['editgoalProps'],
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
