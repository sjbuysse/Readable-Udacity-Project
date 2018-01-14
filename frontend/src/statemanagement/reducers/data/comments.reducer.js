import { ADD_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT } from 'statemanagement/actions/data/comments.actions';

const initialCommentState = {};

export const commentReducer = (state = initialCommentState, action) => {
    switch(action.type) {
        case(ADD_COMMENT):
            return {
                ...state,
                [action.comment.id] : action.comment
            };
        case(REMOVE_COMMENT):
            const newState = Object.assign({}, state)
            delete newState[action.commentId];
            return newState;

        case(UPDATE_COMMENT):
            return {
                ...state,
                [action.updatedComment.id] : action.updatedComment
            };
        default:
            return state;
    }
};
