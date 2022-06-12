import { createStore } from 'vuex'
import auth from "@/store/modules/auth/index";
import post from "@/store/modules/post/index";

const store = createStore({
  modules: {
    auth,
    post
  }
});
export default store;
