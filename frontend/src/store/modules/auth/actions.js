import {
    LOGIN_ACTION, SET_TOKEN,
    SET_USER_TOKEN_DATA_MUTATION,
    SIGNUP_ACTION
} from "@/store/storeconstants";
import axios from "axios";
import SignupValidations from "@/services/SignupValidations";

export default {
    //  async [LOGOUT_ACTION](){
    //      // let response = '';
    //      await axios.get(`http://localhost:5000/api/auth/logout`, {withCredentials: true})
    //          .then(() => removeCookie('jwt'))
    //          .catch((err) => console.log(err));
    //      window.location = "/";
    //      // if (response.statusText === 'OK') {
    //      //     context.commit(SET_USER_TOKEN_DATA_MUTATION, {
    //      //         token: ''
    //      //     })
    //      // }
    // },
    async [SET_TOKEN](context, payload) {
        let response = '';
        response = await axios.get(`http://localhost:5000/api/user/${payload.myID}`, {withCredentials: true});
        if (response.statusText === 'OK') {
            context.commit(SET_TOKEN, {
                token: payload.token,
                idUser: payload.myID,
                pseudo: response.data['0'].pseudo
            })
        }

    },
    async [LOGIN_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password
        };
        let response = '';
        try {
            response = await axios.post(`http://localhost:5000/api/auth/login`, postData, {withCredentials: true});
        } catch (err) {
            throw SignupValidations.getErrorMessageFromCode(err.response.data.message);
        }
        if (response.statusText === 'OK') {
            context.commit(SET_USER_TOKEN_DATA_MUTATION, {
                id: response.data.id,
                pseudo: response.data.pseudo
            })
        }
    },
    async [SIGNUP_ACTION](context, payload) {
        let userData = {
            pseudo: payload.pseudo,
            email: payload.email,
            password: payload.password
        };
        let response = '';
        try {
             response = await axios.post(`http://localhost:5000/api/auth/register`, userData, {withCredentials: true});
        } catch (err) {
            throw SignupValidations.getErrorMessageFromCode(err.response.data.message);
        }

        if (response.status === 'OK') {
            context.commit(SET_USER_TOKEN_DATA_MUTATION, {
                email: response.data.email,
                pseudo: response.data.pseudo
            })
        }
    }
};