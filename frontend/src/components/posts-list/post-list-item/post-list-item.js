import React from 'react';
import { Link } from 'react-router-dom';
import Voter from 'components/voter/voter';
import { saveDownVote, saveUpVote } from "statemanagement/actions/data/post.actions";
import { setEditing } from "statemanagement/actions/containers/active-post.actions";
import { connect } from 'react-redux';
import './post-list-item.css'
import FaPencil from 'react-icons/lib/fa/pencil';

const mapStateToProps = (state, ownProps) => {
    const {post} = ownProps;
    return {
        editing: state.containers.activePost.editing,
        post
    }
};

const mapDispatchToProps = (dispatch) => ({
    upVote: (id) => dispatch(saveUpVote(id)),
    downVote: (id) => dispatch(saveDownVote(id)),
    setEditing: (setEdit) => dispatch(setEditing(setEdit))
});

function PostListItem({post, editing, upVote, downVote}) {
    return (
        <div className="grid-container">
            <Voter id={post.id} voteUp={upVote} voteDown={downVote}/>
            <span>{post.voteScore}</span>
            <label><Link to={'/post/' + post.id}>{post.title}</Link></label>
            <span>
            <FaPencil onClick={() => setEditing(true)} className="post-pencil"/>
            </span>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem);