import {SET_WORDS, DELETE_WORD} from "../constans";


export default (words = [], action) => {
    const {type} = action;

    switch (type) {
        case SET_WORDS:
            return action.data.words;
        case DELETE_WORD:
            return words.filter((word) => word.id !== action.data.id);
    }
    return words;
};