 import React from 'react';
 import type {Node} from 'react';
 import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
 import { useColorScheme } from 'react-native-appearance';
 import  WelcomeHeader  from './WelcomeHeader';
 import CustomColor  from '../value/CustomColor';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


 
 export default function Home ({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
   const pressHandlerToQR = () => {
        navigation.navigate('QR');
   }
 
   return (
       <SafeAreaView style={{backgroundColor : CustomColor.white}}>
         <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
           <WelcomeHeader/>
           <View style={[styles.sectionButton]}>
             <Text style={styles.titleText}> Choose an experience: </Text>
             <TouchableOpacity style={styles.button} onPress={pressHandlerToQR}>
               <Text style={styles.text}>QR-code scanner</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.button}>
               <Text style={styles.text}>Reproduce video tutorial</Text>
             </TouchableOpacity >
             <TouchableOpacity style={styles.button}>
               <Text style={styles.text}>Offer an in-depth study</Text>
             </TouchableOpacity>
           </View>
       </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({

   sectionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    height: hp('60%'),
    backgroundColor: CustomColor.white,
   },
   titleText: {
    fontSize: 32,
    textAlignVertical: 'center',
    margin: wp('5%'),
    marginTop: hp("-3%"),
   },
   highlight: {
     fontWeight: '700',
   },
   button: {
     flexDirection: 'column',
     backgroundColor: CustomColor.lightBlue,
     height: 50,
     width: wp('80%'),
     borderRadius: 60,
     margin: wp('6%'),
     borderColor: CustomColor.black,
   },

   text: {
     fontSize: 24,
     fontWeight: 'bold',
     textAlignVertical: 'center',
     justifyContent: 'center',
     alignItems: 'center',
     textAlign: 'center',
     marginVertical: hp('1%'),
     color: CustomColor.white,
   },
 });
 