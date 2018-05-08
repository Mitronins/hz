import {AUTH, DELETE_AUTH} from "../constans";

const tokenLocal = localStorage.getItem('token') ? localStorage.getItem('token') : null;

export default (token = tokenLocal, action) => {
    const {type} = action;

    switch (type) {
        case AUTH:
            return action.data.token;
        case DELETE_AUTH:
            return null;
    }
    return token;
};