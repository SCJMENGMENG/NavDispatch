import React,{Component} from 'react';
import { AppRegistry } from 'react-native';
import {Provider} from 'react-redux';
import './utils/global'
import configureStore from './store/store';
import App from './app';

const store = configureStore();

export default class Root extends Component{
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('NavDispatch', () => Root);