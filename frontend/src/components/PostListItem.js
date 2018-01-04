import React from 'react';

function PostListItem(props) {
    const { title } = props.post;
    return (
        <p>{ title }</p>
    )
}

export default PostListItem;