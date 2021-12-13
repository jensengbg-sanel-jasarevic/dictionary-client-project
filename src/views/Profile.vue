<template>
  <div class="profileSec">
    <div id="profile-box">
      <h1>User profile</h1>
      <h3>Basic information</h3>
      <label>Firstname </label>
      <p class="labelValue">{{ user.firstname }}</p>
      <label>Lastname </label>
      <p class="labelValue">{{ user.lastname }}</p>
      <label>Email</label>
      <p class="labelValue">{{ user.email }}</p>
      <label>Role</label>
      <p class="labelValue">{{ userRole }}</p>
      <button id="deleteUserBtn" tabindex="0" @click="deleteUser">
        Delete me!
      </button>
    </div>
    
    <div v-if="userRole === 'Admin'">
      <div class="admin-feature-forms"> 
        <h3>Add a word to the dictionary</h3>
        <form @submit.prevent="createWord">
          <label for="word">Word</label>
          <input v-model="addWord" class="word-input" type="text" placeholder="Write a word to be added"/>
          <label for="information">Definition</label>
          <textarea v-model="addWordDefinition" class="word-input" rows="10" placeholder="Write a definition for the word" />
          <input id="add-word" type="submit" value="Add word"/>
        </form>
        <p v-if="createWordErrorMsg" class="error-msg">{{ createWordErrorMsg }}</p>
        <p v-if="createWordSuccessMsg" class="success-msg">{{ createWordSuccessMsg }}</p>
      </div>

      <div class="admin-feature-forms"> 
        <h3>Update a word in the dictionary</h3>
        <form @submit.prevent="updateWord">
          <label for="word">Word</label>
          <input v-model="updateWord" class="word-input" type="text" placeholder="Write a word to be updated"/>
          <label for="information">Definition</label>
          <textarea v-model="updateWordDefinition" class="word-input" rows="10" placeholder="Write a updated definition for the word" />
          <input id="update-word" type="submit" value="Update word"/>
        </form>
      </div>

    <div class="admin-feature-forms"> 
      <h3>Delete a word in the dictionary</h3>
      <form @submit.prevent="deleteWord">
        <label for="deleteWord">Word</label>
        <input v-model="removeWord" class="word-input" type="text" placeholder="Write a word to be deleted"/>
        <input id="delete-word" type="submit" value="Delete word"/>
      </form>
      <p v-if="deleteWordErrorMsg" class="error-msg">{{ deleteWordErrorMsg }}</p>
      <p v-if="deleteWordSuccessMsg" class="success-msg">{{ deleteWordSuccessMsg }}</p>
    </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Profile",

  data() {
    return {
      addWord: null,
      addWordDefinition: null,
      updateWord: null,
      updateWordDefinition: null,
      removeWord: null
    }
  },
  beforeMount(){
  this.$store.dispatch('clearStateValues')
  },
  computed: {
    user() {
      return this.$store.state.userService.user;
    },
    userRole() {
      return this.user.role == "admin" ? "Admin" : "User";
    },
    createWordErrorMsg() {
      return this.$store.state.createWordErrorMsg
    },
    createWordSuccessMsg() {
      return this.$store.state.createWordSuccessMsg
    },
    deleteWordErrorMsg() {
      return this.$store.state.deleteWordErrorMsg
    },
    deleteWordSuccessMsg() {
      return this.$store.state.deleteWordSuccessMsg
    }          
  },

  methods: {
    createWord() {
        const payload = {
          word: this.addWord,
          definition: this.addWordDefinition,
          author: `${this.user.firstname} ${this.user.lastname}`,
          role: this.user.role
        }
      this.$store.dispatch("createWord", payload);
    },
    deleteWord() {
        const payload = {
          word: this.removeWord,
          role: this.user.role
        }
      this.$store.dispatch("deleteWord", payload);      
    },
    deleteUser() {
      this.$confirm({
        auth: false,
        message: "Are you sure you want to delete the user?",
        button: {
          yes: "Delete",
          no: "Cancel"
        },
        callback: (confirm) => {
          if (confirm == true) {
            this.$store.dispatch("deleteUser", this.user).then(() => {
              const error = this.$store.state.userService.error;
              this.$confirm({
                auth: false,
                message: error != "" ? error : "Deleted successfully",
                button: {
                  yes: "Ok"
                },
                callback: (confirm) => {
                  if (confirm == true && error == "") {
                    this.$router.push(`/`);
                  }
                }
              })
            })
          }
        }
      })
    }
  }

};
</script>

<style lang="scss" scoped>
@import "../style/common";
h1, h4 {
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
    padding: 16px 32px;
    color: white;
    cursor: pointer;
    margin-top: 5%;
    margin-bottom: 10%;
}
.admin-feature-forms {
  max-width: 50vw;
  margin: auto;
}
.admin-feature-forms > form {
  display: flex;
  flex-direction: column;
  margin-bottom: 10%;
}
.word-input{
  padding: 15px;
  outline: none;
  border-radius: 20px;  
  border: 1px solid #1f1671;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
}
#add-word{
  margin-top: 5%;
  background-color: #0F9D58;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  cursor: pointer;
}
#update-word{
  margin-top: 5%;
  background-color: #ffb000;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  cursor: pointer;
}
#delete-word{
  margin-top: 5%;
  background-color:#ec4b43;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  cursor: pointer;
}
.success-msg {
  color:#0F9D58;
}
.error-msg {
  color: #ec4b43;
}

@media screen and (max-width: 800px) {
  .profileSec{
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
}
</style>
