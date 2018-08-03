import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    Platform,
    NativeModules,
    InteractionManager,
} from 'react-native'
import { connect } from 'react-redux'
import Storage from '../../utils/storage'
import SplashScreen from 'react-native-splash-screen'
import { getInitStateFromDB } from '../../action/app'

const { width, height } = Dimensions.get('window');

//启动图配置：https://www.jianshu.com/p/4540ac17dfd4

class Splash extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.props.getInitStateFromDB();
        this.timer = setTimeout(() => {
            SplashScreen.hide()
        }, Platform.OS === 'ios' ? 500 : 2000)
        const value = await Storage.get('IS_FIRST_FLAG');
        const user =  await Storage.get('user')
        if (value && value * 1 === 1) {
            if (user && user.userId) {
                this.routeName = 'TabBar'
            } else {
                this.routeName = 'ROUTE_LOGIN'
            }
        } else {
            this.routeName = 'Guide'
        }
        this.timer = setTimeout(() => {
            this.props.navigation.dispatch({ type: this.routeName, mode: 'reset' })
        }, Platform.OS === 'ios' ? 100 : 1500);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return null
    }
}

function mapStateToProps(state) {
    const { app } = state;
    return {
        user: app.get('user'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getInitStateFromDB: () => dispatch(getInitStateFromDB()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
