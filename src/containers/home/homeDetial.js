import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../../navigators/navigationBar';
import * as RouteType from '../../constants/routeType';

import {fetchData} from '../../action/app';
import {Get_Detail_DATA} from '../../constants/api';
import {requestDetailData} from '../../action/home';

const {width, height} = Dimensions.get('window');
const CommonMargin = width * 0.04;

class AbnormallyReport extends Component {


    componentDidMount() {

        this._getAbnormalList();
        this._showText = this._showText.bind(this)
    }

    // componentWillReceiveProps(props) {
    //     if (props.isRefreshing) {
    //         this.queryDetailData();
    //     }
    // }

    //请求异常列表
    _getAbnormalList() {
        this.props.queryDetailData({
            // "abnormalNo": "string",
            // "abnormalType": "string",
            // "authBaseCode": "string",
            // createEndTime: "2018-07-02",
            // createStartTime: "2018-07-02",
            // "handleAreaCode": "string",
            // "handleAreaName": "string",
            // "handleBaseCode": "string",
            // "handleBaseName": "string",
            // "reportAreaCode": "string",
            // "reportAreaName": "string",
            // "reportBaseCode": "string",
            // "reportBaseName": "string",
            // "transportNo": "string",
            // state: 10
        })
    }

    render() {

        const {navigation, abnormallyListSource} = this.props;

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'异常上报'}
                    navigation={navigation}
                />
                {
                    abnormallyListSource && abnormallyListSource.length === 0 &&
                    <Empty/>
                }
                <FlatList
                    style={{}}
                    renderItem={this._renderItem.bind(this)}
                    data={abnormallyListSource}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        )
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem({item, index}) {

        let abnormalTypes = '';

        for (let i = 0; i < item.abnormalTypes.length; i++) {
            abnormalTypes = abnormalTypes + (i === 0 ? '' : '、') + this._typesStringFromCode(item.abnormalTypes[i] * 1)
        }

        return (
            <TouchableOpacity
                style={styles.cellBase}
                onPress={() => {

                }}
            >
                <View style={styles.baseView}>
                    <View style={{flexDirection: 'row',width:width *0.8}}>
                        <View style={styles.newAddLine}/>
                        <Text
                            style={[styles.newAddText, {
                                color: '#333333',
                                marginLeft: 6,
                            }]}
                            numberOfLines={1}
                        >异常类型：{this._showText(abnormalTypes)}</Text>
                    </View>
                    <Text style={styles.newAddText}>{this._stateStringFromCode(item.state)}</Text>
                </View>
                <View style={styles.line}/>
            </TouchableOpacity>
        )
    }

    _typesStringFromCode(type) {
        switch (type) {
            case 10:
                return '有单无货';
            case 20:
                return '有货无单';
            case 30:
                return '破损';
            case 40:
                return '污损';
            case 50:
                return '解冻';
            case 60:
                return '超重超发';
        }
    }

    _stateStringFromCode(type) {
        switch (type) {
            case 10:
                return '新增';
            case 20:
                return '已处理';
        }
    }

    _showText(value){
        return value ? value : '-';
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F9'
    },
    commonText: {
        color: '#999999',
        fontFamily: 'PingFangSC-Regular',
        fontSize: 14,
        backgroundColor: 'white',
    },
    cellBase: {
        backgroundColor: 'white',
        marginTop: CommonMargin
    },
    baseView: {
        margin: CommonMargin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    newAddLine: {
        width: CommonMargin / 5,
        backgroundColor: '#41549E',
        marginTop: 2,
        marginBottom: 2
    },
    newAddText: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 15,
        color: '#999',
    },
    line: {
        height: 1,
        backgroundColor: '#E6EAF2',
        marginBottom: CommonMargin
    },
})

function mapStateToProps(state) {
    const {home} = state;
    return {
        detailData: home.get('detailData').toJS(),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        queryDetailData: (params) => {
            dispatch(fetchData({
                body: params,
                method: 'POST',
                failToast: true,
                api: Get_Detail_DATA,
                success: (data) => {
                    dispatch(requestDetailData(data))
                },
                fail: () => {

                }
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AbnormallyReport)
