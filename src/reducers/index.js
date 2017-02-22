import { combineReducers } from 'redux';
import user from './userReducer';
import polls from './pollsReducer';

export default combineReducers({ polls, user });
