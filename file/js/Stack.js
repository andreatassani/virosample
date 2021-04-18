import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import 'react-native-gesture-handler';
import * as React from 'react';
import Home from './Home';
import { ScannerQR } from './ScannerQR';
import StackAR from './StackAR';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Welcome',
          },
    },
    QR: {
        screen: ScannerQR,
        navigationOptions: {
            title: 'QR-Scanner',
          },
    },
    AR: {
        screen: StackAR,
        navigationOptions: {
            title: 'Augmented Reality',
          },
    },
}
const stack = createStackNavigator(screens);

export default createAppContainer(stack)