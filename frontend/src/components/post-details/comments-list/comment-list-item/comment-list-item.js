import React, { Component } from 'react';
import Voter from 'components/voter/voter';
import { connect } from 'react-redux';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';
import { setCommentEditing } from "statemanagement/actions/containers/active-post.actions";
import { saveUpdatedComment, deleteComment, saveDownVote, saveUpVote  } from "statemanagement/actions/data/comments.actions";
import './comment-list-item.css';

class CommentListItem extends Component {
    state = {
        body: ''
    };

    componentWillReceiveProps = (props) => {
        this.setState({body: this.props.comment.body});
    };

    componentDidMount = () => {
        this.setState({body: this.props.comment.body});
    };

    submitComment = (event) => {
        event.preventDefault();
        const updatedComment = Object.assign({}, this.props.comment, this.state, {
            timestamp: Date.now()
        });
        this.props.update(updatedComment);
        this.props.setEditing(this.props.comment.id, false);
    };

    handleInputChange = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    cancelEdit = () => {
        this.props.setEditing(false);
        this.setState({body: this.props.comment.body});
    }

    render = () => {
        const {comment, upVote, downVote, editing, setEditing, remove} = this.props;
        return editing ? (
            <div>
                <form onSubmit={this.submitComment} className="form-wrapper go-bottom edit-comment">
                    <div className="text-input-wrapper">
                        <input id="body" type="text" name="body" value={this.state.body}
                                  onChange={(event) => this.handleInputChange('body', event.target.value)} required/>
                        <label htmlFor="body">Body</label>
                    </div>
                    <div className="form-buttons">
                        <input value="Submit" className="submit-button" type="submit"/>
                        <input value="cancel" className="cancel-button" onClick={this.cancelEdit} type="button"/>
                    </div>
                </form>
            </div>
        ) : (
            <div className="post-list-item-container">
                <Voter id={comment.id} voteUp={upVote} voteDown={downVote}/>
                <span>{comment.voteScore}</span>
                <label><strong>{comment.author}:</strong> {comment.body}</label>
                <span>
            <FaPencil onClick={() => {
                setEditing(comment.id, true);
            }} className="post-pencil-icon"/>
            <FaTrash onClick={() => {
                remove(comment)
            }} className="post-trash-icon"/>
            </span>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {comment} = ownProps;
    return {
        comment,
        editing: state.containers.activePost[comment.id].editing
    }
};

const mapDispatchToProps = (dispatch) => ({
    upVote: (id) => dispatch(saveUpVote(id)),
    downVote: (id) => dispatch(saveDownVote(id)),
    update: (comment) => dispatch(saveUpdatedComment(comment)),
    setEditing: (id, setEdit) => dispatch(setCommentEditing(id, setEdit)),
    remove: (comment) => dispatch(deleteComment(comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem);
