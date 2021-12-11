<template>
  <form @submit.prevent="handleSubmit">
    <p v-if="showRegister === true" class="register-user">
      New user registered!
    </p>
    <h3>Register</h3>
    <label>Firstname</label>
    <input type="Text" v-model="firstname" required />
    <label>Lastname</label>
    <input type="Text" v-model="lastname" required />
    <label>Email</label>
    <input type="email" v-model="email" required />
    <label>Password</label>
    <div v-if="passwordError" class="error">{{ passwordError }}</div>
    <input type="password" v-model="password" required />
    <label>Role</label>
    <select v-model="role" @change="openAdminCode">
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
    <!-- Popup to enter Admin code -->
    <Popup
      v-show="isAdminCode"
      @ok="checkAdminCode"
      @close="closeAdmin"
      @cancel="closeAdmin"
    >
      <template v-slot:header> Please enter the admin code </template>

      <template v-slot:body>
        <input class="popup-input" type="password" v-model="adminCode" />
      </template>
      <template v-slot:okText> Ok </template>
      <template v-slot:cancelText> Cancel </template>
    </Popup>

    <br />
    <div>
      <input type="checkbox" v-model="terms" required />
      <label
        >I accept to the
        <a href="javascript:void(0)" v-on:click="openTerms" id="termsPopup">
          Terms and Conditions</a
        ></label
      >
    </div>
    <Popup
      v-show="isTermsVisible"
      @ok="acceptTerms"
      @close="closeTerms"
      @cancel="declineTerms"
    >
      <template v-slot:header> Terms and Conditions </template>

      <template v-slot:body>
        These terms and conditions have been generated with the help of the terms and conditions sample generator.
        These standard terms and conditions written on this webpage shall manage your use of our website.
        These terms will be applied fully and affect to your use of this Website. By using this website, you agreed
        to accept all terms and conditions written in here. You must not use this website if you disagree with any of
        these website standard terms and conditions. We are permitted to revise these terms at any time as it sees fit,
        and by using this website you are expected to review these terms on a regular basis The site is allowed to assign,
        transfer, and subcontract its rights and/or obligations under these terms without any notification. However, you are
        not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms. These terms
        constitute the entire agreement between the website and you in relation to your use of this website, and supersede all
        prior agreements and understandings. These terms will be governed by and interpreted in accordance with the laws of the
        state of se, and you submit to the non-exclusive jurisdiction of the state and federal courts located in se for the resolution
        of any disputes.
      </template>
      <template v-slot:okText> Accept </template>
      <template v-slot:cancelText> Decline </template>
    </Popup>
    <button class="primaryButton" tabindex="0" type="submit" :disabled="!terms">
      <span class="buttonLabel">Sign up here</span>
    </button>
  </form>
</template>
<script>
import Popup from "../components/PopUp.vue";
export default {
  name: "SignUp",
  components: {
    Popup,
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      terms: false,
      isTermsVisible: false,
      passwordError: "",
      showRegister: false,
      role: "user",
      isAdminCode: false,
      adminCode: "",
      isAdminUser: false,
    };
  },
  methods: {
    handleSubmit() {
      //Validate password field length
      this.passwordError =
        this.password.length > 6
          ? ""
          : "Password should be more than 6 characters long!";
      if (!this.passwordError) {
        if (this.role === "admin" && this.isAdminUser) {
          this.registerUser();
        } else if (this.role === "user") {
          this.registerUser();
        } else {
          this.$confirm({
            auth: false,
            message: "Select valid role",
            button: {
              no: "Ok",
            },
          });
        }
      }
    },
    registerUser() {
      const userDetails = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        role: this.role,
        terms: new Date().toLocaleString()
      };
      this.$store
        .dispatch("registerUser", userDetails)
        .then(() => {
          const error = this.$store.state.userService.error;
          const user = this.$store.state.userService.user;
          if (error != "") {
            this.$confirm({
              auth: false,
              message: error,
              button: {
                no: "Ok",
              },
            });
          } else if (user != "undefined" && user != null) {
            (this.firstname = ""),
              (this.lastname = ""),
              (this.email = ""),
              (this.password = ""),
              (this.terms = false),
              (this.isTermsVisible = false),
              (this.passwordError = ""),
              (this.showRegister = true),
              (this.role = "user"),
              (this.isAdminCode = false),
              (this.adminCode = ""),
              (this.isAdminUser = false),
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$confirm({
            auth: false,
            message: "Please try again later",
            button: {
              no: "Ok",
            },
          });
        });
    },
    openTerms() {
      this.isTermsVisible = true;
    },
    closeTerms() {
      this.isTermsVisible = false;
    },
    acceptTerms() {
      this.terms = true;
      this.closeTerms();
    },
    declineTerms() {
      this.terms = false;
      this.closeTerms();
    },
    openAdminCode() {
      if (this.role === "admin") {
        this.isAdminCode = true;
      } else {
        this.isAdminUser = false;
      }
    },
    checkAdminCode() {
      if (this.adminCode === process.env.VUE_APP_ADMIN_CODE) {
        this.isAdminUser = true;
        this.closeAdmin();
      } else {
        this.isAdminUser = false;
        this.$confirm({
          auth: false,
          message: "Invalid admin code",
          button: {
            no: "Ok",
          },
        });
      }
    },
    closeAdmin() {
      this.isAdminCode = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/common";
form {
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
  color: #25D366;
}
.popup-input {
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
    color: #25D366;
  }
}
</style>
