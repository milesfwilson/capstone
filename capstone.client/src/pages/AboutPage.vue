<template>
  <div class="about container-fluid text-light">
    <div class="row bg-about p-5">
      <div class="col-12 my-auto">
        <h1 class="text-center">
          - Our Mission -
        </h1>
        <div class="row mt-3 text-center">
          <div class="col-12">
            <h5>
              To make accomplishing your goals more achievable
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-center mt-3">
      <div class="col-12">
        <h2>
          About
        </h2>
        <div class="text-justify mb-2">
          <p>
            It is scientifically proven that you have a better chance of accomplishing your goals if you have them documented. Our goal is to help you achieve them by allowing you to keep track of each goal, update your goals, and challenge other to help push you to accomplish each and every goal.
          </p>
        </div>
        <div class="row bg-light text-dark color">
          <div class="col-10 offset-1">
            <h5>Steps to take:</h5>
            <p>
              <i class="fas fa-chevron-right"></i> Think of a goal
            </p>
            <p><i class="fas fa-chevron-right"></i> Create a goal</p>
            <p><i class="fas fa-chevron-right"></i> Challenge another user (optional)</p>
            <p><i class="fas fa-chevron-right"></i> Kick that goals butt!</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-12">
        <h2>
          Our Team
        </h2>
      </div>
      <div class="col-3">
        <h6>Chris Griffin</h6>
      </div>
      <div class="col-3">
        <h6>Kody Dudley</h6>
      </div>
      <div class="col-3">
        <h6>Miles Wilson</h6>
      </div>
      <div class="col-3">
        <h6>Trevor Douty</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style>
.bg-about{
  background-image: url(https://images.unsplash.com/photo-1487266659293-c4762f375955?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80);
  background-size: cover;
  background-repeat: no-repeat;
  background-position:center;
  height: 250px;
}

.color{
  border-top: 5px solid #3a7a86;
  border-bottom: 5px solid #3a7a86;
}
</style>
