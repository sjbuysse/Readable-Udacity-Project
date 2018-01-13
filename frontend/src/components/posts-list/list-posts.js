import React from 'react';
import PostListItem from './post-list-item/post-list-item';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addPost, updatePost } from "../../statemanagement/actions/data/post.actions";
import './list-posts.css';

const mapStateToProps = (state, {filter}) => {
    const {posts, categories} = state.data;
    const postsArray = Object.keys(posts).map(id => posts[id]);
    const categoryArray = Object.keys(categories).map(key => categories[key]);
    return {
        filter,
        categories: categoryArray,
        posts: postsArray
    }
};

const mapDispatchToProps = dispatch => ({
    add: (post) => dispatch(addPost(post)),
    update: (id, updatedPost) => dispatch(updatePost(id, updatedPost))
});

const ListPosts = ({posts, filter, categories, history}) => {
    let showingPosts = filter ? posts.filter(post => post.category === filter) : posts;

    return (
        <div className="list-posts">
            <Link to="/posts/new">Add post</Link>
            <div className="sorting-and-categories-wrapper">
                <div className="sorting">
                    Sort by
                </div>
                <ul className="navigation-categories">
                    <li className="navigation-categories-item">
                        <Link to='/'>All</Link>
                    </li>
                    {categories.map(category => (
                        <li className="navigation-categories-item" key={category.name}><Link
                            to={category.path}>{category.name}</Link></li>
                    ))}
                </ul>
            </div>
            {showingPosts.map(post => <PostListItem history={history} key={post.id} post={post}/>)}
        </div>
    )
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts));
