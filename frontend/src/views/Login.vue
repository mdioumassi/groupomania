<template>
  <div class="container">
    <h1>Login {{ pseudo }}</h1>
    <div class="alert alert-danger" v-if="error">{{error}}</div>
    <form @submit.prevent="onLogin()">
      <div class="imgcontainer">
        <img src="../assets/img/img_avatar2.png" alt="Avatar" class="avatar">
      </div>

      <label for="email"><b>Email</b></label>
      <input v-model.trim="email" type="text" placeholder="Enter Email" name="email">
      <div class="error" v-if="errors.email">{{errors.email}}</div>
      <label for="password"><b>Password</b></label>
      <input v-model.trim="password" type="password" placeholder="Enter Password" name="password">
      <div class="error" v-if="errors.password">{{errors.password}}</div>
      <button type="submit">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SignupValidations from "@/services/SignupValidations";
import {LOGIN_ACTION, PSEUDO_GETTER} from "@/store/storeconstants";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  computed: {
    ...mapGetters('auth', {
      pseudo: PSEUDO_GETTER
    }),
  },
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      error: ''
    }
  },
  methods: {
    ...mapActions('auth', {login: LOGIN_ACTION}),
    async onLogin() {
      let validations = new SignupValidations(
          this.email,
          this.password
      );
      this.errors = validations.checkValidations();
      if ('email' in this.errors || 'password' in this.errors) {
        return false;
      }
      try {
         await this.login({email: this.email, password: this.password});
      } catch (e) {
        this.error = e;
      }
     await this.$router.push('/');
    }
  },
}
</script>

<style>
/* Full-width inputs */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 15%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }

  .cancelbtn {
    width: 100%;
  }
}
</style>