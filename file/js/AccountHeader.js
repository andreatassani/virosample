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
 
 const AccountHeader: () => Node = () => {
     return (
         <ImageBackground
             accessibilityRole="image"
             source={require("../js/res/images/account.png")}
             style={[
                 styles.background,
                 {
                    backgroundColor:  CustomColor.black,
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
       opacity: 1,
       overflow: 'hidden',
       resizeMode: 'cover',
       marginLeft: 0,
       marginBottom: 0,
       backgroundColor:  CustomColor.black,
     },
   });
 export default AccountHeader;
 
 
 
 