 import React from 'react';
 import type {Node} from 'react';
 import { SafeAreaView, ScrollView, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
 import  WelcomeHeader  from './WelcomeHeader';
 import CustomColor  from '../value/CustomColor';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ColorPropType } from 'react-native';




 
 export default function Home ({ navigation }) {
   const pressHandlerToQR = () => {
        navigation.navigate('QR');
   }
   return (

    <SafeAreaView>
          <StatusBar/>  
           <ImageBackground style={[styles.sectionButton]} source={require("../js/res/images/pattern.png")} imageStyle={{opacity: 0.5}}>
           <Text style={styles.titleText}> Choose an experience </Text>
             <TouchableOpacity style={styles.button} onPress={pressHandlerToQR}>
               <Text style={styles.text}>QR-code scanner</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.button}>
               <Text style={styles.text}>-INATTIVO-</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.button}>
               <Text style={styles.text}>-INATTIVO-</Text>
   </TouchableOpacity>
           </ImageBackground >     
       </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({

   sectionButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: CustomColor.black,
    height: hp('100%'),
    width: wp('100%'),
    resizeMode: 'contain',
   },
   titleText: {
    fontSize: 40,
    textAlignVertical: 'center',
    margin: wp('6%'),
    marginVertical: hp('7%'),
    color: CustomColor.white,
    backgroundColor : CustomColor.black,
    borderRadius : 20,
   },
   highlight: {
     fontWeight: '700',
   },
   button: {
     flexDirection: 'column',
     backgroundColor: CustomColor.yellow,
     height: 50,
     width: wp('80%'),
     borderRadius: 60,
     margin: wp('6%'),
     borderColor: CustomColor.darkGrey,
     borderWidth: 3,
     shadowColor: CustomColor.black,
     shadowOpacity: 1,
     shadowRadius: 20,
   },

   text: {
     fontSize: 24,
     fontWeight: 'bold',
     textAlignVertical: 'center',
     justifyContent: 'center',
     alignItems: 'center',
     textAlign: 'center',
     marginVertical: hp('1%'),
     color: CustomColor.black,
   },
 });
 