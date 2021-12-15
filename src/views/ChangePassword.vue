<template>
  <div class="change-password">
    <h3>Change Password</h3>
    <label>Email</label>
    <input type="email" v-model="email" required />
    <div v-if="!showPasswordChange">
      <label>Security Question</label>
      <select v-model="question">
        <option value="bornCity">What city were you born in?</option>
        <option value="petName">What is the name of your favorite pet?</option>
        <option value="motherName">What is your mother's maiden name?</option>
        <option value="highSchoolName">What high school did you attend?</option>
      </select>
      <label>Answer</label>
      <input type="Text" v-model="answer" required />

      <br />

      <button class="primaryButton" tabindex="0" @click="authenticateSecurity">
        <span class="buttonLabel">Verify</span>
      </button>
    </div>
    <div v-else>
      <label>Password</label>
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
      <input type="password" v-model="newPassword" required />
      <br />

      <button class="primaryButton" tabindex="0" @click="updatePassword">
        <span class="buttonLabel">Change Password</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      email: "",
      newPassword: "",
      question: "",
      answer: "",
      showPasswordChange: false,
      passwordError: "",
    };
  },
  mounted() {
    let user = this.$store.state.userService.user;
    this.email = user != null && user != "undefined" ? user.email : "";
  },
  methods: {
    reset() {
      this.email = "";
      this.newPassword = "";
      this.question = "";
      this.answer = "";
      this.showPasswordChange = false;
      this.passwordError = "";
    },
    authenticateSecurity() {
      let userDetails = {
        email: this.email,
        security: this.question + ":" + this.answer,
      };
      this.$store.dispatch("authenticateSecurity", userDetails).then(() => {
        const error = this.$store.state.userService.error;
        if (error === "") {
          this.showPasswordChange = true;
        } else {
          this.$confirm({
            auth: false,
            message: error,
            button: {
              yes: "Ok",
            },
          });
        }
      });
    },
    updatePassword() {
      //Validate password field length
      this.passwordError =
        this.newPassword.length > 6
          ? ""
          : "Password should be more than 6 characters long!";
      if (!this.passwordError) {
        const user = {
          email: this.email,
        };
        let data = {
          user: user,
          newPassword: this.newPassword,
          verifiedUser: this.showPasswordChange,
        };
        this.$store.dispatch("updatePassword", data).then(() => {
          const error = this.$store.state.userService.error;
          this.$confirm({
            auth: false,
            message: error != "" ? error : "Password updated successfully",
            button: {
              yes: "Ok",
            },
            callback: (confirm) => {
              if (confirm == true) {
                //reload the previous page
                this.showPasswordChange = false;
                if (error == "") {
                  location.reload();
                }
              }
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
.change-password {
  max-width: 600px;
  margin: 10px auto;
  background: #fff;
  text-align: left;
  border-radius: 10px;
  min-height: 75vh;
}
label {
  color: rgb(73, 72, 72);
  display: inline-block;
  margin: 15px 0 10px;
}
input,
select {
  display: block;
  padding: 5px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0;
  position: relative;
  top: 2px;
}
h3 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 0;
}
.register-user {
  font-size: 24px;
  font-weight: 500;
  color: #25d366;
}
#popup-input {
  display: block;
  width: 60%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  color: #555;
}
@media screen and (max-width: 800px) {
  label {
    color: rgb(73, 72, 72);
    display: inline-block;
    margin: 5px 0 10px;
    font-size: 0.8em;
  }
  input,
  select {
    display: block;
    padding: 5px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
  input[type="checkbox"] {
    display: inline-block;
    width: 10px;
    margin: 0 10px 0;
    position: relative;
    top: 2px;
  }
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    line-height: 1.2;
    margin-top: 0;
  }
  .register-user {
    font-size: 1.25rem;
    font-weight: bold;
    color: #25d366;
  }
}
</style>
