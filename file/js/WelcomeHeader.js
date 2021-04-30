/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
    StyleSheet,
    ImageBackground,
} from 'react-native';
import CustomColor  from '../value/CustomColor';
import isDarkMode from './isDarkMode';



const WelcomeHeader: () => Node = () => {
    return (
        <ImageBackground
            accessibilityRole="image"
            source={require("../js/res/images/background5.png")}
            style={[
                styles.background,
                {
                    backgroundColor:  isDarkMode ? CustomColor.black : CustomColor.white,
                },
            ]}
            imageStyle={styles.logo}>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {

      paddingTop: 370,
      paddingHorizontal: 40,
    },
    logo: {
      opacity: 1,
      overflow: 'visible',
      resizeMode: 'cover',
      marginLeft: -60,
      marginBottom: -30,
    },
  });
export default WelcomeHeader;



