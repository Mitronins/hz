import {AUTH, DELETE_AUTH} from "../constans";

export function setToken(token) {
    return {
        type: AUTH,
        data: {token}
    }
}

export function deleteAuth() {
    return {
        type: DELETE_AUTH,
    }
}
