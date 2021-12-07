<template>
    <section class="homeSec">
      <div class="left">
        <h1 id="announcements-heading">Announcements</h1>
      </div>
      <div class="right">
        <div class="info-box">
          <h1>Introducing New Dictionary Design!</h1>
          <p>A better way to explore words.We've freshened the design to improve your experience, making it easier to find what you're looking for and more enticing
          to explore new words. We've also surfaced many additional features that you might not have used yet, but are sure to enjoy!</p>
        </div>
        <div class="info-box">
          <h1>The Only Ad-Free Online Dictionary!</h1>
          <p>We've made the dictionary an ad-free experience for everyone! Now you can focus on the words, and your learning, without any distractions.
          We're proud to provide students, teachers, and life-long learners this uncluttered, user-friendly resource for word learning!</p>
        </div>
      </div>
   </section>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.homeSec {
    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-areas: "left right";
    overflow-y: auto;
    overflow-x: auto;    
}

.left {
  grid-area: left;
}

.right {
  grid-area: right;
  margin: auto;
}

.info-box{
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 2%;
  background-color: #E9EBEE;
  max-width: 50vw;
}

@media screen and (max-width: 600px) {
  .homeSec {
  overflow-y: auto;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
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
