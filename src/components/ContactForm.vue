<template>
  <Popup @ok="displaySuccess" @close="closeForm" @cancel="closeForm">
    <template v-slot:header> Contact Us </template>

    <template v-slot:body>
      <form>
        <label>Name</label>
        <input type="Text" v-model="contactFormData.name" />
        <label>Email</label>
        <input type="email" v-model="contactFormData.email" required />
        <label>Message</label>
        <textarea rows="10" v-model="contactFormData.message" required />
        <div class="form-result">
          <p class="alert alert-success" v-if="success && !error">
            Message sent successfully.
          </p>
          <p class="alert alert-error" v-if="!success && error">
            Message failed.
          </p>
        </div>
      </form>
    </template>
    <template v-slot:okText> Send </template>
    <template v-slot:cancelText> Cancel </template>
  </Popup>
</template>

<script>
import Popup from "../components/PopUp.vue";
export default {
  name: "ContactForm",
  components: {
    Popup,
  },
  data: function () {
    return {
      contactFormData: {
        name: "",
        email: "",
        message: "",
      },
      success: false,
      error: false,
    };
  },
  methods: {
    displaySuccess() {
      this.success = true;
    },
    resetForm() {
      this.contactFormData = {
        name: "",
        email: "",
        message: "",
      };
    },
    closeForm() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/common";
form {
  max-width: 600px;
  width: 600px;
  margin-top: 10px;
  margin-left: 20px;
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

input {
  display: block;
  padding: 5px 6px;
  width: 80%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

textarea {
  display: block;
  padding: 5px 6px;
  width: 80%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  color: #555;
}
.form-control {
  width: 80%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type="text"].form-control {
  margin: 8px 0;
  display: inline-block;
}
textarea.form-control {
  resize: none;
}
.alert {
  padding: 0 10px;
}
.alert-success {
  color: #3be249;
}
.alert-error {
  color: #ff2121;
}
</style>
