import React, { Component } from 'react';
import Post from './post/post';
import NewComment from "./new-comment/new-comment";
import { connect } from 'react-redux';
import { fetchComments, saveComment } from "../../statemanagement/actions/data/comments.actions";
import CommentsList from './comments-list/comments-list';

class PostDetails extends Component {
    componentDidMount = () => {
        this.props.loadComments(this.props.id)
            //dispatch action to make comment containers
            .then(comments => '');
    }
    render = () => (
        <div>
            <Post id={this.props.id} history={this.props.history}/>
            <CommentsList parentId={this.props.id}/>
            <NewComment saveComment={this.props.saveComment} parentId={this.props.id}/>
        </div>
    )
}

const mapDispatchToProp = (dispatch) => ({
    loadComments: (postId) => dispatch(fetchComments(postId)),
    saveComment: (comment) => dispatch(saveComment(comment))
})
export default connect(null, mapDispatchToProp)(PostDetails);