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
 
 const AccountHeader: () => Node = () => {
     const isDarkMode = useColorScheme() === 'dark';
     return (
         <ImageBackground
             accessibilityRole="image"
             source={require("../js/res/images/account.png")}
             style={[
                 styles.background
             ]}
             imageStyle={styles.logo}>
         </ImageBackground>
     );
 };
 
 const styles = StyleSheet.create({
     background: {
 
       paddingTop: 345,
       paddingHorizontal: 40,
     },
     logo: {
       opacity: 1,
       overflow: 'hidden',
       resizeMode: 'cover',
       marginLeft: 0,
       marginBottom: 0,
     },
   });
 export default AccountHeader;
 
 
 
 