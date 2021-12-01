<template>
  <div class="comment-component-wrapper">
    <p class="smaller-font" id="comment-author">
      <img src="@/assets/iconpacks-person.svg" alt="Author">
      {{ comment.author }}
      <img @click="putWordInfo" class="approve-disapprove-icon" src="@/assets/iconpacks-approve.svg" alt="Approve" width="35" height="35">
      <img @click="deleteComment" class="approve-disapprove-icon" src="@/assets/iconpacks-disapprove.svg" alt="Disapprove" width="35" height="35">
    </p>    

    <p id="comment-text">{{ comment.comment }}</p>
    <p id="comment-created">{{ comment.created_at }}</p>
    <p class="smaller-font" :id="`comment-votes-${comment.id}`">
      <img @click="patchVote" id="vote" src="@/assets/iconpacks-vote.svg" alt="Vote">
      {{ comment.votes }}
    </p>
  </div>
</template>

<script>
export default {
name: 'Comments',
props: {
  comment: Object
}, 
methods: {
  putWordInfo(){
  this.$store.dispatch("putWordInfo", this.comment);
  this.$emit('approvedComment', this.comment.word) 
  },
  deleteComment(){
  this.$store.dispatch("deleteComment", this.comment.id);
  this.$emit('deletedComment', this.comment.word) 
  },
  patchVote(){
  this.$store.dispatch("patchVote", this.comment.id);
  this.$emit('votedComment', { id: this.comment.id, word: this.comment.word });
  },   
  }       
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-component-wrapper{
  max-width: 60%;
  border-radius: 15px ;
  border-style: solid;
  border-color: #1d2a57;
  margin-left:20%;
  margin-top: 1%;
  margin-bottom: 1%;
  padding: 1%;
}
p {
  text-align: left;
  padding: 5px;
}
.approve-disapprove-icon {
  float: right;
  margin-left: 1%;
  margin-right: 1%;
  cursor: pointer;
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
  width: 1.8em;
  height: 1.8em;
}
#vote{
  cursor: pointer;
}
</style>