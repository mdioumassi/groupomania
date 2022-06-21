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
                placeholder='Quoi de neuf ?'></textarea>
      <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png">
      <button type="submit">Envoyer</button>
    </form>
  </div>
  <div class="w3-container" v-for="data in postData" :key="data.id">
    <div class="w3-card-4 w3-panel w3-border w3-round-xlarge" style="width:100%;">
      <header class="w3-container">
        <div class="row w3-margin">
          <div class="col-sm-3"><i class='fas fa-user-alt'></i></div>
          <div class="col-sm-6"></div>
          <div class="col-sm-3">{{ data.date | moment("dddd, MMMM Do YYYY") }}</div>
        </div>
      </header>

      <div class="w3-container">
        <p class="w3-margin">{{data.message}}</p>
        <p><img src="{{data.image}}" alt=""></p>
      </div>

      <footer class="w3-container">
        <h5>Footer</h5>
      </footer>
    </div>
  </div>
  </div>
  <!--  </div>-->
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
import {ID_USER_GETTER, IS_USER_AUTHENTICATE_GETTER, POST_MSG_ACTION, PSEUDO_GETTER} from "@/store/storeconstants";
import {mapActions, mapGetters} from "vuex";

import Homepage from "@/views/Homepage.vue";
import moment from 'moment';
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
      file: '',
      date: new Date().toLocaleDateString('en-CA'),
      video: 'https://www.youtube.com/watch?v=YxZMYcHsoCQ',
      postData: [],
      pseudo: ''
    }
  },
  computed: {
    ...mapGetters('auth', {
      isAuth: IS_USER_AUTHENTICATE_GETTER,
      pseudo: PSEUDO_GETTER,
      idUser: ID_USER_GETTER,
    }),
  },
  created() {
    this.moment = moment;
  },
  mounted() {
    axios.get(`http://localhost:5000/api/post`, {withCredentials: true})
        .then((response) => {
         this.postData = response.data;
        });

    /*
    axios.get(`http://localhost:5000/api/user/${this.idUser}`, {withCredentials: true})
        .then((response) => {
          this.pseudo[] = response.data[0].pseudo;
        });*/
  },
  methods: {
    ...mapActions('post', {post: POST_MSG_ACTION}),
    async onPost() {
      // if (this.file) {
      //   if (!this.file.name.endsWith(".jpg") && !this.file.name.endsWith(".jpeg") && !this.file.name.endsWith(".png")) {
      //     alert("L'image doit être au format jpg/jpeg/png");
      //     return;
      //   }
      //   if (this.file.size > 1 * 1024 * 1024) {
      //     alert("L'image ne doit pas dépasser 5 mo");
      //     return;
      //   }
      // }
      try {
        await this.post({
          poster_id: this.idUser,
          message: this.message,
          video: this.video,
          date: this.date,
          file: this.file,
        });
      } catch (e) {
        this.error = e;
      }
    }
  }
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