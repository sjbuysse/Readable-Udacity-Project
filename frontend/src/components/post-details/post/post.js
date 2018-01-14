import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../post-details.css';
import FaPencil from 'react-icons/lib/fa/pencil';
import { setEditing } from 'statemanagement/actions/containers/active-post.actions';
import { saveDownVote, saveUpVote, saveUpdatedPost, deletePost } from "statemanagement/actions/data/post.actions";
import Voter from "components/voter/voter";
import FaTrash from 'react-icons/lib/fa/trash';

class Post extends Component {
    state = {
        post: null
    };

    componentWillReceiveProps = (props) => {
        this.setState({post: props.post});
    };

    componentDidMount = () => {
        this.setState({post: this.props.post});
    };

    componentWillUnmount = () => {
        this.props.setEditing(false);
    };

    handleInputChange = (key, value) => {
        this.setState({
            ...this.state,
            post: {
                ...this.state.post,
                [key]: value
            }
        })
    };
    cancelEdit = () => {
        this.props.setEditing(false);
        this.setState({post: this.props.post});
    }

    updatePostWithFormValues = (event) => {
        event.preventDefault();
        this.props.updatePost(this.state.post);
        this.props.setEditing(false);
    }
    render = () => {
        const {post, editing, setEditing, upVote, downVote, removePost, history} = this.props;
        return (post && this.state.post) ? (
            editing ? (
                <div className="post-edit">
                    <form onSubmit={this.updatePostWithFormValues} className="form-wrapper go-bottom">
                        <div className="text-input-wrapper">
                            <input id="title" type="text" name="title" value={this.state.post.title}
                                   onChange={(event) => this.handleInputChange('title', event.target.value)} required/>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="linebreak"></div>
                        <div className="text-input-wrapper">
                            <input id="author" type="text" name="author" value={this.state.post.author}
                                   onChange={(event) => this.handleInputChange('author', event.target.value)} required/>
                            <label htmlFor="author">Author</label>
                        </div>
                        <div className="linebreak"></div>
                        <div className="text-input-wrapper">
                        <textarea id="body" type="text" name="body" value={this.state.post.body}
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
                <div className="post">
                    <div className="post-details-header">
                        <Voter id={post.id} voteUp={upVote} voteDown={downVote}/>
                        <span>{post.voteScore}</span>
                        <h2 className="post-title">{post.title}</h2>
                        <span>
                            <FaPencil onClick={() => setEditing(!editing)} className="post-pencil-icon"/>
                            <FaTrash onClick={() => {
                                removePost(post);
                                history.push('/');
                            }} className="post-trash-icon"/>
                        </span>
                    </div>
                    <span className="post-author">Written by {post.author} on {(new Date(post.timestamp)).toDateString()}</span>
                    <p className="post-body">{post.body}</p>
                </div>
            )
        ) : null;
    }
}

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps;
    return {
        history: ownProps.history,
        post: state.data.posts[id],
        editing: state.containers.activePost.editing
    }
};

const mapDispatchToProps = dispatch => ({
    updatePost: updatedPost => dispatch(saveUpdatedPost(updatedPost)),
    removePost: post => dispatch(deletePost(post.id)),
    setEditing: setEdit => dispatch(setEditing(setEdit)),
    upVote: id => dispatch(saveUpVote(id)),
    downVote: id => dispatch(saveDownVote(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
