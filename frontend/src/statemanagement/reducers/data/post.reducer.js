import { ADD_POST, UPDATE_POST } from 'statemanagement/actions/data/post.actions';

const initialPostState = {};

export const postReducer = (state = initialPostState, action) => {
    switch(action.type) {
        case(ADD_POST):
            return {
                ...state,
                [action.post.id] : action.post
            };
        case(UPDATE_POST):
            return {
                ...state,
                [action.updatedPost.id] : action.updatedPost
            };
        default:
            return state;
    }
};