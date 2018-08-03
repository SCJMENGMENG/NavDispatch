import Immutable from 'immutable';
import * as ActionTypes from '../constants/actionType';

const initState = Immutable.fromJS({
    detailData:[],
});

export default (state = initState, action) => {
    let newState = state;
    switch (action.type) {
        case ActionTypes.ACTION_GET_Detail_DATA:
            newState = newState.set('detailData',Immutable.fromJS(action.params));
            return newState;
        default:
            return state;
    }
}