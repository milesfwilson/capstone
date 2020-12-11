<template>
  <div class="about container-fluid text-light">
    <div class="row bg-about-top p-5">
      <div class="col-12 my-auto">
        <h1 class="text-center text-dark headerFont">
          - Our Mission -
        </h1>
        <div class="row mt-3 text-center">
          <div class="col-12 text-dark">
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
          <div class="col-10 text-center offset-1 mb-5">
            <p>
              It is scientifically proven that you have a better chance of accomplishing your goals if you have them documented. Our goal is to help you achieve them by allowing you to keep track of each goal, update your goals, and challenge other to help push you to accomplish each and every goal.
            </p>
          </div>
        </div>
        <div class="row bg-light text-dark color bg-about-bottom py-3">
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
    <div class="row text-center mt-2">
      <div class="col-12 mb-3">
        <h1>
          Our Team
        </h1>
      </div>
      <div class="col-md-3 col-sm-6">
        <h4>Chris Griffin</h4>
        <img class="headshot img-fluid" src="../assets/img/Chris.jpg" alt="" srcset="">
        <div class="col-10 offset-1 mt-3">
          <p class="bio-text">
            Worked primarily on the Server side using MongoDB and JavaScript.
          </p>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <h4>Kody Dudley</h4>
        <img class="headshot img-fluid" src="../assets/img/Kody.png" alt="" srcset="">
        <div class="col-10 offset-1 mt-3">
          <p class="bio-text">
            Worked primarily on UX/UI using Vue.js, CSS, and BootStrap.
          </p>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <h4>Miles Wilson</h4>
        <img class="headshot img-fluid" src="../assets/img/Miles.jpeg" alt="" srcset="">
        <div class="col-10 offset-1 mt-3">
          <p class="bio-text">
            Worked primarily on UX/UI using Vue.js, CSS, and BootStrap.
          </p>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <h4>Trevor Douty</h4>
        <img class="headshot img-fluid" src="../assets/img/Trevor.jpg" alt="" srcset="">
        <div class="col-10 offset-1 mt-3">
          <p class="bio-text">
            Worked primarily on the Server side using MongoDB and JavaScript.
          </p>
        </div>
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
.bg-about-top{
  background-image: url(https://img.freepik.com/free-vector/clean-white-cubtle-arrow-style-background_1017-15459.jpg?size=626&ext=jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  height: 250px;
}
.bg-about-bottom{
  background-image: url(https://img.freepik.com/free-vector/clean-white-cubtle-arrow-style-background_1017-15459.jpg?size=626&ext=jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position:center;
}
.headerFont{
  font-size: 4em;
}

.color{
  border-top: 5px solid #3a7a86;
  border-bottom: 5px solid #3a7a86;
}

.headshot{
  max-height: 200px;
  border-radius: 50%;
}

.bio-text{
  font-size: .75em;
}
</style>
