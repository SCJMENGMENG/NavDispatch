import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window');
import styles from '../../../assets/css/guide';
import Storage from '../../utils/storage';

class WelcomeContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this._toMain = this._toMain.bind(this);
    }

    _toMain() {
        Storage.save('IS_FIRST_FLAG', '1')
        this.props.navigation.dispatch({ type: 'ROUTE_LOGIN', mode: 'reset' })
    }

    render() {
        const { upgrade } = this.props;
        return (
            <Swiper style={ styles.wrapper } showsButtons={ false }
                    height={ height } loop={ false }
                    showsPagination={ false }
                    onMomentumScrollEnd={ () => console.log('') }>
                <View style={ styles.slide }>
                    <Image style={ styles.image } source={ require('../../../assets/img/guideOne.png') } resizeMode={ 'stretch'}/>
                </View>
                <View style={ styles.slide }>
                    <Image style={ styles.image } source={ require('../../../assets/img/guideTwo.png') } resizeMode={ 'stretch'}/>
                </View>
                <View style={ styles.slide }>
                    <Image style={ styles.image } source={ require('../../../assets/img/guideThree.png') } resizeMode={ 'stretch'}/>
                </View>
                <View style={ styles.slide }>
                    <Image style={ styles.image } source={ require('../../../assets/img/guideFour.png') } resizeMode={ 'stretch'}/>
                    <TouchableOpacity activeOpacity={ 1 } style={ styles.stepContainer } onPress={ this._toMain }>
                    </TouchableOpacity>
                </View>
            </Swiper>
        );
    }

}

const mapStateToProps = (state) => {
    // const {  } = state;
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
