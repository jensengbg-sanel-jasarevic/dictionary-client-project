<template>
    <section class="dicSec">
      <form class="search-word-form" @submit.prevent="getWord">
        <h1 id="heading-search-word-form"><b>IT</b> Dictionary</h1>
        <p>The Online IT Dictionary for Students, Educators and IT Professionals
        </p>
        <input 
        v-model="searchInputValue" 
        v-on:keyup.enter="getWord" 
        type="text" 
        placeholder="Search for a word" 
        autocomplete="off">
        <button type="submit"><i class="fas fa-search"></i>  Search</button>
      </form>
      <WordInfo />
   </section>
</template>

<script>
import WordInfo from '@/components/WordInfo'
export default {
name: "Dictionary",

components: {
   WordInfo
},

data() {
return {
  searchInputValue: null,
  }
},

mounted() {
  if(this.$route.params.search === "start"){ // URL parameter for searching words in app
    return
  } else { // Handling URL Parameters (Query Strings) 
    const queryString = this.$route.params.search.toUpperCase()
    this.$store.dispatch("getWord", queryString);
    this.$store.dispatch("getComments", queryString);
  }
},

methods: {
  // State management with Vues ecosystem "Vuex"
  // Vuex = tool that works as an environment for the components in a Vue app
  // Send word request from client to the backend API server (action in Vuex)
  // Store response data in Vuex environment (mutate & keep it in the state)
  // Components now can utilize data from the centralized store of the app
  getWord(){ 
  this.$store.dispatch("getWord", this.searchInputValue.toUpperCase());
  this.$store.dispatch("getComments", this.searchInputValue.toUpperCase());
  if (this.$route.path != `/dictionary/${this.searchInputValue}`) {
    this.$router.push(`/dictionary/${this.searchInputValue}`);
    }
  }  
  }

};
</script>

<style lang="scss" scoped>
@import "../style/common";
.dicSec {
    overflow-y: auto;
    overflow-x: auto;
    margin-top: 5%;
}
#heading-search-word-form{
  font-size: 3em;
}
.search-word-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-word-form > input {
  min-width: 55vw;
  min-height: 30px;
  border-radius: 20px;
  border: 1px solid #1f1671;
}
input[type=text] {
  padding: 10px;
  outline: none;
}
.search-word-form > button {
  margin-top: 2%;
  min-width: 15vw;
  border: none;
  background-color: #ec4b43;
  cursor: pointer;
  height: 40px;
  color: white;
}

.bold {
  -webkit-text-stroke: medium;
}

p {
  text-align: justify;
}

h1,
h3,
p {
  color: #3d2f27;
}

h3 {
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
}

@media only screen and (max-width: 800px) {
  .dicSec {
  overflow-y: auto;
  overflow-x: auto;
  margin-top: 25%;
}
}
</style>