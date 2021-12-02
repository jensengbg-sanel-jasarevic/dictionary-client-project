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
</style>