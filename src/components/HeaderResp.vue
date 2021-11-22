<template>
    <div class="navDiv">
        <a href="javascript:void(0);" class="icon" @click="myFunction">
            <i class="fas fa-bars"></i></a>
    </div>
</template>

<script>
export default {

methods: {
myFunction() {
   var x = document.getElementById("nav");
  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}
}
}
</script>

<style scoped lang="scss">

.nav {
    display: flex;
    justify-content:flex-start;
    margin-left: 30%;
    overflow: hidden;
}
.navDiv{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    padding-top: 8px;
    color: #13222D;
}
@media screen and (max-width: 600px) {
  .nav a:not(:active) {display: none;}
  .nav {
      margin-left:0;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
  }
  .icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .nav.responsive {
      position: relative;
     }
  .icon {
    position: absolute;
    top: 0;   
  }
  .nav.responsive a {
    display: block;
    text-align: left;
  }
  .nav.responsive .menu {
     display: flex;
      flex-direction: row;
  }
}
</style>