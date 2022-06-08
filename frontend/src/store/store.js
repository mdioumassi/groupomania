import { createStore } from 'vuex'
import auth from "@/store/modules/auth/index";

const store = createStore({
  modules: {
    auth
  }
});
export default store;