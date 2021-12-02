<template>
    <section class="browseSec">
    <h1>Browse the Dictionary Index</h1>
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
   </section>
</template>

<script>
export default {
  name: "Browse",

  methods: {
  routeToWordsByLetter(event) {
  const letter = event.target.innerText  
  if(letter.length > 1) {
    return
    } else {
    this.$router.push("/letter/" + letter);
    } 
  }
     
  }

};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  cursor: pointer;
}
</style>