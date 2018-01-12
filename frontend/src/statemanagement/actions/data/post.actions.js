import * as Api from 'util/PostAPI';

export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const addPost = post => ({
    type: ADD_POST,
    post
});

export const updatePost = (updatedPost) => ({
    type: UPDATE_POST,
    updatedPost
});

export const saveUpVote = (id) => (dispatch) => (
    Api.vote('posts', id, 'upVote')
        .then((updatedPost) => dispatch(updatePost(updatedPost))
        ));

export const saveDownVote = (id) => (dispatch) => (
    Api.vote('posts', id, 'downVote')
        .then(updatedPost => dispatch(updatePost(updatedPost))
        ));

export const saveUpdatedPost = (post) => (dispatch) => (
    Api.update('posts', post)
        .then(updatedPost => dispatch(updatePost(updatedPost)))
);

