import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import 'react-native-gesture-handler';
import * as React from 'react';
import Home from './Home';
import { ScannerQR } from './ScannerQR';
import RenderAR from './RenderAR';
import Login from './Login';

const screens = {
    LogIn: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
          },
        },
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
        screen: RenderAR,
            navigationOptions: ({ navigation }) => ({
                headerLeft: (()=><HeaderBackButton onPress={_ => navigation.navigate("Home")}/>),
                title: 'Augmented Reality',
            }),
    },
}
const stack = createStackNavigator(screens);

export default createAppContainer(stack)