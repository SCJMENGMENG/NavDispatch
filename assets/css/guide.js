import { StyleSheet,Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    wrapper: {
        backgroundColor: 'white'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width,
        height,
        // alignItems: 'center',
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    stepContainer: {
        position: 'absolute',
        height: 100,
        bottom: 40,
        left: 100,
        right: 100,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    btn: {
        width: 120,
        height: 40,
        borderRadius: 5,
        borderColor: 'white',
        backgroundColor: 'transparent'
    },
    btnText: {
        fontSize: 15,
        color: 'white'
    },
    carStyle: {
        width: 164,
        height: 110,
        bottom: 230,
        position: 'absolute'
    },
    guyStyle: {
        width: 59,
        height: 134,
        bottom: 170,
        left: 206,
        position: 'absolute'
    },
    textContainer: {
        width,
        height: 150,
        top: 100,
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    topText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    },
    tipText: {
        fontSize: 14,
        color: 'white',
        marginTop: 10,
    }
});
