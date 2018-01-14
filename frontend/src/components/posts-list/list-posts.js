import React from 'react';
import PostListItem from './post-list-item/post-list-item';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addPost, updatePost } from "../../statemanagement/actions/data/post.actions";
import './list-posts.css';
import Dropdown from "../dropdown/dropdown";
import sortBy from 'sort-by';
import { setSort } from "../../statemanagement/actions/containers/list-posts.actions";

const ListPosts = ({posts, filter, categories, history, sort, sortingBy}) => {
    let showingPosts = (filter ? posts.filter(post => post.category === filter) : posts)
        .sort(sortBy(sortingBy));
    const sortingOptions = [
        {
            label: "score - min to max",
            action: () => sort('voteScore')
        },
        {
            label: "score - max to min",
            action: () => sort('-voteScore')
        },
        {
            label: "date - old to new",
            action: () => sort('timestamp')
        },
        {
            label: "date - new to old",
            action: () => sort('-timestamp')
        }
    ];

    return (
        <div className="list-posts">
            <div className="sorting-and-categories-wrapper">
                <Dropdown label={"Sort by"} options={sortingOptions}/>
                <ul className="navigation-categories">
                    <li className={`navigation-categories-item ${(filter === '') ? 'selected' : ''}`}>
                        <Link to='/'>All</Link>
                    </li>
                    {categories.map(category => (
                        <li className={`navigation-categories-item ${(category.name === filter) ? 'selected' : ''}`}
                            key={category.name}><Link
                            to={category.path}>{category.name}</Link></li>
                    ))}
                </ul>
                <div className="add-post-button"><Link to="/posts/new">Add post</Link></div>
            </div>
            {showingPosts.map(post => <PostListItem history={history} key={post.id} post={post}/>)}
        </div>
    )
};

const mapStateToProps = (state, {filter}) => {
    const {posts, categories} = state.data;
    const sortingBy = state.containers.listPosts.sortBy;
    const postsArray = Object.keys(posts).map(id => posts[id]);
    const categoryArray = Object.keys(categories).map(key => categories[key]);
    return {
        filter,
        sortingBy,
        categories: categoryArray,
        posts: postsArray
    }
};

const mapDispatchToProps = dispatch => ({
    add: (post) => dispatch(addPost(post)),
    update: (id, updatedPost) => dispatch(updatePost(id, updatedPost)),
    sort: (sortBy) => dispatch(setSort(sortBy))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts));
