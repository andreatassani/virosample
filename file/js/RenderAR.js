'use strict';
import React, { Component, useState } from 'react';
import { Alert, ShadowPropTypesIOS, ToastAndroid, TouchableOpacity, View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { ViroARScene, ViroBox, ViroAmbientLight, ViroText, Viro3DObject, ViroARSceneNavigator, ViroMaterials, ViroAnimations, ViroImage } from 'react-viro';
import CustomColor from '../value/CustomColor';
import ARExperience from './ARExperience';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
//-----------------------------------------------------------------------------------------GLOBAL VAR

//-----------------------------------------------------------------------------------------START CLASS
class RenderAR extends Component {
  constructor(props) {
    super(props);
//-----------------------------------------------------------------------------------------STATE
    this.state = {
    }
  }

  render() {
    return (

        <View style={localStyles.outer}>
           <ViroARSceneNavigator style={localStyles.arView}
            initialScene={{ scene: ARExperience, }}
            viroAppProps={{link: this.props.navigation.getParam('link', 'nessun dato letto')}}
         />
        </View>
    );
  }
}
var localStyles = StyleSheet.create({
  outer : {
    flex : 1,
  },

  arView: {
    flex:1,
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

  button: {
    flexDirection: 'column',
    backgroundColor: CustomColor.yellow,
    height: 50,
    width: wp('80%'),
    borderRadius: 60,
    margin: wp('6%'),
    borderColor: CustomColor.black,
  },
});

export default RenderAR;