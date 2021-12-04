<template>
  <section class="dicSec">
    <form class="search-word-form" @submit.prevent="getWord">
      <input
        v-model="searchInputValue"
        v-on:keyup.enter="getWord"
        type="text"
        placeholder="Search in glossary"
        autocomplete="off"
      />
      <br />
      <button class="primaryButton" tabindex="0" type="submit">
        <span class="buttonLabel">Search word</span>
      </button>
    </form>
    <div class="word-data-container" v-if="word">
      <h1>{{ word }}</h1>
      <p>{{ wordInfo }}</p>
      <p class="author">Author: {{ wordAuthor }}</p>
      <h4>Comments</h4>
      <Comments
        v-for="comment in wordComments"
        :key="comment.id"
        :comment="comment"
      />
      <form class="comment-word-form" @submit.prevent="postComment">
        <label for="comments"
          >Suggest a more clear definition or more simple explanation for this
          word</label
        >
        <textarea
          id="comments"
          v-model="textareaInputValue"
          rows="5"
          placeholder="Share your thought..."
        />
        <input type="submit" value="Post" />
      </form>
    </div>
  </section>
</template>

<script>
import Comments from "@/components/Comments";

export default {
  name: "Dictionary",

  components: {
    Comments,
  },

  data() {
    return {
      searchInputValue: null,
      textareaInputValue: null,
    };
  },

  computed: {
    word() {
      return this.$store.state.word;
    },
    wordInfo() {
      return this.$store.state.wordInfo;
    },
    wordAuthor() {
      return this.$store.state.wordAuthor;
    },
    wordComments() {
      return this.$store.state.wordComments;
    },
  },

  methods: {
    postComment() {
      this.$store.dispatch("postComment", {
        comment: this.textareaInputValue,
        word: this.word,
      });
    },
    getWord() {
      this.$store.dispatch("getWord", this.searchInputValue.toUpperCase());
      this.$store.dispatch("getComments", this.searchInputValue.toUpperCase());
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/common";
.dicSec {
  overflow-y: auto;
  overflow-x: auto;
  margin-top: 5%;
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
  border: 1px solid #a0d18c;
}
input[type="text"] {
  padding: 10px;
  outline: none;
}
/*.search-word-form > button {
  margin-top: 2%;
  min-width: 15vw;
  border: none;
  background-color: #dadce0;
  cursor: pointer;
  height: 40px;
}*/
.word-data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #a0d18c;
  max-width: 85vw;
  padding: 2%;
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
}
.comment-word-form {
  display: flex;
  flex-direction: column;
  margin-top: 3%;
}
.comment-word-form > input[type="submit"] {
  background-color: #226e4f;
  border: none;
  padding: 16px 32px;
  text-decoration: none;
  cursor: pointer;
  margin: 0 auto;
  margin-bottom: 2%;
  border-radius: 4px;
}

.comment-word-form > input[type="submit"] :hover:enabled {
  background-color: #29b97d;
}

textarea {
  outline: none;
  margin-top: 2%;
  margin-bottom: 2%;
  border-radius: 8px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  padding: 15px;
}
label {
  font-size: 1.5em;
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
