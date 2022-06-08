import {SET_USER_TOKEN_DATA_MUTATION} from "@/store/storeconstants";

export default {
    [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
        state.pseudo = payload.pseudo;
        state.email = payload.email;
        state.token = payload.token;
    }
};