import {
    POST_MSG_ACTION,
} from "@/store/storeconstants";
import axios from "axios";
import SignupValidations from "@/services/SignupValidations";

export default {
    async [POST_MSG_ACTION](context, payload) {
        let postData = {
            poster_id: payload.poster_id,
            message: payload.message,
            image: payload.image,
            video: payload.video,
            date: payload.date
        };
        let response = '';
        try {
            response = await axios.post(`http://localhost:5000/api/post`, postData, {withCredentials: true});
            console.log(response);
        } catch (err) {
            throw SignupValidations.getErrorMessageFromCode(err.response.data.message);
        }
    }
};