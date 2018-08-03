import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';
import http from '../middleware/http';

const middelwares = [];

middelwares.push(http);
middelwares.push(thunkMiddleware);

const createStoreWidthMiddleware = applyMiddleware(...middelwares)(createStore)

export default function ConfigureStore(initialState) {
    const store = createStoreWidthMiddleware(rootReducer,initialState);
    return store;
}
