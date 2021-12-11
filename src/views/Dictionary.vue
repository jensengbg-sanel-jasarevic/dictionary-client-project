<template>
  <section class="dicSec">
    <form class="search-word-form" @submit.prevent="getWord">
      <p>
        The Online IT Dictionary for Students, Educators and IT Professionals
      </p>
      <input
        v-model="searchInputValue"
        v-on:keyup.enter="getWord"
        type="text"
        placeholder="Search for a word"
        autocomplete="off"
      />
      <button type="submit"><i class="fas fa-search"></i> Search</button>
    </form>
    <WordInfo />
  </section>
</template>

<script>
import WordInfo from "@/components/WordInfo";
export default {
  name: "Dictionary",

  components: {
    WordInfo,
  },

  data() {
    return {
      searchInputValue: null,
    };
  },

  mounted() {
    if (this.$route.params.search === "start") {
      // URL parameter for searching words in app
      return;
    } else {
      // Handling URL Parameters (Query Strings)
      const queryString = this.$route.params.search.toUpperCase();
      this.$store.dispatch("getWord", queryString);
      this.$store.dispatch("getComments", queryString);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },

  methods: {
    // State management with Vues ecosystem "Vuex"
    // Vuex = tool that works as an environment for the components in a Vue app
    // Send word request from client to the backend API server (action in Vuex)
    // Store response data in Vuex environment (mutate & keep it in the state)
    // Components now can utilize data from the centralized store of the app
    getWord() {
      this.$store.dispatch("getWord", this.searchInputValue.toUpperCase());
      this.$store.dispatch("getComments", this.searchInputValue.toUpperCase());
      if (this.$route.path != `/dictionary/${this.searchInputValue}`) {
        this.$router.push(`/dictionary/${this.searchInputValue}`);
      }
    },
  }
};
</script>

<style scoped>
.dicSec {
  overflow-y: auto;
  overflow-x: auto;
  margin-top: 5%;
  color: #030303;
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
  padding: 15px;
  border: 1px solid #1f1671;
  outline: none;
}
.search-word-form > button {
  margin-top: 2%;
  min-width: 15vw;
  border: none;
  border-radius: 30px;
  background-color: #ec4b43;
  cursor: pointer;
  height: 40px;
  color: white;
}

@media only screen and (max-width: 800px) {
  .search-word-form > button {
    min-width: 25vw;
  }
}
</style>
