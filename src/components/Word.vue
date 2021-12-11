<template>
  <section class="wordsSec">
    <p @click="getWordInfo">{{ word }}</p>
  </section>
</template>

<script>
export default {
  name: "Word",

  props: {
    word: String,
  },

  methods: {
    getWordInfo() {
      // Send URL Parameters (Query Strings)
      // Ecosystem mutation. The activity from client changes the state
      this.$router.push(`/dictionary/${this.word.toLowerCase()}`);
      // In this URL the Vue components will get current stored data and display it to client
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: left;
  background-color: #f5f5f5;
  padding: 2%;
  cursor: pointer;
  border-radius: 10px;
}
@media (max-width: 800px) {
p{
  padding: 4%;
}
}
</style>
