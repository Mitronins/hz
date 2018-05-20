import {combineReducers} from 'redux';

import auth from './auth';
import user from './user';
import words from './words';

export default combineReducers({
    auth,
    user,
    words
});