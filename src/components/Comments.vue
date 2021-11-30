<template>
  <div class="comment-component-wrapper">
    <p class="smaller-font" id="comment-author">
      <img src="@/assets/iconpacks-person.svg" alt="Author">
      {{ comment.author }}
    </p>    
    <p id="comment-text">{{ comment.comment }}</p>
    <p id="comment-created">{{ comment.created_at }}</p>
    <p class="smaller-font" :id="`comment-votes-${comment.id}`">
      <img src="@/assets/iconpacks-check.svg" alt="Votes">
      {{ comment.votes }}
    </p>
    <div class="vote">
      <img @click="patchVote" src="@/assets/iconpacks-vote.svg" alt="Vote" width="35" height="35">
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
  this.$store.dispatch("patchVote", { comment: this.comment.comment });
  this.$emit('voted', { id: this.comment.id, word: this.comment.word }) 
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
p {
  text-align: left;
  padding: 5px;
}
#comment-author {
  color: #6eb1e1;
  font-weight: bold;
}
#comment-created {
  color: #2c3e50;
  font-size: 0.8em;
}
#comment-text{
  background: #E9EBEE;
  border-radius: 20px;
  padding: 15px;
}
.smaller-font {
  font-size: 0.9em;
}
.smaller-font > img {
  width: 1.4em;
  height: 1.4em;
}
.vote {
  float: right;
}
.vote > img {
  cursor: pointer;
}
</style>