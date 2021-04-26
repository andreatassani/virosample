
 import QRCodeScanner from 'react-native-qrcode-scanner';
 import React, { Component } from 'react';
 import { Text, StyleSheet, TouchableOpacity, Linking, Alert} from 'react-native';
 import { RNCamera } from 'react-native-camera';
 import {createStackNavigator, HeaderBackButton} from 'react-navigation-stack';
 import {createAppContainer} from 'react-navigation';
 import CustomColor  from '../value/CustomColor';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


 
 /*
  TODO: Insert your API key below
  */
 var sharedProps = {
   apiKey:"API_KEY_HERE",
 }
 
 var UNSET = "UNSET";
 var AR_NAVIGATOR_TYPE = "AR";
 
 // This determines which type of experience to launch in, or UNSET, if the user should
 // be presented with a choice of AR or VR. By default, we offer the user a choice.
 var defaultNavigatorType = UNSET;

 function getLinkScanned() {
   return this.state.data;
 }
 
 export default class ScannerQR extends Component {
   constructor() {
     super();
 
     this.state = {
       navigatorType : defaultNavigatorType,
       sharedProps : sharedProps,
       data : null,
       visible : false,
     }
     this._getExperienceSelector = this._getExperienceSelector.bind(this);
     this._getARNavigator = this._getARNavigator.bind(this);
     this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
     this._exitViro = this._exitViro.bind(this);

   }
   onSuccess = e => {
    this.setState({
      data : e.data,
      visible : true,
    });

  }
   // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
   // if you are building a specific type of experience.
   render() {
     if (this.state.navigatorType == UNSET) {
       return this._getExperienceSelector();
     } else (this.state.navigatorType == AR_NAVIGATOR_TYPE)
        return this._getARNavigator();
   }
 
   // Presents the user with a choice of an AR or VR experience
   _getExperienceSelector() {
     return (
         <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        topContent={
          <Text style={styles.titleText}>{this.state.visible ? null : 'Frame on the QR-code, please!'}</Text>

        }
        bottomContent={ this.state.visible ?
          <TouchableOpacity style={styles.button}
             onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}>
             <Text style={styles.text}>GO!</Text>
           </TouchableOpacity> : null }
      />

     );
   }
 
   // Returns the ViroARSceneNavigator which will start the AR experience
   _getARNavigator() {
     return (
      this.props.navigation.navigate('AR', {link : this.state.data})
     );
   }
 
   // This function returns an anonymous/lambda function to be used
   // by the experience selector buttons
   _getExperienceButtonOnPress(navigatorType) {
     return () => {
       this.setState({
         navigatorType : navigatorType
       })
     }
   }
 
   // This function "exits" Viro by setting the navigatorType to UNSET.
   _exitViro() {
     this.setState({
       navigatorType : UNSET
     })
   }
 }
 
 var styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    textAlignVertical: 'center',
    marginBottom: wp('15%')
   },
   highlight: {
     fontWeight: '700',
   },
   button: {
     flexDirection: 'column',
     backgroundColor: CustomColor.lightBlue,
     height: 50,
     width: wp('30%'),
     borderRadius: 60,
     marginTop: wp('15%'),
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
 
 module.exports = { ScannerQR, getLinkScanned}
 