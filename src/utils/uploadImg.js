import { TOKEN, HOST,  DEBUG } from '../constants/settings';

const headers = {
    Accept: 'application/json',
    "Content-Type":"multipart/form-data",
}

const timeOut = 60000;

const _fetch = (fetch_promise, timeout = timeOut) =>{
    let abort_fn = null;
    const abort_promise = new Promise(((resolve, reject) => {
        abort_fn = () => {
            const err = new Error('timeout');
            reject(err);
        }
    }));
    // 接收一个数组，只要该数组中的 Promise 对象的状态发生变化（无论是 resolve 还是 reject）该方法都会返回
    const abortable_promise = Promise.race([fetch_promise,abort_promise]);
    setTimeout(() => {
        abort_fn()
    }, timeout);
    return abortable_promise;
};

const uploadImgManager = (user,url, data, loadingCallBack, successCallback, failCallBack) => {

    loadingCallBack();

    let _userId;
    if (!user.userId) {
        _userId = '';
    } else {
        _userId = user.userId;
    }

    headers.Authorization = user.token ? 'Bearer '+user.token : '';
    headers.userId = _userId

    const myFetch = fetch(HOST + url, {
        method: 'POST',
        headers,
        body: data,
    });

    _fetch(myFetch, timeOut)
        .then((response) => response.json())
        .then((responseData) => {
            successCallback(responseData);
        })
        .catch((error) => {
            failCallBack(error);
        });
};
export {
    uploadImgManager,
}

/*
* 上传图片 结合拍照选择相册使用
* 参照卡班项目 orderReceipt.js 使用方法
* */