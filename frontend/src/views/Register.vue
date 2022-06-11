<template>
  <div class="container">
    <div class="alert alert-danger" v-if="error">{{error}}</div>
    <form @submit.prevent="onSignup()">
      <label for="pseudo"><b>Pseudo</b></label>
      <input v-model.trim="pseudo" type="text" placeholder="Pseudo" name="pseudo" id="pseudo">

      <label for="email"><b>Email</b></label>
      <input v-model.trim="email" type="text" placeholder="Enter Email" name="email" id="email">
      <div class="error" v-if="errors.email">{{ errors.email }}</div>

      <label for="password"><b>Password</b></label>
      <input v-model.trim="password" type="password" placeholder="Enter Password" name="password" id="password">
      <div class="error" v-if="errors.password">{{ errors.password }}</div>
      <hr>
      <button type="submit" class="registerbtn">Register</button>
    </form>
  </div>
</template>

<script>
import SignupValidations from "@/services/SignupValidations";
import {mapActions} from "vuex";
import {SIGNUP_ACTION} from "@/store/storeconstants";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  data() {
    return {
      pseudo: '',
      email: '',
      password: '',
      errors: [],
      error: ''
    }
  },
  methods: {
    ...mapActions('auth', {signup: SIGNUP_ACTION}),
    onSignup() {
      let validations = new SignupValidations(
          this.email,
          this.password
      );
      this.errors = validations.checkValidations();
      if ('email' in this.errors || 'password' in this.errors) {
        return false;
      }
      this.signup({pseudo: this.pseudo, email: this.email, password: this.password}).catch(error => {
        this.error = error;
      });
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit/register button */
.registerbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>