<template>
  <!--  <div class="container">-->
  <!--    {{ message }}-->
  <div class="post-container">
    <a class="user-info" href="/profil" v-if="pseudo">
      <i class='fas fa-user-alt' style='font-size:48px;color:red'></i>
      <p>{{ pseudo }}</p></a>
    <form @submit.prevent="onPost()">
         <textarea v-model.trim="message" class="form-control" name='message' id='message' placeholder='Quoi de neuf ?'></textarea>
<!--        <input v-model.trim="media" type="file" id="file-upload" name="media" accept=".jpg, .jpeg, .png">-->
      <button type="submit">Envoyer</button>
    </form>
  </div>
  <!--  </div>-->
</template>

<script>

import axios from "axios";
import {PSEUDO_GETTER} from "@/store/storeconstants";
import {mapGetters} from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      'message': '',
      'file': ''
    }
  },
  computed: {
    ...mapGetters('auth', {
      pseudo: PSEUDO_GETTER
    })
  },
  mounted() {
    axios.get('http://localhost:5000/api/post', {withCredentials: true})
        .then((response) => {
          console.log(response);
        });
  },
  methods: {
    onPost() {

    }
  }
}
</script>

<style scoped>
.container {
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
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