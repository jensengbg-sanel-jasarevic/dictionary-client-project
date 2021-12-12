<template>
  <div class="profileSec">
    <div id="profile-box">
      <h2>User profile</h2>
      <h3>Basic information</h3>
      <label>Firstname </label>
      <p class="labelValue">{{ user.firstname }}</p>
      <label>Lastname </label>
      <p class="labelValue">{{ user.lastname }}</p>
      <label>Email</label>
      <p class="labelValue">{{ user.email }}</p>
      <label>Role</label>
      <p class="labelValue">{{ userRole }}</p>
      <button id="deleteBtn" tabindex="0" @click="deleteUser">
        Delete me!
      </button>
    </div>
    <div id="create-word-box"> 
      <h3>Add a word to the dictionary</h3>
      <form @submit.prevent="createWord">
        <label for="word">Word</label>
        <input v-model="word" class="create-word-input" type="text" placeholder="Write a word to be added"/>
        <label for="information">Definition</label>
        <textarea v-model="wordDefinition" class="create-word-input" rows="10" placeholder="Write a definition for the word" />
        <input id="submit-word" type="submit" value="Post"/>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",

  data() {
    return {
      word: null,
      wordDefinition: null
    }
  },

  computed: {
    user() {
      return this.$store.state.userService.user;
    },
    userRole() {
      return this.user.role == "admin" ? "Admin" : "User";
    }
  },

  methods: {
    createWord() {
        const payload = {
          word: this.word,
          definition: this.wordDefinition,
          author: `${this.user.firstname} ${this.user.lastname}`,
          role: this.user.role
        }
      this.$store.dispatch("createWord", payload);
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
.profileSec {
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-areas: "left right";
  min-height: 80vh;
}
h2 {
  font-size: 1.75rem;
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
#deleteBtn {
    background-color: #ec4b43;
    border: none;
    border-radius: 30px;
    padding: 16px 32px;
    color: white;
    cursor: pointer;
    margin-top: 5%;
}
#create-word-box {
  margin-right: 15%;
}
#create-word-box > form {
  display: flex;
  flex-direction: column;
}
.create-word-input{
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
#submit-word{
  margin-top: 5%;
  background-color: #ffb000;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .profileSec{
    display: flex;
    flex-direction: column;
  }
  #profile-box{
    margin-right: 15%;
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
  #create-word-box {
    padding: 10%;
  }
}
</style>
