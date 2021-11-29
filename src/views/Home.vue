<template>
    <section class="homeSec">
     <h1>Introducing webdictionary.com's New Dictionary Design!</h1>
      <p>A better way to explore words.We've freshened the design to improve your experience, making it easier to find what you're looking for and more enticing
      to explore new words. We've also surfaced many additional features that you might not have used yet, but are sure to enjoy! </p>

      <h1>The Only Ad-Free Online Dictionary!</h1>
      <p>We've made the webdictionary.com dictionary an ad-free experience for everyone! Now you can focus on the words, and your learning, without any distractions.
      We're proud to provide students, teachers, and life-long learners this uncluttered, user-friendly resource for word learning!
    </p>
   </section>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.homeSec {
    overflow-y: auto;
    overflow-x: auto;
    margin-top: 5%;
}

.bold {
  -webkit-text-stroke: medium;
}

p {
  text-align: center;
}

h1,
h3,
p {
  color: #3d2f27;
}

h3 {
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
}

@media screen and (max-width: 600px) {
  .homeSec {
  overflow-y: auto;
  overflow-x: auto;
  margin-top: 25%;
}
h1 {
  font-size: 1.25rem;
  font-weight: bold;
}
p {
  font-size: 0.8em;
}

}
</style>
