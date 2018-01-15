import React, { Component } from 'react';
import './App.css';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import ListPosts from '../posts-list/list-posts';
import PostDetails from '../post-details/post-details';
import NewPostForm from '../new-post/new-post-form';
import PageNotFound from '../page-not-found/page-not-found';
import { connect } from "react-redux";

class App extends Component {
    render() {
        return (
            <div className="app">
                <h1><Link to="/">Readable</Link></h1>
                <div className="linebreak"></div>
                <Switch>
                    <Route exact path='/' render={() => (
                        <ListPosts filter=''/>
                    )}/>
                    <Route exact path='/404' component={PageNotFound}/>
                    <Route exact path='/posts/new' render={({history}) => (
                        <NewPostForm history={history}/>
                    )}/>
                    <Route exact path='/:category' render={({match}) => (
                        <ListPosts filter={match.params.category}/>
                    )}/>
                    <Route exact path='/:category/:postid' render={({match, history}) =>
                        (this.props.postIds.indexOf(match.params.postid) !== -1) ?
                            <PostDetails id={match.params.postid} history={history}/>
                            : <Redirect to="/404"/>
                    }/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    postIds: Object.keys(state.data.posts)
});

export default withRouter(connect(mapStateToProps)(App));
