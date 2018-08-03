import * as ActionTypes from '../constants/actionType';

export function requestDetailData(params) {
    return {
        type:ActionTypes.ACTION_GET_Detail_DATA,
        payload:params
    }
}