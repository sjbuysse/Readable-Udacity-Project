import React from 'react';
import CommentListItem from "./comment-list-item/comment-list-item";
import { connect } from 'react-redux';

const CommentsList = ({comments}) => (
    <div className="comments-list">
        <h3>Comments ({comments.length})</h3>
        {comments.map(comment => (
            <CommentListItem key={comment.id} comment={comment}/>
        ))}
    </div>
)

const mapStateToProps = (state, ownProps) => {
    const {parentId} = ownProps;
    const comments = Object.keys(state.data.comments)
        .map(id => state.data.comments[id])
        .filter(comment => comment.parentId === parentId);
    return {
        comments,
    }
};

export default connect(mapStateToProps)(CommentsList);