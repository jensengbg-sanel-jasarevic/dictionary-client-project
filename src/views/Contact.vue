<template>
  <section class="contactSec">
    <h1>About Us</h1>
    <p>
      We provide a free online dictionary website with words and terms from the
      IT field.
    </p>
    <p>
      The goal is simple — we want to make IT terminology easy to understand.
      Instead of using high-level terminology, definitions are strived to be
      written in simple everyday language. We strive for simplicity and accuracy
      with every definition we publish.
    </p>
    <p>
      If you have feedback about some definition, please register on the
      website. This will allow you the opportunity to contribute in creating the
      websites content more qualitative by helping in defining or explaining
      words in a more clearly way. This is achieved by simply leaving a comment
      on a word in which you suggest a clearer definition or explanation.
    </p>
    <p>
      Your
      comment enables site visitors to vote for it, if they believe the
      alternative definition in the comment is put forward in a more clear
      manner. Comment with many votes is a evident indication that the
      definition is well-liked by visitors, this could produce in editors of the
      site to approve it. In this case the sites primary definition of a
      word will be modified to yours proposal.
      </p>
    <h1>Contact Us</h1>
    <p>
      Here you will find contact information for our office. The below contacts
      can be reached during 08:00 - 16:30
    </p>
    <ul>
      <li>
        <div class="liContent">
          <i class="fas fa-envelope-square"></i> &nbsp;
          saneljasarevic1992@gmail.com
        </div>
        <div class="liContent">
          <i class="fas fa-phone-square"></i> &nbsp; 4123456
        </div>
        <div class="liContent">&nbsp;&nbsp;&nbsp;&nbsp;Goteborg</div>
      </li>
      <li>
        <div class="liContent">
          <i class="fas fa-envelope-square"></i> &nbsp; balavadivel82@gmail.com
        </div>
        <div class="liContent">
          <i class="fas fa-phone-square"></i> &nbsp;3123456
        </div>
        <div class="liContent">&nbsp;&nbsp;&nbsp;&nbsp;Göteborg</div>
      </li>
    </ul>
    <button
      class="primaryButton"
      tabindex="0"
      type="submit"
      @click="openContact"
      v-show="!isContactFormVisible"
    >
      <span class="buttonLabel">Click here to send your query</span>
    </button>

    <ContactForm v-show="isContactFormVisible" @close="closeContact" />
  </section>
</template>

<script>
import ContactForm from "../components/ContactForm.vue";
export default {
  name: "Contact",
  components: {
    ContactForm,
  },
  data() {
    return {
      isContactFormVisible: false,
    };
  },
  methods: {
    openContact() {
      this.isContactFormVisible = true;
    },
    closeContact() {
      this.isContactFormVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/common";
.contactSec {
  overflow-y: auto;
  overflow-x: auto;
  margin-top: 1%;
  margin-bottom: 1%;
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
  list-style-type: none;
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
