'use strict';
import React, { Component, useState } from 'react';
import { Alert, ShadowPropTypesIOS, ToastAndroid, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
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
    this._renderTrackingText = this._renderTrackingText.bind(this);
    this._onTrackingInit = this._onTrackingInit.bind(this);

  }

  render() {
    return (
        <View style={localStyles.outer}>
           <ViroARSceneNavigator style={localStyles.arView}
            initialScene={
                {
                    scene: ARExperience,
                }
            }
         />
          <View  style={{position: 'absolute',  left: 0, right: 0, bottom: 77, alignItems: 'center'}}>
            <TouchableOpacity style={localStyles.button}>
              <Text style={localStyles.text}> bottone tradizionale in overlay</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: CustomColor.lightBlue,
    height: 50,
    width: wp('80%'),
    borderRadius: 60,
    margin: wp('6%'),
    borderColor: CustomColor.black,
  },
});

export default RenderAR;