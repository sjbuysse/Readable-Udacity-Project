import * as Api from 'util/PostAPI';
import { addCommentState } from "../containers/active-post.actions";
import { fetchPost } from "./post.actions";

export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export const addComment = comment => ({
    type: ADD_COMMENT,
    comment
});

export const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
});

export const updateComment = (updatedComment) => ({
    type: UPDATE_COMMENT,
    updatedComment
});

export const saveUpVote = (id) => (dispatch) => (
    Api.vote('comments', id, 'upVote')
        .then((updatedComment) => dispatch(updateComment(updatedComment))
        ));

export const saveDownVote = (id) => (dispatch) => (
    Api.vote('comments', id, 'downVote')
        .then(updatedComment => dispatch(updateComment(updatedComment))
        ));

export const fetchComments = (parentId) => (dispatch) => (
    Api.getComments(parentId).then(comments => {
        for (const comment of comments) {
            dispatch(addCommentState(comment.id));
            dispatch(addComment(comment));
        }
    })
);

export const saveComment = (comment) => (dispatch) => (
    Api.addComment(comment).then((response) => {
            dispatch(addCommentState(response.id));
            dispatch(addComment(response));
            dispatch(fetchPost(comment.parentId));
        }
    )
);

export const saveUpdatedComment = (comment) => (dispatch) => (
    Api.updateComment(comment)
        .then(updatedComment => dispatch(updateComment(updatedComment)))
);

export const deleteComment = (comment) => (dispatch) => (
    Api.removeComment(comment.id).then(() => {
            dispatch(removeComment(comment.id))
            dispatch(fetchPost(comment.parentId));
        }
    )
);
