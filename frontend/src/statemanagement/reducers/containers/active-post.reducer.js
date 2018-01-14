import { SET_EDITING, SET_COMMENT_EDITING, ADD_COMMENT_STATE } from "../../actions/containers/active-post.actions";

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
        case(ADD_COMMENT_STATE): {
            const { id } = action;
            return {
                ...state,
                [id]: {
                    editing: false
                }
            }
        }
        case(SET_COMMENT_EDITING): {
            const { setEdit, id } = action;
            return {
                ...state,
                [id]: {
                    editing: setEdit
                }
            }
        }
        default:
            return state;
    }
};
