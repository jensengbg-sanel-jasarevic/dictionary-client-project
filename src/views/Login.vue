<template>
  <div>
    <form @submit.prevent="handleSubmit()">
      <h3>Login</h3>
      <label>Email</label>
      <input type="email" v-model="email" required />
      <label>Password</label>
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
      <input type="password" v-model="password" />
      <br />
      <button
        class="primaryButton"
        tabindex="0"
        type="submit"
      >
        <span class="buttonLabel">Login</span>
      </button>
      &nbsp;&nbsp;
    </form>
    <button class="secondaryButton" @click="displayForgotPasswordForm">
      <span class="buttonLabel">Forgot password</span>
    </button>    
    <form v-if="forgotPasswordForm" @submit.prevent="changePassword()">
      <h3>Enter account credentials</h3>
      <label>Email</label>
      <input type="email" v-model="forgotPasswordEmail" required />
      <label>Secret key</label>
      <input type="password" v-model="secretKey" required />
      <label>New password</label>
      <input type="password" v-model="newUserPassword" required />
      <button class="secondaryButton" id="change-password-btn" type="submit">
        <span class="buttonLabel">Change password</span>
      </button>
    </form>
    <p v-if="passwordUpdatedMsg" class="success-msg">{{ passwordUpdatedMsg }}</p>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      passwordError: "",
      forgotPasswordEmail: null,
      secretKey: null,
      newUserPassword: null,
      forgotPasswordForm: false
    };
  },

  beforeMount(){
  this.$store.dispatch('clearStateValues')
  },

computed: {
    passwordUpdatedMsg() {
      return this.$store.state.userService.passwordUpdatedMsg;
    },
    errorMsg() {
      return this.$store.state.userService.error
    }        
  },

  methods: {
    async handleSubmit() {
      //Validate password field length
      this.passwordError =
        this.password.length <= 0
          ? "Password cannot be empty!"
          : this.password.length > 6
          ? ""
          : "Password should be more than 6 characters long!";
      if (!this.passwordError) {
        const userDetails = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch("login", userDetails).then(() => {
          const error = this.$store.state.userService.error;
          if (error != "") {
            this.$confirm({
              auth: false,
              message: error,
              button: {
                no: "Ok",
              },
            });
          } else {
            this.$router.push("/profile");
          }
        });
      }
    },
  displayForgotPasswordForm(){
    this.forgotPasswordForm = true
  },
  changePassword() {
      const userDetails = {
        email: this.forgotPasswordEmail,
        secretKey: this.secretKey,
        newPassword: this.newUserPassword
      };
      this.$store.dispatch("updatePassword", userDetails)  
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/common";
form {
  max-width: 600px;
  margin: 30px auto;
  background: #fff;
  text-align: left;
  border-radius: 10px;
}
label {
  color: rgb(73, 72, 72);
  display: inline-block;
  margin: 15px 0 10px;
}
input {
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
.error {
  color: #ec4b43;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
.success-msg {
  color:#0F9D58;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
h3 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 0;
}
#change-password-btn{
  margin-top: 2%;
}
@media screen and (max-width: 600px) {
  label {
    color: rgb(73, 72, 72);
    display: inline-block;
    margin: 5px 0 10px;
    font-size: 0.8em;
  }
  input {
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
  .error {
    color: #ff0000;
    margin-top: 10px;
    font-size: 0.4em;
    font-weight: bold;
  }
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    line-height: 1.2;
    margin-top: 0;
  }
}
</style>