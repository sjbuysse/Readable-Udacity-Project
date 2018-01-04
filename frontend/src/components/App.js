import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { Link, Route } from 'react-router-dom';
import ListPosts from './ListPosts';

class App extends Component {
    state = {
        posts: [
            {
                id: '1',
                title: 'hesp',
                author: 'simon',
                timestamp: Date.now(),
                body: 'first storieken',
                category: 'react',
                voteScore: 1,
                deleted: false
            },
            {
                id: '2',
                title: 'kaas',
                author: 'sophie',
                timestamp: Date.now(),
                body: 'second cheese',
                category: 'redux',
                voteScore: 1,
                deleted: false
            },
        ]
    }

    render() {
        return (
            <div className="App">
                <Link to='/'>All</Link>
                <Link to='react'>React</Link>
                <Link to='redux'>Redux</Link>
                <Link to='udacity'>Udacity</Link>
                <Route exact path='/' render={(props) => (
                    <ListPosts posts={this.state.posts} {...props}/>
                )}/>
                <Route path='/:category' render={(props) => (
                    <ListPosts posts={this.state.posts} {...props}/>
                )}/>
            </div>
        );
    }
}

export default App;
