 import React from 'react';
 import type {Node} from 'react';
 import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
 import { useColorScheme } from 'react-native-appearance';
 import  WelcomeHeader  from './WelcomeHeader';
 import CustomColor  from '../value/CustomColor';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


 
 export default function Home ({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
   const backgroundStyle = {
     backgroundColor: isDarkMode ? CustomColor.darker : CustomColor.lighter,
   };
   const pressHandlerToQR = () => {
        navigation.navigate('QR');
   }
 
   return (
       <SafeAreaView >
         <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
         <ScrollView
           contentInsetAdjustmentBehavior="automatic"
           >
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
         </ScrollView>
       </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({

   sectionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
   },
   titleText: {
    fontSize: 32,
    textAlignVertical: 'center',
    margin: wp('5%')
   },
   highlight: {
     fontWeight: '700',
   },
   button: {
     flexDirection: 'column',
     backgroundColor: CustomColor.backgroundButton,
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
   },
 });
 