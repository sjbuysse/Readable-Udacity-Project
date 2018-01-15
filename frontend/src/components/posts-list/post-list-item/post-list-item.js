import React from 'react';
import { Link } from 'react-router-dom';
import Voter from 'components/voter/voter';
import { saveDownVote, saveUpVote } from "statemanagement/actions/data/post.actions";
import { setEditing } from "statemanagement/actions/containers/active-post.actions";
import { connect } from 'react-redux';
import './post-list-item.css'
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';
import { deletePost } from "../../../statemanagement/actions/data/post.actions";

function PostListItem({post, upVote, downVote, history, setEditing, remove}) {
    return (
        <div className="post-list-item-container">
            <Voter id={post.id} voteUp={upVote} voteDown={downVote}/>
            <span>{post.voteScore}</span>
            <div className="post-list-item-header">
                <Link to={`/${post.category}/${post.id}`}>
                    <span>{post.title}</span>
                </Link>
                <span className="post-details">Written by {post.author} on {(new Date(post.timestamp)).toDateString()} --- {post.commentCount} {(post.commentCount === 1) ? 'comment' : 'comments'}</span>
            </div>
            <span>
            <FaPencil onClick={() => {
                setEditing(true);
                history.push(`/${post.category}/${post.id}`);
            }} className="post-pencil-icon"/>
            <FaTrash onClick={() => {
                remove(post)
            }} className="post-trash-icon"/>
            </span>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const {post} = ownProps;
    return {
        post
    }
};

const mapDispatchToProps = (dispatch) => ({
    upVote: (id) => dispatch(saveUpVote(id)),
    downVote: (id) => dispatch(saveDownVote(id)),
    setEditing: (setEdit) => dispatch(setEditing(setEdit)),
    remove: (post) => dispatch(deletePost(post.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem);