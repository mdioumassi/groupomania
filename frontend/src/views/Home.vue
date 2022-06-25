<template>
  <!--  <div class="container">-->
  <!--    {{ message }}-->
  <div  v-if="isAuth">
  <div class="post-container">
    <a class="user-info" href="/profil" v-if="pseudo">
      <i class='fas fa-user-alt' style='font-size:48px;color:red'></i>
      <p>{{ pseudo }}</p></a>
    <form @submit.prevent="onPost()" class="form-post-msg">
      <textarea v-model.trim="message" class="form-control" rows="3" name='message' id='message'
                placeholder='Quoi de neuf ?' required></textarea>
      <input v-model.trim="url_image" type="text" id="file-upload" name="url_image" placeholder="URL image" >
      <button type="submit">Envoyer</button>
    </form>
  </div>
  <div class="w3-container" v-for="data in postData" :key="data.id">
    <div class="w3-card-4 w3-panel w3-border w3-round-xlarge" style="width:100%;">
      <header class="w3-container">
        <div class="row w3-margin">
          <div class="col-sm-3"><i class='fas fa-user-alt'></i></div>
          <div class="col-sm-6"></div>
          <div class="col-sm-3">{{
              data.date
            }}</div>
        </div>
      </header>

      <div class="w3-container">
        <p class="w3-margin">{{data.message}}</p>
        <p><img v-bind:src="data.url_image" alt=""></p>
      </div>
    </div>
  </div>
  </div>
  <div class="row" v-if="!isAuth">
    <div class="col-sm-4"></div>
    <div class="col-sm-4">
      <div class="imgcontainer">
        <img src="../assets/img/icon.png" alt="Avatar" class="logo">
      </div>
      <Homepage/>
    </div>
    <div class="col-sm-4"></div>
  </div>
</template>

<script>

import axios from "axios";
import {ID_USER_GETTER, IS_USER_AUTHENTICATE_GETTER, POST_MSG_ACTION, SET_TOKEN} from "@/store/storeconstants";
import {mapActions, mapGetters} from "vuex";

import Homepage from "@/views/Homepage.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Homepage,
  },
  data() {
    return {
      message: '',
      url_image: '',
      timestamp: '',
      postData: [],
      pseudo: ''
    }
  },
  computed: {
    ...mapGetters('auth', {
      isAuth: IS_USER_AUTHENTICATE_GETTER,
      // pseudo: PSEUDO_GETTER,
      idUser: ID_USER_GETTER,
    }),
  },
  created() {
    setInterval(this.getNow, 1000);
    this.getToken();
  },
  mounted() {
    axios.get(`http://localhost:5000/api/post`, {withCredentials: true})
        .then((response) => {
         this.postData = response.data;
        });
  },

  methods: {
    ...mapActions('auth', {
      tokenUser: SET_TOKEN
    }),
    getNow: function() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.timestamp = dateTime;
    },
    ...mapActions('post', {post: POST_MSG_ACTION}),
    async onPost() {
      try {
        await this.post({
          poster_id: this.idUser,
          message: this.message,
          timestamp: this.timestamp,
          url_image: this.url_image
        });
      } catch (e) {
        this.error = e;
      }
      await this.$router.push('/');
    },
    getToken() {
      axios.get(`http://localhost:5000/api/jwtid`, {withCredentials: true})
          .then((response) => {
            this.tokenUser({token: response.data.token, myID: response.data.myID});
          });
    }
  },
}
</script>

<style scoped>
.form-post-msg {
  width: 50rem;
}

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fcd4d3;
  /*width: 60%;*/
  margin: 40px 0 20px;
  padding: 20px 0;
  border-radius: 10px;
  box-shadow: 0 1px 10px rgb(0 0 0 / 25%);
}

.imgcontainer .logo {
  width: 75%;
}
</style>