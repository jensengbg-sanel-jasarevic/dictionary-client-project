<template>
    <section class="wordsSec">
      <p @click="getWordInfo">{{ word }}</p>
   </section>
</template>

<script>
export default {
name: "Words",

props: {
  word: String
}, 

methods: {
getWordInfo() {

// Send URL Parameters (Query Strings)
// Ecosystem mutation. The activity from client changes the state
this.$router.push(`/dictionary/${this.word.toLowerCase()}`);
// In this URL the Vue components will get current stored data and display it to client
}   
}

};
</script>

<style lang="scss" scoped>
p {
  text-align: left;
  background-color: #F5F5F5;
  padding: 2%;
  cursor: pointer;
  border-radius: 10px;
}
</style>