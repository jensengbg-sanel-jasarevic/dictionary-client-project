<template>
    <section class="contactSec">
     <h1>
       About Us
    </h1>
    <p>We provide a free online dictionary site with words and terms from the IT field.</p>
    <p>The goal is simple — we want to make IT terminology easy to understand.
       Instead of using high-level terminology, definitions are strived to be written in simple everyday language.
        We believe that simple explanations are the way to go. We strive for simplicity and accuracy with every definition we publish.
    </p>
    <p> If you have feedback about some definition, please register on the website.
        This allows you the opportunity to contribute in creating the websites content more qualitative by helping in defining or explaining words in a more clearly way. 
        Simply by leaving comments on words, the visitors of the site can vote on your comments. In case it gets many votes,
        editors of the site have option to approve your definition. This simply means it modifies the sites primary defintion to yours.
        If you would like to suggest a new word, please contact us.
    </p>  
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