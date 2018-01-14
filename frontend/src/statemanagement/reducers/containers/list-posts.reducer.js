import { SET_SORT } from 'statemanagement/actions/containers/list-posts.actions';

const initialListPostsState = {
    sortBy: ''
};

export const listPostsReducer = (state = initialListPostsState, action) => {
    switch (action.type) {
        case (SET_SORT):
            return {
                ...state,
                sortBy: action.sortBy
            };
        default:
            return state;
    }
}

