import {AUTH, DELETE_AUTH, SET_NAME, SET_WORDS, DELETE_WORD} from "../constans";

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

export function setWords(words) {
    return {
        type: SET_WORDS,
        data: {words}
    }
}

export function deleteWord(id) {
    return {
        type: DELETE_WORD,
        data: {id}
    }
}