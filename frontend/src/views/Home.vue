<template>
  <!--  <div class="container">-->
  <!--    {{ message }}-->
  <div class="post-container">
    <a class="user-info" href="/profil">
      <i class="glyphicon glyphicon-user"></i>
      <p>{{ pseudo }}</p></a>
    <div class="form">
      <div class="form-outline w-100 mb-4">
        <textarea class="form-control" id="textAreaExample6" rows="3">Quoi de neuf ?</textarea>
      </div>
      <div class="form-footer">
        <div class="file-gestion">
          <div class="upload-file">
            <img src="" alt="file-icon" id="file-image-icon">
            <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png">
          </div>
        </div>
        <div class="buttons">
          <button type="submit">Envoyer</button>
        </div>
      </div>
    </div>
  </div>
  <!--  </div>-->
</template>

<script>

import axios from "axios";
import { PSEUDO_GETTER} from "@/store/storeconstants";
import {mapGetters} from "vuex";

// import { useCookies } from "vue3-cookies";
// const { cookies } = useCookies();

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  // data() {
  //   return {
  //    'pseudo': this.pseudo
  //   }
  // },
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
    // console.log(res.data);
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