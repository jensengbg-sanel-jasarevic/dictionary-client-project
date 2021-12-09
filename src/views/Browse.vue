<template>
  <section class="browseSec">
    <h1>Browse the dictionary entries alphabetically</h1>
    <p>
      Click on a specific letter and some of the most of the common words and
      terms in today's IT terminology will be displayed. View the definition by
      clicking further on your choice of word.
    </p>
    <p style="color: #42b983">{{ successMsg }}</p>
    <ul v-on:click="routeToWordsByLetter">
      <li>A</li>
      <li>B</li>
      <li>C</li>
      <li>D</li>
      <li>E</li>
      <li>F</li>
      <li>G</li>
      <li>H</li>
      <li>I</li>
      <li>J</li>
      <li>K</li>
      <li>L</li>
      <li>M</li>
      <li>N</li>
      <li>O</li>
      <li>P</li>
      <li>Q</li>
      <li>R</li>
      <li>S</li>
      <li>T</li>
      <li>U</li>
      <li>V</li>
      <li>W</li>
      <li>X</li>
      <li>Y</li>
      <li>Z</li>
    </ul>
    <div v-if="clickedLetter">
      <h1>
        Index: <span id="clicked-letter">{{ clickedLetter }}</span>
      </h1>
      <button
        class="primaryButton"
        tabindex="0"
        @click="createWordPop"
        v-if="user.role == 'admin'"
        style="margin-bottom: 1%"
      >
        <span class="buttonLabel">Create Word</span>
      </button>
      <Popup
        v-show="showCreate"
        @ok="createWordInfo"
        @close="closePopup"
        @cancel="closePopup"
      >
        <template v-slot:header> Update Word Description </template>

        <template v-slot:body>
          <form>
            <label>Word : </label>
            <div v-if="wordError" class="error">{{ wordError }}</div>
            <input type="Text" v-model="word" />
            <label>Description</label>
            <div v-if="descError" class="error">{{ descError }}</div>
            <textarea rows="10" v-model="wordDescription" />
          </form>
        </template>
        <template v-slot:okText> Create </template>
        <template v-slot:cancelText> Cancel </template>
      </Popup>

      <Word
        v-for="item in wordsByLetter"
        :key="item"
        :word="item"
        :user="user"
      />
    </div>
  </section>
</template>

<script>
import Word from "@/components/Word";
import Popup from "../components/PopUp.vue";
export default {
  name: "Browse",

  components: {
    Word,
    Popup,
  },

  data() {
    return {
      clickedLetter: null,
      wordDescription: "",
      descError: "",
      wordError: "",
      showCreate: false,
      word: "",
      successMsg: "",
    };
  },

  methods: {
    routeToWordsByLetter(event) {
      const letter = event.target.innerText.toLowerCase();
      this.successMsg = "";
      if (letter.length > 1) {
        return;
      } else {
        this.clickedLetter = letter.toUpperCase();
        this.$store.dispatch("getWordsByLetter", letter);
      }
    },
    createWordPop() {
      this.showCreate = true;
    },
    closePopup() {
      this.showCreate = false;
    },
    createWordInfo() {
      // check if the description and word is not empty
      if (this.wordDescription.length > 0 && this.word.length > 0) {
        // Create the word as payload variable
        let name = this.$store.state.userService.user.firstname;
        let payload = {
          word: this.word,
          information: this.wordDescription,
          author: name,
          role: this.user.role
        };
        // Call the backend to create the new word
        this.$store.dispatch("createWordInfo", payload);
        this.closePopup(); //close the popup after the update
        setTimeout(() => {
          this.$store.dispatch("getWordsByLetter", this.clickedLetter);
          this.successMsg =
            "Successfully created definition for '" + this.word + "'";
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE & Opera
        }, 700);
      } else if (this.word.length <= 0) {
        this.wordError = "Word cannot be empty!";
      } else {
        this.descError = "Description cannot be empty!";
      }
    },
    showSuccess() {
      this.$store.dispatch("getWordsByLetter", this.clickedLetter);
      this.successMsg = "Delete Successful";
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE & Opera
    },
  },

  computed: {
    wordsByLetter() {
      return this.$store.state.wordsByLetter;
    },
    user() {
      return this.$store.state.userService.user;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/common";
.browseSec {
  max-width: 80vw;
  margin-left: auto;
  margin-right: auto;
  min-height: 75vh;
}
ul {
  list-style-type: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
}
li {
  padding: 1%;
  border-radius: 20px;
  border: 1.5px solid #1f1671;
}
#clicked-letter {
  color: #ec4b43;
}
label {
  color: rgb(73, 72, 72);
  display: inline-block;
  margin: 15px 0 10px;
  text-transform: uppercase;
}
input,
textarea {
  display: block;
  padding: 5px 6px;
  width: 80%;
  box-sizing: border-box;
  border-bottom: 2px solid #ddd;
  color: #555;
}

@media (max-width: 900px) {
  ul {
    display: flex;
    flex-direction: column;
  }
  li {
    min-width: 10vw;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2%;
  }
  label {
    color: rgb(73, 72, 72);
    display: inline-block;
    margin: 5px 0 10px;
    font-size: 0.8em;
    text-transform: uppercase;
  }
  input,
  textarea {
    display: block;
    padding: 5px 6px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
}
</style>
