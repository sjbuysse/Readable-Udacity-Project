import React, { Component } from 'react';
import { connect } from 'react-redux';
import './post-details.css';
import FaPencil from 'react-icons/lib/fa/pencil';
import { setEditing } from 'statemanagement/actions/containers/active-post.actions';
import { saveUpdatedPost } from 'statemanagement/actions/data/post.actions';

class PostDetails extends Component {
    state = {
        post: null
    };

    componentWillReceiveProps = (props) => {
        this.setState({post: props.post});
    }

    componentDidMount = () => {
            this.setState({post: this.props.post});
    }

    handleInputChange = (key, value) => {
        this.setState({
            ...this.state,
            post: {
                ...this.state.post,
                [key]: value
            }
        })
    };
    updatePostWithFormValues = (event) => {
        event.preventDefault();
        this.props.updatePost(this.state.post);
        this.props.setEditing(false);
    }
    render = () => {
        const {post, editing, setEditing} = this.props;
        return (post && this.state.post) ? (
            editing ? (
                <form onSubmit={this.updatePostWithFormValues} className="post-edit go-bottom">
                    <div>
                        <input id="title" type="text" name="title" value={this.state.post.title}
                               onChange={(event) => this.handleInputChange('title', event.target.value)} required/>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="linebreak"></div>
                    <div>
                        <input id="author" type="text" name="author" value={this.state.post.author}
                               onChange={(event) => this.handleInputChange('author', event.target.value)} required/>
                        <label htmlFor="author">Author</label>
                    </div>
                    <div className="linebreak"></div>
                    <div>
                        <textarea id="body" type="text" name="body" value={this.state.post.body}
                                  onChange={(event) => this.handleInputChange('body', event.target.value)} required/>
                        <label htmlFor="body">Body</label>
                    </div>
                    <input value="Submit" type="submit" />
                </form>
            ) : (
                <div className="post">
                    <h2 className="post-title">{this.props.post.title}</h2>
                    <FaPencil onClick={() => setEditing(!editing)} className="post-pencil"/>
                    <h3 className="post-author">{post.author}</h3>
                    <p className="post-body">{post.body}</p>
                </div>
            )
        ) : null;
    }
}

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps;
    return {
        post: state.data.posts[id],
        editing: state.containers.activePost.editing
    }
};

const mapDispatchToProps = dispatch => ({
    updatePost: updatedPost => dispatch(saveUpdatedPost(updatedPost)),
    setEditing: setEdit => dispatch(setEditing(setEdit))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
