<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    />
    <div id="main-header">
    <Header></Header>
    <h1 id="header-title">IT Web Dictionary</h1>
    </div>
    <vue-confirm-dialog class="confirmBtn"></vue-confirm-dialog>
    <router-view class="routerView" />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
};
</script>

<style>
html{
  scroll-behavior: smooth;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #030303;
}
#main-header {
  background-color: #ffb000;
}
#header-title {
  font-size: 3em;
  font-weight: unset;
  color: #1f1671;
  padding-bottom: 2%; 
}
.routerView {
  width: 100%;
  min-height: 68vh;
}
.confirmBtn button {
  color: #fff;
  background-color: #226e4f;
  padding: 6px 16px;
  font-size: 0.875rem;
  min-width: 64px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  border: 0;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  -moz-appearance: none;
  justify-content: center;
  text-decoration: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}
.confirmBtn button:hover {
  transition: 0.7s;
  cursor: pointer;
  background-color: #29b97d;
}
.confirmBtn button .left {
  border-radius: 0;
}
.confirmBtn .vc-text-grid {
  padding: 1rem;
}
.confirmBtn .vc-btn-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 0 0 1rem 1rem;
  overflow: hidden;
}
.confirmBtn .vc-btn-grid.isMono {
  grid-template-columns: 1fr;
}
</style>