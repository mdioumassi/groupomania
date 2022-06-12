import mutations from "@/store/modules/post/mutations";
import actions from "@/store/modules/post/actions";
import getters from "@/store/modules/post/getters";

export default {
    namespaced: true,
    state() {
        return {
          'message': ''
        };
    },
    mutations,
    getters,
    actions
}