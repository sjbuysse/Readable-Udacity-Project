import React from 'react';
const Post = ({post, toggleEditing}) => {
    return (
        <div className="post">
            <h2 className="post-title">{post.title}</h2>
            <FaPencil onClick={() => toggleEditing(!editing)} className="post-pencil"/>
            <h3 className="post-author">{post.author}</h3>
            <p className="post-body">{post.body}</p>
        </div>
    )
}

export default Post;