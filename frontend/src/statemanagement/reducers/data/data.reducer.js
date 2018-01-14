import { postReducer } from "./post.reducer";
import { categoriesReducer } from "./categories.reducer";
import { combineReducers } from 'redux';
import { commentReducer } from "./comments.reducer";

export default combineReducers({
    posts: postReducer,
    comments: commentReducer,
    categories: categoriesReducer
})