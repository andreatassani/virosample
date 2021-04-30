 import React from 'react';
 import type {Node} from 'react';
 import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
 import  WelcomeHeader  from './WelcomeHeader';
 import CustomColor  from '../value/CustomColor';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import isDarkMode from './isDarkMode';




 
 export default function Home ({ navigation }) {
   const pressHandlerToQR = () => {
        navigation.navigate('QR');
   }
   return (
       <SafeAreaView style={{backgroundColor : isDarkMode ? CustomColor.black : CustomColor.white}}>
         <StatusBar barStyle={ isDarkMode ? CustomColor.black : CustomColor.white} />
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
    backgroundColor: isDarkMode ? CustomColor.black : CustomColor.white,
   },
   titleText: {
    fontSize: 32,
    textAlignVertical: 'center',
    margin: wp('5%'),
    marginTop: hp("-3%"),
    color: CustomColor.white,
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
 