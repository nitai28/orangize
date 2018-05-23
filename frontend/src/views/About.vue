<template class=app>
  <div class="about flex flex-column space-between">
    
    <div class="about-text flex flex-column aligen-center justify-center  ">    
       <h2>LET US ORGANIZE YOU</h2>
    <!-- <img src="../assets/img/orangeabout.png">     -->
       <!-- <hr> -->
       <p>Orangize is application that make your life more organized,now you can manage your project very easy</p>
    <!-- <img src="../assets/icon/orange.svg">     -->
    </div>
    <div class="flex space-around justify-center align-center photo-container"> 
        <div class="profile-container">
         <div class="profile-img itay"></div>
         <h1>Itay Ben Shmuel </h1>
         <h3>Full Stack Developer</h3>

        </div>  
         <div class="profile-container">
            <div class="profile-img nitai">
            </div>
            <h1>Nitai Shavit</h1>
            <h3>Full Stack Developer</h3>
         </div>
         <div class="profile-container">
          <div class="profile-img yotam"></div>
          <h1>Yotam Zaken</h1>
          <h3>Full Stack Developer</h3>
        </div>
    </div>
    

  </div>
</template>



<style scoped>
* {
  display: flex;
}
img {
  background-color: rgba(240, 248, 255, 0);
  position: absolute;
  /* top: 135px; */
  left: 430px;
  height: 108px;
  padding-top: 67px;
}
/* .about-page{
  height: 100%;
  width: 100%;
} */
h1{
  color: white;
  
}
h3{
  color:#e0e0e0;
}
h2 {
 margin: 0 auto;
  padding-top: 60px;
  font-family: "Gorditas";
  text-shadow: 1px 1px whitesmoke;
  font-size: 50px;
}
.about {
  height: 100vh;
  width: 100%;
}
p{
  margin: 0 auto;
  font-weight: 700;
  font-size: 1.3rem
}



.profile-container h1,h3 {
  margin: 0 auto;
  margin-top: 3px;
}

.profile-container {
  display: flex;
  flex-direction: column;
  height: 300px;
  text-align: center;
}
.profile-img {
  /* display: inline-block; */
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
  margin-bottom: 8px;
  /* border-radius: 50%; */
}
.photo-container {
  width: 100%;
  /* display: inline-block; */
  /* grid-template-columns: 200px 1fr; */
}
.para {
  grid-area: para;
}

.itay {
  grid-area: itay;
  border: 2px solid antiquewhite;
  box-shadow: 0px 0px 8px 7px black;
  background-image: url("../assets/img/itay.jpg");
}
.nitai {
  grid-area: nitai;
  border: 2px solid antiquewhite;
  box-shadow: 0px 0px 8px 7px black;
  background-image: url("../assets/img/nitai.jpg");
}
.yotam {
  grid-area: yotam;
  border: 2px solid antiquewhite;
  box-shadow: 0px 0px 8px 7px black;
  background-image: url("../assets/img/yotam.jpg");
}
</style>