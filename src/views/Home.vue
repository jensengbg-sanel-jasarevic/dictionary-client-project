<template>
    <section class="homeSec">
      <div>
        <h1>Announcements</h1>
      </div>
      <div class="announcements-container">
        <div class="announcements-items">
          <div class="info-box">
            <h1 class="info-header">Introducing new dictionary design!</h1>
            <p>A better way to explore words.We've freshened the design to improve your experience, making it easier to find what you're looking for and more enticing
            to explore new words. We've also surfaced many additional features that you might not have used yet, but are sure to enjoy!</p>
          </div>
          <div class="info-box">
            <h1 class="info-header">The only ad-free online dictionary!</h1>
            <p>We've made the dictionary an ad-free experience for everyone! Now you can focus on the words, and your learning, without any distractions.
            We're proud to provide students, teachers, and life-long learners this uncluttered, user-friendly resource for word learning!</p>
          </div>
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
}
h1{
  font-weight: unset;
}
.announcements-container {
  margin: auto;
}
.announcements-items{
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  padding: 50px;
  margin-bottom: 2%;
  background-color: #60bad6;
  color: #5e5e5e;
  max-width: 70vw;
}
.info-header {
  color: #1f1671;
}
.info-box {
  background-color: #fff;
  padding: 3%;
  max-width: 30%;
  border-radius: 10px;
}
@media (max-width: 800px) {
  .announcements-items{
    display: flex;
    flex-direction: column;
    max-width: 50vw;
  }
  .info-box{
    max-width: unset;
    margin-bottom: 5%;
    font-size: 0.7em;
    padding: 15%;
  }
}
</style>
