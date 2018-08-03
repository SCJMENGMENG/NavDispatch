import React from 'react'
import {
    Linking,
    Alert,
    Platform
} from 'react-native'

class MakePhoneCall {
    call(phoneNumber,failCallBack,alertTitle='') {
        const url = phoneNumber.indexOf('tel:') == -1 ? `tel:${phoneNumber}` : phoneNumber
        const number = phoneNumber.indexOf('tel:') == -1 ? phoneNumber : phoneNumber.split(':')[1]
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                if (Platform.OS === 'ios') {
                    Linking.openURL(url)
                } else {
                    Alert.alert(alertTitle,number,[
                        {
                            text: '取消',
                            onPress: () => {}
                        },
                        {
                            text: '呼叫',
                            onPress: () =>{
                                Linking.openURL(url)
                            }
                        }
                    ]);
                }
            } else {
                if (failCallBack) {failCallBack()};
            }
        }).catch(err => console.error('An error occurred', err));

    }
}
export default new MakePhoneCall();

/*
* 安卓设备弹出框设置，iOS则不需要
* 使用：MakePhoneCall.call(tel,()=>{
            Toast.show('当前设备不支持打电话')
        })
*/