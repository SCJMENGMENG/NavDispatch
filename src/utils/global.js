import React, {Component} from 'react';
import {
    Dimensions,
    PixelRatio,
    Platform,
    NativeModules,
} from 'react-native';

let {height, width} = Dimensions.get('window');

global.IS_IOS = (Platform.OS === 'ios');
global.IS_ANDROID = (Platform.OS === 'android');
global.SCREEN_WIDTH = width;
global.SCREEN_HEIGHT = height;

global.DANGER_BOTTOM =  0;//IS_IPHONE_X ? 34 :
global.DANGER_TOP = 20//IS_IPHONE_X ? 44 :