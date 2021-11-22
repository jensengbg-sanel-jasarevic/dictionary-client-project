<template>
  <header>
      <div class="headerDiv">
          <img src="../assets/logo.png" alt="logo" >
           <div class="navDiv">
           <div class="nav">
                  <router-link to="/"><div class="menu"><i class="fas fa-home"></i> Home</div></router-link>
                  <router-link to="/Dictionary"> <div class="menu"><i class="fas fa-search"></i> Dictionary</div></router-link>
                  <router-link to="/Contact"><div class="menu"><i class="fas fa-comment"></i>Contact</div></router-link>
       </div>
       <div class="logDetails" >
        <button class="primaryButton" tabindex="0" type="Button">
            <span class="buttonLabel">Login</span>
            </button>
            &nbsp;&nbsp;
            <button class="primaryButton" tabindex="0" type="Button">
            <span class="buttonLabel">Sign Up</span>
            </button>
                </div>
                   </div>
      </div>
      
  </header>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
@import "../style/common";
header {
    position: sticky;
    top: 0%;
    color: #fff;
    display: flex;
    //z-index: 1100;
    box-sizing: border-box;
    flex-shrink: 0;
    flex-direction: column;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background: linear-gradient(315deg, transparent 75%, #515a5f 0) -10px 0,
    linear-gradient(45deg, transparent 75%, #465158 0) -10px 0,
    linear-gradient(135deg, #3b4a55 50%, transparent 0) 0 0,
    linear-gradient(45deg, #232e36 50%, #1b2831 0) 0 0 #13222D;
    background-size: 20px 20px;
    
}
.headerDiv{
    display: flex;
    position: relative;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    color: #fff;
}

.navDiv{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    padding-top: 8px;
    color: #13222D;
}

.nav {
    display: flex;
    justify-content:flex-start;
    margin-left: 30%;
    overflow: hidden;
}

.nav a{
    color: white;
    margin-right: 20px;
    text-decoration: none;
    margin-right: 20px;
    background-color: transparent;
    float: left;
    display: block;
}

.nav a.router-link-exact-active {
    color: rgb(250, 242, 185);
    text-decoration: none;
}
.nav a:hover {
    color: rgb(158, 151, 100);
    text-decoration: none;
}

.icon {
  display: none;
  color: #fff;
}

img {
    vertical-align: middle;
    border-style: none;
    height: 80px;
}

.logDetails {
    display: flex; 
    align-items: flex-end;
    justify-content: space-between;
}

</style>