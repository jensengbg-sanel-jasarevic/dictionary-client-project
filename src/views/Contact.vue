<template>
    <section class="contactSec">
     <h1>
       About Us
    </h1>
    <p>We provide a free online dictionary website with words and terms from the IT field.</p>
    <p>The goal is simple — we want to make IT terminology easy to understand.
       Instead of using high-level terminology, definitions are strived to be written in simple everyday language.
      We strive for simplicity and accuracy with every definition we publish.
    </p>
    <p> If you have feedback about some definition, please register on the website.
        This will allow you the opportunity to contribute in creating the websites content more qualitative by helping in defining or explaining words in a more clearly way. 
        By commenting on words you will enable visitors of the website to vote for your comment. In case a comment has many votes,
        editors of the site have the option to approve it for the reason that it's well-liked definition by site visitors. The approval simply means that the sites primary definition will be modified to yours.
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