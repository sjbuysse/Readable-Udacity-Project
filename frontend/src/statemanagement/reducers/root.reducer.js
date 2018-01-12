import dataReducer from './data/data.reducer';
import containerReducer from './containers/containers.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    data: dataReducer,
    containers: containerReducer
})