import React from 'react';
import PostListItem from './post-list-item/post-list-item';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addPost, updatePost } from "../../statemanagement/actions/data/post.actions";

const mapStateToProps = (state, {filter}) => {
    const { posts, categories } = state.data;
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

const ListPosts = ({posts, filter, categories}) => {
    let showingPosts = filter ? posts.filter(post => post.category === filter) : posts;

    return (
        <div>
            <Link to='/'>All</Link>
            {categories.map(category => (
                <Link key={category.name} to={category.path}>{category.name}</Link>
            ))}
            {showingPosts.map(post => <PostListItem key={post.id} post={post}/>)}
        </div>
    )
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts));
