<template>
  <nav class="navbar navbar-expand-md navbar-dark  mb-4 w3-pale-red">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Groupomania {{isAuth}}</router-link>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item"  v-if="!isAuth">
            <router-link to="/register" class="nav-link">Inscription</router-link>
          </li>
          <li class="nav-item"  v-if="!isAuth">
            <router-link to="/login" class="nav-link">Connexion</router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item"  v-if="isAuth">
            <span></span>
          </li>
          <li class="nav-item"  v-if="isAuth">
            <a class="nav-link" href="#" @click.prevent="onLogout()">Déconnexion</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {IS_USER_AUTHENTICATE_GETTER, LOGOUT_ACTION} from "@/store/storeconstants";
import axios from "axios";
// import axios from "axios";



export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  computed: {
    ...mapGetters('auth', {
      isAuth: IS_USER_AUTHENTICATE_GETTER
    }),
    // ...mapState('auth', {
    //     pseudo: (state) => state.pseudo
    // }),
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
      // this.logout();
        await axios.get(`http://localhost:5000/api/auth/logout`, {withCredentials: true})
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err));
            //this.$router.replace('/login');
      }
    }
}
</script>
<style scoped>
.navbar {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>