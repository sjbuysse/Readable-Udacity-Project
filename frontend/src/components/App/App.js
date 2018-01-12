import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ListPosts from '../posts-list/list-posts';
import PostDetails from '../post-details/post-details';

class App extends Component {
    render() {
        const { categories } = this.props;
        return (
            <div className="App">
                <Route exact path='/' render={() => (
                    <ListPosts filter=''/>
                )}/>
                <Route exact path='/:category' render={({match}) => (
                    <ListPosts filter={match.params.category}/>
                )}/>
                <Route exact path='/:category/:post' render={({match}) => (
                    <PostDetails id={match.params.post}/>
                )}/>
            </div>
        );
    }
}

export default App;
