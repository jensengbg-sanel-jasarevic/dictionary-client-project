<template>
  <div class="comment-component-wrapper">
    <p>{{ comment.comment }}</p>
    <p class="smaller-font">Author: {{ comment.author }}</p>
    <p class="smaller-font">Votes: {{ comment.votes }}</p>
    <div class="vote">
      <img @click="patchVote" src="@/assets/iconpacks-add.svg" alt="Vote" width="35" height="35">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  props: {
    comment: Object
  }, 
methods: {
  patchVote(){
  this.$store.dispatch("patchVote", { author: this.comment.author });
  },   
  }       
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-component-wrapper{
  min-width: 40%;
  border-radius: 15px ;
  border-style: solid;
  border-color: #a3c1ad;
  margin-top: 1%;
  margin-bottom: 1%;
  padding: 1%;
}
.smaller-font {
  font-size: 0.7em;
  text-align: left;
}
.vote {
  float: right;
}
.vote > img {
  cursor: pointer;
}
</style>