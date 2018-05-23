<template>
<section class="lala">
    <div class="profile-img itay">Itay</div>
    <h1 class="para"> LALA</h1>
    <div class="profile-img nitai">Nitai</div>
    <div class="profile-img yotam">Yotam</div>
</section>
</template>

<script>
export default {

}
</script>

<style scoped>
.lala {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-areas: 
      "itay para"
      "nitai yotam";
    padding: 2px;
    padding-top: 60px;
}
.profile-img {
  display: inline-block;
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
}

.para {
    grid-area: para;
}

.itay {
    grid-area: itay;
  background-image: url("../assets/img/itay.jpg");    
}
.nitai {
    grid-area: nitai;
  background-image: url("../assets/img/nitai.jpg");    
}
.yotam {
    grid-area: yotam;
  background-image: url("../assets/img/yotam.jpg");    
}
</style>
