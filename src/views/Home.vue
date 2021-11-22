<template>
    <section class="homeSec">
     <h1>
       This is Home Page
    </h1>
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
  text-align: justify;
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

@media only screen and (max-width: 800px) {
  .homeSec {
  overflow-y: auto;
  overflow-x: auto;
  margin-top: 25%;
}
}
</style>
