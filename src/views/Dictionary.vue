<template>
    <section class="dicSec">
      <form class="search-word-form" @submit.prevent="getWord">
        <input v-model="searchInputValue" v-on:keyup.enter="getWord" type="text" placeholder="Search definitions of words in the field of IT" autocomplete="off">
        <button type="submit">Search word</button>
      </form>
      <div class="word-data-container" v-if="word">
        <h1>{{ word }}</h1>
        <p id ="word-updated">{{ updatedWordNotification }}</p>
        <p class="author">
          <img src="@/assets/iconpacks-person.svg" alt="Author">
          {{ wordAuthor }}
        </p>
        <p>{{ wordInfo }}</p>
        <h4 id="header-comments">Comments ({{ wordCommentsTotal }})</h4>
        <Comments 
        @votedComment="updateCommentVotes"
        @approvedComment="updateWordInfo"
        @deletedComment="updateWordComments"
         v-for="comment in wordComments" :key="comment.id" :comment="comment"/>
        <form class="comment-word-form" @submit.prevent="postComment">
          <label for="comments">Suggest a more clear definition or more simple explanation for this word</label>
          <textarea id="comments" v-model="textareaInputValue" rows="5" placeholder="Share your thought..."/>
          <input type="submit" value="Post">
        </form>
      </div>
   </section>
</template>

<script>
import Comments from '@/components/Comments'

export default {
name: "Dictionary",

components: {
   Comments
},
 
data() {
return {
  updatedWordNotification: null,
  searchInputValue: null,
  textareaInputValue: null
  }
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
  return this.$store.state.wordComments
  },
  wordCommentsTotal() {
  let total;
  let comments = this.$store.state.wordComments
    if(comments != undefined){
    total = comments.length
  } 
  return total
  }
  },

methods: {
  updateWordInfo(word) {
   setTimeout( () => {  
    this.$store.dispatch('getWord', word) 
    this.updatedWordNotification = "Word definition updated."
    document.getElementById("word-updated").style.color = "#42b983"
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE & Opera
    }, 700)
  },
  updateWordComments(word) {
   setTimeout( () => {  
    this.$store.dispatch('getComments', word) 
    }, 700)
  },    
  updateCommentVotes(comment) {
   setTimeout( () => {  
    this.$store.dispatch('getComments', comment.word) 
    let votesCounter = document.getElementById(`comment-votes-${comment.id}`)
    votesCounter.style.width = "15%"
    votesCounter.style.backgroundColor = "#1ac61a"
    votesCounter.style.color = "white"
    votesCounter.style.borderRadius = "6px"
    }, 700)
  },  
  postComment(){
  this.$store.dispatch("postComment", { comment: this.textareaInputValue, word: this.word });
  setTimeout( () => { 
    this.$store.dispatch('getComments', this.word)
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
    this.textareaInputValue = null;
    }, 700)
  },
  getWord(){
  this.$store.dispatch("getWord", this.searchInputValue.toUpperCase());
  this.$store.dispatch("getComments", this.searchInputValue.toUpperCase());
  setTimeout( () => { this.searchInputValue = null; }, 200)
  }    
  }

};

</script>

<style scoped>
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
input[type=text] {
  padding: 10px;
  outline: none;
}
.search-word-form > button {
  margin-top: 2%;
  min-width: 15vw;
  border: none;
  background-color: #dadce0;
  cursor: pointer;
  height: 40px;
}
.word-data-container{
  display: flex;
  flex-direction: column;
  border-top: 1.5px solid #a0d18c;
  max-width: 80vw;
  padding: 2%;
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
}
.author {
  color: #6eb1e1;
  font-weight: bold;
}
.author > img {
  width: 1.5em;
  height: 1.5em;
}
#header-comments {
  border-top: 1.5px solid #a0d18c;
  padding: 2%;
}
.comment-word-form {
  display: flex;
  flex-direction: column;
  margin-top: 3%;
}
.comment-word-form > input[type=submit]{
  background-color: #dadce0;
  border: none;
  padding: 16px 32px;
  text-decoration: none;
  cursor: pointer; 
  margin : 0 auto;
  margin-bottom: 2%;
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
  font-size: 1.3em;
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