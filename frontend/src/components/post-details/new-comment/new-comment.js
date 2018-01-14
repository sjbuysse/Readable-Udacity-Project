import React, { Component } from 'react';
import './new-comment.css';
import uuidv1 from 'uuid/v1';

class NewComment extends Component {
    state = {
        id: '',
        parentId: '',
        timestamp: null,
        body: '',
        author: '',
        voteScore: 0,
        deleted: false,
        parentDeleted: false
    };

    handleInputChange = (key, value) => {
        this.setState({
            ...this.state,
            [key]: value
        })
    };

    componentDidMount = () => {
        this.setState({parentId: this.props.parentId})
    };

    submitComment = (event) => {
        event.preventDefault();
        this.setState({
                id: uuidv1(),
                timestamp: Date.now()
            }, () => {
                this.props.saveComment(this.state);
                this.setState({
                    id: '',
                    parentId: '',
                    timestamp: null,
                    body: '',
                    author: '',
                    voteScore: 0,
                    deleted: false,
                    parentDeleted: false
                });
            }
        )
    };

    submitPost = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({
            post: {
                ...prevState.post,
                id: uuidv1(),
                timestamp: Date.now()
            }
        }), () => {
            this.props.savePost(this.state.post);
            this.props.history.push('/');
        });
    };
    render = () => (
        <div className="new-comment">
            <h4>Add a comment</h4>
            <form onSubmit={this.submitComment} className="form-wrapper go-bottom">
                <div className="text-input-wrapper">
                    <input id="author" type="text" name="author" value={this.state.author}
                           onChange={(event) => this.handleInputChange('author', event.target.value)} required/>
                    <label htmlFor="author">Author</label>
                </div>
                <div className="linebreak"></div>
                <div className="text-input-wrapper">
                        <textarea id="body" type="text" name="body" value={this.state.body}
                                  onChange={(event) => this.handleInputChange('body', event.target.value)} required/>
                    <label htmlFor="body">Body</label>
                </div>
                <input value="Submit" className="submit-button" type="submit"/>
            </form>
        </div>
    )
}

export default NewComment;
