import React from 'react';
import PostListItem from './PostListItem';

const ListPosts = (props) => {
    const {posts} = props;
    const filter = props.match.params.category;

    let showingPosts;
    showingPosts = filter ? posts.filter(post => post.category === filter) : posts;

    return (
        <div>
            {showingPosts.map(post => <PostListItem key={post.id} post={post}/>)}
        </div>
    )
}

export default ListPosts;