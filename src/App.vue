<template>
  <div id="app">    
     <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <Header></Header>  
    <router-view class="routerView"/>
    <Footer></Footer>
    <!--<HeaderResp></HeaderResp> -->
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
//import HeaderResp from './components/HeaderResp.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  //  HeaderResp
  }
}
</script>

<style>
body
 {
    margin:0;
    padding:0;
 }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.routerView{
  width: 100%;
   min-height: 68vh;
}

</style>
