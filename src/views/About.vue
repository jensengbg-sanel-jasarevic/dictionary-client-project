<template>
  <section class="aboutSec">
    <div>
      <h1>About &amp; Contacts</h1>
    </div>
    <div class="container">
      <div class="items">
        <div class="info-box-left">
          <h1 class="info-header">What we provide</h1>
          <p>
            We supply a free online dictionary website with words and terms from the
            IT field.
          </p>
          <h1 class="info-header">Our motive</h1>
          <p>
            The goal is simple — we want to make IT terminology easy to understand.
            Instead of using high-level terminology, definitions are strived to be
            written in simple everyday language. We strive for simplicity and accuracy
            with every definition we publish.
          </p>
        </div>
          
        <div class="info-box-middle">
          <h1 class="info-header">Support us &amp; get credit</h1>
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
        </div>
             
        <div class="info-box-right">
          <h1 class="info-header">Contact us</h1>
          <p>
          Here you will find contact information for our office. The below contacts
          can be reached during 08:00 - 16:30
          </p>
            <br>
            <i class="fas fa-envelope-square"></i>
            <p>balavadivel82@gmail.com</p>
            <p>3123456</p>
            <p>Göteborg</p>
            <br>
            <i class="fas fa-envelope-square"></i> 
            <p>saneljasarevic1992@gmail.com</p>
            <p> 4123456</p>
            <p>Göteborg</p>                              
        </div>
      </div>
    </div>

      <button
        class="primaryButton"
        tabindex="0"
        type="submit"
        @click="openContact"
        v-show="!isContactFormVisible"><span class="buttonLabel">Click here to send your query</span></button>
      <ContactForm v-show="isContactFormVisible" @close="closeContact" />
      <br>

  </section>
</template>

<script>
import ContactForm from "../components/ContactForm.vue";
export default {
  name: "Contact",
  components: {
    ContactForm
  }
}
</script>

<style lang="scss" scoped>
@import "../style/common";
.aboutSec {
    display: grid;
}
h1{
  font-weight: unset;
}
.container {
  margin: auto;
}
.items{
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  padding: 70px;
  margin-bottom: 2%;
  background-color: #60bad6;
  color: #5e5e5e;
  max-width: 80vw;
}
.info-header {
  color: #1f1671;
}
.info-box-left {
  background-color: #fff;
  padding: 3%;
  border-radius: 10px;
}
.info-box-middle{
  background-color: #fff;
  padding: 3%;
  border-radius: 10px;
  margin-right: 1%;
  margin-left: 1%;
}
.info-box-right {
  background-color: #fff;
  padding: 3%;
  border-radius: 10px;
}

@media only screen and (max-width: 800px) {
  .items{
    display: flex;
    flex-direction: column;
    max-width: 50vw;
    font-size: smaller;
  }
  .info-box-middle{
    margin-top: 5%;
    margin-bottom: 5%;
  }
}
</style>
