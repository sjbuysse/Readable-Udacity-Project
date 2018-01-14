import * as Api from 'util/PostAPI';

export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const addPost = post => ({
    type: ADD_POST,
    post
});

export const removePost = postId => ({
    type: REMOVE_POST,
    postId
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
    Api.updatePost(post)
        .then(updatedPost => dispatch(updatePost(updatedPost)))
);

export const fetchPost = (postId) => (dispatch) => (
    Api.getPost(postId).then(post => dispatch(updatePost(post)))
);

export const savePost = (post) => (dispatch) => (
    Api.add(post)
        .then(post => dispatch(addPost(post)))
);

export const deletePost = (postId) => (dispatch) => (
    Api.remove(postId)
        .then(() => dispatch(removePost(postId)))
);

export const fetchPosts = () => (dispatch) => (
    Api.getPosts().then(posts => {
        for (const post of posts) {
            dispatch(addPost(post));
        }
    })
);
