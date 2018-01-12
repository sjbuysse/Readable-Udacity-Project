import { postReducer } from "./post.reducer";
import { categoriesReducer } from "./categories.reducer";
import { combineReducers } from 'redux';

export default combineReducers({
    posts: postReducer,
    categories: categoriesReducer
})