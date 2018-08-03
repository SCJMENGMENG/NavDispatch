import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import * as RouteType from '../../constants/routeType';
import headImg from '../../../assets/img/headImg.jpg'

const {width, height} = Dimensions.get('window');
const CommonMargin = width * 0.04;

class Mine extends Component {

    _cellClick_BaseInfo() {
        // this.props.navigation.dispatch({type: RouteType.ROUTE_BASE_INFO,params:{key:'11',click:() =>{}}})
    };

    _cellClick_CarrierManage() {
        // this.props.navigation.dispatch({type: RouteType.ROUTE_CARRIER_MANAGE})
    };

    _cellClick_BillManage() {
        // this.props.navigation.dispatch({type: RouteType.ROUTE_BILL_MANAGE})
    };

    _cellClick_LoginPW() {
        // this.props.navigation.dispatch({type: RouteType.ROUTE_LOGIN_PW})
    };

    _cellClick_SetUp() {
        // this.props.navigation.dispatch({type: RouteType.ROUTE_SET_UP})
    };

    _cellClick_AboutUs() {
        // this.props.navigation.dispatch({type: RouteType.ROUTE_ABOUT_US})
    }

    render() {

        const {user} = this.props;

        //5为卡班加盟商，cabannes_franchiser为标识了卡班的加盟商
        let billBool = user.type === '5' && user.franchiser === "cabannes_franchiser";

        var cellItem = [
            {img: {icon: '\ue6a8'}, info: '基地信息', onPress: this._cellClick_BaseInfo.bind(this)},
            {img: {icon: '\ue6a7'}, info: '承运商管理', onPress: this._cellClick_CarrierManage.bind(this)},
            {img: {icon: '\ue6ab'}, info: '账单管理', onPress: this._cellClick_BillManage.bind(this)},
            {img: {icon: '\ue6a9'}, info: '登录密码', onPress: this._cellClick_LoginPW.bind(this)},
            {img: {icon: '\ue6ac'}, info: '设置', onPress: this._cellClick_SetUp.bind(this)},
            {img: {icon: '\ue6aa'}, info: '关于我们', onPress: this._cellClick_AboutUs.bind(this)}
        ]

        cellItem = cellItem.map((item, index) => {
            return (
                index != 2 ?
                    this.itemModule(item, index)
                    :
                    billBool
                        ?
                        this.itemModule(item, index)
                        :
                        null
            )
        })

        return (
            <View style={styles.container}>
                <View style={styles.headBaseStyle}>
                    <View style={styles.headStyle}>
                        <Image style={styles.headImg}
                               source={headImg}
                        />
                        <Text style={styles.headName}>{this.props.user.userName}</Text>
                    </View>
                </View>
                {cellItem}
            </View>
        )
    }

    itemModule(item, index) {
        return (
            <TouchableOpacity
                key={index}
                style={[styles.cellStyle, {
                    marginTop: index === 3 ? CommonMargin : 0,
                    marginBottom: index === 3 ? CommonMargin : 0,
                }]}
                onPress={item.onPress}
            >
                <View style={styles.cellInfoView}>
                    <Text style={styles.cellImg}>{item.img.icon}</Text>
                    <Text style={styles.cellInfo}>{item.info}</Text>
                </View>
                <Text style={styles.cellEndImg}>&#xe649;</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F9'
    },
    headBaseStyle: {
        height: height * 0.2639,
        backgroundColor: '#41549F',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginBottom: CommonMargin,
    },
    headStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: CommonMargin,
        marginBottom: height * 0.055,
    },
    headImg: {
        height: height * 0.11,
        width: height * 0.11,
        borderRadius: height * 0.055,
    },
    headName: {
        marginLeft: width * 0.0534,
        color: '#FFFFFF',
        fontFamily: 'PingFangSC-Medium',
        fontSize: 18,
    },
    cellStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: width,
        height: height * 0.075,
    },
    cellInfoView: {
        marginLeft: CommonMargin,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cellImg: {
        fontSize: width * 0.0427,
        color: '#41549F',
        fontFamily: 'iconfont',
        marginRight: width * 0.028,
    },
    cellInfo: {
        color: '#333333',
        fontFamily: 'PingFangSC-Regular',
        fontSize: 16,
    },
    cellEndImg: {
        color: '#B1BCD3',
        fontFamily: 'iconfont',
        fontSize: width * 0.035,
        marginRight: CommonMargin,
    }
})

function mapStateToProps(state) {
    const {app} = state;
    return {
        user: app.get('user')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mine)
