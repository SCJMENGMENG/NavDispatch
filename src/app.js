import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    BackHandler,
    ToastAndroid,
    Platform,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import AppWithNavigationState from './navigators/navigators';
import SplashScreen from "react-native-splash-screen";

let lastBackPressed = null;

class App extends Component{
    constructor(props) {
        super(props);
        this.onBackAndroid = this.onBackAndroid.bind(this);

        //关闭黄屏警告
        if (1){
            console.disableYellowBox = true;
        }
    }
    async componentDidMount() {
        if (Platform.OS === 'android') {
            this.timer = setTimeout(() => {
                SplashScreen.hide()
            }, 2000)
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        this.timer && this.timer.remove();
        lastBackPressed = null
    }

    //Android物理返回键点击事件
    onBackAndroid() {
        let routeName = this.props.nav.routes.length > 0 ? this.props.nav.routes[this.props.nav.index].routeName : '';
        if (routeName === 'ROUTE_LOGIN') {
            return false;
        }
        if (this.props.nav.routes.length > 1) {
            this.props.dispatch(NavigationActions.back());
            return true;
        } else {
            if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可退出应用
                return false;
            }
            lastBackPressed = Date.now();
            ToastAndroid.showWithGravity('再点击一次退出程序', ToastAndroid.SHORT,ToastAndroid.CENTER);
            return true
        }
    }
    render() {
        return (
            <AppWithNavigationState/>
        )
    }
}

function mapStateToProps(state) {
    const {nav} = state;
    return {
        nav
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);