import {SET_TOKEN, SET_USER_TOKEN_DATA_MUTATION} from "@/store/storeconstants";

export default {
    [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
        state.id = payload.id;
        state.email = payload.email;
        state.pseudo = payload.pseudo;
    },
    [SET_TOKEN](state, payload) {
        state.token = payload.token;
        state.idUser = payload.idUser;
        state.pseudo = payload.pseudo;
    }
};