import {AUTH, DELETE_AUTH, SET_NAME} from "../constans";

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

export function setUser(name) {
    return {
        type: SET_NAME,
        data: {name}
    }
}

export function deleteUser() {
    return {
        type: SET_NAME
    }
}