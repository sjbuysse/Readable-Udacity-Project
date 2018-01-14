import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import './styles/index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './statemanagement/reducers/root.reducer';
import * as Api from './util/PostAPI';
import { addCategory } from './statemanagement/actions/data/categories.actions';
import { fetchPosts } from "./statemanagement/actions/data/post.actions";
import thunk from "redux-thunk";

const enhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer,
    enhancers);

Api.getCategories().then(categories => {
    for (const category of categories) {
        store.dispatch(addCategory(category));
    }
});
store.dispatch(fetchPosts());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
