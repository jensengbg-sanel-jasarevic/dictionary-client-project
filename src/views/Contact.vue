<template>
    <section class="contactSec">
     <h1>
       Contact Us
    </h1>
    <p> Here you will find contact information for our office. The below contacts can be reached during 08:00 - 16:30 </p>
    <ul>
      <li>
        <div class="liContent">
 <i class="fas fa-envelope-square"></i> &nbsp; saneljasarevic1992@gmail.com
        </div>
  <div class="liContent">
 <i class="fas fa-phone-square"></i> &nbsp; 4123456
 </div>
  <div class="liContent">
&nbsp;&nbsp;&nbsp;&nbsp;Goteborg
</div>
</li>
  <li>
     <div class="liContent">
 <i class="fas fa-envelope-square"></i> &nbsp; balavadivel82@gmail.com
 </div>
  <div class="liContent">
 <i class="fas fa-phone-square"></i> &nbsp;3123456
 </div>
  <div class="liContent">
 &nbsp;&nbsp;&nbsp;&nbsp;Göteborg
 </div>
 </li>
    </ul>
     <button class="primaryButton" tabindex="0" type="submit" @click="openContact"  v-show="!isContactFormVisible">
            <span class="buttonLabel">Click here to send your query</span>
        </button>

 <ContactForm
      v-show="isContactFormVisible"
        @close="closeContact"
  />

   </section>
</template>

<script>
import ContactForm from '../components/ContactForm.vue'
export default {
  name: "Contact",
  components: {
        ContactForm
    },
    data() {
        return {
            isContactFormVisible: false,
        }
    },
    methods: {
      openContact() {
        this.isContactFormVisible = true;
      },
       closeContact() {
        this.isContactFormVisible = false;
      }
    }
};
</script>

<style lang="scss" scoped>
@import "../style/common";
.contactSec {
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
li {
  justify-self: center;
  margin-left: 40%;
   margin-bottom: 30px; 
}

ul {
list-style-type:none;
justify-content: space-between;
}
.liContent {
  display: flex;
  flex-direction: row;
  justify-self: center;
}

@media only screen and (max-width: 800px) {
  .contactSec {
  overflow-y: auto;
  overflow-x: auto;
  margin-top: 25%;
}
}
</style>