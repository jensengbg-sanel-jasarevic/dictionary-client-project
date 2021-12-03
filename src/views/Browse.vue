<template>
    <section class="browseSec">
    <h1>Browse the dictionary entries from A to Z</h1>
    <p>Click on a specific letter and some of the most of the common words and terms in today's IT terminology will be displayed. View the definition by clicking further on your choice of word.</p>
    <ul v-on:click="routeToWordsByLetter">
      <li>A</li>
      <li>B</li>
      <li>C</li>
      <li>D</li>
      <li>E</li>
      <li>F</li>
      <li>G</li>
      <li>H</li>
      <li>I</li>
      <li>J</li>
      <li>K</li>
      <li>L</li>                  
      <li>M</li>
      <li>N</li>
      <li>O</li>
      <li>P</li>
      <li>Q</li>
      <li>R</li>
      <li>S</li>                  
      <li>T</li>
      <li>U</li>
      <li>V</li>
      <li>W</li>
      <li>X</li>
      <li>Y</li>
      <li>Z</li>                         
    </ul>
    <div v-if="clickedLetter">
      <h1>Index: <span id="clicked-letter">{{ clickedLetter }}</span></h1>
      <Words v-for="item in wordsByLetter" :key="item" :word="item"/>
    </div>
   </section>
</template>

<script>
import Words from '@/views/Words'
export default {
  name: "Browse",

components: {
Words
},

data() {
return {
  clickedLetter: null
  }
},

  methods: {
  routeToWordsByLetter(event) {
  const letter = event.target.innerText.toLowerCase()  
  if(letter.length > 1) {
    return
    } else {
    this.clickedLetter = letter.toUpperCase()
    this.$store.dispatch("getWordsByLetter", letter);
    } 
  }   
},

computed: {
wordsByLetter() {
return this.$store.state.wordsByLetter;
}
}

};
</script>

<style lang="scss" scoped>
.browseSec{
  max-width: 80vw;
  margin-left: auto;
  margin-right: auto;
}
ul {
  list-style-type: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
}
li {
  padding: 1%;
  border-radius: 20px;
  border: 1.5px solid #ec4b43;
}
#clicked-letter {
  color: #ec4b43;
}
@media(max-width: 900px) {
  ul {
    display: flex;
    flex-direction: column;
  }
  li {
    min-width: 10vw;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2%;
  }
} 
</style>