<template>
  <div class="comment-component-wrapper">
     <img
        @click="putWordDefinition"
        class="approve-disapprove-icon"
        src="@/assets/iconpacks-approve.svg"
        alt="Approve"
        width="35"
        height="35"
        v-if="user && user.role == 'admin'"
      /> 
      <img
        @click="deleteComment"
        class="approve-disapprove-icon"
        src="@/assets/iconpacks-disapprove.svg"
        alt="Disapprove"
        width="35"
        height="35"
        v-if="user && user.role == 'admin'"
      />
    <p id="comment-author">
      <img src="@/assets/iconpacks-person.svg" alt="Author" />
      <span>{{ comment.author }}</span>
    </p>
    <p id="comment-text">{{ comment.comment }}</p>
    <p id="comment-created">{{ comment.created_at }}</p>
    <p class="votes-counter" :id="`comment-votes-${comment.id}`">
      <img
        @click="patchCommentVote"
        id="vote"
        src="@/assets/iconpacks-vote.svg"
        alt="Vote"
      />
      <span>{{ comment.votes }} votes</span>
    </p>
  </div>
</template>
<script>
export default {
  name: "Comment",
  props: {
    comment: Object
  },
  computed: {
    user() {
      return this.$store.state.userService.user;
    }
  },
  methods: {
    putWordDefinition() {
      this.$store.dispatch("putWordDefinition", {updateDefinition: this.comment, role: this.user.role});
      this.$emit("approvedComment", this.comment);
    },
    deleteComment() {
      this.$store.dispatch("deleteComment", {id: this.comment.id, role: this.user.role});
      this.$emit("deletedComment", this.comment.word);
    },
    patchCommentVote() {
      this.$store.dispatch("patchCommentVote", this.comment.id);
      this.$emit("votedComment", {
        id: this.comment.id,
        word: this.comment.word,
      });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-component-wrapper {
  word-wrap: break-word;
  max-width: 50vw;
  border-radius: 15px;
  border-style: solid;
  border-color: #1f1671;
  margin-left: 20%;
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
  font-size: 0.9em;
  color: #6eb1e1;
  font-weight: bold;
}
#comment-created {
  color: #2c3e50;
  font-size: 0.8em;
}
#comment-text {
  white-space: pre-wrap; 
  background: #e9ebee;
  border-radius: 20px;
  padding: 15px;
}
#comment-author, #votes-counter {
  display: flex;
  flex-wrap: wrap;
}
span {
  word-break: break-word;
  margin-left: 5px;
  margin-top: 5px;
}
img {
  width: 1.8em;
  height: 1.8em;
  margin-right: 3px; 
}
#vote {
  cursor: pointer;
}
.votes-counter{
  font-size: 1.1em;
  color: #5e5e5e;
}
.votes-counter > span{
  position:relative;
  top:-5px;
}
</style>
