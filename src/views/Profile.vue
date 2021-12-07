<template>
  <div class="profile-div">
    <h3>Profile</h3>
    <label>Firstname : </label>
    <p class="labelValue">{{ user.firstname }}</p>
    <label>Lastname : </label>
    <p class="labelValue">{{ user.lastname }}</p>
    <label>Email : </label>
    <p class="labelValue">{{ user.email }}</p>
    <label>Role : </label>
    <p class="labelValue">{{ user.role }}</p>

    <!-- Popup to change password -->
    <Popup
      v-show="showPassword"
      @ok="updatePassword"
      @close="closePassword"
      @cancel="closePassword"
    >
      <template v-slot:header> Please enter new Password! </template>

      <template v-slot:body>
        <div v-if="passwordError" class="error">{{ passwordError }}</div>
        <input class="popup-input" type="password" v-model="newPassword" />
      </template>
      <template v-slot:okText> Ok </template>
      <template v-slot:cancelText> Cancel </template>
    </Popup>
    <br />
    <div class="button-div">
      <button class="primaryButton" tabindex="0" @click="openPassword">
        <span class="buttonLabel">Change Password</span>
      </button>

      <button class="secondaryButton" tabindex="0" @click="deleteUser">
        <span class="buttonLabel">Delete me!</span>
      </button>
    </div>
  </div>
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
      newPassword: "",
      passwordError: "",
      showPassword: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.userService.user;
    },
  },
  methods: {
    updatePassword() {
      //Validate password field length
      this.passwordError =
        this.newPassword.length > 6
          ? ""
          : "Password should be more than 6 characters long!";
      if (!this.passwordError) {
        let data = {
          user: this.user,
          newPassword: this.newPassword,
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
                this.closePassword();
              }
            },
          });
        });
      }
    },
    deleteUser() {
      this.$confirm({
        auth: false,
        message: "Are you sure to delete the user?",
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
    openPassword() {
      this.showPassword = true;
    },
    closePassword() {
      this.showPassword = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/common";
.profile-div {
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
.popup-input {
  display: block;
  width: 60%;
  box-sizing: bordre-box;
  border: 1px solid #ddd;
  color: #555;
}
.button-div {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
@media screen and (max-width: 600px) {
  .profile-div {
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
  .button-div {
    display: flex;
    flex-direction: column;
    text-align: left;
    position: relative;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 10px;
  }
}
</style>