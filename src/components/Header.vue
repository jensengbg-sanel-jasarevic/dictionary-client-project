<template>
  <header>
      <div class="headerDiv">
          <img src="../assets/logo.png" alt="logo" >
           <a href="javascript:void(0);" class="icon" @click="myFunction">
            <i class="fas fa-bars"></i></a> <!-- Font Awesome is designed to be used with inline elements, and we recommend sticking with a consistent HTML element to reference them by in your project-->
           <div class="navDiv" id='nav'>
           <div class="nav">
                  <router-link to="/"><div class="menu"><i class="fas fa-home"></i> Home</div></router-link>
                  <router-link to="/Dictionary"> <div class="menu"><i class="fas fa-search"></i> Dictionary</div></router-link>
                  <router-link to="/Contact"><div class="menu"><i class="fas fa-comment"></i> Contact</div></router-link>
       </div>
       <div class="logDetails" >
         <button class="primaryButton" tabindex="0" type="Button" @click="logout" v-if="token">
            <span class="buttonLabel">Logout</span>
            </button>
        <button class="primaryButton" tabindex="0" type="Button" @click="goTo('login')" v-if="!token">
            <span class="buttonLabel">Login</span>
            </button>
            &nbsp;&nbsp;
            <button class="primaryButton" tabindex="0" type="Button" @click="goTo('signUp')" v-if="!token">
            <span class="buttonLabel">Sign Up</span>
            </button>
                </div>
                   </div>
      </div>
      
  </header>
</template>

<script>
export default {
  //Function to get the token generated for the user
   computed: {
    token : {
       get: function () {
        return sessionStorage.getItem("token");
      },
      set: function () {},
    },
  },
  //This function will be excecuted when the screen resized and loaded
    mounted() { 
       window.onresize = this.resize
    },
    methods: {
        resize() {
            var x = document.getElementById("nav");
            x.className ="navDiv";
        },
myFunction() {
   var x = document.getElementById("nav");
  if (x.className === "navDiv") {
    x.className += " responsive";
  } else {
    x.className = "navDiv";
  }
},
goTo(event) {
    if(event === "signUp") {
    this.$router.push('/SignUp');
    } else if(event === 'login') {
        this.$router.push('/Login');
    } else {
         this.$confirm({
            auth: false,
            message: "Invalid Event received",
            button: {
              no: "Ok",
            },
          });
    }
},
logout() {
      sessionStorage.removeItem("token");
      location.reload();
    }
}
}
</script>

<style scoped lang="scss">
@import "../style/common";
header {
    position: sticky;
    top: 0%;
    color: #fff;
    display: flex;
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

@media screen and (max-width: 600px) {
  .navDiv .nav {display: none;}
  .navDiv .logDetails {display: none;}
  .icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
    .navDiv.navDiv.responsive {
  top: 0;
  margin-top: 50px;
  right: 0;
  height: 80%;
  position: fixed;
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background: linear-gradient(315deg, transparent 75%, #515a5f 0) -10px 0,
    linear-gradient(45deg, transparent 75%, #465158 0) -10px 0,
    linear-gradient(135deg, #3b4a55 50%, transparent 0) 0 0,
    linear-gradient(45deg, #232e36 50%, #1b2831 0) 0 0 #13222D;
    background-size: 20px 20px;
    }
.icon {
    position: absolute;
    top: 1;   
    right: 0;
    font-size: 25px;
    margin-right: 20px;
  }
  .navDiv.responsive  .nav {
      margin-left:0;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      flex-grow: 1;
       align-items: center;
     }
  
  .navDiv.responsive .nav a {
    display: block;
    text-align: left;
    margin-bottom: 20px;
  }

  .navDiv.responsive .logDetails {
    display: flex;
    flex-direction: column;
    text-align: left;
    position: relative;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .navDiv.responsive .menu {
     display: flex;
      flex-direction: row;
  }
}
</style>
