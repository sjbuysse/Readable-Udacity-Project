import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'components/dropdown/dropdown';
import uuidv1 from 'uuid/v1';
import { savePost } from "statemanagement/actions/data/post.actions";
import './new-post-form.css';

class NewPostForm extends Component {
    state = {
        post: {
            id: '',
            timestamp: null,
            title: '',
            body: '',
            author: '',
            category: '',
            voteScore: 0,
            deleted: false,
            commentCount: 0
        }
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

    render = () => {
        const {categories} = this.props;
        return (
            <div className="new-post">
                <form onSubmit={this.submitPost} className="form-wrapper go-bottom">
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
                    <Dropdown onSelect={(selection) => this.handleInputChange('category', selection)} label='Category'
                              options={categories.map(category => ({label: category}))}/>
                    <div className="linebreak"></div>
                    <div className="text-input-wrapper">
                        <textarea id="body" type="text" name="body" value={this.state.post.body}
                                  onChange={(event) => this.handleInputChange('body', event.target.value)} required/>
                        <label htmlFor="body">Body</label>
                    </div>
                    <input value="Submit" type="submit"/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    savePost: post => dispatch(savePost(post)),
});

const mapStateToProps = (state, ownProps) => ({
    categories: Object.keys(state.data.categories).map(cat => state.data.categories[cat].name)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);
