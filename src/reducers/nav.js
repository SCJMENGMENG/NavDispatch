import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../navigators/navigators'
import * as RouteType from './../constants/routeType';
// import { DEBUG } from '../constants/settings';

const firstAction = AppNavigator.router.getActionForPathAndParams('Splash');//TabBar
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

let flag = true

export default function nav(state= initialNavState, action) {
    let nextState;
    if (action.mode && (action.mode !== 'reset' && action.mode !== 'popTo')) throw new Error(`modes not include ${action.mode}`)
    // if (DEBUG) console.log(action.type);

    if (action.type === 'pop') {
        if (!action.key) {
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(), state)
        } else {
            // this.props.navigation.dispatch({ type: 'pop', key: 'Second' })
            let currentKeyIndex
            state.routes.forEach((item, index) => {
                if (item.routeName === action.key) {
                    currentKeyIndex = index
                }
            })
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back({
                    key: state.routes[currentKeyIndex + 1].key
                }), state)
        }
    } else
    if (action.mode && action.mode === 'reset') {
        nextState = AppNavigator.router.getStateForAction(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: action.type, params: action.params })
            ]
        }), state)
    } else if (action.mode && action.mode === 'popTo') {
    } else if (action.type === 'Navigation/BACK') {
        nextState = AppNavigator.router.getStateForAction(action, state);
    } else if (action.type === 'Navigation/SET_PARAMS' || action.type === 'Navigation/NAVIGATE') {
        nextState = AppNavigator.router.getStateForAction(action, state);
    } else {
        if (action.type) {
            const actionType = action.type + ''
            const isDelay = actionType.includes('ROUTE_COMPANYAUTH_DETAIL') || actionType.includes('ROUTE_PERSON_AUTH_INFO');
            if (actionType.includes('ROUTE')) {
                if (flag) {
                    flag = false
                    nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
                        routeName: action.type,
                        params: action.params,
                        action: NavigationActions.navigate({ routeName: action.type })
                    }), state);
                    setTimeout(() => {
                        flag = true
                    }, isDelay ? 200 : 1500)
                }
            }
        }
    }
    return nextState || state;
}
