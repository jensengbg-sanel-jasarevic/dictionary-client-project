<template>
    <section class="dicSec">
     <h1>
       This is Dictionary Page
    </h1>
   </section>
</template>

<script>
export default {
  name: "Dictionary",
};
</script>

<style scoped>
.dicSec {
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
  .dicSec {
  overflow-y: auto;
  overflow-x: auto;
  margin-top: 25%;
}
}
</style>