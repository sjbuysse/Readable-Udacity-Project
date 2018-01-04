import ADD_POST from '../actions/post.actions';

const initialPostState = {
    1: {
        id: '1',
        title: 'hesp',
        author: 'simon',
        timestamp: Date.now(),
        body: 'first storieken',
        category: 'react',
        voteScore: 1,
        deleted: false
    },
    2: {
        id: '2',
        title: 'kaas',
        author: 'sophie',
        timestamp: Date.now(),
        body: 'second cheese',
        category: 'redux',
        voteScore: 1,
        deleted: false
    },
}

export function postReducer(state = initialPostState, action) {
    switch(action.type) {
        case(ADD_POST):
            return {
                ...state,
                [action.post.id] : action.post
            }
    }
}