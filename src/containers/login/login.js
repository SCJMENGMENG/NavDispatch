import React, {Component} from 'react'
import {connect} from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Platform,
    Clipboard,
    Keyboard
} from 'react-native';
import styles from '../../../assets/css/login'
import LogoImg from '../../../assets/img/logo.png';
import * as RouteType from '../../constants/routeType';
import {SaveUser} from '../../action/app'
import User from '../../models/user';
import {GET_SEC_TOKEN, PASSWORD_LOGIN} from '../../constants/api';
import {fetchData} from '../../action/app';
import XeEncrypt from '../../utils/XeEncrypt';
import DeviceInfo from 'react-native-device-info';
import Toast from '../../utils/toast';
import Regex from '../../utils/regex';

class PasswordLoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',//kbtest
            password: '',//a123456
            passwordWindowIsShow: true,
        }
        this._getSecToken = this._getSecToken.bind(this)
        this._login = this._login.bind(this)
        this._clearCopyText = this._clearCopyText.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
    }
    componentWillMount () {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount () {
        this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
    }
    _clearCopyText(){
        Clipboard.setString('');
    }
    _keyboardDidHide(){
        this.refs.password && this.refs.password.blur();
        this.setState({ passwordWindowIsShow: true});
    }
    _getSecToken() {

        const user = new User({
            userName: '卡班测试组',
            passWord: 'a123456',
            token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzYwMDk4MjM1NiIsImRyaXZlckFwcEVuY29kZVRva2VuRHRvIjoie1wicGhvbmVOdW1cIjpcIjE3NjAwOTgyMzU2XCIsXCJwYXNzd29yZFwiOm51bGwsXCJpZGVudGlmeUNvZGVcIjpudWxsLFwicGxhdGZvcm1cIjpcIjFcIixcImRldmljZUlkXCI6bnVsbH0iLCJpYXQiOjE1MzMxMTYyMjEsImV4cCI6MTUzMzcyMTAyMX0.O7xZQidI5GWxEg_ktX6rzHy-IT_Bi_PCkE_EbPsGUCA",
            userId: "7c5b12fee6ea427282b4a33e5829a466",
            phone:'17600982356',
        });
        this.props.dispatch(SaveUser(user));
        user.save();

        // this.props.saveUserData();
        this.props.navigation.dispatch({type: 'TabBar', mode: 'reset'})

        // if (!this.state.account) return Toast.show('请输入用户名或手机号码')
        // if (!this.state.password) return Toast.show('请输入密码')
        // if (!Regex.test('password', (this.state.password + '').trim())) return Toast.show('密码应为6-14位数字字母');
        // this.props.getSecToken((data) => {
        //     this._login(data)
        // })
    }

    _login(data) {
        const secretPwd = XeEncrypt.aesEncrypt(this.state.password, data, data);
        this.props.loginWithPassword({
            deviceId: DeviceInfo.getDeviceId(),
            password: secretPwd,
            phoneNum: this.state.account,
            platform: IS_IOS ? '1' : '2',
            appSource: '5'
        }, this.props.navigation)

    }

    render() {
        return (
            <ScrollView
                style={{backgroundColor: '#fff', flex: 1}}
                showsVerticalScrollIndicator='handled'
                showsVerticalScrollIndicator={ false }>
                <Text style={styles.loginTitle}>登录</Text>
                <Image style={styles.logo} source={LogoImg}/>
                <View style={styles.accountView}>
                    <Text style={styles.noteText}>账号</Text>
                    <TextInput
                        style={styles.textInput}
                        textAlign='left'
                        placeholder='请输入用户名或手机号码'
                        placeholderTextColor='#E6EAF2'
                        value={this.state.account}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.setState({account: text})}/>
                    <View opacity={(this.state.account+'').trim().length>0? 1: 0} >
                        <TouchableOpacity
                            activeOpacity={ 1 }
                            onPress={ () => { this.setState({ account: ''})}}>
                            <Text style={ styles.iconFontRight }>&#xe634;</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.line}/>
                <View style={[styles.accountView, {marginTop: Platform.OS === 'ios' ? 30 : 15}]}>
                    <Text style={styles.noteText}>密码</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.textInput}
                            ref='password'
                            textAlign='left'
                            placeholder='请输入密码'
                            placeholderTextColor='#E6EAF2'
                            secureTextEntry={true}
                            value={this.state.password}
                            underlineColorAndroid={'transparent'}
                            onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(text) => this.setState({password: text})}/>
                        <TouchableOpacity
                            visible={this.state.passwordWindowIsShow}
                            style={styles.passwordWindow}
                            onPress={ () => {
                                Clipboard.setString('');
                                this.refs.password.focus()
                                this.setState({ passwordWindowIsShow: false})
                            } }>
                        </TouchableOpacity>
                    </View>
                    <View opacity={(this.state.password+'').trim().length>0? 1: 0} >
                        <TouchableOpacity
                            activeOpacity={ 1 }
                            onPress={ () => { this.setState({ password: ''})}}>
                            <Text style={ styles.iconFontRight }>&#xe634;</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.line}/>
                <View style={styles.btnView}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btn}
                        onPress={this._getSecToken}>
                        <Text style={styles.btnText}>登录</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomView}>
                    <Text style={[styles.bottomText, {flex: 1}]} onPress={() => {
                        this.props.navigation.dispatch({type: RouteType.ROUTE_PHONE_CODE_LOGIN})
                    }}>验证码登录</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={styles.bottomText} onPress={() => {
                            this.props.navigation.dispatch({type: RouteType.ROUTE_FORGET_PASSWORD_ONE})
                        }}>{'忘记密码？'}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        getSecToken: (cb) => {
            dispatch(fetchData({
                method: 'POST',
                failToast: true,
                api: GET_SEC_TOKEN,
                success: (data) => {
                    cb(data)
                }
            }))
        },
        loginWithPassword: (body, navigation) => {
            dispatch(fetchData({
                body,
                method: 'POST',
                failToast: true,
                api: PASSWORD_LOGIN,
                success: (data) => {
                    const user = new User({
                        isBind: data.isBind,
                        phone: data.phone,
                        photoRefNo: data.photoRefNo,
                        token: data.token,
                        userId: data.userId,
                        userName: data.userName,
                        baseName: data.baseName,
                        baseCode: data.baseSerialNo,
                        areaName: data.areaName,
                        areaCode: data.areaSerialNo,
                        type: data.type,
                        franchiser:data.franchiser,
                    });
                    dispatch(SaveUser(user));
                    user.save();
                    navigation.dispatch({type: 'TabBar', mode: 'reset'})
                }
            }))
        },
        saveUserData:() =>{
            const user = new User({
                userName: '卡班测试组',
                passWord: 'a123456',
                token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzYwMDk4MjM1NiIsImRyaXZlckFwcEVuY29kZVRva2VuRHRvIjoie1wicGhvbmVOdW1cIjpcIjE3NjAwOTgyMzU2XCIsXCJwYXNzd29yZFwiOm51bGwsXCJpZGVudGlmeUNvZGVcIjpudWxsLFwicGxhdGZvcm1cIjpcIjFcIixcImRldmljZUlkXCI6bnVsbH0iLCJpYXQiOjE1MzMxMTYyMjEsImV4cCI6MTUzMzcyMTAyMX0.O7xZQidI5GWxEg_ktX6rzHy-IT_Bi_PCkE_EbPsGUCA",
                userId: "7c5b12fee6ea427282b4a33e5829a466",
                phone:'17600982356',
            });
            dispatch(SaveUser(user));
            user.save();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordLoginContainer);
