<template>
  <form @submit.prevent="handleSubmit">
    <p v-if="showRegister === true" class="register-user">
      New User is Registered!
    </p>
    <h3>Register</h3>
    <label>Firstname</label>
    <input type="Text" v-model="firstname" required />
    <label>Lastname</label>
    <input type="Text" v-model="lastname" required />
    <label>Email</label>
    <input type="email" v-model="email" required />
    <label>Password :</label>
    <div v-if="passwordError" class="error">{{ passwordError }}</div>
    <input type="password" v-model="password" required />
    <label>Role :</label>
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
        >I accept to all
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
      <template v-slot:header> Terms and Condition </template>

      <template v-slot:body>
        Legitimate interest. Visit Sweden’s legitimate interest in processing of
        personal data is to be able to offer you/your organisation better
        services and also to provide you with relevant information about the
        services. We may use data about you to provide newsletters and also news
        information and marketing related to our services, both general and
        customer-specific, inform you about campaigns, special offers and other
        information about our activities or services that we offer ourselves or
        through our cooperating partners and that we think may be of interest to
        you or your organisation. We may thus later use the data about you for
        direct marketing, unless you/your organisation have instructed us not to
        do this. However, if you are a private individual we will only use your
        data for electronic direct marketing if you have consented to us doing
        so. You have an opportunity at any time to object to us using your
        personal data for marketing purposes by contacting us directly in our
        electronic mailing.
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
        terms: new Date().toLocaleString(),
        role: this.role,
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
                this.$router.push("/Login");
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
      if (this.adminCode === "admin") {
        this.isAdminUser = true;
        this.closeAdmin();
      } else {
        this.isAdminUser = false;
        this.$confirm({
          auth: false,
          message: "Invalid Admin Code",
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
  text-transform: uppercase;
}

input,
select {
  display: block;
  padding: 5px 6px;
  width: 100%;
  box-sizing: bordre-box;
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
  color: #ff0000;
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

.register-user {
  font-size: 24px;
  font-weight: 500;
  color: rgb(26, 114, 80);
}

.popup-input {
  display: block;
  width: 60%;
  box-sizing: bordre-box;
  border: 1px solid #ddd;
  color: #555;
}

@media screen and (max-width: 600px) {
  form {
    max-width: 500px;
    margin: 5px auto;
    background: #fff;
    text-align: left;
    border-radius: 5px;
    min-height: 75vh;
  }

  label {
    color: rgb(73, 72, 72);
    display: inline-block;
    margin: 5px 0 10px;
    font-size: 0.8em;
    text-transform: uppercase;
  }

  input,
  select {
    display: block;
    padding: 5px 6px;
    width: 100%;
    box-sizing: bordre-box;
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

  .register-user {
    font-size: 1.25rem;
    font-weight: bold;
    color: rgb(26, 114, 80);
  }
}
</style>
