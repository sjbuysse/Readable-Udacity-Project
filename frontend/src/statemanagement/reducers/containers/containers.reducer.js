import { activePostReducer } from "./active-post.reducer";
import { listPostsReducer } from "./list-posts.reducer";
import { combineReducers } from 'redux';

export default combineReducers({
    activePost: activePostReducer,
    listPosts: listPostsReducer
})