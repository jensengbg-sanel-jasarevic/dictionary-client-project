<template>
    <section class="letterSec">
      <h1>Index {{ this.$route.params.letter }}</h1>
      <p>Below are definitions for some of the most of the common words and terms in today's IT terminology.</p>
      <Words v-for="item in wordsByLetter" :key="item" :word="item"/>
   </section>
</template>

<script>
import Words from '@/views/Words'
export default {
name: "Letter",

components: {
Words
},  

mounted() {
const letter = this.$route.params.letter.toLowerCase()
this.$store.dispatch("getWordsByLetter", letter);
},

computed: {
wordsByLetter() {
return this.$store.state.wordsByLetter;
}
}

};
</script>

<style lang="scss" scoped>
</style>