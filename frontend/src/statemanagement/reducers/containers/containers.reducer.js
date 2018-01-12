import { activePostReducer } from "./active-post.reducer";
import { combineReducers } from 'redux';

export default combineReducers({
    activePost: activePostReducer
})