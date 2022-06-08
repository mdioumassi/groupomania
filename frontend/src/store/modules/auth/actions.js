import {LOGIN_ACTION, LOGOUT_ACTION, SET_USER_TOKEN_DATA_MUTATION, SIGNUP_ACTION} from "@/store/storeconstants";
import axios from "axios";
import SignupValidations from "@/services/SignupValidations";

export default {
     async [LOGOUT_ACTION]() {
         // const removeCookie = (key) => {
         //   if (window !== undefined) {
         //     this.$cookies.remove(key, {expires: 1});
         //   }
         // };
         // try {
         //     let response;
         //     response = await axios.get(`http://localhost:5000/api/auth/logout`, {withCredentials: true})
         //         // .then(() => removeCookie('jwt'))
         //     console.log(response);
         // } catch (err) {
         //     console.log(err)
         // }

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
        if (response.status === '200') {
            context.commit(SET_USER_TOKEN_DATA_MUTATION, {
                pseudo: response.data.pseudo,
                email: response.data.email,
                token: response.data.token
            })
        }
    },
    async [SIGNUP_ACTION](context, payload) {
        let postData = {
            pseudo: payload.pseudo,
            email: payload.email,
            password: payload.password
        };
        let response = '';
        try {
             response = await axios.post(`http://localhost:5000/api/auth/register`, postData, {withCredentials: true});
        } catch (err) {
            throw SignupValidations.getErrorMessageFromCode(err.response.data.message);
        }

        if (response.status === '200') {
            context.commit(SET_USER_TOKEN_DATA_MUTATION, {
                email: response.data.email,
                pseudo: response.data.pseudo
            })
        }
    }


};