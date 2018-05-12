import {SET_USER, DELETE_USER} from "../constans";


export default (user = null, action) => {
    const {type} = action;

    switch (type) {
        case SET_USER:
            return action.data.user;
        case DELETE_USER:
            return null;
    }
    return user;
};