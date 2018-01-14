import React, { Component } from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import ListPosts from '../posts-list/list-posts';
import PostDetails from '../post-details/post-details';
import NewPostForm from '../new-post/new-post-form';

class App extends Component {
    render() {
        return (
            <div className="app">
                <h1><Link to="/">Readable</Link></h1>
                <Switch>
                    <Route exact path='/' render={() => (
                        <ListPosts filter=''/>
                    )}/>
                    <Route exact path='/posts/new' render={({history}) => (
                        <NewPostForm history={history}/>
                    )}/>
                    <Route exact path='/:category' render={({match}) => (
                        <ListPosts filter={match.params.category}/>
                    )}/>
                    <Route exact path='/:category/:post' render={({match, history}) => (
                        <PostDetails id={match.params.post} history={history}/>
                    )}/>
                </Switch>
            </div>
        );
    }
}

export default App;
