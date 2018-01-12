import { SET_EDITING } from "../../actions/containers/active-post.actions";

const initialActivePost = {
    editing: false
};

export const activePostReducer = (state = initialActivePost, action) => {
    switch(action.type) {
        case(SET_EDITING): {
            const { setEdit } = action;
            return {
                ...state,
                editing: setEdit
            }
        }
        default:
            return state;
    }
};
