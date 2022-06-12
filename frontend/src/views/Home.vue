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
      <input type="file" id="file-upload" name="image" accept=".jpg, .jpeg, .png">
      <button type="submit">Envoyer</button>
    </form>
  </div>
  <div class="w3-container" v-for="data in postData" :key="data.id">
    <div class="w3-card-4 w3-panel w3-border w3-round-xlarge" style="width:100%;">
      <header class="w3-container">
        <div class="row">
          <div class="col-sm-3"><i class='fas fa-user-alt'></i>{{ pseudo }}</div>
          <div class="col-sm-6"></div>
          <div class="col-sm-3">{{data.date}}</div>
        </div>
      </header>

      <div class="w3-container">
        <p>{{data.message}}</p>
      </div>

      <footer class="w3-container">
        <h5>Footer</h5>
      </footer>
    </div>
  </div>
  </div>
  <!--  </div>-->
</template>

<script>

import axios from "axios";
import {ID_USER_GETTER, IS_USER_AUTHENTICATE_GETTER, POST_MSG_ACTION, PSEUDO_GETTER} from "@/store/storeconstants";
import {mapActions, mapGetters} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      message: '',
      file: '',
      date: new Date().toLocaleDateString('en-CA'),
      image: '',
      video: 'https://www.youtube.com/watch?v=YxZMYcHsoCQ',
      postData: [],
    }
  },
  computed: {
    ...mapGetters('auth', {
      isAuth: IS_USER_AUTHENTICATE_GETTER,
      pseudo: PSEUDO_GETTER,
      idUser: ID_USER_GETTER,
    }),
  },
  mounted() {
    axios.get('http://localhost:5000/api/post', {withCredentials: true})
        .then((response) => {
         this.postData = response.data;
        });
  },
  methods: {
    ...mapActions('post', {post: POST_MSG_ACTION}),
    async onPost() {
      try {
        await this.post({
          poster_id: this.idUser,
          message: this.message,
          image: this.image,
          video: this.video,
          date: this.date
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
</style>