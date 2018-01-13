const api = 'http://localhost:3001'

let token = localStorage.token

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
}

export const getPosts = () =>
    fetch(`${api}/posts`, {headers})
        .then(res => res.json());

export const getCategories = () =>
    fetch(`${api}/categories`, {headers})
        .then(res => res.json())
        .then(data => data.categories);

export const vote = (entity, id, option) =>
    fetch(`${api}/${entity}/${id}`,
        {
            method: 'POST',
            body: JSON.stringify({
                'option': option
            }),
            headers
        }).then(response => response.json());

export const updatePost = (post) =>
    fetch(`${api}/posts/${post.id}`,
        {
            method: 'PUT',
            body: JSON.stringify({
                'title': post.title,
                'body': post.body
            }),
            headers
        }).then(response => response.json());

export const add = (post) =>
    fetch(`${api}/posts`,
        {
            method: 'POST',
            body: JSON.stringify(post),
            headers
        }).then(response => response.json());

export const remove = (postId) =>
    fetch(`${api}/posts/${postId}`,
        {
            method: 'DELETE',
            headers
        })
        .then(res => res.json());

// export const create = (body) =>
//     fetch(`${api}/contacts`, {
//         method: 'POST',
//         headers: {
//             ...headers,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//     }).then(res => res.json())
