import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {GET_ADDRESS} from '../constants/api';
import { fetchData } from '../action/app';

import Home from '../containers/home/home';
import Mine from '../containers/mine/mine';

const {width, height} = Dimensions.get('window');

class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        }
    }
    componentDidMount() {
        // this.subscription = DeviceEventEmitter.addListener('changeTab', () => {
        //     this.setState({ selectedTab: 'mine'})
        // })
        this.props.getAddress()
    }

    render() {

        var tabItems = [
            {title: '首页',tab:'home',img:{'tabBarImg':'\ue699'},selectImg:{'tabBarSelected':'\ue6af'}, page: <Home {...this.props}/>},
            {title: '我的',tab:'mine',img:{'tabBarImg':'\ue69a'},selectImg:{'tabBarSelected':'\ue69e'}, page: <Mine {...this.props}/>}
        ];
        tabItems = tabItems.map((item, index) => {
            return (
                <TabNavigator.Item
                    key={index}
                    selected={this.state.selectedTab === item.tab}
                    title={item.title}
                    titleStyle={{
                        backgroundColor: '#ffffff',
                        fontSize: 11,
                    }}
                    selectedTitleStyle={{color: '#41549F'}}
                    renderIcon={() => <Text style={styles.tabBarImgStyle}>{item.img.tabBarImg}</Text>}
                    renderSelectedIcon={() => <Text style={styles.tabBarSelectedStyle}>{item.selectImg.tabBarSelected}</Text>}
                    onPress={() => {
                        // if (item.tab === 'home') {
                        //     this.props.dispatch(refreshHomeNumber(true))
                        // } else if (item.tab === 'mine') {
                        //     this.props.dispatch(refreshMine())
                        // }
                        this.setState({selectedTab: item.tab})
                    }}
                >
                    {item.page}
                </TabNavigator.Item>
            )
        })

        return (
            <TabNavigator
                tabBarStyle={{backgroundColor: 'white', height: 49, paddingBottom: 0}}
                tabBarShadowStyle={{backgroundColor: '#e6eaf2', height: 0.5}}
            >
                {tabItems}
            </TabNavigator>
        )
    }
}
function mapStateToProps(state) {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        getAddress: (cb) => {
            dispatch(fetchData({
                method: 'POST',
                api: GET_ADDRESS,
                cache: true,
                cacheType: 'city'
            }))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBar)


const styles = StyleSheet.create({
    tabBarImgStyle: {
        fontSize: 20,
        color: '#E8E8E8',
        fontFamily: 'iconfont',
    },
    tabBarSelectedStyle: {
        fontSize: 20,
        color: '#41549F',
        fontFamily: 'iconfont',
    },
})
