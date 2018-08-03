import * as ActionTypes from '../constants/actionType';
import Storage from '../utils/storage';

export function getInitStateFromDB() {
    return dispatch => {
        Storage.get('user').then(result => {
            if (result) {
                dispatch(SaveUser(result));
            } else {
                dispatch(SaveUser({}));
            }
        })
    }
}

export function fetchData(params) {
    return {
        type: ActionTypes.ACTION_FETCH_DATA,
        payload:params
    }
}

export function SaveUser(user) {
    return {
        type: ActionTypes.ACTION_USER_SAVE,
        payload: user
    }
}

export function ModifyUser(user) {
    return {
        type: ActionTypes.ACTION_USER_MODIFY,
        payload: user
    }
}

export function ClearUser(user) {
    return {
        type: ActionTypes.ACTION_USER_CLEAR,
    }
}