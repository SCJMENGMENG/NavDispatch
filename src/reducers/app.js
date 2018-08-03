import Immutable from 'immutable';
import * as ActionTypes from '../constants/actionType';

const initState = Immutable.fromJS({
    user: {},
})

export default (state = initState, action) => {
    let newState = state;
    switch (action.type) {
        case ActionTypes.ACTION_USER_SAVE:
            newState = newState.set('user', action.payload);
            return newState;
        case ActionTypes.ACTION_USER_MODIFY:
            const _user = Immutable.Map(state.get('user')).merge(action.payload).toJS();
            newState = newState.set('user', _user);
            return newState;

        case ActionTypes.ACTION_USER_CLEAR:
            newState = newState.set('user',{});
            return newState;

        default:
            return newState;
    }
}