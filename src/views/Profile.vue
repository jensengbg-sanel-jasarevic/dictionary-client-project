<template>
  <div class="profileSec">
    <div id="profile-box">
      <h1>User profile
      </h1>
      <img src="@/assets/iconpacks-person.svg" alt="Author" height="100px"/>
      <h3>Basic information</h3>
      <label>Firstname </label>
      <p class="labelValue">{{ user.firstname }}</p>
      <label>Lastname </label>
      <p class="labelValue">{{ user.lastname }}</p>
      <label>Email</label>
      <p class="labelValue">{{ user.email }}</p>
      <label>Role</label>
      <p class="labelValue">{{ userRole }}</p>
      <div>
        <button class="primaryButton" tabindex="0" @click="changePassword">
          <span class="buttonLabel">Change Password</span>
        </button>
        &nbsp;&nbsp;
        <button class="secondaryButton" tabindex="0" @click="openSecurityPopUp">
          <span class="buttonLabel">Change Security Question</span>
        </button>
        <!-- Popup to update Security question and answer -->
        <Popup
          v-show="showSecurityPopup"
          @ok="updateSecurity"
          @close="closeSecurityPopUp"
          @cancel="closeSecurityPopUp"
        >
          <template v-slot:header> Update Security Question </template>

          <template v-slot:body>
            <div style="width: 600px">
              <div v-if="securityError" class="error">{{ securityError }}</div>
              <label>Security Question</label>
              <select v-model="question" class="popupInput">
                <option value="bornCity">What city were you born in?</option>
                <option value="petName">
                  What is the name of your favorite pet?
                </option>
                <option value="motherName">
                  What is your mother's maiden name?
                </option>
                <option value="highSchoolName">
                  What high school did you attend?
                </option>
              </select>
              <label>Answer</label>
              <div v-if="answerError" class="error">{{ answerError }}</div>
              <input type="Text" v-model="answer" class="popupInput" required />

              <br />
            </div>
          </template>
          <template v-slot:okText> Update </template>
          <template v-slot:cancelText> Cancel </template>
        </Popup>

        &nbsp;&nbsp;
        <button id="deleteUserBtn" tabindex="0" @click="deleteUser">
          Delete me!
        </button>
      </div>
    </div>

    <div v-if="userRole === 'Admin'">
      <div class="admin-feature-forms">
        <h3>Add a word to the dictionary</h3>
        <form @submit.prevent="createWord">
          <label for="word">Word</label>
          <input
            v-model="addWord"
            class="word-input"
            type="text"
            placeholder="Write a word to be added"
          />
          <label for="information">Definition</label>
          <textarea
            v-model="addWordDefinition"
            class="word-input"
            rows="10"
            placeholder="Write a definition for the word"
          />
          <input id="add-word" type="submit" value="Add word" />
        </form>
        <p v-if="createWordErrorMsg" class="error-msg">
          {{ createWordErrorMsg }}
        </p>
        <p v-if="createWordSuccessMsg" class="success-msg">
          {{ createWordSuccessMsg }}
        </p>
      </div>

      <div class="admin-feature-forms">
        <h3>Update a word in the dictionary</h3>
        <form @submit.prevent="putWordDefinition">
          <label for="word">Word</label>
          <input
            v-model="updateWord"
            class="word-input"
            type="text"
            placeholder="Write a word to be updated"
          />
          <label for="information">Definition</label>
          <textarea
            v-model="updateWordDefinition"
            class="word-input"
            rows="10"
            placeholder="Write a updated definition for the word"
          />
          <input id="update-word" type="submit" value="Update word" />
        </form>
        <p v-if="updateWordErrorMsg" class="error-msg">{{ updateWordErrorMsg }}</p>
        <p v-if="updateWordSuccessMsg" class="success-msg">{{ updateWordSuccessMsg }}</p>
      </div>

      <div class="admin-feature-forms">
        <h3>Delete a word in the dictionary</h3>
        <form @submit.prevent="deleteWord">
          <label for="deleteWord">Word</label>
          <input
            v-model="removeWord"
            class="word-input"
            type="text"
            placeholder="Write a word to be deleted"
          />
          <input id="delete-word" type="submit" value="Delete word" />
        </form>
        <p v-if="deleteWordErrorMsg" class="error-msg">
          {{ deleteWordErrorMsg }}
        </p>
        <p v-if="deleteWordSuccessMsg" class="success-msg">
          {{ deleteWordSuccessMsg }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from "../components/PopUp.vue";
export default {
  name: "Profile",
  components: {
    Popup,
  },

  data() {
    return {
      addWord: null,
      addWordDefinition: null,
      updateWord: null,
      updateWordDefinition: null,
      removeWord: null,
      showSecurityPopup: false,
      question: "",
      answer: "",
      securityError: "",
      answerError: "",
    };
  },
  beforeMount() {
    this.$store.dispatch("clearStateValues");
  },
  computed: {
    user() {
      return this.$store.state.userService.user;
    },
    userRole() {
      return this.user.role == "admin" ? "Admin" : "User";
    },
    createWordErrorMsg() {
      return this.$store.state.createWordErrorMsg;
    },
    createWordSuccessMsg() {
      return this.$store.state.createWordSuccessMsg;
    },
    updateWordErrorMsg() {
      return this.$store.state.updateWordErrorMsg
    },
    updateWordSuccessMsg() {
      return this.$store.state.updateWordSuccessMsg
    },        
    deleteWordErrorMsg() {
      return this.$store.state.deleteWordErrorMsg;
    },
    deleteWordSuccessMsg() {
      return this.$store.state.deleteWordSuccessMsg;
    },
  },

  methods: {
    createWord() {
      if (this.addWord && this.addWordDefinition) {
        const payload = {
          word: this.addWord,
          definition: this.addWordDefinition,
          author: `${this.user.firstname} ${this.user.lastname}`,
          role: this.user.role
        }
      this.$store.dispatch("createWord", payload);
      }
      else {
        return
      }
    },
    putWordDefinition() {
        if(this.updateWord && this.updateWordDefinition) {
        const payload = {
          word: this.updateWord.toUpperCase(),
          updateDefinition: this.updateWordDefinition,
          author: `${this.user.firstname} ${this.user.lastname}`,
          role: this.user.role
        }  
      this.$store.dispatch("putWordDefinition", payload);
        }
        else {
          return
        }
    },
    deleteWord() {
      if (this.removeWord) {
        const payload = {
          word: this.removeWord,
          role: this.user.role
        }
      this.$store.dispatch("deleteWord", payload);    
      } else {
        return
      }
    },
    deleteUser() {
      this.$confirm({
        auth: false,
        message: "Are you sure you want to delete the user?",
        button: {
          yes: "Delete",
          no: "Cancel",
        },
        callback: (confirm) => {
          if (confirm == true) {
            this.$store.dispatch("deleteUser", this.user).then(() => {
              const error = this.$store.state.userService.error;
              this.$confirm({
                auth: false,
                message: error != "" ? error : "Deleted successfully",
                button: {
                  yes: "Ok",
                },
                callback: (confirm) => {
                  if (confirm == true && error == "") {
                    this.$router.push(`/`);
                  }
                },
              });
            });
          }
        },
      });
    },
    changePassword() {
      this.$router.push("/changePassword");
    },
    openSecurityPopUp() {
      this.question = "";
      this.answer = "";
      this.showSecurityPopup = true;
    },
    closeSecurityPopUp() {
      this.showSecurityPopup = false;
    },
    resetError() {
      this.securityError = "";
      this.answerError = "";
    },
    updateSecurity() {
      //reset all the errors before update
      this.resetError();
      //check if the Security question and answer is selected
      if (this.question === "" || this.answer === "") {
        this.securityError = "Please select a Security question and answer";
      }
      //check if the Security answer contains only alphabets and space
      var regex = new RegExp("^[a-zA-Z ]+$");
      if (
        this.answer == null ||
        this.answer == "undefined" ||
        !regex.test(this.answer)
      ) {
        this.answerError = "Answer should only contain alphabets";
      }
      if (!this.securityError && !this.answerError) {
        const userDetails = {
          email: this.user.email,
          security: this.question + ":" + this.answer,
        };
        this.$store.dispatch("updateSecurity", userDetails).then(() => {
          const error = this.$store.state.userService.error;
          this.$confirm({
            auth: false,
            message:
              error != ""
                ? error
                : "Security question for the user updated successfully",
            button: {
              no: "Ok",
            },
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/common";
h1,
h4 {
  font-weight: unset;
  line-height: 1.2;
}
label {
  color: rgb(73, 72, 72);
  display: inline-block;
  margin: 15px 0 10px;
  font-weight: bold;
}
.labelValue {
  display: block;
  margin: 5px 0px 0px 0px !important;
  width: 100%;
  box-sizing: border-box;
  border: none;
  color: #555;
  font-weight: none !important;
  text-transform: none;
}
#deleteUserBtn {
  background-color: #ec4b43;
  border: none;
  border-radius: 30px;
  padding: 12px 32px;
  color: white;
  cursor: pointer;
  margin-top: 5%;
  margin-bottom: 10%;
}
#deleteUserBtn:hover {
  background-color: #8a302c;
}

.admin-feature-forms {
  border-top: 1.5px solid #1f1671;
  max-width: 50vw;
  margin: auto;
}
.admin-feature-forms > form {
  display: flex;
  flex-direction: column;
  margin-bottom: 10%;
}

#add-word {
  margin-top: 5%;
  background-color: #0f9d58;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  cursor: pointer;
}
#update-word {
  margin-top: 5%;
  background-color: #ffb000;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  cursor: pointer;
}
#delete-word {
  margin-top: 5%;
  background-color: #ec4b43;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  cursor: pointer;
}
.success-msg {
  color: #0f9d58;
}
.error-msg {
  color: hsl(3, 82%, 59%);
}

.popupInput {
  display: block;
  padding: 5px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

@media screen and (max-width: 800px) {
  .profileSec {
    display: flex;
    flex-direction: column;
  }

  label {
    color: rgb(73, 72, 72);
    display: inline-block;
    margin: 5px 0 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
  .labelValue {
    display: block;
    margin: 5px 0px 0px 0px !important;
    font-size: 0.8em;
    width: 100%;
    box-sizing: border-box;
    border: none;
    color: #555;
    font-weight: none !important;
    text-transform: none;
  }
  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.2;
  }

  .button-div {
    display: flex;
    flex-direction: column;
    text-align: left;
    position: relative;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 10px;
  }

  #deleteUserBtn {
    font-size: 10px;
  }
}
</style>
