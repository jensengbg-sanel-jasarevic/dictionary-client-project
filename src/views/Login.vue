<template>
    <form>
        <h3> Login</h3>
        <label>Email</label>  
        <input type="email"  v-model="email" required>
        <label>Password :</label>  
        <input type="password"  v-model="password" required>
        <br/>
         <button class="primaryButton" tabindex="0" type="submit">
            <span class="buttonLabel">Login</span>
            </button>
    </form>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
handleSubmit() {
            //Validate password field length
            this.passwordError = this.password.length > 6 ? 
            '' : 'Password should be more than 6 characters long!';

            if(!this.passwordError) {
                console.log(this.email);
                console.log(this.password);
                console.log(this.role);
                console.log(this.education);
                console.log(this.terms);

            }
        }
    },
}
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
    display:inline-block;
    margin: 15px 0 10px;
    text-transform: uppercase;
}

input {
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
    width:16px;
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
@media screen and (max-width: 600px) {
    form {
    max-width: 500px;
    margin: 5px auto;
    background: #fff;
    text-align: left;
    border-radius: 5px;
    min-height: 62vh;
}

label {
    color: rgb(73, 72, 72);
    display:inline-block;
    margin: 5px 0 10px;
      font-size: 0.8em;
    text-transform: uppercase;
}

input {
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
    width:10px;
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