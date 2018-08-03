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

class Home extends Component {


    componentDidMount() {

    }

    componentWillReceiveProps(props) {

    }

    render() {

        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'这是首页'}
                    navigation={navigation}
                    hiddenBackIcon={true}
                    firstLevelIconFont='&#xe69f;'
                    firstLevelIconFontStyle={{color: '#B1BCD3', fontSize: 18}}
                    firstLevelClick={() => {
                        navigation.dispatch({type:RouteType.ROUTE_HOME_DETAIL})
                    }}
                    secondLevelIconFont='&#xe6a2;'
                    secondLevelIconFontStyle={{fontSize: 18, color: '#B1BCD3'}}
                    secondLevelClick={() => {
                        alert('查询')
                    }}
                />
                <Text>11111</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F9'
    },
})

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
