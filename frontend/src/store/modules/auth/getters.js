import {
    ID_USER_GETTER,
    IS_USER_AUTHENTICATE_GETTER,
    PSEUDO_GETTER
} from "@/store/storeconstants";

export default {
    [IS_USER_AUTHENTICATE_GETTER]: (state) => {
        return state.token;
    },

    [PSEUDO_GETTER]: (state) => {
        return state.pseudo;
    },

    [ID_USER_GETTER]: (state) => {
        return state.idUser;
    }
};