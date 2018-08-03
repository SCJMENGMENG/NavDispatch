import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    loginTitle: {
        marginTop: Platform.OS === 'ios' ? 64 : 54,
        marginLeft: 15,
        fontSize: 32,
        color: '#333',
        fontWeight: 'bold'
    },
    logo: {
        width: 78,
        height: 106,
        marginLeft: (width - 78)/2,
        marginTop: 16,
    },
    accountView: {
        marginTop: Platform.OS === 'ios' ? 77 : 67,
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    noteText: {
        fontSize: 17,
        color: '#333'
    },
    textInput: {
        marginLeft: 25,
        marginRight: 15,
        fontSize: 17,
        padding: 0,
        flex: 1
    },
    line: {
        marginTop: 12,
        marginLeft: 15,
        marginRight: 15,
        height: 1,
        backgroundColor: '#E6EAF2'
    },
    btnView: {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
    },
    btn: {
        width: width - 30,
        height: 44,
        backgroundColor: '#41549F',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    bottomView: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15
    },
    bottomText: {
        fontSize: 15,
        color: '#666'
    },
    iconFont: {
        fontSize: 20,
        color: '#333',
        fontFamily: 'iconfont',
        marginTop: 33,
        marginLeft: 15
    },
    passwordContainer: {
        flex: 1,
        padding: 0,
    },
    passwordWindow:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    iconFontRight: {
        fontSize: 16,
        color: '#F0F2F5',
        fontFamily: 'iconfont',
        alignItems: 'center',
        marginRight: 16
    },
})
