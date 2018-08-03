import {combineReducers} from 'redux';
import home from './home';
import mine from './mine';
import app from './app';
import nav from './nav';

const rootReducer = combineReducers({
    home,
    mine,
    app,
    nav,
});

export default rootReducer;