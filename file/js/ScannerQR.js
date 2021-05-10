
import QRCodeScanner from 'react-native-qrcode-scanner';
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView, Linking, Alert, StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import CustomColor from '../value/CustomColor';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class ScannerQR extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      visible: false,
    }

  }
  onSuccess = e => {
    return (
      this.setState({
        data: e.data,
        visible: true,
      }),
      this.props.navigation.navigate('AR', { link: e.data }))
  }
  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    return(
    <QRCodeScanner style={{ flex : 1 }}
      onRead={this.onSuccess}
      flashMode={RNCamera.Constants.FlashMode.auto}
      fadeIn={true}
      showMarker={true}
      reactivate={true}
    />
    )
  }
}

var styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    textAlignVertical: 'center',
    marginBottom: wp('15%'),
    color: CustomColor.white,
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    flexDirection: 'column',
    backgroundColor: CustomColor.yellow,
    height: 50,
    width: wp('70%'),
    borderRadius: 60,
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

