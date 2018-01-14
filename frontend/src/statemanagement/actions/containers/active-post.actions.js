export const SET_EDITING = 'SET_EDITING';
export const SET_COMMENT_EDITING = 'SET_COMMENT_EDITING';
export const ADD_COMMENT_STATE = 'ADD_COMMENT_STATE';

export const setEditing = setEdit => ({
    type: SET_EDITING,
    setEdit
});

export const setCommentEditing = (id, setEdit) => ({
    type: SET_COMMENT_EDITING,
    setEdit,
    id
});

export const addCommentState = id => ({
    type: ADD_COMMENT_STATE,
    id
});