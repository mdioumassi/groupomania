<template>
  <nav class="navbar navbar-expand-md navbar-dark  mb-4 w3-black">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Groupomania</router-link>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item" v-if="isAuth">
            <span class="w3-red">Hello {{ pseudo }} !</span>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link" v-if="!isAuth">Inscription</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" v-if="!isAuth">Connexion</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="onLogout" v-if="isAuth">Se déconnecter</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {IS_USER_AUTHENTICATE_GETTER, LOGOUT_ACTION, PSEUDO_GETTER} from "@/store/storeconstants";
import axios from "axios";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",

  computed: {
    ...mapGetters('auth', {
      isAuth: IS_USER_AUTHENTICATE_GETTER,
      pseudo: PSEUDO_GETTER
    })
  },
  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION
    }),

    async onLogout() {
      const removeCookie = (key) => {
        if (window !== undefined) {
          this.$cookies.remove(key, {expires: 1});
        }
      };
      await axios.get(`http://localhost:5000/api/auth/logout`, {withCredentials: true})
          .then(() => removeCookie('jwt'))
          .catch((err) => console.log(err));
      window.location = "/";
    },
  }
}
</script>
<style scoped>
.navbar {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>