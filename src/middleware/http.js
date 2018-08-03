import * as ActionTypes from '../constants/actionType';
import { TOKEN, HOST,  DEBUG } from '../constants/settings';
import { Platform, NativeModules, InteractionManager, NetInfo } from 'react-native';
import Toast from '../utils/toast';
import Storage from '../utils/storage';
import md5 from 'md5';
import NetInfoTool from '../utils/netInfoTools';
import AddressHandler from '../utils/address';

const fetchs = []
const https = []

/**
 * [description]
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */
export default store => next => action => {

    if (action.type !== ActionTypes.ACTION_FETCH_DATA) {
        return next(action);
    }

    const {
        api,
        body = {},
        files = [],
        fail,
        success,
        cache = false,
        method,
        cacheType,
        failToast = true,
        successToast = false,
        msg = '提示信息不能为空',
        headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Content-Type': "application/x-www-form-urlencoded"
        }
    } = action.payload;

    if (!api) throw new Error(' throw api should not be empty!');

    if (!method) throw new Error(' throw method should not be empty!');

    let flag = false
    Object.keys(body).forEach(item => {
        if (item === 'userId') {
            if (body[item] === '' || body[item] === 'undefined' ||
                body[item] === null || body[item] === 'null' || body[item] === undefined) {
                flag = true
            }
        }
    });

    if (flag) return;

    const { app } = store.getState();
    const user = app.get('user');

    const fullPath = api.indexOf('http') === -1 ? (HOST + api) : api;
    if (DEBUG) console.log('%c the request url is ', 'color:red', fullPath);

    let _userId;
    if (!user.userId) {
        _userId = '';
    } else {
        _userId = user.userId;
    }

    headers.Authorization = user.token ? 'Bearer '+user.token : '';//后台要求
    headers.userId = _userId;
    headers.loginName = user.phone ? user.phone : '';

    let options = {
        headers,
        method,
        body,
    };

    if (DEBUG) console.log('%c params is ', 'color:red', body);

    const id = md5(JSON.stringify({api, body}));

    if (isDoubleHttp(api) && getHttpByApi(api) && getHttpByApi(api).date - new Date().getTime() < 1000) return

    https.push({
        api,
        date: new Date().getTime()
    })

    Storage.get(id).then(cacheData => {
        if (cacheType === 'city' && cacheData) AddressHandler.set(cacheData.response);
        const currentTime = new Date().getTime();
        fetchData(fullPath, options, next, app).then(response => {
            if (successToast) Toast.show(msg);
            if (success) success(response);
            if (cache) {
                Storage.save(id, {response, storageTime: new Date().getTime()});
            }
        }, failed => {
            if (fail) fail(failed);
            if (failToast) Toast.show(failed);
        }).catch(error => Toast.show(error))
            .finally(() => {

            });
    });
};

function fetchData (fullPath, { body, method, headers }, next, app) {
    if (method === 'GET') {
        fullPath += `?${ body }`;
    }

    return new Promise((resolve, reject) => {
        fetch(fullPath, {
            method,
            headers,
            body: method === 'GET' ? null : JSON.stringify(body)
        }).then(response => {
            // console.log('response=======',response);
            return response.json()
        }).then(responseData => {
            if (DEBUG) console.log('%c server response is ', 'color:red', responseData);
            if(!responseData) return ;
            if (responseData.code * 1 === 200) {
                resolve(responseData.result);
            } else {
                reject(responseData.message);
            }
        }).catch(error => {
            if (error) return
            reject(error)
        });
    });
}

function getValues(obj) {
    let result = '';
    Object.keys(obj).forEach((key, index) => {
        result += obj[key];
    });
    return result;
}

function json2Form(obj) {
    let result = '';
    Object.keys(obj).forEach((key, index) => {
        result += `${ index === 0 ? '' : '&' }${ key }=${ encodeURIComponent(obj[key]) }`;
    });
    return result;
}

function getSortMap(obj) {
    const keys = Object.keys(obj).sort();
    const map = {};
    Object.keys(obj).forEach((key, index) => {
        map[keys[index]] = obj[keys[index]];
    });
    return map;
}

function isDoubleHttp(api) {
    https.forEach(item => {
        if (item === api) return true
        return false
    })
}

function getHttpByApi(api) {
    if (!https) return {}
    https.forEach(item => {
        if (item.api === api) return item
    })
}
