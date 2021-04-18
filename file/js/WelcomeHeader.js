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
import {useColorScheme } from 'react-native-appearance';
import CustomColor  from '../value/CustomColor';

const WelcomeHeader: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ImageBackground
            accessibilityRole="image"
            source={require("../js/res/images/logo.png")}
            style={[
                styles.background,
                {
                    backgroundColor: isDarkMode ? CustomColor.darker : CustomColor.lighter,
                },
            ]}
            imageStyle={styles.logo}>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {

      paddingTop: 350,
      paddingHorizontal: 40,
    },
    logo: {
      opacity: 0.7,
      overflow: 'visible',
      resizeMode: 'cover',
      marginLeft: -60,
      marginBottom: -30,
    },
  });
export default WelcomeHeader;



