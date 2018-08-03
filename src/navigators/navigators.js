import React from 'react';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as RouteType from '../constants/routeType';

import Splash from '../containers/common/splash';
import Guide from '../containers/common/guide';

import TabBar from './tabBar';

import LoginPage from '../containers/login/login';
import HomePage from '../containers/home/home';
import MinePage from '../containers/mine/mine';
import HomeDetailPage from '../containers/home/homeDetial';

export const AppNavigator = StackNavigator({

    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null
        }
    },

    Guide: {
        screen: Guide,
        navigationOptions: {
            header: null
        }
    },

    TabBar: {
        screen: TabBar,
        navigationOptions: {
            header: null,
            headerBackTitle: null,
        }
    },

    [RouteType.ROUTE_LOGIN]: {
        screen: LoginPage,
        navigationOptions: {
            header: null,
            headerBackTitle: null,
        }
    },
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,
            headerBackTitle: null,
        }
    },
    [RouteType.ROUTE_HOME_DETAIL]: {
        screen: HomeDetailPage,
        navigationOptions: {
            header: null,
            headerBackTitle: null,
        }
    },
    [RouteType.ROUTE_MINE]: {
        screen: MinePage,
        navigationOptions: {
            header: null,
            headerBackTitle: null,
        }
    }
}, {
    headerMode: 'screen',
    initialRouteName: 'Splash',//TabBar
    transitionConfig: TransitionConfiguration
});

const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const {scene} = sceneProps;
        const {route} = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        // forVertical
        // const transition = 'forHorizontal'
        return CardStackStyleInterpolator[transition](sceneProps);
    },
});

const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState)
